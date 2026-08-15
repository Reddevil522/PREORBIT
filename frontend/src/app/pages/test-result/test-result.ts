import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TestEngineService } from '../../core/services/test-engine.service';

@Component({
  selector: 'app-test-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './test-result.html',
  styleUrl: './test-result.css',
})
export class TestResult implements OnInit {
  isLoading = signal<boolean>(true);
  errorMsg = signal<string>('');
  
  attemptId = signal<string | null>(null);
  testMetadata = signal<any>(null);
  evaluation = signal<any>(null);
  questionsAnalysis = signal<any[]>([]);
  startedAt = signal<string>('');
  submittedAt = signal<string>('');
  timeTaken = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testEngineService: TestEngineService
  ) {}

  ngOnInit() {
    const aid = this.route.snapshot.paramMap.get('attemptId');
    if (!aid) {
      this.errorMsg.set('Invalid attempt ID');
      this.isLoading.set(false);
      return;
    }
    this.attemptId.set(aid);
    this.fetchResult(aid);
  }

  fetchResult(attemptId: string) {
    this.isLoading.set(true);
    this.testEngineService.getTestResult(attemptId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const { status, test, evaluation, questionAnalysis, startedAt, submittedAt } = res.data;
          
          if (status !== 'submitted') {
            this.router.navigate(['/test', test.testId]);
            return;
          }

          this.testMetadata.set(test);
          this.evaluation.set(evaluation);
          this.questionsAnalysis.set(questionAnalysis);
          this.startedAt.set(startedAt);
          this.submittedAt.set(submittedAt);
          
          if (startedAt && submittedAt) {
            this.timeTaken.set(this.calculateTimeTaken(startedAt, submittedAt));
          }
        } else {
          this.errorMsg.set('Unable to load this test result.');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load result:', err);
        this.errorMsg.set('Unable to load this test result.');
        this.isLoading.set(false);
      }
    });
  }

  calculateTimeTaken(start: string, end: string): string {
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    if (isNaN(s) || isNaN(e) || e < s) return '';
    const diff = Math.floor((e - s) / 1000); // seconds
    const m = Math.floor(diff / 60);
    const sec = diff % 60;
    if (m === 0) return `${sec} sec`;
    return `${m} min ${sec} sec`;
  }
  
  getAccuracy(): number {
    const ev = this.evaluation();
    if (!ev) return 0;
    if (ev.attempted === 0) return 0;
    return Math.round((ev.correct / ev.attempted) * 100);
  }

  retryFetch() {
    if (this.attemptId()) {
      this.fetchResult(this.attemptId()!);
    }
  }

  retakeTest() {
    const test = this.testMetadata();
    if (!test) return;
    this.isLoading.set(true);
    this.testEngineService.retakeTest(test.testId).subscribe({
      next: (res) => {
        if (res.success && res.data && res.data.attemptId) {
          this.router.navigate(['/test', test.testId]);
        } else {
          this.errorMsg.set('Failed to initialize retake. Please try again.');
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Retake initialization failed', err);
        this.errorMsg.set('Failed to initialize retake. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  backToTests() {
    const test = this.testMetadata();
    if (!test || !test.module) {
      this.router.navigate(['/dashboard']);
      return;
    }

    if (test.module === 'java-dsa') {
      this.router.navigate(['/java-dsa/tests']);
    } else if (test.module === 'aptitude') {
      this.router.navigate([`/aptitude/${test.subject}/practice`]);
    } else if (test.module === 'core-cs') {
      this.router.navigate([`/core-cs/${test.subject}/practice`]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  isArray(val: any): boolean {
    return Array.isArray(val);
  }

  hasSelected(studentAnswer: any, key: string): boolean {
    if (Array.isArray(studentAnswer)) {
      return studentAnswer.includes(key);
    }
    return studentAnswer === key;
  }

  isCorrectOption(correctAnswer: any, key: string): boolean {
    if (Array.isArray(correctAnswer)) {
      return correctAnswer.includes(key);
    }
    return correctAnswer === key;
  }

  hasStudentAnswer(q: any): boolean {
    if (q.studentAnswer === undefined || q.studentAnswer === null) return false;
    if (Array.isArray(q.studentAnswer) && q.studentAnswer.length === 0) return false;
    if (typeof q.studentAnswer === 'string' && q.studentAnswer.trim() === '') return false;
    return true;
  }
}
