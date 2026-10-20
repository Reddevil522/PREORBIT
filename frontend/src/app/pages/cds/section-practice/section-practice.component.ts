// ============================================================
// PREORBIT — CDS Section Practice / Test Listing Component
// ============================================================
// Lists available tests grouped by chapter for Grammar,
// Vocabulary, or Reading Comprehension.
// Uses shared TestCardComponent for test launch & lock states.
// ============================================================

import { Component, computed, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CdsChapter } from '../../../config/cds-english.config';
import { TestMetadata } from '../../../core/models/test.model';
import { CdsEnglishPracticeService } from '../../../core/services/cds-english-practice.service';
import { TestCardComponent } from '../../../shared/components/test-card/test-card.component';
import { ProgressService } from '../../../core/services/progress.service';
import { forkJoin, map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-cds-section-practice',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TestCardComponent],
  templateUrl: './section-practice.component.html',
  styleUrl: './section-practice.component.css'
})
export class CdsSectionPracticeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cdsPracticeService = inject(CdsEnglishPracticeService);
  private progressService = inject(ProgressService);

  section = signal<'grammar' | 'vocabulary' | 'reading-comprehension'>('grammar');
  title = signal<string>('Practice Tests');
  chapters = signal<CdsChapter[]>([]);
  allTests = signal<TestMetadata[]>([]);
  searchQuery = signal<string>('');
  apiError = signal<boolean>(false);
  isLoadingTests = signal<boolean>(false);

  progressData = this.progressService.progressData;

  ngOnInit(): void {
    this.progressService.getProgress().subscribe({
      error: () => { /* Non-blocking progress sync failure */ }
    });

    this.route.paramMap.subscribe(params => {
      const sec = (params.get('section') || 'grammar') as 'grammar' | 'vocabulary' | 'reading-comprehension';
      this.section.set(sec);
      this.apiError.set(false);

      switch (sec) {
        case 'grammar':
          this.title.set('Grammar Practice Tests');
          break;
        case 'vocabulary':
          this.title.set('Vocabulary Practice Tests');
          break;
        case 'reading-comprehension':
          this.title.set('Reading Comprehension Tests');
          break;
      }

      this.cdsPracticeService.getSectionChapters(sec).subscribe(chaptersList => {
        this.chapters.set(chaptersList);

        if (chaptersList.length === 0) {
          this.allTests.set([]);
          return;
        }

        this.isLoadingTests.set(true);
        const testObservables = chaptersList.map(ch => 
          this.cdsPracticeService.getChapterTests(sec, ch.slug).pipe(
            catchError(() => of([] as TestMetadata[]))
          )
        );

        forkJoin(testObservables).pipe(
          map(results => results.flat())
        ).subscribe({
          next: tests => {
            this.allTests.set(tests);
            this.isLoadingTests.set(false);
          },
          error: () => {
            this.allTests.set([]);
            this.isLoadingTests.set(false);
            this.apiError.set(true);
          }
        });
      });
    });
  }

  filteredChapters = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const list = this.chapters();
    if (!q) return list;
    return list.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });

  testsByChapter = computed(() => {
    const tests = this.allTests();
    const map = new Map<string, TestMetadata[]>();
    for (const test of tests) {
      if (!test.chapterSlug) continue;
      const key = test.chapterSlug.toLowerCase();
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(test);
    }
    return map;
  });

  getTestsForChapter(chapterSlug: string): TestMetadata[] {
    return this.testsByChapter().get(chapterSlug.toLowerCase()) || [];
  }

  retryLoad(): void {
    const sec = this.section();
    this.apiError.set(false);
    this.isLoadingTests.set(true);

    const testObservables = this.chapters().map(ch =>
      this.cdsPracticeService.getChapterTests(sec, ch.slug).pipe(
        catchError(() => of([] as TestMetadata[]))
      )
    );

    forkJoin(testObservables).pipe(
      map(results => results.flat())
    ).subscribe({
      next: tests => {
        this.allTests.set(tests);
        this.isLoadingTests.set(false);
      },
      error: () => {
        this.allTests.set([]);
        this.isLoadingTests.set(false);
        this.apiError.set(true);
      }
    });
  }
}
