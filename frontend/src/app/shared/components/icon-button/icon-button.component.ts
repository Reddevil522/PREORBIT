// ============================================================
// PREORBIT — Icon Button Component (Shared)
// ============================================================
// A reusable, accessible icon-only button.
//
// Usage:
//   <app-icon-button
//     icon="ph-sun"
//     label="Toggle theme"
//     (clicked)="onToggle()"
//   />
//
// Supports: disabled state, variant (ghost/subtle/filled),
//           size (sm / md / lg)
// ============================================================

import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

export type IconButtonVariant = 'ghost' | 'subtle' | 'filled';
export type IconButtonSize    = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css',
})
export class IconButtonComponent {

  /** Phosphor icon class (without 'ph' prefix if using ph-fill, etc.) */
  @Input({ required: true }) icon!: string;

  /** Accessible label — used for aria-label and title tooltip */
  @Input({ required: true }) label!: string;

  /** Visual variant */
  @Input() variant: IconButtonVariant = 'ghost';

  /** Size */
  @Input() size: IconButtonSize = 'md';

  /** Disabled state */
  @Input() disabled = false;

  /** Emitted on click (will not fire when disabled) */
  @Output() clicked = new EventEmitter<void>();

  onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.clicked.emit();
  }
}
