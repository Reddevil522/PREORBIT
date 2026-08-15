import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule }        from '@angular/forms';
import { AuthService }        from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // ── Form fields ─────────────────────────────────────────────
  name            = '';
  email           = '';
  password        = '';
  confirmPassword = '';

  // ── UI state ────────────────────────────────────────────────
  readonly isLoading      = signal(false);
  readonly errorMessage   = signal('');
  readonly successMessage = signal('');
  readonly showPassword   = signal(false);
  readonly showConfirm    = signal(false);

  constructor(
    private readonly auth:   AuthService,
    private readonly router: Router,
  ) {}

  togglePassword(): void { this.showPassword.update(v => !v); }
  toggleConfirm():  void { this.showConfirm.update(v => !v);  }

  onSubmit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    // ── Client-side validation ───────────────────────────────
    if (!this.name.trim()) {
      this.errorMessage.set('Full name is required.');
      return;
    }
    if (!this.email.trim()) {
      this.errorMessage.set('Email address is required.');
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    this.isLoading.set(true);

    this.auth.register(this.name.trim(), this.email.trim(), this.password).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.successMessage.set('Account created! Redirecting to sign in…');
          setTimeout(() => this.router.navigate(['/login']), 1800);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg = err?.error?.message ?? 'Registration failed. Please try again.';
        this.errorMessage.set(msg);
      },
    });
  }
}
