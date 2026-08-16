import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminTestService, ImportHistory } from '../../../../core/services/admin-test.service';

@Component({
  selector: 'app-admin-history',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-history.html',
  styleUrls: ['./admin-history.css']
})
export class AdminHistoryComponent implements OnInit {
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  
  historyList = signal<ImportHistory[]>([]);
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 1;

  // Filters
  filterModule = '';
  filterTestId = '';
  filterStatus = '';

  constructor(private adminTestService: AdminTestService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory(page: number = 1) {
    this.isLoading.set(true);
    this.error.set(null);
    this.currentPage = page;

    this.adminTestService.getImportHistory(
      this.currentPage,
      this.pageSize,
      this.filterModule,
      '', // subject
      '', // chapterSlug
      this.filterTestId,
      this.filterStatus
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.historyList.set(res.data.imports);
          this.totalRecords = res.data.pagination.total;
          this.totalPages = res.data.pagination.totalPages;
        } else {
          this.error.set(res.message);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load import history', err);
        this.error.set('Failed to connect to the server.');
        this.isLoading.set(false);
      }
    });
  }

  applyFilters() {
    this.loadHistory(1);
  }

  resetFilters() {
    this.filterModule = '';
    this.filterTestId = '';
    this.filterStatus = '';
    this.loadHistory(1);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadHistory(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadHistory(this.currentPage + 1);
    }
  }
}
