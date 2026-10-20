// ============================================================
// PREORBIT — CDS English Practice Service
// ============================================================
// Provides strongly typed API access for CDS English tests,
// chapter configurations, and section summaries.
// ============================================================

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { TestMetadata } from '../models/test.model';
import { 
  CdsChapter, 
  getCdsChaptersBySection,
  grammarChapters, 
  vocabularyChapters, 
  readingComprehensionChapters 
} from '../../config/cds-english.config';
import { environment } from '../../../environments/environment';

export interface SectionSummary {
  available: number;
  completed: number;
}

@Injectable({
  providedIn: 'root'
})
export class CdsEnglishPracticeService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /**
   * Retrieves chapter configurations for a specific CDS English section.
   */
  getSectionChapters(section: 'grammar' | 'vocabulary' | 'reading-comprehension'): Observable<CdsChapter[]> {
    return of(getCdsChaptersBySection(section));
  }

  /**
   * Retrieves tests for a specific chapter within a section.
   */
  getChapterTests(section: string, chapterSlug: string): Observable<TestMetadata[]> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.apiUrl}/tests?module=cds&subject=${encodeURIComponent(section)}`
    ).pipe(
      map(response => {
        const rawData = Array.isArray(response?.data) 
          ? response.data 
          : (response?.data?.tests || []);
        
        const dbTests = rawData.filter((t: any) => 
          t.chapterSlug && t.chapterSlug.toLowerCase() === chapterSlug.toLowerCase()
        );

        const tests: TestMetadata[] = [];
        let maxTestNumber = 0;

        dbTests.forEach((dbTest: any) => {
          let tNum = dbTest.testNumber;
          if (tNum === undefined) {
            const extracted = parseInt(dbTest.testName?.replace(/[^0-9]/g, '') || '');
            tNum = !isNaN(extracted) ? extracted : 1;
          }
          if (tNum > maxTestNumber) maxTestNumber = tNum;

          let calculatedStatus: 'not-available' | 'available' | 'completed' | 'locked' = 'locked';
          if (dbTest.isCompleted) {
            calculatedStatus = 'completed';
          } else if (dbTest.isLocked) {
            calculatedStatus = 'locked';
          } else {
            calculatedStatus = 'available';
          }

          const expectedQuestionCount = (section === 'reading-comprehension') ? 10 : 20;

          tests.push({
            id: dbTest.testId,
            section: 'cds',
            subject: section,
            chapterSlug: chapterSlug,
            testNumber: tNum,
            title: dbTest.testName || `Test ${tNum}`,
            totalQuestions: dbTest.questionCount || expectedQuestionCount,
            multipleChoiceCount: 0,
            mcqCount: dbTest.questionCount || expectedQuestionCount,
            totalMarks: dbTest.totalMarks || expectedQuestionCount,
            status: calculatedStatus
          });
        });

        // Sort sequentially by test number
        tests.sort((a, b) => (a.testNumber || 0) - (b.testNumber || 0));

        return tests;
      }),
      catchError(() => of([] as TestMetadata[]))
    );
  }

  /**
   * Retrieves available and completed test counters for a section.
   */
  getSectionSummary(section: string): Observable<SectionSummary> {
    const url = `${this.apiUrl}/tests/summary?module=cds&subject=${encodeURIComponent(section)}`;
    return this.http.get<{ success: boolean; data: SectionSummary }>(url).pipe(
      map(res => res?.data || { available: 0, completed: 0 }),
      catchError(() => of({ available: 0, completed: 0 }))
    );
  }

  /**
   * Helper to look up a single chapter by section and slug.
   */
  getChapterBySlug(section: 'grammar' | 'vocabulary' | 'reading-comprehension', slug: string): CdsChapter | undefined {
    const chapters = getCdsChaptersBySection(section);
    return chapters.find(c => c.slug.toLowerCase() === slug.toLowerCase());
  }
}
