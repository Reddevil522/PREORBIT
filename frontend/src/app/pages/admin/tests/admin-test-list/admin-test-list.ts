import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminTestService, PracticeTest } from '../../../../core/services/admin-test.service';

export interface ChapterGroup {
  chapterSlug: string;
  chapterName: string;
  module: string;
  subject?: string;
  section?: string;
  tests: PracticeTest[];
  totalTests: number;
  availableTests: number;
  lockedTests: number;
  status: 'Complete' | 'Incomplete';
  requiredTests: number;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-admin-test-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-test-list.html',
  styleUrls: ['./admin-test-list.css']
})
export class AdminTestList implements OnInit {
  allTests: PracticeTest[] = [];
  chapters: ChapterGroup[] = [];

  // loading = true only when there is NO cached data at all (very first load).
  // Never set to true if service cache already has data — renders instantly.
  loading = false;

  // Shown as a subtle indicator while a silent background refresh is running.
  backgroundRefreshing = false;

  error = '';
  // Non-blocking message shown when background refresh fails but cached data exists.
  backgroundError = '';

  // Filters & Search
  searchQuery = '';
  moduleFilter = '';
  subjectFilter = '';
  chapterFilter = '';
  statusFilter = '';
  availabilityFilter = '';

  // Options for dynamic dropdowns
  availableSubjects: string[] = [];
  availableChapters: { slug: string, name: string }[] = [];

  // Custom Dropdown State
  activeDropdown: string | null = null;

  // Authoritative expansion state — stored independently of chapter object lifecycle.
  // Never reset by applyFilters() or background refresh. toggleChapter() is the only writer.
  private expandedChapterSlugs = new Set<string>();

  // Deletion State
  showDeleteModal = false;
  testToDelete: PracticeTest | null = null;
  isDeleting = false;
  deleteError = '';
  deleteSuccessMessage = '';

  // Updating Availability State
  updatingTestId: string | null = null;
  availabilityError = '';

  constructor(
    private adminTestService: AdminTestService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('[MANAGE-TESTS] Component initialized');
    this.initLoad();
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.activeDropdown = null;
  }

  // ── Initialization ──────────────────────────────────────────────────────

  private initLoad(): void {
    const cached = this.adminTestService.getCachedTests();

    if (cached !== null) {
      // Cache HIT — apply overrides then render immediately, silently refresh in background
      console.log('[MANAGE-TESTS] Cache available = true — rendering instantly');
      this.allTests = this.adminTestService.applyOverrides(cached);
      this.extractFilterOptions();
      this.applyFilters();
      this.loading = false;
      this.loadTestsFromServer(true);
    } else {
      // Cache MISS — first-ever load, show minimal loading indicator
      console.log('[MANAGE-TESTS] Cache available = false — fetching from server');
      this.loading = true;
      this.loadTestsFromServer(false);
    }
  }

  /**
   * Fetches all tests from the server.
   * @param isBackground When true, does not touch `loading` and does not block UI.
   */
  loadTestsFromServer(isBackground: boolean): void {
    if (isBackground) {
      this.backgroundRefreshing = true;
    }
    this.error = '';
    this.backgroundError = '';

    console.log('[MANAGE-TESTS] API request started');

    // Fetch all tests (limit=0 to ignore pagination on backend)
    this.adminTestService.getTests(1, 0, '', '', '', '', 'newest').subscribe({
      next: (res) => {
        console.log('[MANAGE-TESTS] API response received');

        try {
          const freshTests = res.data.tests || [];

          // Apply user intent overrides unconditionally
          const mergedTests = this.adminTestService.applyOverrides(freshTests);

          // Write merged result to singleton service cache
          this.adminTestService.setCachedTests(mergedTests);

          this.allTests = mergedTests;
          this.extractFilterOptions();
          this.applyFilters();

          console.log('[MANAGE-TESTS] Rendering chapters');
          console.log(`[MANAGE-TESTS] chapters count = ${this.chapters.length}`);
          console.log(`[MANAGE-TESTS] tests count = ${this.allTests.length}`);

        } catch (processError) {
          console.error('[MANAGE-TESTS] Data processing error:', processError);
        } finally {
          this.loading = false;
          this.backgroundRefreshing = false;
          console.log('[MANAGE-TESTS] Loading completed');
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('[MANAGE-TESTS] API error:', err);
        this.loading = false;
        this.backgroundRefreshing = false;
        if (isBackground) {
          // Cached data still shown — non-blocking warning
          this.backgroundError = 'Unable to refresh tests. Showing last loaded data.';
          setTimeout(() => {
            this.backgroundError = '';
            this.cdr.detectChanges();
          }, 5000);
        } else {
          // No cache, no data
          this.error = 'Unable to load tests.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  extractFilterOptions(): void {
    const subjects = new Set<string>();
    const chaptersMap = new Map<string, string>();

    this.allTests.forEach(t => {
      if (this.moduleFilter && t.module !== this.moduleFilter) return;

      if (t.subject) subjects.add(t.subject);
      if (t.section) subjects.add(t.section);

      if (this.subjectFilter && t.subject !== this.subjectFilter && t.section !== this.subjectFilter) return;

      if (t.chapterSlug) {
        chaptersMap.set(t.chapterSlug, t.chapterName || t.chapterSlug);
      }
    });

    this.availableSubjects = Array.from(subjects).sort();
    this.availableChapters = Array.from(chaptersMap.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Applies current filters and rebuilds `chapters`.
   * Expansion state is always read from `this.expandedChapterSlugs` — the authoritative Set.
   */
  applyFilters(): void {

    let filtered = [...this.allTests];

    // Search
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        (t.testName && t.testName.toLowerCase().includes(q)) ||
        (t.testId && t.testId.toLowerCase().includes(q)) ||
        (t.chapterSlug && t.chapterSlug.toLowerCase().includes(q))
      );
    }

    // Filters
    if (this.moduleFilter) {
      filtered = filtered.filter(t => t.module === this.moduleFilter);
    }
    if (this.subjectFilter) {
      filtered = filtered.filter(t => t.subject === this.subjectFilter || t.section === this.subjectFilter);
    }
    if (this.chapterFilter) {
      filtered = filtered.filter(t => t.chapterSlug === this.chapterFilter);
    }
    if (this.statusFilter) {
      filtered = filtered.filter(t => t.status.toLowerCase() === this.statusFilter.toLowerCase());
    }
    if (this.availabilityFilter) {
      if (this.availabilityFilter === 'Available') filtered = filtered.filter(t => t.isAvailable);
      if (this.availabilityFilter === 'Locked') filtered = filtered.filter(t => !t.isAvailable && t.status !== 'incomplete' && t.status !== 'draft');
      if (this.availabilityFilter === 'Incomplete') filtered = filtered.filter(t => t.status === 'incomplete');
    }

    // Group by chapter
    const groups = new Map<string, ChapterGroup>();

    filtered.forEach(t => {
      if (!groups.has(t.chapterSlug)) {
        const requiredTests = (t.module === 'core-cs' || t.module === 'aptitude') ? 4 : 0;
        groups.set(t.chapterSlug, {
          chapterSlug: t.chapterSlug,
          chapterName: t.chapterName || t.chapterSlug,
          module: t.module,
          subject: t.subject,
          section: t.section,
          tests: [],
          totalTests: 0,
          availableTests: 0,
          lockedTests: 0,
          status: 'Incomplete',
          requiredTests,
          // Always read from the authoritative Set — never stale
          isExpanded: this.expandedChapterSlugs.has(t.chapterSlug)
        });
      }

      const group = groups.get(t.chapterSlug)!;
      group.tests.push(t);
      group.totalTests++;
      if (t.isAvailable) group.availableTests++;
      else if (t.status === 'locked') group.lockedTests++;
    });

    // Finalize groups
    this.chapters = Array.from(groups.values());
    this.chapters.forEach(c => {
      c.tests.sort((a, b) => {
        if (a.testNumber !== undefined && b.testNumber !== undefined) return a.testNumber - b.testNumber;
        if (a.testNumber !== undefined) return -1;
        if (b.testNumber !== undefined) return 1;
        return (a.testName || '').localeCompare(b.testName || '');
      });

      if (c.requiredTests > 0) {
        c.status = c.totalTests >= c.requiredTests ? 'Complete' : 'Incomplete';
      } else {
        c.status = 'Complete';
      }
    });

    this.chapters.sort((a, b) => a.chapterName.localeCompare(b.chapterName));
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.extractFilterOptions();
    this.applyFilters();
  }

  // ── Dropdown Controls ───────────────────────────────────────────────────

  toggleDropdown(dropdownName: string, event: Event): void {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === dropdownName ? null : dropdownName;
  }

  setFilter(filterName: string, value: string, event: Event): void {
    event.stopPropagation();
    if (filterName === 'module') {
      this.moduleFilter = value;
      this.subjectFilter = '';
      this.chapterFilter = '';
    }
    if (filterName === 'subject') {
      this.subjectFilter = value;
      this.chapterFilter = '';
    }
    if (filterName === 'chapter') this.chapterFilter = value;
    if (filterName === 'status') this.statusFilter = value;
    if (filterName === 'availability') this.availabilityFilter = value;

    this.activeDropdown = null;
    this.onFilterChange();
  }

  getFilterLabel(filter: string): string {
    switch (filter) {
      case 'module': return this.moduleFilter
        ? (this.moduleFilter === 'java-dsa' ? 'Java DSA' : this.moduleFilter === 'core-cs' ? 'Core CS' : 'Aptitude')
        : 'All Modules';
      case 'subject': return this.subjectFilter || 'All Subjects';
      case 'chapter': return this.chapterFilter
        ? (this.availableChapters.find(c => c.slug === this.chapterFilter)?.name || this.chapterFilter)
        : 'All Chapters';
      case 'status': return this.statusFilter || 'All Statuses';
      case 'availability': return this.availabilityFilter || 'All Availability';
      default: return '';
    }
  }

  formatModule(module: string): string {
    if (!module) return '';
    return module.replace(/-/g, ' ').toUpperCase();
  }

  // ── Chapter Expansion ──────────────────────────────────────────────────

  toggleChapter(chapter: ChapterGroup): void {
    const slug = chapter.chapterSlug;

    // Toggle the authoritative Set
    if (this.expandedChapterSlugs.has(slug)) {
      this.expandedChapterSlugs.delete(slug);
    } else {
      this.expandedChapterSlugs.add(slug);
    }

    const newState = this.expandedChapterSlugs.has(slug);

    // Always update the LIVE object in this.chapters (the passed reference may be stale
    // if a background refresh recreated the chapters array since the last render)
    const live = this.chapters.find(c => c.chapterSlug === slug);
    if (live) live.isExpanded = newState;

    // Also mirror onto the passed reference in case it IS the live object
    chapter.isExpanded = newState;
  }

  trackByChapterSlug(index: number, chapter: ChapterGroup): string {
    return chapter.chapterSlug;
  }

  // ── Navigation ─────────────────────────────────────────────────────────

  viewTest(id: string, event?: Event): void {
    if (event) event.stopPropagation();
    this.router.navigate(['/admin/tests', id]);
  }

  // ── Availability Toggle ────────────────────────────────────────────────

  toggleAvailability(test: PracticeTest, event: Event): void {
    event.stopPropagation();
    if (this.updatingTestId || test.status === 'incomplete' || test.status === 'draft') return;

    const newAvailability = !test.isAvailable;
    this.updatingTestId = test._id;
    this.availabilityError = '';

    this.adminTestService.updateTestAvailability(test._id, newAvailability).subscribe({
      next: () => {
        this.updatingTestId = null;

        // Optimistic update in local array
        const t = this.allTests.find(x => x._id === test._id);
        if (t) {
          t.isAvailable = newAvailability;
          t.status = newAvailability ? 'available' : 'locked';
        }

        // Mirror update in service cache so next navigation reflects this
        this.adminTestService.patchCachedTest(test._id, {
          isAvailable: newAvailability,
          status: newAvailability ? 'available' : 'locked'
        });

        this.applyFilters();
      },
      error: (err) => {
        this.updatingTestId = null;
        this.availabilityError = 'Unable to update test availability. ' + (err.error?.message || '');
        setTimeout(() => this.availabilityError = '', 4000);
      }
    });
  }

  // ── Delete ─────────────────────────────────────────────────────────────

  openDeleteModal(test: PracticeTest, event: Event): void {
    event.stopPropagation();
    if (this.isDeleting) return;
    this.testToDelete = test;
    this.showDeleteModal = true;
    this.deleteError = '';
    this.deleteSuccessMessage = '';
  }

  cancelDelete(): void {
    if (this.isDeleting) return;
    this.showDeleteModal = false;
    this.testToDelete = null;
    this.deleteError = '';
  }

  confirmDelete(): void {
    if (!this.testToDelete || this.isDeleting) return;

    this.isDeleting = true;
    this.deleteError = '';
    this.deleteSuccessMessage = '';

    const idToDelete = this.testToDelete._id;

    this.adminTestService.deleteTest(idToDelete).subscribe({
      next: () => {
        this.isDeleting = false;
        this.showDeleteModal = false;
        this.testToDelete = null;
        this.deleteSuccessMessage = 'Test deleted successfully.';

        // Remove from local array immediately
        this.allTests = this.allTests.filter(t => t._id !== idToDelete);

        // Mirror removal in service cache so next navigation reflects this
        this.adminTestService.removeCachedTest(idToDelete);

        this.applyFilters();

        setTimeout(() => this.deleteSuccessMessage = '', 4000);
      },
      error: (err) => {
        this.isDeleting = false;
        this.deleteError = 'Unable to delete test. No data was deleted.';
        console.error('Delete error:', err);
      }
    });
  }
}
