import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { javaDsaChapters, javaDsaTests } from '../../../config/java-dsa.config';
import { TestEngineService } from '../../../core/services/test-engine.service';
import { ProgressService } from '../../../core/services/progress.service';

@Component({
  selector: 'app-java-dsa',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './java-dsa.component.html',
  styleUrl: './java-dsa.component.css'
})
export class JavaDsaComponent implements OnInit {
  private progressService = inject(ProgressService);

  totalChapters = javaDsaChapters.length;
  
  completedTheoryCount = signal<number>(0);
  
  availableTestsCount = signal<number | null>(null);
  
  completedTestsCount = signal<number | null>(null);

  constructor(private testEngineService: TestEngineService) {}

  ngOnInit() {
    this.calculateTheoryProgress();
    this.testEngineService.getTestSummary('java-dsa').subscribe({
      next: (summary: any) => {
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
        for (const chapter of javaDsaChapters) {
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
