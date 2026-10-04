import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../core/services/progress.service';

const CHAPTER_SLUG = 'bst';
const PREV_CHAPTER = { title: 'Trees', path: '/theory/java-dsa/trees' };
const NEXT_CHAPTER = { title: 'Heap', path: '/theory/java-dsa/heap' };

@Component({
  selector: 'app-theory-bst',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bst.component.html',
  styleUrl: './bst.component.css'
})
export class BstComponent implements OnInit {
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
