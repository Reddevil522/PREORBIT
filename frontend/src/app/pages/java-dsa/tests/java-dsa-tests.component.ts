import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { javaDsaChapters, javaDsaTests, JavaDsaChapter } from '../../../config/java-dsa.config';
import { TestMetadata } from '../../../core/models/test.model';
import { TestCardComponent } from '../../../shared/components/test-card/test-card.component';
import { environment } from '../../../../environments/environment';
import { ProgressService } from '../../../core/services/progress.service';

@Component({
  selector: 'app-java-dsa-tests',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TestCardComponent],
  templateUrl: './java-dsa-tests.component.html',
  styleUrl: './java-dsa-tests.component.css'
})
export class JavaDsaTestsComponent implements OnInit {
  chapters = signal<JavaDsaChapter[]>(javaDsaChapters);
  allTests = signal<TestMetadata[]>(javaDsaTests);
  searchQuery = signal<string>('');

  private progressService = inject(ProgressService);
  progressData = this.progressService.progressData;

  filteredChapters = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const all = this.chapters();
    if (!query) return all;
    
    return all.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.description.toLowerCase().includes(query)
    );
  });

  // Group tests by chapter slug
  testsByChapter = computed(() => {
    const tests = this.allTests();
    const map = new Map<string, TestMetadata[]>();
    tests.forEach(test => {
      if (!map.has(test.chapterSlug)) {
        map.set(test.chapterSlug, []);
      }
      map.get(test.chapterSlug)?.push(test);
    });
    return map;
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.progressService.getProgress().subscribe();

    this.http.get<{success: boolean, data: any[]}>(`${environment.apiUrl}/tests?module=java-dsa`).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const dbTests = res.data;
          // Merge with static tests to keep placeholders
          const updatedTests = this.allTests().map(staticTest => {
            const dbTest = dbTests.find((t: any) => t.testId === staticTest.id || (t.chapterSlug === staticTest.chapterSlug && t.testNumber === staticTest.testNumber));
            if (dbTest) {
              let calculatedStatus: 'not-available' | 'available' | 'completed' | 'locked' = 'locked';
              if (dbTest.isCompleted) {
                calculatedStatus = 'completed';
              } else if (dbTest.isLocked) {
                calculatedStatus = 'locked';
              } else {
                calculatedStatus = (dbTest.status === 'available' && dbTest.isAvailable) ? 'available' : 'locked';
              }

              return {
                ...staticTest,
                id: dbTest.testId,
                title: dbTest.testName,
                totalQuestions: dbTest.questionCount || 25,
                multipleChoiceCount: dbTest.multipleChoiceCount || 5,
                mcqCount: dbTest.mcqCount || 20,
                totalMarks: dbTest.totalMarks || 25,
                status: calculatedStatus
              } as TestMetadata;
            }
            return staticTest;
          });
          this.allTests.set(updatedTests);
        }
      },
      error: (err) => console.error('Failed to load java-dsa tests', err)
    });
  }

  getChapterProgress(chapterSlug: string) {
    const data = this.progressData();
    if (!data) return null;
    return data.chapters.find((c: any) => c.chapterSlug === chapterSlug);
  }
}
