import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TestMetadata } from '../../../core/models/test.model';

@Component({
  selector: 'app-test-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.css'
})
export class TestCardComponent {
  @Input({ required: true }) test!: TestMetadata;
  @Input({ required: true }) routePrefix!: string;

  get isReady(): boolean {
    return this.test.status === 'available' || this.test.status === 'completed';
  }

  get route(): string[] | null {
    if (!this.isReady) return null;
    // Always navigate to the Test Engine for available tests
    return ['/test', this.test.id];
  }

  onCardClick(): void {
    console.log('[START-TEST] Clicked');
    console.log('[START-TEST] testId:', this.test.id);
  }
}
