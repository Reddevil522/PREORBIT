import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { javaDsaChapters, javaDsaTests } from '../../../config/java-dsa.config';
import { TestEngineService } from '../../../core/services/test-engine.service';

@Component({
  selector: 'app-java-dsa',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './java-dsa.component.html',
  styleUrl: './java-dsa.component.css'
})
export class JavaDsaComponent implements OnInit {
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
    let completed = 0;
    for (const chapter of javaDsaChapters) {
      if (localStorage.getItem(`completed_theory_${chapter.slug}`) === 'true') {
        completed++;
      }
    }
    this.completedTheoryCount.set(completed);
  }
}

