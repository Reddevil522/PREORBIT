import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../../core/services/progress.service';

const CHAPTER_SLUG = 'interfaces';
const PREV_CHAPTER = { title: 'Encapsulation', path: '/theory/core-cs/oop/encapsulation' };
const NEXT_CHAPTER = { title: 'Exception Handling', path: '/theory/core-cs/oop/exception-handling' };

@Component({
  selector: 'app-theory-interfaces',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './interfaces.component.html',
  styleUrl: './interfaces.component.css'
})
export class InterfacesComponent implements OnInit {
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
