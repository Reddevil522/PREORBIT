// ============================================================
// PREORBIT — JWT Auth Interceptor (Functional)
// ============================================================
// Automatically attaches the Bearer token to every outgoing
// HTTP request when a token is available in localStorage.
//
// Wired via app.config.ts → provideHttpClient(withInterceptors([authInterceptor]))
// ============================================================

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject }            from '@angular/core';
import { AuthService }       from '../services/auth.service';
import { catchError }        from 'rxjs/operators';
import { throwError }        from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth  = inject(AuthService);
  const token = auth.getToken();

  let authorizedReq = req;
  // Only attach token if one exists and request doesn't already have one
  if (token && !req.headers.has('Authorization')) {
    authorizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authorizedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // ONLY logout on genuine 401 Unauthorized
      if (error.status === 401) {
        auth.logout();
      }
      return throwError(() => error);
    })
  );
};
