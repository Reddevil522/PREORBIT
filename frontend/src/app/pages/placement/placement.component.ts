import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  PlacementService,
  PlacementApplication,
  PlacementForm,
  PlacementStatus,
  PlacementAnalytics,
  PLACEMENT_STATUSES,
  PIPELINE_STATUSES,
  ACTIVE_STATUSES,
  TERMINAL_STATUSES,
} from '../../core/services/placement.service';

// ── Status display metadata ──────────────────────────────────
const STATUS_META: Record<PlacementStatus, { label: string; css: string }> = {
  'Saved':           { label: 'Saved',           css: 'ps--saved'     },
  'Applied':         { label: 'Applied',         css: 'ps--applied'   },
  'Test':            { label: 'Test',            css: 'ps--test'      },
  'Interview':       { label: 'Interview',       css: 'ps--interview' },
  'Technical Round': { label: 'Technical Round', css: 'ps--tech'      },
  'HR Round':        { label: 'HR Round',        css: 'ps--hr'        },
  'Selected':        { label: 'Selected',        css: 'ps--selected'  },
  'Rejected':        { label: 'Rejected',        css: 'ps--rejected'  },
  'Withdrawn':       { label: 'Withdrawn',       css: 'ps--withdrawn' },
};

type SortOption = 'newest' | 'oldest' | 'company-az' | 'company-za' | 'followup';
type DateRange  = 'all' | 'today' | '7d' | '30d' | 'month';

@Component({
  selector: 'app-placement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './placement.component.html',
  styleUrl: './placement.component.css',
  providers: [DatePipe],
})
export class PlacementComponent implements OnInit {

  // ── Constants ────────────────────────────────────────────────
  readonly allStatuses     = PLACEMENT_STATUSES;
  readonly pipelineStatuses = PIPELINE_STATUSES;
  readonly statusMeta      = STATUS_META;
  readonly sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest',     label: 'Newest First'  },
    { value: 'oldest',     label: 'Oldest First'  },
    { value: 'company-az', label: 'Company A–Z'   },
    { value: 'company-za', label: 'Company Z–A'   },
    { value: 'followup',   label: 'Follow-up Date'},
  ];
  readonly dateRanges: { value: DateRange; label: string }[] = [
    { value: 'all',   label: 'All Time'     },
    { value: 'today', label: 'Today'        },
    { value: '7d',    label: 'Last 7 Days'  },
    { value: '30d',   label: 'Last 30 Days' },
    { value: 'month', label: 'This Month'   },
  ];

  // ── Application state ─────────────────────────────────────────
  isLoading    = signal(true);
  error        = signal<string | null>(null);
  allApps      = signal<PlacementApplication[]>([]);

  // ── Analytics state ────────────────────────────────────────────
  analyticsLoading = signal(true);
  analyticsError   = signal<string | null>(null);
  analytics        = signal<PlacementAnalytics | null>(null);

  // ── Filters & sort ─────────────────────────────────────────────
  searchQuery  = signal('');
  statusFilter = signal<PlacementStatus | 'All'>('All');
  dateRange    = signal<DateRange>('all');
  sortBy       = signal<SortOption>('newest');

  // ── Form state ────────────────────────────────────────────────
  showForm  = signal(false);
  formMode  = signal<'create' | 'edit'>('create');
  editingId = signal<string | null>(null);
  isSaving  = signal(false);
  formError = signal<string | null>(null);
  form: PlacementForm = this.blankForm();

  // ── Detail modal ──────────────────────────────────────────────
  detailApp = signal<PlacementApplication | null>(null);

  // ── Delete confirmation ────────────────────────────────────────
  deletingId = signal<string | null>(null);

  // ── Upcoming / overdue follow-ups ─────────────────────────────
  upcomingFollowUps = computed(() => {
    const now  = new Date();
    const apps = this.allApps();
    return apps
      .filter(a =>
        a.followUpDate &&
        ACTIVE_STATUSES.includes(a.status as PlacementStatus) &&
        new Date(a.followUpDate) > now
      )
      .sort((a, b) => new Date(a.followUpDate!).getTime() - new Date(b.followUpDate!).getTime())
      .slice(0, 5);
  });

  overdueFollowUps = computed(() => {
    const now = new Date();
    return this.allApps().filter(a =>
      a.followUpDate &&
      ACTIVE_STATUSES.includes(a.status as PlacementStatus) &&
      new Date(a.followUpDate) <= now
    );
  });

  // ── Filtered + sorted list ─────────────────────────────────────
  filteredApps = computed(() => {
    let apps = this.allApps();

    // Status filter
    const sf = this.statusFilter();
    if (sf !== 'All') apps = apps.filter(a => a.status === sf);

    // Date range filter (by applicationDate, fallback to createdAt)
    const dr  = this.dateRange();
    const now = new Date();
    if (dr !== 'all') {
      let cutoff: Date;
      if (dr === 'today') {
        cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      } else if (dr === '7d') {
        cutoff = new Date(now.getTime() - 7 * 86400000);
      } else if (dr === '30d') {
        cutoff = new Date(now.getTime() - 30 * 86400000);
      } else { // month
        cutoff = new Date(now.getFullYear(), now.getMonth(), 1);
      }
      apps = apps.filter(a => {
        const d = a.applicationDate ? new Date(a.applicationDate) : new Date(a.createdAt);
        return d >= cutoff;
      });
    }

    // Search filter
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      apps = apps.filter(a =>
        a.companyName.toLowerCase().includes(q) ||
        a.jobTitle.toLowerCase().includes(q)    ||
        (a.location || '').toLowerCase().includes(q)
      );
    }

    // Sort
    const sort = this.sortBy();
    const sorted = [...apps];
    if (sort === 'newest') {
      sorted.sort((a, b) => {
        const da = a.applicationDate ? new Date(a.applicationDate) : new Date(a.createdAt);
        const db = b.applicationDate ? new Date(b.applicationDate) : new Date(b.createdAt);
        return db.getTime() - da.getTime();
      });
    } else if (sort === 'oldest') {
      sorted.sort((a, b) => {
        const da = a.applicationDate ? new Date(a.applicationDate) : new Date(a.createdAt);
        const db = b.applicationDate ? new Date(b.applicationDate) : new Date(b.createdAt);
        return da.getTime() - db.getTime();
      });
    } else if (sort === 'company-az') {
      sorted.sort((a, b) => a.companyName.localeCompare(b.companyName));
    } else if (sort === 'company-za') {
      sorted.sort((a, b) => b.companyName.localeCompare(a.companyName));
    } else if (sort === 'followup') {
      sorted.sort((a, b) => {
        if (!a.followUpDate && !b.followUpDate) return 0;
        if (!a.followUpDate) return 1;
        if (!b.followUpDate) return -1;
        return new Date(a.followUpDate).getTime() - new Date(b.followUpDate).getTime();
      });
    }
    return sorted;
  });

  hasActiveFilters = computed(() =>
    this.statusFilter() !== 'All' ||
    this.dateRange() !== 'all'    ||
    this.searchQuery().trim() !== ''
  );

  constructor(private placementService: PlacementService) {}

  ngOnInit(): void {
    this.loadApplications();
    this.loadAnalytics();
  }

  // ── Load ──────────────────────────────────────────────────────
  loadApplications(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.placementService.getApplications().subscribe({
      next: (res) => {
        if (res.success) this.allApps.set(res.data.applications);
        else this.error.set('Unable to load placement applications.');
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Unable to load placement applications. Please try again.');
        this.isLoading.set(false);
      },
    });
  }

  loadAnalytics(): void {
    this.analyticsLoading.set(true);
    this.analyticsError.set(null);

    this.placementService.getAnalytics().subscribe({
      next: (res) => {
        if (res.success) this.analytics.set(res.data);
        else this.analyticsError.set('Unable to load analytics.');
        this.analyticsLoading.set(false);
      },
      error: () => {
        this.analyticsError.set('Unable to load analytics.');
        this.analyticsLoading.set(false);
      },
    });
  }

  // ── Filter helpers ─────────────────────────────────────────────
  clearFilters(): void {
    this.searchQuery.set('');
    this.statusFilter.set('All');
    this.dateRange.set('all');
    this.sortBy.set('newest');
  }

  setStatusFilter(s: PlacementStatus | 'All'): void { this.statusFilter.set(s); }
  setDateRange(d: DateRange): void { this.dateRange.set(d); }
  setSort(s: SortOption): void { this.sortBy.set(s); }

  // ── Form helpers ───────────────────────────────────────────────
  private blankForm(): PlacementForm {
    return {
      companyName: '', jobTitle: '', status: 'Applied',
      applicationUrl: '', applicationDate: '', followUpDate: '',
      location: '', notes: '',
    };
  }

  openCreate(): void {
    this.form = this.blankForm();
    this.editingId.set(null);
    this.formMode.set('create');
    this.formError.set(null);
    this.showForm.set(true);
  }

  openEdit(app: PlacementApplication): void {
    this.form = {
      companyName:     app.companyName,
      jobTitle:        app.jobTitle,
      status:          app.status,
      applicationUrl:  app.applicationUrl || '',
      applicationDate: app.applicationDate
        ? new Date(app.applicationDate).toISOString().split('T')[0] : '',
      followUpDate: app.followUpDate
        ? new Date(app.followUpDate).toISOString().split('T')[0] : '',
      location: app.location || '',
      notes:    app.notes    || '',
    };
    this.editingId.set(app._id);
    this.formMode.set('edit');
    this.formError.set(null);
    this.showForm.set(true);
    this.detailApp.set(null); // close detail if open
  }

  cancelForm(): void { this.showForm.set(false); this.formError.set(null); }

  // ── Detail modal ───────────────────────────────────────────────
  openDetail(app: PlacementApplication): void { this.detailApp.set(app); }
  closeDetail(): void { this.detailApp.set(null); }

  // ── Validation ─────────────────────────────────────────────────
  private isValidUrl(url: string): boolean {
    return !url || /^https?:\/\/.+/.test(url.trim());
  }

  // ── Save ───────────────────────────────────────────────────────
  saveForm(): void {
    const payload: PlacementForm = {
      companyName:     this.form.companyName.trim(),
      jobTitle:        this.form.jobTitle.trim(),
      status:          this.form.status,
      applicationUrl:  this.form.applicationUrl.trim(),
      applicationDate: this.form.applicationDate,
      followUpDate:    this.form.followUpDate,
      location:        this.form.location.trim(),
      notes:           this.form.notes.trim(),
    };

    if (!payload.companyName) { this.formError.set('Company name is required.'); return; }
    if (!payload.jobTitle)    { this.formError.set('Job title is required.'); return; }
    if (!this.allStatuses.includes(payload.status)) {
      this.formError.set('Please select a valid status.'); return;
    }
    if (payload.applicationUrl && !this.isValidUrl(payload.applicationUrl)) {
      this.formError.set('URL must start with http:// or https://'); return;
    }

    if (this.isSaving()) return;
    this.isSaving.set(true);
    this.formError.set(null);

    if (this.formMode() === 'create') {
      this.placementService.createApplication(payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.allApps.update(apps => [res.data.application, ...apps]);
            this.showForm.set(false);
            this.loadAnalytics();
          } else {
            this.formError.set('Failed to save application.');
          }
          this.isSaving.set(false);
        },
        error: (err) => {
          this.formError.set(err.error?.message || 'Failed to save application.');
          this.isSaving.set(false);
        },
      });
    } else {
      const id = this.editingId()!;
      this.placementService.updateApplication(id, payload).subscribe({
        next: (res) => {
          if (res.success) {
            const updated = res.data.application;
            this.allApps.update(apps => apps.map(a => a._id === id ? updated : a));
            // Refresh detail if it's open
            if (this.detailApp()?._id === id) this.detailApp.set(updated);
            this.showForm.set(false);
            this.loadAnalytics();
          } else {
            this.formError.set('Failed to update application.');
          }
          this.isSaving.set(false);
        },
        error: (err) => {
          this.formError.set(err.error?.message || 'Failed to update application.');
          this.isSaving.set(false);
        },
      });
    }
  }

  // ── Delete ─────────────────────────────────────────────────────
  confirmDelete(id: string): void { this.deletingId.set(id); }
  cancelDelete():             void { this.deletingId.set(null); }

  executeDelete(id: string): void {
    this.placementService.deleteApplication(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.allApps.update(apps => apps.filter(a => a._id !== id));
          if (this.detailApp()?._id === id) this.detailApp.set(null);
          this.loadAnalytics();
        }
        this.deletingId.set(null);
      },
      error: () => { this.deletingId.set(null); },
    });
  }

  // ── Utility helpers exposed to template ────────────────────────
  getStatusMeta(status: string) {
    return STATUS_META[status as PlacementStatus] ?? { label: status, css: 'ps--applied' };
  }

  getPipelineIndex(status: PlacementStatus): number {
    return PIPELINE_STATUSES.indexOf(status);
  }

  isTerminal(status: PlacementStatus): boolean {
    return TERMINAL_STATUSES.includes(status);
  }

  isFollowUpOverdue(app: PlacementApplication): boolean {
    if (!app.followUpDate) return false;
    if (!ACTIVE_STATUSES.includes(app.status as PlacementStatus)) return false;
    return new Date(app.followUpDate) <= new Date();
  }

  openLink(url: string): void {
    const a   = document.createElement('a');
    a.href    = url;
    a.target  = '_blank';
    a.rel     = 'noopener noreferrer';
    a.click();
  }

  // ── Status history display (newest first) ─────────────────────
  getHistoryDesc(app: PlacementApplication) {
    const history = app.statusHistory || [];
    return [...history].reverse();
  }
}
