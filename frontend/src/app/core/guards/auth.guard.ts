// ============================================================
// PREORBIT — Auth Guard
// ============================================================
// Protects routes that require any authenticated user.
//
// Applied to: /dashboard, /java-dsa, /aptitude, /core-cs, etc.
//
// Behavior:
//   - If user is logged in (valid token in localStorage) → allow
//   - If not logged in → redirect to /login
//
// Will be wired to routes in a later prompt.
// ============================================================

import { inject }       from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService }  from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // Not authenticated — redirect to login
  return router.createUrlTree(['/login']);
};
