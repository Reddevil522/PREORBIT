// ============================================================
// PREORBIT — Glass Surface Component (Shared)
// ============================================================
// A reusable translucent surface (card/panel) with glassmorphism.
//
// Usage:
//   <app-glass-surface [elevated]="true" [padding]="'lg'">
//     <!-- content -->
//   </app-glass-surface>
//
// Content projected via <ng-content>.
// ============================================================

import { Component, Input } from '@angular/core';

export type GlassPadding  = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type GlassRadius   = 'md' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'app-glass-surface',
  imports: [],
  templateUrl: './glass-surface.component.html',
  styleUrl: './glass-surface.component.css',
})
export class GlassSurfaceComponent {

  /** Extra elevation (more shadow + slight border accent) */
  @Input() elevated = false;

  /** Inner padding preset */
  @Input() padding: GlassPadding = 'md';

  /** Border radius preset */
  @Input() radius: GlassRadius = 'lg';

  /** Whether to apply backdrop blur (disable for non-overlapping use) */
  @Input() blur = true;

  /** Additional CSS class(es) for the host */
  @Input() extraClass = '';
}
