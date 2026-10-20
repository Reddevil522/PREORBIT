// ============================================================
// PREORBIT — CDS Section Theory Component
// ============================================================
// Lists chapter theory guides for Grammar, Vocabulary, or
// Reading Comprehension with live completion status.
// ============================================================

import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CdsChapter } from '../../../config/cds-english.config';
import { CdsEnglishPracticeService } from '../../../core/services/cds-english-practice.service';
import { ProgressService } from '../../../core/services/progress.service';

@Component({
  selector: 'app-cds-section-theory',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './section-theory.component.html',
  styleUrl: './section-theory.component.css'
})
export class CdsSectionTheoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cdsPracticeService = inject(CdsEnglishPracticeService);
  private progressService = inject(ProgressService);

  section = signal<'grammar' | 'vocabulary' | 'reading-comprehension'>('grammar');
  title = signal<string>('Theory');
  chapters = signal<CdsChapter[]>([]);
  searchQuery = signal<string>('');
  progressData = this.progressService.progressData;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const sec = (params.get('section') || 'grammar') as 'grammar' | 'vocabulary' | 'reading-comprehension';
      this.section.set(sec);

      switch (sec) {
        case 'grammar':
          this.title.set('Grammar Theory');
          break;
        case 'vocabulary':
          this.title.set('Vocabulary Theory');
          break;
        case 'reading-comprehension':
          this.title.set('Reading Comprehension Skills & Theory');
          break;
      }

      this.cdsPracticeService.getSectionChapters(sec).subscribe(ch => {
        this.chapters.set(ch);
      });
    });

    this.progressService.getProgress().subscribe();
  }

  filteredChapters = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const list = this.chapters();
    if (!q) return list;
    return list.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.description.toLowerCase().includes(q) ||
      (c.subtopics && c.subtopics.some(s => s.toLowerCase().includes(q)))
    );
  });

  getChapterStatus(chapterSlug: string): 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' {
    const data = this.progressData();
    if (!data?.chapters) return 'NOT_STARTED';
    const ch = data.chapters.find((c: any) => (c.chapterSlug || '').toLowerCase() === chapterSlug.toLowerCase());
    if (!ch) return 'NOT_STARTED';
    if (ch.theoryCompleted && (ch.status === 'COMPLETED' || ch.tests?.completed === ch.tests?.total)) {
      return 'COMPLETED';
    }
    if (ch.theoryCompleted || ch.status === 'IN_PROGRESS' || ch.tests?.completed > 0) {
      return 'IN_PROGRESS';
    }
    return 'NOT_STARTED';
  }

  isTheoryCompleted(chapterSlug: string): boolean {
    const data = this.progressData();
    if (!data?.chapters) return false;
    const ch = data.chapters.find((c: any) => (c.chapterSlug || '').toLowerCase() === chapterSlug.toLowerCase());
    return !!(ch && ch.theoryCompleted);
  }
}
