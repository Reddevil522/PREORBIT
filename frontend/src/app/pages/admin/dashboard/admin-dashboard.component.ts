import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { coreCsSubjects } from '../../../config/core-cs.config';
import { quantitativeChapters, logicalReasoningChapters } from '../../../config/aptitude.config';
import { javaDsaChapters } from '../../../config/java-dsa.config';

interface DashboardStats {
  totalModules?: number;
  totalSubjects?: number;
  totalChapters?: number;
  totalTests: number;
  testsWithQuestions: number;
  testsWithoutQuestions: number;
  totalQuestions: number;
  recentUploads: any[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  
  stats = signal<DashboardStats | null>(null);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<any>(`${environment.apiUrl}/admin/dashboard`).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.stats.set(res.data);
        } else {
          this.error.set('Failed to load dashboard statistics.');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Admin Dashboard API Error', err);
        this.error.set('Failed to connect to the server.');
        this.isLoading.set(false);
      }
    });
  }
}
