import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { javaDsaChapters, JavaDsaChapter } from '../../../config/java-dsa.config';
import { TestMetadata } from '../../../core/models/test.model';
import { TestCardComponent } from '../../../shared/components/test-card/test-card.component';
import { environment } from '../../../../environments/environment';
import { ProgressService } from '../../../core/services/progress.service';

@Component({
  selector: 'app-java-dsa-tests',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TestCardComponent],
  templateUrl: './java-dsa-tests.component.html',
  styleUrl: './java-dsa-tests.component.css'
})
export class JavaDsaTestsComponent implements OnInit {
  chapters = signal<JavaDsaChapter[]>(javaDsaChapters);
  allTests = signal<TestMetadata[]>([]);
  searchQuery = signal<string>('');
  loading = signal<boolean>(true);
  error = signal<boolean>(false);

  private progressService = inject(ProgressService);
  progressData = this.progressService.progressData;

  filteredChapters = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const all = this.chapters();
    if (!query) return all;
    
    return all.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.description.toLowerCase().includes(query)
    );
  });

  // Group tests by chapter slug
  testsByChapter = computed(() => {
    const tests = this.allTests();
    const map = new Map<string, TestMetadata[]>();
    tests.forEach(test => {
      if (!map.has(test.chapterSlug)) {
        map.set(test.chapterSlug, []);
      }
      map.get(test.chapterSlug)?.push(test);
    });
    return map;
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.progressService.getProgress().subscribe();

    this.loading.set(true);
    this.error.set(false);
    this.http.get<{success: boolean, data: any}>(`${environment.apiUrl}/tests?module=java-dsa`).subscribe({
      next: (res) => {
        if (res.success) {
          const dbTests = Array.isArray(res.data) ? res.data : (res.data?.tests || []);
          const updatedTests = dbTests.map((dbTest: any) => {
            let calculatedStatus: 'not-available' | 'available' | 'completed' | 'locked' = 'locked';
            if (dbTest.isCompleted) {
              calculatedStatus = 'completed';
            } else if (dbTest.isLocked) {
              calculatedStatus = 'locked';
            } else {
              calculatedStatus = (dbTest.status === 'available' || dbTest.isAvailable) ? 'available' : 'locked';
            }

            return {
              id: dbTest.testId,
              section: 'java-dsa',
              subject: 'java-dsa',
              chapterSlug: dbTest.chapterSlug?.toLowerCase() || '',
              testNumber: dbTest.testNumber || 1,
              title: dbTest.testName,
              totalQuestions: dbTest.questionCount || 25,
              multipleChoiceCount: dbTest.multipleChoiceCount || 5,
              mcqCount: dbTest.mcqCount || 20,
              totalMarks: dbTest.totalMarks || 25,
              status: calculatedStatus
            } as TestMetadata;
          });
          
          updatedTests.sort((a: any, b: any) => (a.testNumber || 0) - (b.testNumber || 0));
          this.allTests.set(updatedTests);
          this.loading.set(false);
        } else {
          this.error.set(true);
          this.loading.set(false);
        }
      },
      error: (err) => {
        console.error('Failed to load java-dsa tests', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  getChapterProgress(chapterSlug: string) {
    const data = this.progressData();
    const loadedTests = this.testsByChapter().get(chapterSlug) || [];
    const completedCount = loadedTests.filter(t => t.status === 'completed').length;
    const totalCount = loadedTests.length;
    
    let theoryCompleted = false;
    if (data && data.chapters) {
      const found = data.chapters.find((c: any) => (c.chapterSlug || '').toLowerCase() === chapterSlug.toLowerCase());
      if (found) {
        theoryCompleted = !!(found.theoryCompleted || found.theory?.completed);
      }
    }

    let finalCompleted = completedCount;
    let finalTotal = totalCount;

    if (finalTotal === 0 && data && data.chapters) {
      const found = data.chapters.find((c: any) => (c.chapterSlug || '').toLowerCase() === chapterSlug.toLowerCase());
      if (found && found.tests) {
        finalCompleted = found.tests.completed || 0;
        finalTotal = found.tests.total || 0;
      }
    }

    const totalUnits = 1 + finalTotal;
    const completedUnits = (theoryCompleted ? 1 : 0) + finalCompleted;
    const progress = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

    let status = 'NOT_STARTED';
    if (finalTotal === 0 && !theoryCompleted) {
      status = 'NOT_STARTED';
    } else if (finalCompleted === finalTotal && finalTotal > 0 && theoryCompleted) {
      status = 'COMPLETED';
    } else if (finalCompleted > 0 || theoryCompleted) {
      status = 'IN_PROGRESS';
    }

    return {
      theoryCompleted,
      tests: {
        completed: finalCompleted,
        total: finalTotal
      },
      progress,
      status
    };
  }
}
