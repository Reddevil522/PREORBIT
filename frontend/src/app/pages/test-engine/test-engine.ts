import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TestEngineService, TestMetadata, SanitizedQuestion, TestOption } from '../../core/services/test-engine.service';
import { ProgressService } from '../../core/services/progress.service';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

type EngineStatus = 'loading' | 'instructions' | 'in-progress' | 'submitted' | 'error';

@Component({
  selector: 'app-test-engine',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './test-engine.html',
  styleUrl: './test-engine.css',
})
export class TestEngine implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private testEngineService = inject(TestEngineService);
  private progressService = inject(ProgressService);
  private titleService = inject(Title);
  private cdr = inject(ChangeDetectorRef);

  status: EngineStatus = 'loading';
  errorMessage = '';
  isStarting: boolean = false;
  isRetaking: boolean = false;

  testMetadata: TestMetadata | null = null;
  questions: SanitizedQuestion[] = [];
  
  // Attempt State
  attemptId: string | null = null;
  attemptStatus: string | null = null;
  startedAt: string | null = null;
  
  currentQuestionIndex = 0;
  
  // Store answers: questionId -> selectedOptionKey (or array of keys for multiple-choice)
  answers: Record<string, string | string[]> = {};
  evaluationResult: any = null;

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('testId');
    if (!testId) {
      this.showError('Test ID is missing.');
      return;
    }

    const token = localStorage.getItem('preorbit_token');
    console.log('[START-TEST] token exists:', !!token);

    this.attemptResume(testId);
  }

  private attemptResume(testId: string): void {
    this.status = 'loading';
    this.testEngineService.resumeTest(testId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          console.log('[ATTEMPT] Resume requested');
          console.log('[ATTEMPT] Existing attempt found');
          if (res.data.status === 'submitted') {
            this.router.navigate(['/test-result', res.data.attemptId]);
            return;
          }
          
          this.testMetadata = res.data.test || null;
          this.questions = res.data.questions || [];
          this.attemptId = res.data.attemptId || null;
          this.startedAt = res.data.startedAt || null;
          this.attemptStatus = res.data.status || null;
          this.answers = res.data.answers || {};
          
          if (res.data.result) {
            this.evaluationResult = res.data.result;
            console.log('[ATTEMPT] Recovered existing result:', this.evaluationResult);
          }

          const savedIndex = sessionStorage.getItem(`preorbit_test_pos_${this.attemptId}`);
          this.currentQuestionIndex = savedIndex ? parseInt(savedIndex, 10) : 0;
          
          if (this.currentQuestionIndex >= this.questions.length) {
            this.currentQuestionIndex = 0;
          }

          console.log('[ATTEMPT] currentQuestionIndex:', this.currentQuestionIndex);
          console.log(`[RETAKE-RESUME]\nattemptId: ${this.attemptId}\ncurrentQuestionIndex: ${this.currentQuestionIndex}\nquestionCount: ${this.questions.length}`);
          
          this.titleService.setTitle(`${this.testMetadata?.testName || 'Test'} — PREORBIT`);
          
          if (this.attemptStatus === 'submitted') {
             // If they refresh after submit, just show the submitted screen
             this.status = 'submitted'; 
          } else {
             // Skip instructions, go straight to the question
             this.status = 'in-progress';
          }
          this.cdr.detectChanges();
        } else {
          this.loadTest(testId);
        }
      },
      error: (err) => {
        if (err.status === 404) {
          // No active attempt, load instructions normally
          this.loadTest(testId);
        } else {
          this.showError('Unable to resume your test.');
        }
      }
    });
  }

  private loadTest(testId: string): void {
    this.status = 'loading';
    this.cdr.detectChanges();
    console.log('[TEST-ENGINE] Fetching test metadata for instructions');
    this.testEngineService.getTestMetadata(testId).subscribe({
      next: (res) => {
        try {
          if (res && res.success && res.data) {
            this.testMetadata = res.data.test || null;
            this.titleService.setTitle(`${this.testMetadata?.testName || 'Test'} — PREORBIT`);
            this.status = 'instructions';
            this.cdr.detectChanges(); // Force UI update
          } else {
            console.log('[TEST-ENGINE] Missing required test metadata');
            this.showError('Unable to load test instructions.');
          }
        } catch (error) {
          console.error('[TEST-ENGINE] RESPONSE PROCESSING ERROR:', error);
          this.showError('Unable to process test metadata.');
        }
      },
      error: (err) => {
        console.error('[TEST-ENGINE] Load Error:', err);
        this.showError(err.error?.message || 'Unable to load test instructions.');
      }
    });
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.status = 'error';
    this.cdr.detectChanges(); // Force UI update
  }

  startTest(): void {
    if (this.isStarting || !this.testMetadata) return;
    
    this.isStarting = true;
    console.log('[START-TEST] Requesting new attempt creation');
    this.testEngineService.startTest(this.testMetadata.testId).subscribe({
      next: (res) => {
        this.isStarting = false;
        if (res && res.success && res.data) {
          this.questions = res.data.questions || [];
          this.attemptId = res.data.attemptId || null;
          this.startedAt = res.data.startedAt || null;
          this.attemptStatus = res.data.status || null;
          this.answers = {}; 
          this.currentQuestionIndex = 0;
          
          if (!this.questions || this.questions.length === 0) {
            this.showError('No questions available for this test.');
            return;
          }

          if (this.attemptId) {
             sessionStorage.setItem(`preorbit_test_pos_${this.attemptId}`, '0');
          }
          this.status = 'in-progress';
          this.cdr.detectChanges();
        } else {
          this.showError('Unable to start test.');
        }
      },
      error: (err) => {
        this.isStarting = false;
        console.error('[START-TEST] Error:', err);
        this.showError(err.error?.message || 'Unable to start test.');
      }
    });
  }

  get currentQuestion(): SanitizedQuestion | null {
    if (this.questions.length === 0) return null;
    return this.questions[this.currentQuestionIndex];
  }

  get answeredCount(): number {
    return Object.keys(this.answers).length;
  }

  // Navigation
  goToNext(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.savePosition();
    }
  }

  goToPrevious(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.savePosition();
    }
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.currentQuestionIndex = index;
      this.savePosition();
    }
  }
  
  private savePosition(): void {
    if (this.attemptId) {
      sessionStorage.setItem(`preorbit_test_pos_${this.attemptId}`, this.currentQuestionIndex.toString());
    }
  }

  isQuestionAnswered(questionId: string): boolean {
    return !!this.answers[questionId];
  }

  // Answer Selection
  toggleOption(question: SanitizedQuestion, optionKey: string): void {
    if (this.attemptStatus === 'submitted') return; // Freeze if submitted

    if (question.questionType === 'multiple-choice') {
      const currentSelection = (this.answers[question._id] as string[]) || [];
      if (currentSelection.includes(optionKey)) {
        this.answers[question._id] = currentSelection.filter(k => k !== optionKey);
        if (this.answers[question._id].length === 0) {
          delete this.answers[question._id]; // Keep it clean
        }
      } else {
        this.answers[question._id] = [...currentSelection, optionKey];
      }
    } else {
      // Default to Single Choice MCQ
      this.answers[question._id] = optionKey;
    }
    
    // Auto-save Answer
    if (this.testMetadata?.testId && this.attemptId) {
      this.testEngineService.saveAnswer(
        this.testMetadata.testId, 
        this.attemptId, 
        question._id, 
        this.answers[question._id]
      ).subscribe({
        next: () => console.log(`[ATTEMPT] Answer saved for ${question._id}`),
        error: (err) => console.error(`[ATTEMPT] Failed to save answer`, err)
      });
    }
  }

  isOptionSelected(question: SanitizedQuestion, optionKey: string): boolean {
    const answer = this.answers[question._id];
    if (answer === undefined || answer === null) return false;
    
    if (Array.isArray(answer)) {
      return answer.includes(optionKey);
    }
    return answer === optionKey;
  }

  // Modal & Submit State
  showSubmitModal = false;
  isSubmitting = false;

  openSubmitModal(): void {
    if (this.attemptStatus === 'submitted') return;
    this.showSubmitModal = true;
  }

  closeSubmitModal(): void {
    if (this.isSubmitting) return;
    this.showSubmitModal = false;
  }

  confirmSubmit(): void {
    if (!this.testMetadata || !this.attemptId || this.isSubmitting || this.attemptStatus === 'submitted') return;

    this.isSubmitting = true;

    // Convert Record<string, any> to Array for API
    const formattedAnswers = Object.keys(this.answers).map(questionId => ({
      questionId,
      selectedAnswer: this.answers[questionId]
    }));

    const payload = {
      attemptId: this.attemptId,
      answers: formattedAnswers
    };

    console.log('[SUBMIT] Started');
    console.log('[SUBMIT] Request sent');

    this.testEngineService.submitTest(this.testMetadata.testId, payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.showSubmitModal = false;
        if (res.success) {
          console.log('[SUBMIT] Success');
          this.attemptStatus = 'submitted';
          this.status = 'submitted';
          this.progressService.refreshProgress();
          this.router.navigate(['/test-result', this.attemptId]);
        } else {
          console.error('[SUBMIT] Failed response', res);
          this.showError('Failed to submit test. Please try again.');
        }
        console.log('[SUBMIT] Final isSubmitting:', this.isSubmitting);
        this.cdr.detectChanges(); // Force UI update
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('[SUBMIT] Error:', err);
        // We stay in 'in-progress' state and show alert/error
        alert('Unable to submit test. Please try again.');
        console.log('[SUBMIT] Final isSubmitting:', this.isSubmitting);
        this.cdr.detectChanges(); // Force UI update
      }
    });
  }

  retakeTest(): void {
    if (!this.testMetadata || this.isRetaking) return;
    
    console.log('[RETAKE] Clicked');
    console.log(`[RETAKE] testId: ${this.testMetadata.testId}`);
    console.log(`[RETAKE] Previous attempt: ${this.attemptId}`);
    console.log(`[RETAKE] Request sent`);
    
    this.isRetaking = true;
    this.testEngineService.retakeTest(this.testMetadata.testId).subscribe({
      next: (res) => {
        this.isRetaking = false;
        console.log(`[RETAKE] Response status: ${res.success ? 'success' : 'failure'}`);
        if (res.success && res.data) {
          console.log(`[RETAKE] New attemptId: ${res.data.attemptId}`);
          console.log(`[RETAKE] New attempt status: ${res.data.status}`);
          console.log(`[RETAKE] Navigation: In-place state update to in-progress`);
          
          this.attemptId = res.data.attemptId || null;
          this.startedAt = res.data.startedAt || null;
          this.attemptStatus = res.data.status || null;
          this.testMetadata = res.data.test || null;
          this.questions = res.data.questions || [];
          
          this.answers = {};
          this.currentQuestionIndex = 0;
          if (this.attemptId) {
             sessionStorage.setItem(`preorbit_test_pos_${this.attemptId}`, '0');
          }
          
          this.status = 'in-progress';
          this.cdr.detectChanges();
        } else {
          alert('Failed to start retake.');
        }
      },
      error: (err) => {
        this.isRetaking = false;
        console.error('[RETAKE] Error:', err);
        alert(err.error?.message || 'Unable to start retake. Please try again.');
        this.cdr.detectChanges();
      }
    });
  }

  goBackToPractice(): void {
    if (!this.testMetadata) return;

    const { module, subject, section } = this.testMetadata;
    const activeSubject = subject || section;

    if (module === 'java-dsa') {
      this.router.navigate(['/java-dsa/tests']);
    } else if (activeSubject) {
      this.router.navigate([`/${module}/${activeSubject}/practice`]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
