import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../../core/services/progress.service';

const CHAPTER_SLUG = 'osi-model';
const PREV_CHAPTER = { title: 'Introduction to Networks', path: '/theory/core-cs/computer-networks/introduction-to-networks' };
const NEXT_CHAPTER = { title: 'TCP/IP Model', path: '/theory/core-cs/computer-networks/tcp-ip-model' };

@Component({
  selector: 'app-theory-osi-model',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './osi-model.component.html',
  styleUrl: './osi-model.component.css'
})
export class OsiModelComponent implements OnInit {
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
