import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../core/services/progress.service';

const CHAPTER_SLUG = 'trees';
const PREV_CHAPTER = { title: 'Sorting', path: '/theory/java-dsa/sorting' };
const NEXT_CHAPTER = { title: 'BST', path: '/theory/java-dsa/bst' };

@Component({
  selector: 'app-theory-trees',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trees.component.html',
  styleUrl: './trees.component.css'
})
export class TreesComponent implements OnInit {
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
