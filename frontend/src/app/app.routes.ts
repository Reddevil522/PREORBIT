// ============================================================
// PREORBIT — Application Routes
// ============================================================
// Routing strategy:
//
//   Public routes  → render directly (no shell)
//   Protected routes → render inside AppShellComponent
//
// Guards applied:
//   authGuard  — requires any logged-in user
//   adminGuard — requires role === 'admin'
// ============================================================

import { Routes }     from '@angular/router';
import { authGuard }  from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [

  // ── Default redirect ──────────────────────────────────────
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // ── Authentication (public — no shell) ───────────────────
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
    title: 'Sign In — PREORBIT',
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    title: 'Create Account — PREORBIT',
  },

  // ── Authenticated shell (layout wrapper) ─────────────────
  // AppShellComponent renders Sidebar + Header + <router-outlet>.
  // All protected child routes appear inside the shell content area.
  {
    path: '',
    loadComponent: () =>
      import('./components/layout/app-shell/app-shell.component').then(
        (m) => m.AppShellComponent
      ),
    canActivate: [authGuard],
    children: [

      // ── Dashboard ───────────────────────────────────────
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        title: 'Dashboard — PREORBIT',
      },

      // ── Java DSA ────────────────────────────────────────
      {
        path: 'java-dsa',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/java-dsa/java-dsa/java-dsa.component').then(
            (m) => m.JavaDsaComponent
          ),
        title: 'Java DSA — PREORBIT',
      },
      {
        path: 'java-dsa/theory',
        loadComponent: () =>
          import('./pages/java-dsa/theory/java-dsa-theory.component').then(
            (m) => m.JavaDsaTheoryComponent
          ),
        title: 'Java DSA Theory — PREORBIT',
      },
      {
        path: 'java-dsa/tests',
        loadComponent: () =>
          import('./pages/java-dsa/tests/java-dsa-tests.component').then(
            (m) => m.JavaDsaTestsComponent
          ),
        title: 'Java DSA Tests — PREORBIT',
      },

      // ── Aptitude ────────────────────────────────────────
      {
        path: 'aptitude',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/aptitude/aptitude/aptitude.component').then(
            (m) => m.AptitudeComponent
          ),
        title: 'Aptitude — PREORBIT',
      },
      {
        path: 'aptitude/quantitative',
        loadComponent: () =>
          import('./pages/aptitude/quantitative/quantitative.component').then(
            (m) => m.QuantitativeComponent
          ),
        title: 'Quantitative Aptitude — PREORBIT',
      },
      {
        path: 'aptitude/logical-reasoning',
        loadComponent: () =>
          import('./pages/aptitude/logical-reasoning/logical-reasoning.component').then(
            (m) => m.LogicalReasoningComponent
          ),
        title: 'Logical Reasoning — PREORBIT',
      },

      {
        path: 'aptitude/:subject/theory',
        loadComponent: () =>
          import('./pages/aptitude/theory/aptitude-theory.component').then(
            (m) => m.AptitudeTheoryComponent
          ),
        title: 'Aptitude Theory — PREORBIT',
      },
      {
        path: 'aptitude/:subject/practice',
        loadComponent: () =>
          import('./pages/aptitude/practice/aptitude-practice.component').then(
            (m) => m.AptitudePracticeComponent
          ),
        title: 'Aptitude Practice — PREORBIT',
      },

      // ── Core CS ─────────────────────────────────────────
      {
        path: 'core-cs',
        loadComponent: () =>
          import('./pages/core-cs/core-cs/core-cs.component').then(
            (m) => m.CoreCsComponent
          ),
        title: 'Core CS — PREORBIT',
      },
      {
        path: 'core-cs/oop',
        loadComponent: () =>
          import('./pages/core-cs/oop/oop.component').then(
            (m) => m.OopComponent
          ),
        title: 'OOP — PREORBIT',
      },
      {
        path: 'core-cs/dbms',
        loadComponent: () =>
          import('./pages/core-cs/dbms/dbms.component').then(
            (m) => m.DbmsComponent
          ),
        title: 'DBMS — PREORBIT',
      },
      {
        path: 'core-cs/operating-system',
        loadComponent: () =>
          import('./pages/core-cs/operating-system/operating-system.component').then(
            (m) => m.OperatingSystemComponent
          ),
        title: 'Operating System — PREORBIT',
      },
      {
        path: 'core-cs/computer-networks',
        loadComponent: () =>
          import('./pages/core-cs/computer-networks/computer-networks.component').then(
            (m) => m.ComputerNetworksComponent
          ),
        title: 'Computer Networks — PREORBIT',
      },
      {
        path: 'core-cs/sql',
        loadComponent: () =>
          import('./pages/core-cs/sql/sql.component').then(
            (m) => m.SqlComponent
          ),
        title: 'SQL — PREORBIT',
      },

      {
        path: 'core-cs/:subject/theory',
        loadComponent: () =>
          import('./pages/core-cs/theory/core-cs-theory.component').then(
            (m) => m.CoreCsTheoryComponent
          ),
        title: 'Core CS Theory — PREORBIT',
      },
      {
        path: 'core-cs/:subject/practice',
        loadComponent: () =>
          import('./pages/core-cs/practice/core-cs-practice.component').then(
            (m) => m.CoreCsPracticeComponent
          ),
        title: 'Core CS Practice — PREORBIT',
      },
      
      // ── Admin (admin-only) ──────────────────────────────
      {
        path: 'admin',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./pages/admin/dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
        title: 'Admin Dashboard — PREORBIT',
      },
      {
        path: 'admin/upload',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./pages/admin/admin.component').then(
            (m) => m.AdminComponent
          ),
        title: 'Admin Upload — PREORBIT',
      },
      {
        path: 'admin/history',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./pages/admin/history/admin-history/admin-history').then(
            (m) => m.AdminHistoryComponent
          ),
        title: 'Upload History — PREORBIT',
      },
      {
        path: 'admin/tests',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./pages/admin/tests/admin-test-list/admin-test-list').then(
            (m) => m.AdminTestList
          ),
        title: 'Admin Tests — PREORBIT',
      },
      {
        path: 'admin/tests/:id',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./pages/admin/tests/admin-test-details/admin-test-details').then(
            (m) => m.AdminTestDetails
          ),
        title: 'Test Details — PREORBIT',
      },

      // ── Notes Routing ─────────────────────────────────────
      {
        path: ':section/theory',
        loadComponent: () => import('./pages/notes/notes-list/notes-list.component').then(m => m.NotesListComponent),
        title: 'Theory Chapters — PREORBIT'
      },
      {
        path: ':section/:subject/theory',
        loadComponent: () => import('./pages/notes/notes-list/notes-list.component').then(m => m.NotesListComponent),
        title: 'Theory Chapters — PREORBIT'
      },
      {
        path: ':section/theory/:chapter',
        loadComponent: () => import('./pages/notes/notes-viewer/notes-viewer.component').then(m => m.NotesViewerComponent),
        title: 'Theory — PREORBIT'
      },
      {
        path: ':section/:subject/theory/:chapter',
        loadComponent: () => import('./pages/notes/notes-viewer/notes-viewer.component').then(m => m.NotesViewerComponent),
        title: 'Theory — PREORBIT'
      },

      // ── Test Engine ───────────────────────────────────────
      {
        path: 'test/:testId',
        loadComponent: () => import('./pages/test-engine/test-engine').then((m) => m.TestEngine),
        title: 'Test Engine — PREORBIT'
      },
      
      // ── Test Result ───────────────────────────────────────
      {
        path: 'test-result/:attemptId',
        loadComponent: () => import('./pages/test-result/test-result').then((m) => m.TestResult),
        title: 'Test Result — PREORBIT'
      },


    ],

  },

  // ── Catch-all (must remain last) ─────────────────────────
  {
    path: '**',
    redirectTo: 'login',
  },

];

