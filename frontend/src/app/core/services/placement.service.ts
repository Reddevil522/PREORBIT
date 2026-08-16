// ============================================================
// PREORBIT — Placement Service (v2)
// ============================================================

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type PlacementStatus =
  | 'Saved' | 'Applied' | 'Test' | 'Interview'
  | 'Technical Round' | 'HR Round' | 'Selected'
  | 'Rejected' | 'Withdrawn';

export const PLACEMENT_STATUSES: PlacementStatus[] = [
  'Saved', 'Applied', 'Test', 'Interview',
  'Technical Round', 'HR Round', 'Selected',
  'Rejected', 'Withdrawn',
];

export const PIPELINE_STATUSES: PlacementStatus[] = [
  'Saved', 'Applied', 'Test', 'Interview', 'Technical Round', 'HR Round', 'Selected',
];

export const TERMINAL_STATUSES: PlacementStatus[] = ['Rejected', 'Withdrawn'];
export const ACTIVE_STATUSES: PlacementStatus[] = [
  'Saved', 'Applied', 'Test', 'Interview', 'Technical Round', 'HR Round',
];

export interface StatusHistoryEntry {
  status:    PlacementStatus;
  changedAt: string;
}

export interface PlacementApplication {
  _id:             string;
  userId:          string;
  companyName:     string;
  jobTitle:        string;
  status:          PlacementStatus;
  statusHistory:   StatusHistoryEntry[];
  applicationUrl:  string;
  applicationDate: string | null;
  followUpDate:    string | null;
  location:        string;
  notes:           string;
  createdAt:       string;
  updatedAt:       string;
}

export interface PlacementForm {
  companyName:     string;
  jobTitle:        string;
  status:          PlacementStatus;
  applicationUrl:  string;
  applicationDate: string;
  followUpDate:    string;
  location:        string;
  notes:           string;
}

export interface PlacementSummary {
  totalApplications: number;
  inProgress:        number;
  saved:             number;
  applied:           number;
  test:              number;
  interview:         number;
  technicalRound:    number;
  hrRound:           number;
  selected:          number;
  rejected:          number;
  withdrawn:         number;
  recentApplications: Array<Pick<PlacementApplication,
    '_id' | 'companyName' | 'jobTitle' | 'status' | 'applicationDate' | 'location' | 'createdAt'>>;
}

export interface PlacementAnalytics {
  total:        number;
  active:       number;
  selected:     number;
  rejected:     number;
  withdrawn:    number;
  test:         number;
  interview:    number;
  followUpsDue: number;
  successRate:  number | null; // null = N/A (no completed apps)
}

@Injectable({ providedIn: 'root' })
export class PlacementService {
  private http = inject(HttpClient);
  private base  = `${environment.apiUrl}/placement`;

  getApplications(): Observable<{ success: boolean; data: { applications: PlacementApplication[] } }> {
    return this.http.get<any>(this.base);
  }

  getSummary(): Observable<{ success: boolean; data: PlacementSummary }> {
    return this.http.get<any>(`${this.base}/summary`);
  }

  getAnalytics(): Observable<{ success: boolean; data: PlacementAnalytics }> {
    return this.http.get<any>(`${this.base}/analytics`);
  }

  createApplication(payload: PlacementForm): Observable<{ success: boolean; data: { application: PlacementApplication } }> {
    return this.http.post<any>(this.base, payload);
  }

  updateApplication(id: string, payload: Partial<PlacementForm>): Observable<{ success: boolean; data: { application: PlacementApplication } }> {
    return this.http.put<any>(`${this.base}/${id}`, payload);
  }

  deleteApplication(id: string): Observable<{ success: boolean }> {
    return this.http.delete<any>(`${this.base}/${id}`);
  }
}
