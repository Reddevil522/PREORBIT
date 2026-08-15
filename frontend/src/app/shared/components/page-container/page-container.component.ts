// ============================================================
// PREORBIT — Page Container Component (Shared)
// ============================================================
// Provides consistent layout constraints for page content:
//   - Max width capping
//   - Horizontal padding (responsive)
//   - Vertical spacing
//
// Usage:
//   <app-page-container>
//     <!-- page content -->
//   </app-page-container>
//
//   <app-page-container [maxWidth]="'narrow'" [vPadding]="false">
//     <!-- tight page content -->
//   </app-page-container>
// ============================================================

import { Component, Input } from '@angular/core';

export type PageMaxWidth = 'narrow' | 'default' | 'wide' | 'full';

@Component({
  selector: 'app-page-container',
  imports: [],
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.css',
})
export class PageContainerComponent {

  /** Max-width variant for the content area */
  @Input() maxWidth: PageMaxWidth = 'default';

  /** Whether to apply standard vertical (top/bottom) padding */
  @Input() vPadding = true;
}
