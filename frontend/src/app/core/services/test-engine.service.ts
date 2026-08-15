import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API_BASE = environment.apiUrl;

export interface TestOption {
  key: string;
  text: string;
}

export interface SanitizedQuestion {
  _id: string;
  question: string;
  options: TestOption[];
  questionType: 'mcq' | 'multiple-choice';
  marks: number;
  // Note: correctAnswer and explanation are omitted for security
}

export interface TestMetadata {
  testId: string;
  testName: string;
  module: string;
  subject?: string;
  section?: string;
  chapterSlug?: string;
  chapterName?: string;
  questionCount: number;
  totalMarks: number;
}

export interface StartTestResponse {
  success: boolean;
  message: string;
  data: {
    attemptId: string;
    status: string; // 'in-progress' or 'submitted'
    startedAt: string;
    answers?: Record<string, any>;
    test: TestMetadata;
    questions: SanitizedQuestion[];
    result?: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TestEngineService {
  constructor(private http: HttpClient) {}

  startTest(testId: string): Observable<StartTestResponse> {
    return this.http.post<StartTestResponse>(`${API_BASE}/tests/${testId}/start`, {});
  }

  resumeTest(testId: string): Observable<StartTestResponse> {
    return this.http.get<StartTestResponse>(`${API_BASE}/tests/${testId}/resume`);
  }

  getTestMetadata(testId: string): Observable<{ success: boolean, data: { test: TestMetadata } }> {
    return this.http.get<{ success: boolean, data: { test: TestMetadata } }>(`${API_BASE}/tests/${testId}/metadata`);
  }

  getTestSummary(module: string, subject?: string): Observable<{available: number, completed: number}> {
    let url = `${API_BASE}/tests/summary?module=${encodeURIComponent(module)}`;
    if (subject) {
      url += `&subject=${encodeURIComponent(subject)}`;
    }
    return this.http.get<{success: boolean, data: {available: number, completed: number}}>(url)
      .pipe(map(res => res.data));
  }

  saveAnswer(testId: string, attemptId: string, questionId: string, selectedAnswer: any): Observable<any> {
    return this.http.put<any>(`${API_BASE}/tests/${testId}/attempts/${attemptId}/save-answer`, { questionId, selectedAnswer });
  }

  submitTest(testId: string, payload: { attemptId: string, answers: any[] }): Observable<any> {
    return this.http.post<any>(`${API_BASE}/tests/${testId}/submit`, payload);
  }

  retakeTest(testId: string): Observable<StartTestResponse> {
    return this.http.post<StartTestResponse>(`${API_BASE}/tests/${testId}/retake`, {});
  }

  getTestResult(attemptId: string): Observable<any> {
    return this.http.get<any>(`${API_BASE}/tests/attempts/${attemptId}/result`);
  }
}
