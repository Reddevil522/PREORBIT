import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // ── UI States ───────────────────────────────────────────────
  readonly isFlipped = signal(false);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);

  // ── Login Fields ────────────────────────────────────────────
  email = '';
  password = '';

  // ── Register Fields ─────────────────────────────────────────
  regName = '';
  regEmail = '';
  regPassword = '';
  regConfirmPassword = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) { }

  toggleFlip(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.isFlipped.update(v => !v);
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  toggleConfirm(): void {
    this.showConfirmPassword.update(v => !v);
  }

  // ── Login Handler ───────────────────────────────────────────
  onLoginSubmit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (!this.email.trim() || !this.password) {
      this.errorMessage.set('Please enter your email and password.');
      return;
    }

    this.isLoading.set(true);

    this.auth.login(this.email.trim(), this.password).subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        if (res?.success) {
          const destination = res.user?.role === 'admin' ? '/admin' : '/dashboard';
          this.router.navigate([destination]);
        }
      },
      error: (err: any) => {
        this.isLoading.set(false);
        const msg = err?.error?.message ?? 'Login failed. Please try again.';
        this.errorMessage.set(msg);
      },
    });
  }

  // ── Register Handler ────────────────────────────────────────
  onRegisterSubmit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (!this.regName.trim() || !this.regEmail.trim() || !this.regPassword || !this.regConfirmPassword) {
      this.errorMessage.set('Please fill in all fields.');
      return;
    }

    if (this.regPassword !== this.regConfirmPassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    if (this.regPassword.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters.');
      return;
    }

    this.isLoading.set(true);

    if (typeof (this.auth as any).register === 'function') {
      (this.auth as any).register(this.regName.trim(), this.regEmail.trim(), this.regPassword).subscribe({
        next: (res: any) => {
          this.isLoading.set(false);
          if (res?.success) {
            this.successMessage.set('Account created successfully! Redirecting...');
            setTimeout(() => {
              const destination = res.user?.role === 'admin' ? '/admin' : '/dashboard';
              this.router.navigate([destination]);
            }, 1200);
          }
        },
        error: (err: any) => {
          this.isLoading.set(false);
          const msg = err?.error?.message ?? 'Registration failed. Please try again.';
          this.errorMessage.set(msg);
        }
      });
    } else {
      this.isLoading.set(false);
      this.successMessage.set('Registration successful! Please sign in.');
      setTimeout(() => this.toggleFlip(), 1200);
    }
  }
}