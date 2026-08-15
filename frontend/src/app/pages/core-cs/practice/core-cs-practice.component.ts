import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { coreCsSubjects, CoreCsSubject, CoreCsChapter } from '../../../config/core-cs.config';
import { CoreCsPracticeService } from '../../../core/services/core-cs-practice.service';
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
    private practiceService: CoreCsPracticeService
  ) {}

  ngOnInit() {
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
    const map: { [chapterSlug: string]: TestMetadata[] } = {};
    
    // Simulate parallel loading of tests for all chapters
    chapters.forEach(chapter => {
      this.practiceService.getChapterTests(subjectSlug, chapter.slug).subscribe(tests => {
        map[chapter.slug] = tests;
        this.testsMap.set({ ...map }); // trigger signal update
      });
    });
  }

  getTestsForChapter(chapterSlug: string): TestMetadata[] {
    return this.testsMap()[chapterSlug] || [];
  }
}
