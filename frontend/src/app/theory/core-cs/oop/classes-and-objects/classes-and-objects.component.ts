import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../../core/services/progress.service';

const CHAPTER_SLUG = 'classes-and-objects';
const PREV_CHAPTER = { title: 'Introduction to OOP', path: '/theory/core-cs/oop/introduction-to-oop' };
const NEXT_CHAPTER = { title: 'Constructors', path: '/theory/core-cs/oop/constructors' };

@Component({
  selector: 'app-theory-classes-and-objects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './classes-and-objects.component.html',
  styleUrl: './classes-and-objects.component.css'
})
export class ClassesAndObjectsComponent implements OnInit {
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
