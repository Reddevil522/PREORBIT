import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { TestMetadata } from '../models/test.model';
import { coreCsSubjects, CoreCsSubject } from '../../config/core-cs.config';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreCsPracticeService {
  constructor(private http: HttpClient) {}

  getSubjects(): Observable<CoreCsSubject[]> {
    return of(coreCsSubjects);
  }

  getChapters(subjectSlug: string): Observable<any[]> {
    const subject = coreCsSubjects.find(s => s.slug === subjectSlug);
    return of(subject ? subject.chapters : []);
  }

  getChapterTests(subjectSlug: string, chapterSlug: string): Observable<TestMetadata[]> {
    return this.http.get<{success: boolean, data: any[]}>(
      `${environment.apiUrl}/tests?module=core-cs&subject=${subjectSlug}`
    ).pipe(
      map(response => {
        const dbTests = response.data.filter((t: any) => t.chapterSlug && t.chapterSlug.toLowerCase() === chapterSlug.toLowerCase());
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
            section: 'core-cs',
            subject: subjectSlug,
            chapterSlug: chapterSlug,
            testNumber: tNum,
            title: dbTest.testName,
            totalQuestions: dbTest.questionCount || 25,
            multipleChoiceCount: dbTest.multipleChoiceCount || 5,
            mcqCount: dbTest.mcqCount || 20,
            totalMarks: dbTest.totalMarks || 25,
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

  getTest(subjectSlug: string, chapterSlug: string, testId: string): Observable<TestMetadata | null> {
    return of(null);
  }
}
