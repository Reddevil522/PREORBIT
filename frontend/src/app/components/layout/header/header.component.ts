// ============================================================
// PREORBIT — Header Component (Prompt 8 enhanced)
// ============================================================
// Top application header — now uses IconButtonComponent.
//
// Prompt 8 enhancements:
//   - Imports and uses IconButtonComponent for action buttons
//   - Improved role display with badge styling
//   - Keyboard-accessible throughout
// ============================================================

import {
  Component,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService }  from '../../../core/services/auth.service';
import { filter, map, startWith } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';

// Route → display title mapping
const ROUTE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/java-dsa':  'Java DSA',
  '/aptitude':  'Aptitude',
  '/core-cs':   'Core CS',
  '/admin':     'Admin',
};

@Component({
  selector: 'app-header',
  imports: [IconButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  // ── Output: mobile hamburger toggle ───────────────────────
  @Output() menuToggle = new EventEmitter<void>();

  // ── Services ───────────────────────────────────────────────
  protected readonly theme = inject(ThemeService);
  protected readonly auth  = inject(AuthService);
  private  readonly router = inject(Router);

  // ── Active page title (derived from route) ─────────────────
  protected readonly pageTitle = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((e: NavigationEnd) => ROUTE_TITLES[e.urlAfterRedirects] ?? 'PREORBIT'),
      startWith(ROUTE_TITLES[this.router.url] ?? 'PREORBIT'),
    ),
    { initialValue: ROUTE_TITLES[this.router.url] ?? 'PREORBIT' }
  );

  // ── Actions ────────────────────────────────────────────────
  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  onThemeToggle(): void {
    this.theme.toggleTheme();
  }
}
