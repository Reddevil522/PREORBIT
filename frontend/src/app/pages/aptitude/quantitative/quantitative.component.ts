import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { quantitativeChapters, quantitativeTests } from '../../../config/aptitude.config';
import { TestEngineService } from '../../../core/services/test-engine.service';

@Component({
  selector: 'app-quantitative',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quantitative.component.html',
  styleUrl: './quantitative.component.css'
})
export class QuantitativeComponent implements OnInit {
  totalChapters = quantitativeChapters.length;

  completedTheoryCount = signal<number>(0);

  availableTestsCount = signal<number | null>(null);

  completedTestsCount = signal<number | null>(null);

  constructor(private testEngineService: TestEngineService) {}

  ngOnInit() {
    this.calculateTheoryProgress();
    this.testEngineService.getTestSummary('aptitude', 'quantitative').subscribe({
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
    let completed = 0;
    for (const chapter of quantitativeChapters) {
      if (localStorage.getItem(`completed_theory_${chapter.slug}`) === 'true') {
        completed++;
      }
    }
    this.completedTheoryCount.set(completed);
  }
}

