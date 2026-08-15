import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { dbmsChapters, dbmsTests } from '../../../config/core-cs.config';
import { TestEngineService } from '../../../core/services/test-engine.service';

@Component({
  selector: 'app-dbms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dbms.component.html',
  styleUrl: './dbms.component.css'
})
export class DbmsComponent implements OnInit {
  totalChapters = dbmsChapters.length;

  completedTheoryCount = signal<number>(0);

  availableTestsCount = signal<number | null>(null);

  completedTestsCount = signal<number | null>(null);

  constructor(private testEngineService: TestEngineService) {}

  ngOnInit() {
    this.calculateTheoryProgress();
    this.testEngineService.getTestSummary('core-cs', 'dbms').subscribe({
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
    let completed = 0;
    for (const chapter of dbmsChapters) {
      if (localStorage.getItem(`completed_theory_${chapter.slug}`) === 'true') {
        completed++;
      }
    }
    this.completedTheoryCount.set(completed);
  }
}

