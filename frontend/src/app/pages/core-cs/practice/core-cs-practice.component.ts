import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { coreCsSubjects, CoreCsSubject, CoreCsChapter } from '../../../config/core-cs.config';
import { CoreCsPracticeService } from '../../../core/services/core-cs-practice.service';
import { ProgressService } from '../../../core/services/progress.service';
import { TestCardComponent } from '../../../shared/components/test-card/test-card.component';
import { TestMetadata } from '../../../core/models/test.model';

@Component({
  selector: 'app-core-cs-practice',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TestCardComponent],
  templateUrl: './core-cs-practice.component.html',
  styleUrl: './core-cs-practice.component.css'
})
export class CoreCsPracticeComponent implements OnInit {
  subject = signal<CoreCsSubject | null>(null);
  searchQuery = signal('');
  testsMap = signal<{ [chapterSlug: string]: TestMetadata[] }>({});
  loadingMap = signal<{ [chapterSlug: string]: boolean }>({});
  errorMap = signal<{ [chapterSlug: string]: boolean }>({});
  
  progressData: any;

  retryChapter(subjectSlug: string, chapter: CoreCsChapter) {
    const lMap = { ...this.loadingMap() };
    const eMap = { ...this.errorMap() };
    lMap[chapter.slug] = true;
    eMap[chapter.slug] = false;
    this.loadingMap.set(lMap);
    this.errorMap.set(eMap);
    this.practiceService.getChapterTests(subjectSlug, chapter.slug).subscribe({
      next: (tests) => {
        const tMap = { ...this.testsMap() };
        tMap[chapter.slug] = tests;
        this.testsMap.set(tMap);
        const newLMap = { ...this.loadingMap() };
        newLMap[chapter.slug] = false;
        this.loadingMap.set(newLMap);
      },
      error: (err) => {
        console.error(err);
        const newEMap = { ...this.errorMap() };
        newEMap[chapter.slug] = true;
        this.errorMap.set(newEMap);
        const newLMap = { ...this.loadingMap() };
        newLMap[chapter.slug] = false;
        this.loadingMap.set(newLMap);
      }
    });
  }
  filteredChapters = computed(() => {
    const currentSubject = this.subject();
    if (!currentSubject) return [];
    
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return currentSubject.chapters;
    
    return currentSubject.chapters.filter(chapter => 
      chapter.title.toLowerCase().includes(query) || 
      chapter.description.toLowerCase().includes(query)
    );
  });

  constructor(
    private route: ActivatedRoute,
    private practiceService: CoreCsPracticeService,
    private progressService: ProgressService
  ) {
    this.progressData = this.progressService.progressData;
  }

  ngOnInit() {
    // Ensure we fetch progress if not already fetched
    this.progressService.getProgress().subscribe();

    this.route.paramMap.subscribe(params => {
      const subjectSlug = params.get('subject');
      if (subjectSlug) {
        const found = coreCsSubjects.find(s => s.slug === subjectSlug);
        if (found) {
          this.subject.set(found);
          this.loadTestsForChapters(found.slug, found.chapters);
        } else {
          this.subject.set(null);
        }
      }
    });
  }

  private loadTestsForChapters(subjectSlug: string, chapters: CoreCsChapter[]) {
    const tMap: { [chapterSlug: string]: TestMetadata[] } = {};
    const lMap: { [chapterSlug: string]: boolean } = {};
    const eMap: { [chapterSlug: string]: boolean } = {};
    
    chapters.forEach(chapter => {
      lMap[chapter.slug] = true;
      eMap[chapter.slug] = false;
    });
    this.loadingMap.set({ ...lMap });
    this.errorMap.set({ ...eMap });

    chapters.forEach(chapter => {
      this.practiceService.getChapterTests(subjectSlug, chapter.slug).subscribe({
        next: (tests) => {
          tMap[chapter.slug] = tests;
          this.testsMap.set({ ...tMap });
          lMap[chapter.slug] = false;
          this.loadingMap.set({ ...lMap });
        },
        error: (err) => {
          console.error(err);
          eMap[chapter.slug] = true;
          this.errorMap.set({ ...eMap });
          lMap[chapter.slug] = false;
          this.loadingMap.set({ ...lMap });
        }
      });
    });
  }

  getTestsForChapter(chapterSlug: string): TestMetadata[] {
    return this.testsMap()[chapterSlug] || [];
  }

  getChapterProgress(chapterSlug: string) {
    const data = this.progressData();
    const fallback = { theoryCompleted: false, tests: { completed: 0, total: 0, available: 0, locked: 0 }, progress: 0, status: 'NOT_STARTED' };
    if (!data) return fallback;
    const found = data.chapters.find((c: any) => c.chapterSlug === chapterSlug);
    return found || fallback;
  }
}
