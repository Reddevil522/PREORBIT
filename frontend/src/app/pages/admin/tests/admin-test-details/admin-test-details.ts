import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminTestService, PracticeTest } from '../../../../core/services/admin-test.service';

const CACHE_KEY = 'preorbit_admin_tests_cache_v1';

@Component({
  selector: 'app-admin-test-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-test-details.html',
  styleUrls: ['./admin-test-details.css']
})
export class AdminTestDetails implements OnInit {
  test: PracticeTest | null = null;
  questions: any[] = [];
  loading = true;
  error = '';
  
  // Deletion State
  showDeleteModal = false;
  isDeleting = false;
  deleteError = '';

  private readonly startTime = performance.now();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminTestService: AdminTestService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('[VIEW-TEST] Navigation started');
    console.log('[VIEW-TEST] Component initialized');
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.checkCacheAndLoad(id);
    } else {
      this.error = 'No Test ID provided';
      this.loading = false;
    }
  }

  checkCacheAndLoad(id: string): void {
    const cachedString = sessionStorage.getItem(CACHE_KEY);
    let cachedTest = null;
    
    if (cachedString) {
      try {
        const cache = JSON.parse(cachedString);
        if (cache && cache.tests) {
           cachedTest = cache.tests.find((t: any) => t._id === id);
        }
      } catch (err) {}
    }
    
    if (cachedTest) {
      this.test = cachedTest;
      console.log(`[VIEW-TEST] Metadata loaded from cache in ${Math.round(performance.now() - this.startTime)}ms`);
    }

    this.loadTestDetails(id);
  }

  loadTestDetails(id: string): void {
    console.log('[VIEW-TEST] API request started');
    const reqStart = performance.now();
    this.adminTestService.getTestDetails(id).subscribe({
      next: (res) => {
        const reqEnd = performance.now();
        console.log(`[VIEW-TEST] API response received in ${Math.round(reqEnd - reqStart)}ms`);
        this.test = res.data.test;
        this.questions = res.data.questions;
        this.loading = false;
        console.log('[VIEW-TEST] Data mapped');
        this.cdr.detectChanges();
        setTimeout(() => {
          console.log(`[VIEW-TEST] UI rendered. Total page load: ${Math.round(performance.now() - this.startTime)}ms`);
        });
      },
      error: (err) => {
        this.error = err.status === 404 ? 'Test not found.' : 'Unable to load test.';
        this.loading = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }

  trackByQuestionId(index: number, question: any): string {
    return question._id || index;
  }

  goBack(): void {
    this.router.navigate(['/admin/tests']);
  }

  openDeleteModal(): void {
    if (this.isDeleting) return;
    this.showDeleteModal = true;
    this.deleteError = '';
  }

  cancelDelete(): void {
    if (this.isDeleting) return;
    this.showDeleteModal = false;
    this.deleteError = '';
  }

  confirmDelete(): void {
    if (!this.test || this.isDeleting) return;

    this.isDeleting = true;
    this.deleteError = '';
    const idToDelete = this.test._id;

    this.adminTestService.deleteTest(idToDelete).subscribe({
      next: (res) => {
        this.isDeleting = false;
        this.showDeleteModal = false;
        
        // Optimistic delete: remove from allTests locally in cache
        const cachedString = sessionStorage.getItem(CACHE_KEY);
        if (cachedString) {
          try {
            const cache = JSON.parse(cachedString);
            if (cache && cache.tests) {
              cache.tests = cache.tests.filter((t: any) => t._id !== idToDelete);
              sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
            }
          } catch(e) {}
        }
        
        this.router.navigate(['/admin/tests']);
      },
      error: (err) => {
        this.isDeleting = false;
        this.deleteError = err.error?.message || 'Unable to delete test. No data was deleted.';
        this.cdr.detectChanges();
        console.error('Delete error:', err);
      }
    });
  }
}
