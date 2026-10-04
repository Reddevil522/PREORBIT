import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../../core/services/progress.service';

const CHAPTER_SLUG = 'synchronization';
const PREV_CHAPTER = { title: 'CPU Scheduling', path: '/theory/core-cs/operating-system/cpu-scheduling' };
const NEXT_CHAPTER = { title: 'Deadlocks', path: '/theory/core-cs/operating-system/deadlocks' };

@Component({
  selector: 'app-theory-synchronization',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './synchronization.component.html',
  styleUrl: './synchronization.component.css'
})
export class SynchronizationComponent implements OnInit {
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
