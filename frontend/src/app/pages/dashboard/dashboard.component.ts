import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService, ProgressData } from '../../core/services/progress.service';
import { AuthService } from '../../core/services/auth.service';
import { coreCsSubjects } from '../../config/core-cs.config';
import { quantitativeChapters, logicalReasoningChapters } from '../../config/aptitude.config';
import { javaDsaChapters } from '../../config/java-dsa.config';

/**
 * PREORBIT — Dashboard Page Component
 * Route: /dashboard
 *
 * Displays raw statistical data to verify progress foundation.
 */
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private progressService = inject(ProgressService);
  public authService = inject(AuthService);

  progressData = this.progressService.progressData;
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

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
    const total = this.totalChapters();
    const completed = this.completedChapters();
    const inProgress = this.inProgressChapters();
    return Math.max(0, total - completed - inProgress);
  });

  continueLearningTarget = computed(() => {
    const data = this.progressData();
    if (!data || data.chapters.length === 0) return null;

    // 1. In-progress chapter with partially completed tests
    let target = data.chapters.find(c => c.status === 'IN_PROGRESS' && c.tests.completed > 0);
    // 2. In-progress theory (theory completed but no tests, or just started)
    if (!target) {
      target = data.chapters.find(c => c.status === 'IN_PROGRESS');
    }
    // 3. First available NOT_STARTED learning chapter
    if (!target) {
      target = data.chapters.find(c => c.status === 'NOT_STARTED');
    }

    if (!target) return null;

    // Resolve route — MUST match registered routes in app.routes.ts exactly.
    // core-cs/:subject/theory   (subject-level page, no chapterSlug segment)
    // aptitude/:subject/theory  (subject-level page, no chapterSlug segment)
    // java-dsa/theory           (static page, no chapterSlug segment)
    let route = '';
    if (target.module === 'core-cs') {
      // Registered: core-cs/:subject/theory — 3 segments only
      route = `/core-cs/${target.subject}/theory`;
    } else if (target.module === 'aptitude') {
      // Registered: aptitude/:subject/theory — 3 segments only
      route = `/aptitude/${target.subject}/theory`;
    } else if (target.module === 'java-dsa') {
      // Registered: java-dsa/theory — static, no slug
      route = `/java-dsa/theory`;
    }

    console.log('[CONTINUE] module:', target.module);
    console.log('[CONTINUE] subject:', target.subject);
    console.log('[CONTINUE] chapterSlug:', target.chapterSlug);
    console.log('[CONTINUE] targetRoute:', route);

    return {
      title: target.chapterName || target.chapterSlug,
      moduleLabel: target.module === 'java-dsa' ? 'Java DSA' : (target.module === 'aptitude' ? 'Aptitude' : 'Core CS'),
      subject: target.subject !== 'default' ? target.subject : '',
      route: route
    };
  });

  ngOnInit(): void {
    this.progressService.getProgress().subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Progress load error:', err);
        this.error.set('Unable to load progress.');
        this.isLoading.set(false);
      }
    });
  }
}

