// ============================================================
// PREORBIT — App Shell Component (Prompt 8 enhanced)
// ============================================================
// The authenticated application layout wrapper.
// All protected pages render inside this shell.
//
// Responsibilities:
//   - Provides the grid layout (sidebar + header + content)
//   - Manages mobile sidebar open/close state
//   - Syncs compact sidebar state for grid column sizing
// ============================================================

import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet }      from '@angular/router';
import { SidebarComponent }  from '../sidebar/sidebar.component';
import { HeaderComponent }   from '../header/header.component';

const COMPACT_KEY = 'preorbit_sidebar_compact';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.css',
})
export class AppShellComponent implements OnInit {

  // ── Mobile sidebar state ───────────────────────────────────
  readonly isSidebarOpen = signal(false);

  // ── Compact sidebar state (mirrors sidebar signal for grid) ─
  readonly isSidebarCompact = signal(false);

  ngOnInit(): void {
    // Sync with sidebar's stored compact preference
    const stored = localStorage.getItem(COMPACT_KEY);
    if (stored === 'true') this.isSidebarCompact.set(true);
  }

  openSidebar(): void   { this.isSidebarOpen.set(true);  }
  closeSidebar(): void  { this.isSidebarOpen.set(false); }
  toggleSidebar(): void { this.isSidebarOpen.update(v => !v); }

  // Called when sidebar emits a compact toggle
  onSidebarCompactChange(compact: boolean): void {
    this.isSidebarCompact.set(compact);
  }
}
