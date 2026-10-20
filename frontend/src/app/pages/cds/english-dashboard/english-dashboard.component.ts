// ============================================================
// PREORBIT — CDS English Dashboard Component
// ============================================================
// Main entry point for the CDS English module.
// Displays three primary section cards:
//   1. Grammar (9 chapters)
//   2. Vocabulary (6 chapters, Synonyms & Antonyms combined)
//   3. Reading Comprehension (4 core reading skills, 2 passages/test)
// ============================================================

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  grammarChapters, 
  vocabularyChapters, 
  readingComprehensionChapters 
} from '../../../config/cds-english.config';
import { ProgressService } from '../../../core/services/progress.service';
import { CdsEnglishPracticeService, SectionSummary } from '../../../core/services/cds-english-practice.service';

@Component({
  selector: 'app-english-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './english-dashboard.component.html',
  styleUrl: './english-dashboard.component.css'
})
export class EnglishDashboardComponent implements OnInit {
  private progressService = inject(ProgressService);
  private cdsPracticeService = inject(CdsEnglishPracticeService);

  readonly grammarChapterCount = grammarChapters.length;
  readonly vocabularyChapterCount = vocabularyChapters.length;
  readonly rcChapterCount = readingComprehensionChapters.length;

  // Real progress signals
  grammarTheoryCompleted = signal<number>(0);
  vocabularyTheoryCompleted = signal<number>(0);
  rcTheoryCompleted = signal<number>(0);

  // Section test summaries (available and completed tests)
  grammarSummary = signal<SectionSummary>({ available: 0, completed: 0 });
  vocabularySummary = signal<SectionSummary>({ available: 0, completed: 0 });
  rcSummary = signal<SectionSummary>({ available: 0, completed: 0 });

  ngOnInit(): void {
    this.loadProgress();
    this.loadSummaries();
  }

  private loadProgress(): void {
    this.progressService.getProgress().subscribe({
      next: (res) => {
        if (!res?.data?.chapters) return;
        const completedSlugs = new Set(
          res.data.chapters
            .filter((c: any) => c.theoryCompleted)
            .map((c: any) => (c.chapterSlug || '').toLowerCase())
        );

        let gCount = 0;
        for (const ch of grammarChapters) {
          if (completedSlugs.has(ch.slug.toLowerCase())) gCount++;
        }
        this.grammarTheoryCompleted.set(gCount);

        let vCount = 0;
        for (const ch of vocabularyChapters) {
          if (completedSlugs.has(ch.slug.toLowerCase())) vCount++;
        }
        this.vocabularyTheoryCompleted.set(vCount);

        let rcCount = 0;
        for (const ch of readingComprehensionChapters) {
          if (completedSlugs.has(ch.slug.toLowerCase())) rcCount++;
        }
        this.rcTheoryCompleted.set(rcCount);
      },
      error: () => {
        // Leave defaults at 0 — no fake progress
        this.grammarTheoryCompleted.set(0);
        this.vocabularyTheoryCompleted.set(0);
        this.rcTheoryCompleted.set(0);
      }
    });
  }

  private loadSummaries(): void {
    this.cdsPracticeService.getSectionSummary('grammar').subscribe(s => this.grammarSummary.set(s));
    this.cdsPracticeService.getSectionSummary('vocabulary').subscribe(s => this.vocabularySummary.set(s));
    this.cdsPracticeService.getSectionSummary('reading-comprehension').subscribe(s => this.rcSummary.set(s));
  }
}
