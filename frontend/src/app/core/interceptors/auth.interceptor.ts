// ============================================================
// PREORBIT — JWT Auth Interceptor (Functional)
// ============================================================
// Automatically attaches the Bearer token to every outgoing
// HTTP request when a token is available in localStorage.
//
// Wired via app.config.ts → provideHttpClient(withInterceptors([authInterceptor]))
// ============================================================

import { HttpInterceptorFn } from '@angular/common/http';
import { inject }            from '@angular/core';
import { AuthService }       from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth  = inject(AuthService);
  const token = auth.getToken();

  // Only attach token if one exists and request doesn't already have one
  if (token && !req.headers.has('Authorization')) {
    const authorizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authorizedReq);
  }

  return next(req);
};
