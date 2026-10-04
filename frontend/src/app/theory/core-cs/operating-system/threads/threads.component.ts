import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../../core/services/progress.service';

const CHAPTER_SLUG = 'threads';
const PREV_CHAPTER = { title: 'Process Management', path: '/theory/core-cs/operating-system/process-management' };
const NEXT_CHAPTER = { title: 'CPU Scheduling', path: '/theory/core-cs/operating-system/cpu-scheduling' };

@Component({
  selector: 'app-theory-threads',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './threads.component.html',
  styleUrl: './threads.component.css'
})
export class ThreadsComponent implements OnInit {
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
