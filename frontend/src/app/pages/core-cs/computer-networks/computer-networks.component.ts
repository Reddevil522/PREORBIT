import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cnChapters, cnTests } from '../../../config/core-cs.config';
import { TestEngineService } from '../../../core/services/test-engine.service';

@Component({
  selector: 'app-computer-networks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './computer-networks.component.html',
  styleUrl: './computer-networks.component.css'
})
export class ComputerNetworksComponent implements OnInit {
  totalChapters = cnChapters.length;

  completedTheoryCount = signal<number>(0);

  availableTestsCount = signal<number | null>(null);

  completedTestsCount = signal<number | null>(null);

  constructor(private testEngineService: TestEngineService) {}

  ngOnInit() {
    this.calculateTheoryProgress();
    this.testEngineService.getTestSummary('core-cs', 'computer-networks').subscribe({
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
    for (const chapter of cnChapters) {
      if (localStorage.getItem(`completed_theory_${chapter.slug}`) === 'true') {
        completed++;
      }
    }
    this.completedTheoryCount.set(completed);
  }
}

