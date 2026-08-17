import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

export interface ProgressData {
  overall: {
    progress: number;
    completedUnits: number;
    totalUnits: number;
    testsAttempted: number;
    testsCompleted: number;
    bestScore: number;
    bestScorePercentage: number;
    latestScore: number;
    latestScorePercentage: number;
    averageScore: number;
    averageScorePercentage: number;
    accuracy: number;
    timeSpentMs: number;
    theoryCompletedCount: number;
  };
  modules: any[];
  subjects: any[];
  chapters: any[];
  tests: any[];
  recentTests?: any[];
}

export interface ProgressResponse {
  success: boolean;
  data: ProgressData;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/progress`;

  // Centralized reactive state for progress data
  progressData = signal<ProgressData | null>(null);

  // Fetch progress and update the signal
  getProgress(): Observable<ProgressResponse> {
    return this.http.get<ProgressResponse>(this.apiUrl).pipe(
      tap(res => {
        if (res.success) {
          this.progressData.set(res.data);
        }
      })
    );
  }

  // Helper to invalidate and refresh state in the background.
  // Never retries automatically — callers are responsible for retry logic.
  refreshProgress(): void {
    this.getProgress().subscribe({
      error: (err) => {
        // status 0 = network/CORS error (backend offline); log minimally and continue
        // status 4xx/5xx = genuine server error; log with status for debugging
        if (err?.status > 0) {
          console.error(`[ProgressService] refreshProgress failed — HTTP ${err.status}`, err.message);
        } else {
          console.warn('[ProgressService] refreshProgress — backend unreachable (ERR_CONNECTION_REFUSED or CORS)');
        }
      }
    });
  }

  markTheoryCompleted(chapterSlug: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/theory/${chapterSlug}`, {}).pipe(
      tap(() => this.refreshProgress())
    );
  }
}

