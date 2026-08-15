// ============================================================
// PREORBIT — Auth Service (Angular)
// ============================================================

import { Injectable, signal, computed } from '@angular/core';
import { HttpClient }                   from '@angular/common/http';
import { Router }                       from '@angular/router';
import { tap }                          from 'rxjs/operators';

import { environment }                  from '../../../environments/environment';

const TOKEN_KEY = 'preorbit_token';
const USER_KEY  = 'preorbit_user';
const API_BASE  = environment.apiUrl;

export interface AuthUser {
  name:  string;
  email: string;
  role:  string;
}

export interface AuthResponse {
  success: boolean;
  token:   string;
  user:    AuthUser;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  // ── Reactive state (signal-based) ───────────────────────────
  private readonly _currentUser = signal<AuthUser | null>(
    this.loadStoredUser()
  );

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn  = computed(() => this._currentUser() !== null);
  readonly isAdmin     = computed(() => this._currentUser()?.role === 'admin');
  readonly userRole    = computed(() => this._currentUser()?.role ?? null);

  constructor(
    private readonly http:   HttpClient,
    private readonly router: Router,
  ) {}

  // ── Register ─────────────────────────────────────────────────
  register(name: string, email: string, password: string) {
    return this.http.post<RegisterResponse>(
      `${API_BASE}/auth/register`,
      { name, email, password }
    );
  }

  // ── Login ────────────────────────────────────────────────────
  login(email: string, password: string) {
    return this.http.post<AuthResponse>(
      `${API_BASE}/auth/login`,
      { email, password }
    ).pipe(
      tap((res) => {
        if (res.success && res.token) {
          localStorage.setItem(TOKEN_KEY, res.token);
          localStorage.setItem(USER_KEY,  JSON.stringify(res.user));
          this._currentUser.set(res.user);
        }
      })
    );
  }

  // ── Logout ───────────────────────────────────────────────────
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  // ── Token (used by JWT interceptor) ──────────────────────────
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  // ── Session restore: load user from localStorage on app boot ─
  private loadStoredUser(): AuthUser | null {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return null;

      // Check token expiry from JWT payload (handle Base64Url encoding)
      const base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      const payload = JSON.parse(atob(base64));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        return null;
      }

      // Prefer the full user object stored at login (includes name)
      const stored = localStorage.getItem(USER_KEY);
      if (stored) return JSON.parse(stored) as AuthUser;

      // Fallback: reconstruct minimal user from JWT payload
      return {
        name:  payload.name  ?? '',
        email: payload.email ?? '',
        role:  payload.role  ?? 'user',
      };
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return null;
    }
  }
}
