import { Component, computed, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AptitudeChapter } from '../../../config/aptitude.config';
import { TestMetadata } from '../../../core/models/test.model';
import { AptitudePracticeService } from '../../../core/services/aptitude-practice.service';
import { TestCardComponent } from '../../../shared/components/test-card/test-card.component';
import { ProgressService } from '../../../core/services/progress.service';
import { forkJoin, map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-aptitude-practice',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TestCardComponent],
  templateUrl: './aptitude-practice.component.html',
  styleUrl: './aptitude-practice.component.css'
})
export class AptitudePracticeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private practiceService = inject(AptitudePracticeService);
  private progressService = inject(ProgressService);

  subject = signal<string>('');
  title = signal<string>('');
  chapters = signal<AptitudeChapter[]>([]);
  allTests = signal<TestMetadata[]>([]);
  searchQuery = signal<string>('');
  apiError = signal<boolean>(false);
  isLoadingTests = signal<boolean>(false);

  progressData = this.progressService.progressData;

  ngOnInit() {
    // Load progress data; handle network errors gracefully
    this.progressService.getProgress().subscribe({
      error: () => { /* Progress load failed — handled by progressData signal staying null */ }
    });

    this.route.paramMap.subscribe(params => {
      const subjectParam = params.get('subject') as 'quantitative' | 'logical-reasoning';
      if (!subjectParam) return;

      this.subject.set(subjectParam);
      this.apiError.set(false);

      if (subjectParam === 'quantitative') {
        this.title.set('Quantitative Aptitude Practice');
      } else if (subjectParam === 'logical-reasoning') {
        this.title.set('Logical Reasoning Practice');
      }

      this.practiceService.getPracticeChapters(subjectParam).subscribe(chapters => {
        this.chapters.set(chapters);

        if (chapters.length === 0) {
          this.allTests.set([]);
          return;
        }

        // Fetch tests for all chapters. Use catchError per-chapter so one failure
        // doesn't abort the entire forkJoin — return empty array as fallback.
        this.isLoadingTests.set(true);
        const testsObservables = chapters.map(ch =>
          this.practiceService.getChapterTests(subjectParam, ch.slug).pipe(
            catchError(() => of([] as TestMetadata[]))
          )
        );

        forkJoin(testsObservables).pipe(
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
    const query = this.searchQuery().toLowerCase().trim();
    const all = this.chapters();
    if (!query) return all;
    
    return all.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.description.toLowerCase().includes(query)
    );
  });

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

  getChapterProgress(chapterSlug: string) {
    const data = this.progressData();
    const fallback = { theoryCompleted: false, tests: { completed: 0, total: 0, available: 0, locked: 0 }, progress: 0, status: 'NOT_STARTED' };
    if (!data) return fallback;
    const found = data.chapters.find((c: any) => c.chapterSlug === chapterSlug);
    return found || fallback;
  }
}
