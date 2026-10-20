import { Component, ChangeDetectorRef, NgZone, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdminTestService } from '../../core/services/admin-test.service';
import { grammarChapters, vocabularyChapters, readingComprehensionChapters } from '../../config/cds-english.config';
import { ThemeService } from '../../core/services/theme.service';

interface ValidationError {
  questionNumber: number | string;
  field: string;
  message: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  protected readonly theme = inject(ThemeService);
  selectedFile: File | null = null;
  
  // Context from query parameters
  expectedTestId: string | null = null;
  expectedChapterSlug: string | null = null;
  isReplace: boolean = false;

  // Module & Subject Hierarchy
  selectedModule: string = '';
  selectedSubject: string = '';
  selectedSection: string = '';
  selectedChapter: string = '';

  availableModules = [
    { value: '', label: 'Auto-detect from JSON' },
    { value: 'cds', label: 'CDS (Combined Defence Services)' },
    { value: 'aptitude', label: 'Aptitude' },
    { value: 'core-cs', label: 'Core CS' },
    { value: 'java-dsa', label: 'Java DSA' }
  ];

  cdsSections = [
    { value: 'grammar', label: 'Grammar (20 MCQs)' },
    { value: 'vocabulary', label: 'Vocabulary (20 MCQs)' },
    { value: 'reading-comprehension', label: 'Reading Comprehension (10 MCQs / 2 Passages)' }
  ];

  get availableChaptersList(): { slug: string; title: string }[] {
    if (this.selectedModule === 'cds') {
      if (this.selectedSection === 'grammar') {
        return grammarChapters.map(c => ({ slug: c.slug, title: c.title }));
      }
      if (this.selectedSection === 'vocabulary') {
        return vocabularyChapters.map(c => ({ slug: c.slug, title: c.title }));
      }
      if (this.selectedSection === 'reading-comprehension') {
        return readingComprehensionChapters.map(c => ({ slug: c.slug, title: c.title }));
      }
    }
    return [];
  }

  onModuleChange(val: string) {
    this.selectedModule = val;
    if (val === 'cds') {
      this.selectedSubject = 'english';
      this.selectedSection = 'grammar';
      this.selectedChapter = '';
    } else {
      this.selectedSubject = '';
      this.selectedSection = '';
      this.selectedChapter = '';
    }
  }

  onSectionChange(val: string) {
    this.selectedSection = val;
    this.selectedChapter = '';
  }
  
  // State
  isUploading = false;
  isImporting = false;
  showConfirmation = false;
  importSuccess = false;
  importResult: any = null;
  parsedJson: any = null;
  
  // Validation Results
  validationErrors: ValidationError[] = [];
  generalError: string | null = null;
  
  previewSummary: any = null;
  previewQuestions: any[] = [];

  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor(
    private http: HttpClient, 
    private cdr: ChangeDetectorRef, 
    private zone: NgZone,
    private adminTestService: AdminTestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['testId']) this.expectedTestId = params['testId'];
      if (params['chapterSlug']) this.expectedChapterSlug = params['chapterSlug'];
      if (params['isReplace'] === 'true') this.isReplace = true;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.resetState();
    
    if (file) {
      if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        this.generalError = 'Only JSON files are allowed.';
        this.selectedFile = null;
        return;
      }
      
      if (file.size > this.maxFileSize) {
        this.generalError = 'File size exceeds the allowed limit. Maximum size is 5MB.';
        this.selectedFile = null;
        return;
      }
      
      this.selectedFile = file;
    }
  }

  getFileSize(): string {
    if (!this.selectedFile) return '0 KB';
    return (this.selectedFile.size / 1024).toFixed(2) + ' KB';
  }

  cancel() {
    this.selectedFile = null;
    this.resetState();
    // Also clear the file input element visually
    const fileInput = document.getElementById('jsonUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  resetState() {
    this.isUploading = false;
    this.isImporting = false;
    this.showConfirmation = false;
    this.importSuccess = false;
    this.importResult = null;
    this.parsedJson = null;
    this.validationErrors = [];
    this.generalError = null;
    this.previewSummary = null;
    this.previewQuestions = [];
  }

  previewFile() {
    if (!this.selectedFile) return;

    // Clear previous errors and force re-read to pick up disk changes
    this.validationErrors = [];
    this.generalError = null;
    this.isUploading = true;
    this.parsedJson = null;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.zone.run(() => {
        try {
          this.parsedJson = JSON.parse(e.target?.result as string);
          
          // Validate context if provided
          if (this.expectedTestId && this.parsedJson.testId !== this.expectedTestId) {
            this.generalError = `Wrong Test: You are uploading JSON for test '${this.parsedJson.testId}', but selected test '${this.expectedTestId}'.`;
            this.isUploading = false;
            this.parsedJson = null;
            this.cdr.detectChanges();
            return;
          }
          if (this.expectedChapterSlug && this.parsedJson.chapterSlug !== this.expectedChapterSlug) {
            this.generalError = `Wrong Chapter: You are uploading JSON for chapter '${this.parsedJson.chapterSlug}', but selected chapter '${this.expectedChapterSlug}'.`;
            this.isUploading = false;
            this.parsedJson = null;
            this.cdr.detectChanges();
            return;
          }

          // Validate or apply UI hierarchy selection if specified
          if (this.selectedModule) {
            if (this.parsedJson.module && this.parsedJson.module !== this.selectedModule) {
              this.generalError = `Module Mismatch: Uploaded JSON specifies module '${this.parsedJson.module}', but '${this.selectedModule}' was selected.`;
              this.isUploading = false;
              this.parsedJson = null;
              this.cdr.detectChanges();
              return;
            }
            this.parsedJson.module = this.selectedModule;
          }

          if (this.selectedModule === 'cds') {
            if (this.selectedSubject) {
              this.parsedJson.subject = this.selectedSubject;
            }
            if (this.selectedSection) {
              if (this.parsedJson.section && this.parsedJson.section !== this.selectedSection) {
                this.generalError = `Section Mismatch: Uploaded JSON specifies section '${this.parsedJson.section}', but '${this.selectedSection}' was selected.`;
                this.isUploading = false;
                this.parsedJson = null;
                this.cdr.detectChanges();
                return;
              }
              this.parsedJson.section = this.selectedSection;
            }
            if (this.selectedChapter) {
              if (this.parsedJson.chapterSlug && this.parsedJson.chapterSlug !== this.selectedChapter) {
                this.generalError = `Chapter Mismatch: Uploaded JSON specifies chapter '${this.parsedJson.chapterSlug}', but '${this.selectedChapter}' was selected.`;
                this.isUploading = false;
                this.parsedJson = null;
                this.cdr.detectChanges();
                return;
              }
              this.parsedJson.chapterSlug = this.selectedChapter;
            }
          }

          this.sendForPreview(this.parsedJson);
        } catch (err) {
          this.generalError = 'Invalid JSON format. Please check your JSON file.';
          this.isUploading = false;
          this.parsedJson = null;
          this.cdr.detectChanges();
        }
      });
    };
    
    reader.onerror = () => {
      this.zone.run(() => {
        this.generalError = 'Failed to read file.';
        this.isUploading = false;
        this.parsedJson = null;
        this.cdr.detectChanges();
      });
    };

    reader.readAsText(this.selectedFile);
  }

  private sendForPreview(jsonPayload: any) {
    console.log('[UPLOAD] Validation started');
    console.log('[UPLOAD] HTTP request sent');
    let url = `${environment.apiUrl}/admin/import/preview`;
    if (this.isReplace) url += '?isReplace=true';

    this.http.post<any>(url, jsonPayload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('[UPLOAD] HTTP error', error);
          
          if (error.error && error.error.errors && Array.isArray(error.error.errors)) {
            // Aggregate validation errors from backend
            this.validationErrors = error.error.errors;
          } else if (error.error && error.error.message) {
            this.generalError = error.error.message;
          } else {
            this.generalError = 'An unexpected server error occurred.';
          }
          return of(null);
        }),
        finalize(() => {
          this.zone.run(() => {
            console.log('[UPLOAD] Request finalized');
            this.isUploading = false;
            this.cdr.detectChanges();
          });
        })
      )
      .subscribe(response => {
        this.zone.run(() => {
          console.log('[UPLOAD] HTTP response received', response);
          if (response) {
            if (response.success) {
              console.log('[UPLOAD] Validation completed');
              this.previewSummary = response.data.summary;
              this.previewQuestions = response.data.questions;
            } else {
              console.log('[UPLOAD] Validation failed');
              // Handle validation errors sent as 200 OK
              if (response.errors && Array.isArray(response.errors)) {
                this.validationErrors = response.errors;
              } else if (response.message) {
                this.generalError = response.message;
              } else {
                this.generalError = 'Validation failed.';
              }
            }
          }
          this.cdr.detectChanges();
        });
      });
  }

  showImportConfirmation() {
    this.showConfirmation = true;
  }

  cancelImport() {
    this.showConfirmation = false;
  }

  confirmImport() {
    if (!this.selectedFile) return;

    if (this.parsedJson) {
      this.isImporting = true;
      this.executeImport(this.parsedJson);
      return;
    }

    this.isImporting = true;
    
    // Fallback if parsedJson was somehow lost
    const reader = new FileReader();
    reader.onload = (e) => {
      this.zone.run(() => {
        try {
          this.parsedJson = JSON.parse(e.target?.result as string);
          this.executeImport(this.parsedJson);
        } catch (err) {
          this.generalError = 'Failed to read JSON during import phase.';
          this.isImporting = false;
          this.showConfirmation = false;
          this.parsedJson = null;
          this.cdr.detectChanges();
        }
      });
    };
    reader.readAsText(this.selectedFile);
  }

  private executeImport(jsonPayload: any) {
    console.log('[IMPORT] Import started');
    let url = `${environment.apiUrl}/admin/import/execute`;
    if (this.isReplace) url += '?isReplace=true';

    this.http.post<any>(url, jsonPayload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('[IMPORT] HTTP error', error);
          
          if (error.error && error.error.message) {
            this.generalError = `Import Failed: ${error.error.message}`;
          } else {
            this.generalError = 'Import Failed: An unexpected server error occurred.';
          }
          return of(null);
        }),
        finalize(() => {
          this.zone.run(() => {
            console.log('[IMPORT] Request finalized');
            this.isImporting = false;
            this.showConfirmation = false;
            this.cdr.detectChanges();
          });
        })
      )
      .subscribe(response => {
        this.zone.run(() => {
          console.log('[IMPORT] HTTP response received', response);
          if (response) {
            if (response.success) {
              this.importSuccess = true;
              this.importResult = response.data;
              this.previewSummary = null; // Hide preview
              
              this.previewSummary = null; // Hide preview
              
              // Invalidate cache so Manage Tests gets fresh data
              this.adminTestService.clearCache();
              sessionStorage.removeItem('preorbit_admin_tests_v2');
            } else {
              this.generalError = `Import Failed: ${response.message}`;
            }
          }
          this.cdr.detectChanges();
        });
      });
  }
}
