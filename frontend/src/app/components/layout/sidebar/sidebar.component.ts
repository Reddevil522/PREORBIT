// ============================================================
// PREORBIT — Sidebar Component (Prompt 8 — enhanced)
// ============================================================
// Desktop/tablet navigation sidebar.
//
// Enhancements (Prompt 8):
//   - Desktop collapse toggle (full ↔ compact)
//   - Keyboard: Escape closes mobile sidebar
//   - HostListener for Escape key
//   - Compact mode persisted in localStorage
// ============================================================

import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  signal,
  computed,
  HostListener,
  OnInit,
  ElementRef,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService }  from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

interface NavItem {
  label: string;
  route: string;
  icon:  string;   // Phosphor icon class e.g. 'ph-gauge'
  iconFill?: string; // optional filled variant e.g. 'ph-fill ph-gauge'
}

const COMPACT_KEY = 'preorbit_sidebar_compact';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {

  // ── Inputs from AppShell ───────────────────────────────────
  @Input() isOpen = false;

  // ── Output: request parent to close (mobile) ───────────────
  @Output() closeRequest = new EventEmitter<void>();

  // ── Output: compact state changed ─────────────────────────
  @Output() compactChange = new EventEmitter<boolean>();

  // ── Services ───────────────────────────────────────────────
  protected readonly auth  = inject(AuthService);
  protected readonly theme = inject(ThemeService);

  // ── Desktop compact state ──────────────────────────────────
  readonly isCompact = signal(false);

  ngOnInit(): void {
    // Restore desktop compact preference
    const stored = localStorage.getItem(COMPACT_KEY);
    if (stored === 'true') this.isCompact.set(true);
  }

  constructor(private elementRef: ElementRef) {}

  // ── Keyboard: Escape closes mobile sidebar ─────────────────
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) {
      this.closeRequest.emit();
    }
  }

  // ── Auto collapse/expand on click ──────────────────────────
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Only apply hover/click logic for desktop (compact mode)
    if (window.innerWidth <= 768) return;

    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    
    if (clickedInside && this.isCompact()) {
      this.setCompactState(false); // Expand
    } else if (!clickedInside && !this.isCompact()) {
      this.setCompactState(true);  // Collapse
    }
  }

  private setCompactState(compact: boolean): void {
    this.isCompact.set(compact);
    localStorage.setItem(COMPACT_KEY, String(compact));
    this.compactChange.emit(compact);
  }

  // ── Navigation items ──────────────────────────────────────
  protected readonly navItems = computed(() => {
    const items: NavItem[] = [
      { label: 'Dashboard', route: '/dashboard', icon: 'ph ph-gauge'         },
      { label: 'Java DSA',  route: '/java-dsa',  icon: 'ph ph-code'          },
      { label: 'Aptitude',  route: '/aptitude',  icon: 'ph ph-brain'         },
      { label: 'Core CS',   route: '/core-cs',   icon: 'ph ph-cpu' },
    ];
    
    if (this.auth.isAdmin()) {
      items.unshift({ label: 'Admin', route: '/admin', icon: 'ph ph-shield-star' });
    }
    
    return items;
  });

  // ── Close sidebar (mobile nav click) ──────────────────────
  onNavClick(): void {
    this.closeRequest.emit();
  }

  // ── Logout ─────────────────────────────────────────────────
  onLogout(): void {
    this.auth.logout();
  }
}
