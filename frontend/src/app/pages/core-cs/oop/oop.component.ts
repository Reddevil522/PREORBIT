import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { oopChapters } from '../../../config/core-cs.config';
import { TestEngineService } from '../../../core/services/test-engine.service';
import { ProgressService } from '../../../core/services/progress.service';

@Component({
  selector: 'app-oop',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './oop.component.html',
  styleUrl: './oop.component.css'
})
export class OopComponent implements OnInit {
  private progressService = inject(ProgressService);

  totalChapters = oopChapters.length;

  completedTheoryCount = signal<number>(0);

  availableTestsCount = signal<number | null>(null);
  completedTestsCount = signal<number | null>(null);

  constructor(private testEngineService: TestEngineService) {}

  ngOnInit() {
    this.calculateTheoryProgress();
    this.testEngineService.getTestSummary('core-cs', 'oop').subscribe({
      next: (summary) => {
        this.availableTestsCount.set(summary.available);
        this.completedTestsCount.set(summary.completed);
      },
      error: () => {
        this.availableTestsCount.set(null);
        this.completedTestsCount.set(null);
      }
    });
  }

  calculateTheoryProgress() {
    this.progressService.getProgress().subscribe({
      next: (res) => {
        const completedSlugs = new Set(
          res.data.chapters.filter((c: any) => c.theoryCompleted).map((c: any) => c.chapterSlug)
        );
        let completed = 0;
        for (const chapter of oopChapters) {
          if (completedSlugs.has(chapter.slug)) {
            completed++;
          }
        }
        this.completedTheoryCount.set(completed);
      },
      error: () => this.completedTheoryCount.set(0)
    });
  }
}
