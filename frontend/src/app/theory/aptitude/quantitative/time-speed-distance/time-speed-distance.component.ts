import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../../core/services/progress.service';

const CHAPTER_SLUG = 'time-speed-distance';
const PREV_CHAPTER = { title: 'Time & Work', path: '/theory/aptitude/quantitative/time-work' };
const NEXT_CHAPTER = { title: 'Simple Interest', path: '/theory/aptitude/quantitative/simple-interest' };

@Component({
  selector: 'app-theory-time-speed-distance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './time-speed-distance.component.html',
  styleUrl: './time-speed-distance.component.css'
})
export class TimeSpeedDistanceComponent implements OnInit {
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
