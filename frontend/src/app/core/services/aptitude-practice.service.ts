import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { TestMetadata } from '../models/test.model';
import { quantitativeChapters, logicalReasoningChapters, AptitudeChapter } from '../../config/aptitude.config';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AptitudePracticeService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieves the list of chapters for a given aptitude subject.
   */
  getPracticeChapters(subject: 'quantitative' | 'logical-reasoning'): Observable<AptitudeChapter[]> {
    if (subject === 'quantitative') {
      return of(quantitativeChapters);
    } else if (subject === 'logical-reasoning') {
      return of(logicalReasoningChapters);
    }
    return of([]);
  }

  /**
   * Retrieves the list of tests for a given chapter.
   */
  getChapterTests(subject: 'quantitative' | 'logical-reasoning', chapterSlug: string): Observable<TestMetadata[]> {
    return this.http.get<{success: boolean, data: any}>( 
      `${environment.apiUrl}/tests?module=aptitude&subject=${subject}`
    ).pipe(
      map(response => {
        const rawData = Array.isArray(response?.data) ? response.data : (response?.data?.tests || []);
        const dbTests = rawData.filter((t: any) => t.chapterSlug && t.chapterSlug.toLowerCase() === chapterSlug.toLowerCase());
        const tests: TestMetadata[] = [];
        let maxTestNumber = 0;
        
        // 1. Add ALL tests that exist in the database for this chapter
        dbTests.forEach((dbTest: any) => {
          let tNum = dbTest.testNumber;
          // If the DB doesn't have a testNumber, try to extract it from the name
          if (tNum === undefined) {
             const extracted = parseInt(dbTest.testName.replace(/[^0-9]/g, ''));
             tNum = !isNaN(extracted) ? extracted : 1; // fallback to 1 if no number
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

          tests.push({
            id: dbTest.testId,
            section: 'aptitude',
            subject: subject,
            chapterSlug: chapterSlug,
            testNumber: tNum,
            title: dbTest.testName,
            totalQuestions: dbTest.questionCount || 15,
            multipleChoiceCount: dbTest.multipleChoiceCount || 0,
            mcqCount: dbTest.mcqCount || 15,
            totalMarks: dbTest.totalMarks || 15,
            status: calculatedStatus
          });
        });
        
        // Sort the database tests by their testNumber
        tests.sort((a, b) => (a.testNumber || 0) - (b.testNumber || 0));

        // Removed hardcoded minimum tests padding logic
        
        return tests;
      }),
      catchError(() => of([] as TestMetadata[]))
    );
  }

  /**
   * Retrieves a single test by its ID.
   */
  getTest(testId: string): Observable<TestMetadata | null> {
    // Mock implementation for future use
    return of(null);
  }
}
