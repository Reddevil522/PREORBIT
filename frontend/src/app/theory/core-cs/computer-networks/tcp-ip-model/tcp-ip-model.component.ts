import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../../core/services/progress.service';

const CHAPTER_SLUG = 'tcp-ip-model';
const PREV_CHAPTER = { title: 'OSI Model', path: '/theory/core-cs/computer-networks/osi-model' };
const NEXT_CHAPTER = { title: 'Network Devices', path: '/theory/core-cs/computer-networks/network-devices' };

@Component({
  selector: 'app-theory-tcp-ip-model',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tcp-ip-model.component.html',
  styleUrl: './tcp-ip-model.component.css'
})
export class TcpIpModelComponent implements OnInit {
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
