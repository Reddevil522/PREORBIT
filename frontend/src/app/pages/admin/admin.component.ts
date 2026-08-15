import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdminTestService } from '../../core/services/admin-test.service';

interface ValidationError {
  questionNumber: number | string;
  field: string;
  message: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  selectedFile: File | null = null;
  
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
    private adminTestService: AdminTestService
  ) {}

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
    this.http.post<any>(`${environment.apiUrl}/admin/import/preview`, jsonPayload)
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
    this.http.post<any>(`${environment.apiUrl}/admin/import/execute`, jsonPayload)
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
