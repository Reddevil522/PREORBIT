import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PracticeTest {
  _id: string;
  testId: string;
  testName: string;
  module: string;
  subject?: string;
  section?: string;
  chapterSlug: string;
  chapterName?: string;
  testNumber?: number;
  questionCount: number;
  multipleChoiceCount: number;
  mcqCount: number;
  totalMarks: number;
  status: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  configuration?: any;
}

export interface AdminTestResponse {
  success: boolean;
  message: string;
  data: {
    tests: PracticeTest[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface AdminTestDetailsResponse {
  success: boolean;
  message: string;
  data: {
    test: PracticeTest;
    questions: any[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminTestService {
  private apiUrl = `${environment.apiUrl}/admin/tests`;

  // ── Dual-layer cache ───────────────────────────────────────────
  // Layer 1 (in-memory): lives for the app session — instant on route change.
  // Layer 2 (sessionStorage): survives Ctrl+R within the same tab — instant on hard refresh.
  private cachedTests: PracticeTest[] | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
  private readonly SS_KEY = 'preorbit_admin_tests_v2';

  // ── User intent overrides ──────────────────────────────────────
  // Stores fields explicitly changed by the admin (enable/disable).
  // Applied unconditionally on every render — no timing-sensitive comparison.
  // Survives route navigations (service is singleton). Cleared on logout / clearCache.
  private userOverrides = new Map<string, Partial<PracticeTest>>();

  constructor(private http: HttpClient) {}

  getCachedTests(): PracticeTest[] | null {
    // Layer 1: in-memory (lives for the app session — instant on route change)
    if (this.cachedTests !== null && Date.now() - this.cacheTimestamp < this.CACHE_TTL_MS) {
      return this.cachedTests;
    }
    return null;
  }

  /** Writes to in-memory cache. */
  setCachedTests(tests: PracticeTest[]): void {
    this.cachedTests = tests;
    this.cacheTimestamp = Date.now();
  }

  /** Updates a single test in both cache layers AND records a user intent override. */
  patchCachedTest(id: string, patch: Partial<PracticeTest>): void {
    // Record user intent — applied by applyOverrides() on every subsequent render
    this.userOverrides.set(id, { ...this.userOverrides.get(id), ...patch });

    if (this.cachedTests) {
      const idx = this.cachedTests.findIndex(t => t._id === id);
      if (idx !== -1) {
        this.cachedTests[idx] = { ...this.cachedTests[idx], ...patch };
      }
    }
  }

  /** Removes a test from both cache layers AND clears its override. */
  removeCachedTest(id: string): void {
    this.userOverrides.delete(id);
    if (this.cachedTests) {
      this.cachedTests = this.cachedTests.filter(t => t._id !== id);
    }
  }

  /** Clears cache AND user overrides (e.g. on logout). */
  clearCache(): void {
    this.cachedTests = null;
    this.cacheTimestamp = 0;
    this.userOverrides.clear();
  }

  /**
   * Applies any pending user intent overrides onto a test array.
   * Call this after every data load (cache read, background refresh response)
   * to guarantee user's enable/disable actions are never silently reverted.
   *
   * Returns the same array reference if there are no overrides (zero-cost).
   */
  applyOverrides(tests: PracticeTest[]): PracticeTest[] {
    if (this.userOverrides.size === 0) return tests;
    return tests.map(t => {
      const override = this.userOverrides.get(t._id);
      return override ? { ...t, ...override } : t;
    });
  }

  getTests(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    module: string = '',
    subject: string = '',
    status: string = '',
    sort: string = 'newest'
  ): Observable<AdminTestResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort)
      .set('_t', Date.now().toString()); // Cache-busting parameter

    if (search) params = params.set('search', search);
    if (module) params = params.set('module', module);
    if (subject) params = params.set('subject', subject);
    if (status) params = params.set('status', status);

    return this.http.get<AdminTestResponse>(this.apiUrl, { params });
  }

  getTestDetails(id: string): Observable<AdminTestDetailsResponse> {
    return this.http.get<AdminTestDetailsResponse>(`${this.apiUrl}/${id}`);
  }

  deleteTest(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateTestAvailability(id: string, isAvailable: boolean): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/availability`, { isAvailable });
  }
}
