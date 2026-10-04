import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../../core/services/progress.service';

const CHAPTER_SLUG = 'percentage';
const PREV_CHAPTER: any = null;
const NEXT_CHAPTER = { title: 'Profit & Loss', path: '/theory/aptitude/quantitative/profit-loss' };

@Component({
  selector: 'app-theory-percentage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './percentage.component.html',
  styleUrl: './percentage.component.css'
})
export class PercentageComponent implements OnInit {
  private progressService = inject(ProgressService);

  isCompleted = signal<boolean>(false);
  prevChapter: any = PREV_CHAPTER;
  nextChapter: any = NEXT_CHAPTER;

  ngOnInit(): void {
    this.progressService.getProgress().subscribe({
      next: () => {
        const data = this.progressService.progressData();
        if (!data) { this.isCompleted.set(false); return; }
        const ch = data.chapters.find((c: any) => c.chapterSlug === CHAPTER_SLUG);
        this.isCompleted.set(!!(ch && ch.theoryCompleted));
      },
      error: () => this.isCompleted.set(false)
    });
  }

  markCompleted(): void {
    if (this.isCompleted()) return;
    this.progressService.markTheoryCompleted(CHAPTER_SLUG).subscribe({
      next: () => this.isCompleted.set(true),
      error: (err: any) => console.error('Failed to mark theory completed:', err)
    });
  }
}
