import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule }        from '@angular/forms';
import { AuthService }        from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // ── Form fields ─────────────────────────────────────────────
  email    = '';
  password = '';

  // ── UI state ────────────────────────────────────────────────
  readonly isLoading     = signal(false);
  readonly errorMessage  = signal('');
  readonly showPassword  = signal(false);

  constructor(
    private readonly auth:   AuthService,
    private readonly router: Router,
  ) {}

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  onSubmit(): void {
    // Clear previous error
    this.errorMessage.set('');

    // Basic client-side validation
    if (!this.email.trim() || !this.password) {
      this.errorMessage.set('Please enter your email and password.');
      return;
    }

    this.isLoading.set(true);

    this.auth.login(this.email.trim(), this.password).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          // Role-based redirect
          const destination = res.user.role === 'admin' ? '/admin' : '/dashboard';
          this.router.navigate([destination]);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg = err?.error?.message ?? 'Login failed. Please try again.';
        this.errorMessage.set(msg);
      },
    });
  }
}
