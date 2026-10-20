// ============================================================
// PREORBIT — CDS Reading Comprehension Section Dashboard
// ============================================================

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { readingComprehensionChapters } from '../../../config/cds-english.config';
import { ProgressService } from '../../../core/services/progress.service';
import { CdsEnglishPracticeService } from '../../../core/services/cds-english-practice.service';

@Component({
  selector: 'app-reading-comprehension',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reading-comprehension.component.html',
  styleUrl: './reading-comprehension.component.css'
})
export class ReadingComprehensionComponent implements OnInit {
  private progressService = inject(ProgressService);
  private cdsPracticeService = inject(CdsEnglishPracticeService);

  readonly totalChapters = readingComprehensionChapters.length;
  completedTheoryCount = signal<number>(0);
  availableTestsCount = signal<number>(0);
  completedTestsCount = signal<number>(0);

  ngOnInit(): void {
    this.loadProgress();
    this.cdsPracticeService.getSectionSummary('reading-comprehension').subscribe(s => {
      this.availableTestsCount.set(s.available);
      this.completedTestsCount.set(s.completed);
    });
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

        let completed = 0;
        for (const ch of readingComprehensionChapters) {
          if (completedSlugs.has(ch.slug.toLowerCase())) completed++;
        }
        this.completedTheoryCount.set(completed);
      },
      error: () => this.completedTheoryCount.set(0)
    });
  }
}
