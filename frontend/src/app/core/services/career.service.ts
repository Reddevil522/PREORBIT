// ============================================================
// PREORBIT — Career Service (v2)
// ============================================================

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type CareerStatus   = 'Saved' | 'Interested' | 'Applied' | 'Archived';
export type CareerCategory = 'Full Time' | 'Internship' | 'Part Time' | 'Remote' | 'Freelance' | 'Other';

export const CAREER_STATUSES: CareerStatus[] = ['Saved', 'Interested', 'Applied', 'Archived'];
export const CAREER_CATEGORIES: CareerCategory[] = [
  'Full Time', 'Internship', 'Part Time', 'Remote', 'Freelance', 'Other',
];

export interface CareerLink {
  _id:         string;
  userId:      string;
  companyName: string;
  jobTitle:    string;
  url:         string;
  location:    string;
  notes:       string;
  status:      CareerStatus;
  category:    CareerCategory;
  createdAt:   string;
  updatedAt:   string;
}

export interface CareerLinkForm {
  companyName: string;
  jobTitle:    string;
  url:         string;
  location:    string;
  notes:       string;
  status:      CareerStatus;
  category:    CareerCategory;
}

export interface CareerSummary {
  savedLinks:      number;    // non-archived (backward compat for dashboard)
  total:           number;
  saved:           number;
  interested:      number;
  applied:         number;
  archived:        number;
  categoryCounts:  Record<string, number>;
  recentLinks:     Array<Pick<CareerLink, '_id' | 'companyName' | 'jobTitle' | 'url' | 'status' | 'category' | 'createdAt'>>;
}

export interface TrackResult {
  alreadyTracked:    boolean;
  applicationId?:    string;
  applicationStatus?: string;
  application?:      any;
  link?:             CareerLink;
}

@Injectable({ providedIn: 'root' })
export class CareerService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/career`;

  getLinks(): Observable<{ success: boolean; data: { links: CareerLink[] } }> {
    return this.http.get<any>(this.base);
  }

  getSummary(): Observable<{ success: boolean; data: CareerSummary }> {
    return this.http.get<any>(`${this.base}/summary`);
  }

  createLink(payload: CareerLinkForm): Observable<{ success: boolean; data: { link: CareerLink } }> {
    return this.http.post<any>(this.base, payload);
  }

  updateLink(id: string, payload: Partial<CareerLinkForm>): Observable<{ success: boolean; data: { link: CareerLink } }> {
    return this.http.put<any>(`${this.base}/${id}`, payload);
  }

  deleteLink(id: string): Observable<{ success: boolean }> {
    return this.http.delete<any>(`${this.base}/${id}`);
  }

  /**
   * Track Application — converts a CareerLink into a PlacementApplication.
   * The backend sets CareerLink.status = 'Applied' only on success.
   */
  trackApplication(careerLinkId: string, payload: any): Observable<{ success: boolean; data: TrackResult }> {
    return this.http.post<any>(`${this.base}/${careerLinkId}/track`, payload);
  }
}
