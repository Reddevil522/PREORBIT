import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CareerService, CareerLink, CareerLinkForm,
  CareerStatus, CareerCategory,
  CAREER_STATUSES, CAREER_CATEGORIES,
} from '../../core/services/career.service';
import { PlacementForm, PLACEMENT_STATUSES } from '../../core/services/placement.service';

// Status display metadata
const CAREER_STATUS_META: Record<CareerStatus, { css: string }> = {
  Saved:      { css: 'cs--saved'      },
  Interested: { css: 'cs--interested' },
  Applied:    { css: 'cs--applied'    },
  Archived:   { css: 'cs--archived'   },
};

type SortOption = 'newest' | 'oldest' | 'company-az' | 'company-za';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './career.component.html',
  styleUrl: './career.component.css',
})
export class CareerComponent implements OnInit {

  // ── Constants ────────────────────────────────────────────────
  readonly allStatuses   = CAREER_STATUSES;
  readonly allCategories = CAREER_CATEGORIES;
  readonly statusMeta    = CAREER_STATUS_META;
  readonly sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest',     label: 'Newest First' },
    { value: 'oldest',     label: 'Oldest First' },
    { value: 'company-az', label: 'Company A–Z'  },
    { value: 'company-za', label: 'Company Z–A'  },
  ];

  // ── Application state ─────────────────────────────────────────
  isLoading = signal(true);
  error     = signal<string | null>(null);
  allLinks  = signal<CareerLink[]>([]);

  // ── Summary stats ──────────────────────────────────────────────
  summaryLoading = signal(true);
  summaryError   = signal<string | null>(null);
  summary = signal<{
    total: number; saved: number; interested: number; applied: number; archived: number;
  } | null>(null);

  // ── Filters ────────────────────────────────────────────────────
  searchQuery    = signal('');
  statusFilter   = signal<CareerStatus | 'All'>('All');
  categoryFilter = signal<CareerCategory | 'All'>('All');
  sortBy         = signal<SortOption>('newest');

  // ── Form state ─────────────────────────────────────────────────
  showForm  = signal(false);
  formMode  = signal<'create' | 'edit'>('create');
  editingId = signal<string | null>(null);
  isSaving  = signal(false);
  formError = signal<string | null>(null);
  form: CareerLinkForm = this.blankForm();

  // ── Delete confirmation ────────────────────────────────────────
  deletingId = signal<string | null>(null);

  // ── Track Application modal ────────────────────────────────────
  trackingLink    = signal<CareerLink | null>(null);
  trackForm: any  = {};
  isTracking      = signal(false);
  trackError      = signal<string | null>(null);
  trackResult     = signal<{ alreadyTracked: boolean; applicationId?: string; applicationStatus?: string } | null>(null);

  // ── Filtered list ──────────────────────────────────────────────
  filteredLinks = computed(() => {
    let links = this.allLinks();

    // Status filter
    const sf = this.statusFilter();
    if (sf !== 'All') links = links.filter(l => l.status === sf);

    // Category filter
    const cf = this.categoryFilter();
    if (cf !== 'All') links = links.filter(l => l.category === cf);

    // Search
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      links = links.filter(l =>
        l.companyName.toLowerCase().includes(q) ||
        l.jobTitle.toLowerCase().includes(q)    ||
        (l.location || '').toLowerCase().includes(q)
      );
    }

    // Sort
    const sorted = [...links];
    const sort = this.sortBy();
    if (sort === 'newest') sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    else if (sort === 'oldest') sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    else if (sort === 'company-az') sorted.sort((a, b) => a.companyName.localeCompare(b.companyName));
    else if (sort === 'company-za') sorted.sort((a, b) => b.companyName.localeCompare(a.companyName));

    return sorted;
  });

  hasActiveFilters = computed(() =>
    this.statusFilter() !== 'All' ||
    this.categoryFilter() !== 'All' ||
    this.searchQuery().trim() !== ''
  );

  // Status-specific counts from current full list
  countByStatus = computed(() => {
    const map: Record<string, number> = { Saved: 0, Interested: 0, Applied: 0, Archived: 0 };
    this.allLinks().forEach(l => { if (map[l.status] !== undefined) map[l.status]++; });
    return map;
  });

  constructor(
    private careerService: CareerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadLinks();
  }

  // ── Load ──────────────────────────────────────────────────────
  loadLinks(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.careerService.getLinks().subscribe({
      next: (res) => {
        if (res.success) this.allLinks.set(res.data.links);
        else this.error.set('Unable to load career links.');
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Unable to load career links. Please try again.');
        this.isLoading.set(false);
      },
    });
  }

  // ── Filters ────────────────────────────────────────────────────
  clearFilters(): void {
    this.searchQuery.set('');
    this.statusFilter.set('All');
    this.categoryFilter.set('All');
    this.sortBy.set('newest');
  }

  // ── Form ───────────────────────────────────────────────────────
  private blankForm(): CareerLinkForm {
    return { companyName: '', jobTitle: '', url: '', location: '', notes: '', status: 'Saved', category: 'Other' };
  }

  openCreate(): void {
    this.form = this.blankForm();
    this.editingId.set(null);
    this.formMode.set('create');
    this.formError.set(null);
    this.showForm.set(true);
  }

  openEdit(link: CareerLink): void {
    this.form = {
      companyName: link.companyName,
      jobTitle:    link.jobTitle,
      url:         link.url,
      location:    link.location || '',
      notes:       link.notes    || '',
      status:      link.status   || 'Saved',
      category:    link.category || 'Other',
    };
    this.editingId.set(link._id);
    this.formMode.set('edit');
    this.formError.set(null);
    this.showForm.set(true);
  }

  cancelForm(): void { this.showForm.set(false); this.formError.set(null); }

  private isValidUrl(url: string): boolean {
    return /^https?:\/\/.+/.test(url.trim());
  }

  saveForm(): void {
    const payload: CareerLinkForm = {
      companyName: this.form.companyName.trim(),
      jobTitle:    this.form.jobTitle.trim(),
      url:         this.form.url.trim(),
      location:    this.form.location.trim(),
      notes:       this.form.notes.trim(),
      status:      this.form.status,
      category:    this.form.category,
    };

    if (!payload.companyName) { this.formError.set('Company name is required.'); return; }
    if (!payload.jobTitle)    { this.formError.set('Job title is required.'); return; }
    if (!payload.url)         { this.formError.set('URL is required.'); return; }
    if (!this.isValidUrl(payload.url)) { this.formError.set('URL must start with http:// or https://'); return; }

    if (this.isSaving()) return;
    this.isSaving.set(true);
    this.formError.set(null);

    if (this.formMode() === 'create') {
      this.careerService.createLink(payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.allLinks.update(links => [res.data.link, ...links]);
            this.showForm.set(false);
          } else {
            this.formError.set('Failed to save career link.');
          }
          this.isSaving.set(false);
        },
        error: (err) => {
          this.formError.set(err.error?.message || 'Failed to save career link.');
          this.isSaving.set(false);
        },
      });
    } else {
      const id = this.editingId()!;
      this.careerService.updateLink(id, payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.allLinks.update(links => links.map(l => l._id === id ? res.data.link : l));
            this.showForm.set(false);
          } else {
            this.formError.set('Failed to update career link.');
          }
          this.isSaving.set(false);
        },
        error: (err) => {
          this.formError.set(err.error?.message || 'Failed to update career link.');
          this.isSaving.set(false);
        },
      });
    }
  }

  // ── Quick status update (Archive / Restore / Interested) ───────
  quickStatusUpdate(link: CareerLink, newStatus: CareerStatus): void {
    this.careerService.updateLink(link._id, { status: newStatus }).subscribe({
      next: (res) => {
        if (res.success) {
          this.allLinks.update(links => links.map(l => l._id === link._id ? res.data.link : l));
        }
      },
      error: () => {}, // keep existing on failure
    });
  }

  // ── Delete ─────────────────────────────────────────────────────
  confirmDelete(id: string): void { this.deletingId.set(id); }
  cancelDelete():             void { this.deletingId.set(null); }

  executeDelete(id: string): void {
    this.careerService.deleteLink(id).subscribe({
      next: (res) => {
        if (res.success) this.allLinks.update(links => links.filter(l => l._id !== id));
        this.deletingId.set(null);
      },
      error: () => { this.deletingId.set(null); },
    });
  }

  // ── Track Application ──────────────────────────────────────────
  openTrackModal(link: CareerLink): void {
    this.trackingLink.set(link);
    this.trackError.set(null);
    this.trackResult.set(null);
    this.trackForm = {
      companyName:     link.companyName,
      jobTitle:        link.jobTitle,
      applicationUrl:  link.url,
      location:        link.location || '',
      notes:           '',
      status:          'Applied',
      applicationDate: '',
      followUpDate:    '',
    };
  }

  cancelTrack(): void {
    this.trackingLink.set(null);
    this.trackResult.set(null);
    this.trackError.set(null);
  }

  goToPlacement(): void {
    this.cancelTrack();
    this.router.navigateByUrl('/placement');
  }

  confirmTrack(): void {
    const link = this.trackingLink();
    if (!link || this.isTracking()) return;

    this.isTracking.set(true);
    this.trackError.set(null);

    this.careerService.trackApplication(link._id, this.trackForm).subscribe({
      next: (res) => {
        if (res.success) {
          const result = res.data;
          this.trackResult.set({
            alreadyTracked:    result.alreadyTracked,
            applicationId:     result.applicationId,
            applicationStatus: result.applicationStatus,
          });

          if (!result.alreadyTracked && result.link) {
            // CareerLink status updated to Applied on backend — sync locally
            this.allLinks.update(links =>
              links.map(l => l._id === link._id ? result.link! : l)
            );
          }
        } else {
          this.trackError.set('Failed to track application.');
        }
        this.isTracking.set(false);
      },
      error: (err) => {
        this.trackError.set(err.error?.message || 'Failed to track application. Please try again.');
        this.isTracking.set(false);
      },
    });
  }

  // ── URL open ───────────────────────────────────────────────────
  openLink(url: string): void {
    const a = document.createElement('a');
    a.href   = url;
    a.target = '_blank';
    a.rel    = 'noopener noreferrer';
    a.click();
  }

  getStatusCss(status: string): string {
    return CAREER_STATUS_META[status as CareerStatus]?.css ?? 'cs--saved';
  }
}
