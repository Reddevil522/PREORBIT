// ============================================================
// PREORBIT — Admin Guard
// ============================================================
// Protects routes that require admin role specifically.
//
// Applied to: /admin and all /admin/* sub-routes.
//
// Behavior:
//   - If role === 'admin' → allow
//   - If authenticated but not admin → redirect to /dashboard
//   - If not authenticated at all → redirect to /login
//
// Will be wired to routes in a later prompt.
// ============================================================

import { inject }       from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService }  from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  // Not logged in at all
  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  // Logged in but not admin
  if (!auth.isAdmin()) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
