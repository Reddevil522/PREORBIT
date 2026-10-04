import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../../core/services/progress.service';

const CHAPTER_SLUG = 'introduction-to-oop';
const PREV_CHAPTER: any = null;
const NEXT_CHAPTER = { title: 'Classes and Objects', path: '/theory/core-cs/oop/classes-and-objects' };

@Component({
  selector: 'app-theory-introduction-to-oop',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './introduction-to-oop.component.html',
  styleUrl: './introduction-to-oop.component.css'
})
export class IntroductionToOopComponent implements OnInit {
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
      error: (err) => console.error('Failed to mark theory completed:', err)
    });
  }
}
