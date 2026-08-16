import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProgressService } from '../../core/services/progress.service';
import { AuthService } from '../../core/services/auth.service';
import { CareerService, CareerSummary } from '../../core/services/career.service';
import { PlacementService, PlacementSummary } from '../../core/services/placement.service';
import { coreCsSubjects } from '../../config/core-cs.config';
import { quantitativeChapters, logicalReasoningChapters } from '../../config/aptitude.config';
import { javaDsaChapters } from '../../config/java-dsa.config';

/**
 * PREORBIT — Dashboard Page Component
 * Route: /dashboard
 *
 * Integrates: Learning Progress, Career Links summary, Placement summary.
 */
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private progressService  = inject(ProgressService);
  private careerService    = inject(CareerService);
  private placementService = inject(PlacementService);
  public  authService      = inject(AuthService);
  private router           = inject(Router);

  // ── Progress ─────────────────────────────────────────────
  progressData = this.progressService.progressData;
  isLoading    = signal<boolean>(true);
  error        = signal<string | null>(null);

  // ── Career & Placement loading ───────────────────────────
  cpLoading     = signal(true);
  cpError       = signal<string | null>(null);
  careerSummary  = signal<CareerSummary | null>(null);
  placementSummary = signal<PlacementSummary | null>(null);

  // ── Chapter computed values ───────────────────────────────
  totalChapters = computed(() => {
    let total = 0;
    coreCsSubjects.forEach(sub => total += sub.chapters.length);
    total += quantitativeChapters.length;
    total += logicalReasoningChapters.length;
    total += javaDsaChapters.length;
    return total;
  });

  completedChapters = computed(() => {
    const data = this.progressData();
    if (!data) return 0;
    return data.chapters.filter(c => c.status === 'COMPLETED').length;
  });

  inProgressChapters = computed(() => {
    const data = this.progressData();
    if (!data) return 0;
    return data.chapters.filter(c => c.status === 'IN_PROGRESS').length;
  });

  pendingChapters = computed(() => {
    const total    = this.totalChapters();
    const done     = this.completedChapters();
    const progress = this.inProgressChapters();
    return Math.max(0, total - done - progress);
  });

  continueLearningTarget = computed(() => {
    const data = this.progressData();
    if (!data || data.chapters.length === 0) return null;

    let target = data.chapters.find(c => c.status === 'IN_PROGRESS' && c.tests.completed > 0);
    if (!target) target = data.chapters.find(c => c.status === 'IN_PROGRESS');
    if (!target) target = data.chapters.find(c => c.status === 'NOT_STARTED');
    if (!target) return null;

    let route = '';
    if (target.module === 'core-cs')   route = `/core-cs/${target.subject}/theory`;
    if (target.module === 'aptitude')  route = `/aptitude/${target.subject}/theory`;
    if (target.module === 'java-dsa')  route = `/java-dsa/theory`;

    return {
      title:       target.chapterName || target.chapterSlug,
      moduleLabel: target.module === 'java-dsa' ? 'Java DSA' : (target.module === 'aptitude' ? 'Aptitude' : 'Core CS'),
      subject:     target.subject !== 'default' ? target.subject : '',
      route,
    };
  });

  ngOnInit(): void {
    // Load progress
    this.progressService.getProgress().subscribe({
      next: () => this.isLoading.set(false),
      error: (err) => {
        console.error('Progress load error:', err);
        this.error.set('Unable to load progress.');
        this.isLoading.set(false);
      },
    });

    // Load career + placement summaries in parallel — partial failure is isolated
    this.cpLoading.set(true);
    forkJoin({
      career:    this.careerService.getSummary(),
      placement: this.placementService.getSummary(),
    }).subscribe({
      next: ({ career, placement }) => {
        if (career.success)    this.careerSummary.set(career.data);
        if (placement.success) this.placementSummary.set(placement.data);
        this.cpLoading.set(false);
      },
      error: () => {
        this.cpError.set('Unable to load career & placement summary.');
        this.cpLoading.set(false);
      },
    });
  }

  // ── Navigation helpers ────────────────────────────────────
  goToCareer():    void { this.router.navigateByUrl('/career'); }
  goToPlacement(): void { this.router.navigateByUrl('/placement'); }

  // ── Status badge CSS class (reused from placement) ────────
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'Saved':           'dash__placement-badge--saved',
      'Applied':         'dash__placement-badge--applied',
      'Test':            'dash__placement-badge--test',
      'Interview':       'dash__placement-badge--interview',
      'Technical Round': 'dash__placement-badge--tech',
      'HR Round':        'dash__placement-badge--hr',
      'Selected':        'dash__placement-badge--selected',
      'Rejected':        'dash__placement-badge--rejected',
      'Withdrawn':       'dash__placement-badge--withdrawn',
    };
    return map[status] ?? 'dash__placement-badge--applied';
  }
}
