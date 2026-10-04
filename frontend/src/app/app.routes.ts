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

      // ── Career ──────────────────────────────────────────────────
      {
        path: 'career',
        loadComponent: () =>
          import('./pages/career/career.component').then(
            (m) => m.CareerComponent
          ),
        title: 'Career — PREORBIT',
      },

      // ── Placement Tracker ────────────────────────────────────
      {
        path: 'placement',
        loadComponent: () =>
          import('./pages/placement/placement.component').then(
            (m) => m.PlacementComponent
          ),
        title: 'Placement Tracker — PREORBIT',
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

      // ── Theory: Core CS → OOP (dedicated chapter components) ──
      {
        path: 'theory/core-cs/oop/introduction-to-oop',
        loadComponent: () =>
          import('./theory/core-cs/oop/introduction-to-oop/introduction-to-oop.component').then(
            (m) => m.IntroductionToOopComponent
          ),
        title: 'Introduction to OOP — PREORBIT',
      },
      {
        path: 'theory/core-cs/oop/classes-and-objects',
        loadComponent: () =>
          import('./theory/core-cs/oop/classes-and-objects/classes-and-objects.component').then(
            (m) => m.ClassesAndObjectsComponent
          ),
        title: 'Classes and Objects — PREORBIT',
      },
      {
        path: 'theory/core-cs/oop/encapsulation',
        loadComponent: () =>
          import('./theory/core-cs/oop/encapsulation/encapsulation.component').then(
            (m) => m.EncapsulationComponent
          ),
        title: 'Encapsulation — PREORBIT',
      },
      {
        path: 'theory/core-cs/oop/inheritance',
        loadComponent: () =>
          import('./theory/core-cs/oop/inheritance/inheritance.component').then(
            (m) => m.InheritanceComponent
          ),
        title: 'Inheritance — PREORBIT',
      },
      {
        path: 'theory/core-cs/oop/polymorphism',
        loadComponent: () =>
          import('./theory/core-cs/oop/polymorphism/polymorphism.component').then(
            (m) => m.PolymorphismComponent
          ),
        title: 'Polymorphism — PREORBIT',
      },
      {
        path: 'theory/core-cs/oop/abstraction',
        loadComponent: () =>
          import('./theory/core-cs/oop/abstraction/abstraction.component').then(
            (m) => m.AbstractionComponent
          ),
        title: 'Abstraction — PREORBIT',
      },
      {
        path: 'theory/core-cs/oop/constructors',
        loadComponent: () =>
          import('./theory/core-cs/oop/constructors/constructors.component').then(
            (m) => m.ConstructorsComponent
          ),
        title: 'Constructors — PREORBIT',
      },
      {
        path: 'theory/core-cs/oop/interfaces',
        loadComponent: () =>
          import('./theory/core-cs/oop/interfaces/interfaces.component').then(
            (m) => m.InterfacesComponent
          ),
        title: 'Interfaces — PREORBIT',
      },
      {
        path: 'theory/core-cs/oop/exception-handling',
        loadComponent: () =>
          import('./theory/core-cs/oop/exception-handling/exception-handling.component').then(
            (m) => m.ExceptionHandlingComponent
          ),
        title: 'Exception Handling — PREORBIT',
      },
      // ── Auto-Migrated Theory Routes ──
      {
        path: 'theory/aptitude/logical-reasoning/analogy',
        loadComponent: () =>
          import('./theory/aptitude/logical-reasoning/analogy/analogy.component').then(
            (m) => m.AnalogyComponent
          ),
        title: 'analogy — PREORBIT',
      },
      {
        path: 'theory/aptitude/logical-reasoning/blood-relations',
        loadComponent: () =>
          import('./theory/aptitude/logical-reasoning/blood-relations/blood-relations.component').then(
            (m) => m.BloodRelationsComponent
          ),
        title: 'blood-relations — PREORBIT',
      },
      {
        path: 'theory/aptitude/logical-reasoning/classification',
        loadComponent: () =>
          import('./theory/aptitude/logical-reasoning/classification/classification.component').then(
            (m) => m.ClassificationComponent
          ),
        title: 'classification — PREORBIT',
      },
      {
        path: 'theory/aptitude/logical-reasoning/clocks-and-calendars',
        loadComponent: () =>
          import('./theory/aptitude/logical-reasoning/clocks-and-calendars/clocks-and-calendars.component').then(
            (m) => m.ClocksAndCalendarsComponent
          ),
        title: 'clocks-and-calendars — PREORBIT',
      },
      {
        path: 'theory/aptitude/logical-reasoning/coding-decoding',
        loadComponent: () =>
          import('./theory/aptitude/logical-reasoning/coding-decoding/coding-decoding.component').then(
            (m) => m.CodingDecodingComponent
          ),
        title: 'coding-decoding — PREORBIT',
      },
      {
        path: 'theory/aptitude/logical-reasoning/direction-sense',
        loadComponent: () =>
          import('./theory/aptitude/logical-reasoning/direction-sense/direction-sense.component').then(
            (m) => m.DirectionSenseComponent
          ),
        title: 'direction-sense — PREORBIT',
      },
      {
        path: 'theory/aptitude/logical-reasoning/seating-arrangement',
        loadComponent: () =>
          import('./theory/aptitude/logical-reasoning/seating-arrangement/seating-arrangement.component').then(
            (m) => m.SeatingArrangementComponent
          ),
        title: 'seating-arrangement — PREORBIT',
      },
      {
        path: 'theory/aptitude/logical-reasoning/series',
        loadComponent: () =>
          import('./theory/aptitude/logical-reasoning/series/series.component').then(
            (m) => m.SeriesComponent
          ),
        title: 'series — PREORBIT',
      },
      {
        path: 'theory/aptitude/logical-reasoning/syllogism',
        loadComponent: () =>
          import('./theory/aptitude/logical-reasoning/syllogism/syllogism.component').then(
            (m) => m.SyllogismComponent
          ),
        title: 'syllogism — PREORBIT',
      },
      {
        path: 'theory/aptitude/logical-reasoning/venn-diagrams',
        loadComponent: () =>
          import('./theory/aptitude/logical-reasoning/venn-diagrams/venn-diagrams.component').then(
            (m) => m.VennDiagramsComponent
          ),
        title: 'venn-diagrams — PREORBIT',
      },
      {
        path: 'theory/aptitude/quantitative/average',
        loadComponent: () =>
          import('./theory/aptitude/quantitative/average/average.component').then(
            (m) => m.AverageComponent
          ),
        title: 'average — PREORBIT',
      },
      {
        path: 'theory/aptitude/quantitative/compound-interest',
        loadComponent: () =>
          import('./theory/aptitude/quantitative/compound-interest/compound-interest.component').then(
            (m) => m.CompoundInterestComponent
          ),
        title: 'compound-interest — PREORBIT',
      },
      {
        path: 'theory/aptitude/quantitative/percentage',
        loadComponent: () =>
          import('./theory/aptitude/quantitative/percentage/percentage.component').then(
            (m) => m.PercentageComponent
          ),
        title: 'percentage — PREORBIT',
      },
      {
        path: 'theory/aptitude/quantitative/probability',
        loadComponent: () =>
          import('./theory/aptitude/quantitative/probability/probability.component').then(
            (m) => m.ProbabilityComponent
          ),
        title: 'probability — PREORBIT',
      },
      {
        path: 'theory/aptitude/quantitative/profit-loss',
        loadComponent: () =>
          import('./theory/aptitude/quantitative/profit-loss/profit-loss.component').then(
            (m) => m.ProfitLossComponent
          ),
        title: 'profit-loss — PREORBIT',
      },
      {
        path: 'theory/aptitude/quantitative/ratio-proportion',
        loadComponent: () =>
          import('./theory/aptitude/quantitative/ratio-proportion/ratio-proportion.component').then(
            (m) => m.RatioProportionComponent
          ),
        title: 'ratio-proportion — PREORBIT',
      },
      {
        path: 'theory/aptitude/quantitative/simple-interest',
        loadComponent: () =>
          import('./theory/aptitude/quantitative/simple-interest/simple-interest.component').then(
            (m) => m.SimpleInterestComponent
          ),
        title: 'simple-interest — PREORBIT',
      },
      {
        path: 'theory/aptitude/quantitative/time-speed-distance',
        loadComponent: () =>
          import('./theory/aptitude/quantitative/time-speed-distance/time-speed-distance.component').then(
            (m) => m.TimeSpeedDistanceComponent
          ),
        title: 'time-speed-distance — PREORBIT',
      },
      {
        path: 'theory/aptitude/quantitative/time-work',
        loadComponent: () =>
          import('./theory/aptitude/quantitative/time-work/time-work.component').then(
            (m) => m.TimeWorkComponent
          ),
        title: 'time-work — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/application-layer',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/application-layer/application-layer.component').then(
            (m) => m.ApplicationLayerComponent
          ),
        title: 'application-layer — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/dns',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/dns/dns.component').then(
            (m) => m.DnsComponent
          ),
        title: 'dns — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/http-https',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/http-https/http-https.component').then(
            (m) => m.HttpHttpsComponent
          ),
        title: 'http-https — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/introduction',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/introduction/introduction.component').then(
            (m) => m.IntroductionComponent
          ),
        title: 'introduction — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/introduction-to-networks',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/introduction-to-networks/introduction-to-networks.component').then(
            (m) => m.IntroductionToNetworksComponent
          ),
        title: 'introduction-to-networks — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/ip-addressing',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/ip-addressing/ip-addressing.component').then(
            (m) => m.IpAddressingComponent
          ),
        title: 'ip-addressing — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/network-devices',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/network-devices/network-devices.component').then(
            (m) => m.NetworkDevicesComponent
          ),
        title: 'network-devices — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/osi-model',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/osi-model/osi-model.component').then(
            (m) => m.OsiModelComponent
          ),
        title: 'osi-model — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/routing',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/routing/routing.component').then(
            (m) => m.RoutingComponent
          ),
        title: 'routing — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/subnetting',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/subnetting/subnetting.component').then(
            (m) => m.SubnettingComponent
          ),
        title: 'subnetting — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/tcp',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/tcp/tcp.component').then(
            (m) => m.TcpComponent
          ),
        title: 'tcp — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/tcp-ip',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/tcp-ip/tcp-ip.component').then(
            (m) => m.TcpIpComponent
          ),
        title: 'tcp-ip — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/tcp-ip-model',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/tcp-ip-model/tcp-ip-model.component').then(
            (m) => m.TcpIpModelComponent
          ),
        title: 'tcp-ip-model — PREORBIT',
      },
      {
        path: 'theory/core-cs/computer-networks/udp',
        loadComponent: () =>
          import('./theory/core-cs/computer-networks/udp/udp.component').then(
            (m) => m.UdpComponent
          ),
        title: 'udp — PREORBIT',
      },
      {
        path: 'theory/core-cs/dbms/concurrency-control',
        loadComponent: () =>
          import('./theory/core-cs/dbms/concurrency-control/concurrency-control.component').then(
            (m) => m.ConcurrencyControlComponent
          ),
        title: 'concurrency-control — PREORBIT',
      },
      {
        path: 'theory/core-cs/dbms/database-security',
        loadComponent: () =>
          import('./theory/core-cs/dbms/database-security/database-security.component').then(
            (m) => m.DatabaseSecurityComponent
          ),
        title: 'database-security — PREORBIT',
      },
      {
        path: 'theory/core-cs/dbms/er-model',
        loadComponent: () =>
          import('./theory/core-cs/dbms/er-model/er-model.component').then(
            (m) => m.ErModelComponent
          ),
        title: 'er-model — PREORBIT',
      },
      {
        path: 'theory/core-cs/dbms/indexing',
        loadComponent: () =>
          import('./theory/core-cs/dbms/indexing/indexing.component').then(
            (m) => m.IndexingComponent
          ),
        title: 'indexing — PREORBIT',
      },
      {
        path: 'theory/core-cs/dbms/introduction',
        loadComponent: () =>
          import('./theory/core-cs/dbms/introduction/introduction.component').then(
            (m) => m.IntroductionComponent
          ),
        title: 'introduction — PREORBIT',
      },
      {
        path: 'theory/core-cs/dbms/introduction-to-dbms',
        loadComponent: () =>
          import('./theory/core-cs/dbms/introduction-to-dbms/introduction-to-dbms.component').then(
            (m) => m.IntroductionToDbmsComponent
          ),
        title: 'introduction-to-dbms — PREORBIT',
      },
      {
        path: 'theory/core-cs/dbms/keys',
        loadComponent: () =>
          import('./theory/core-cs/dbms/keys/keys.component').then(
            (m) => m.KeysComponent
          ),
        title: 'keys — PREORBIT',
      },
      {
        path: 'theory/core-cs/dbms/normalization',
        loadComponent: () =>
          import('./theory/core-cs/dbms/normalization/normalization.component').then(
            (m) => m.NormalizationComponent
          ),
        title: 'normalization — PREORBIT',
      },
      {
        path: 'theory/core-cs/dbms/relational-model',
        loadComponent: () =>
          import('./theory/core-cs/dbms/relational-model/relational-model.component').then(
            (m) => m.RelationalModelComponent
          ),
        title: 'relational-model — PREORBIT',
      },
      {
        path: 'theory/core-cs/dbms/sql-basics',
        loadComponent: () =>
          import('./theory/core-cs/dbms/sql-basics/sql-basics.component').then(
            (m) => m.SqlBasicsComponent
          ),
        title: 'sql-basics — PREORBIT',
      },
      {
        path: 'theory/core-cs/dbms/transactions',
        loadComponent: () =>
          import('./theory/core-cs/dbms/transactions/transactions.component').then(
            (m) => m.TransactionsComponent
          ),
        title: 'transactions — PREORBIT',
      },
      {
        path: 'theory/core-cs/operating-system/concurrency',
        loadComponent: () =>
          import('./theory/core-cs/operating-system/concurrency/concurrency.component').then(
            (m) => m.ConcurrencyComponent
          ),
        title: 'concurrency — PREORBIT',
      },
      {
        path: 'theory/core-cs/operating-system/cpu-scheduling',
        loadComponent: () =>
          import('./theory/core-cs/operating-system/cpu-scheduling/cpu-scheduling.component').then(
            (m) => m.CpuSchedulingComponent
          ),
        title: 'cpu-scheduling — PREORBIT',
      },
      {
        path: 'theory/core-cs/operating-system/deadlocks',
        loadComponent: () =>
          import('./theory/core-cs/operating-system/deadlocks/deadlocks.component').then(
            (m) => m.DeadlocksComponent
          ),
        title: 'deadlocks — PREORBIT',
      },
      {
        path: 'theory/core-cs/operating-system/file-systems',
        loadComponent: () =>
          import('./theory/core-cs/operating-system/file-systems/file-systems.component').then(
            (m) => m.FileSystemsComponent
          ),
        title: 'file-systems — PREORBIT',
      },
      {
        path: 'theory/core-cs/operating-system/introduction',
        loadComponent: () =>
          import('./theory/core-cs/operating-system/introduction/introduction.component').then(
            (m) => m.IntroductionComponent
          ),
        title: 'introduction — PREORBIT',
      },
      {
        path: 'theory/core-cs/operating-system/introduction-to-os',
        loadComponent: () =>
          import('./theory/core-cs/operating-system/introduction-to-os/introduction-to-os.component').then(
            (m) => m.IntroductionToOsComponent
          ),
        title: 'introduction-to-os — PREORBIT',
      },
      {
        path: 'theory/core-cs/operating-system/memory-management',
        loadComponent: () =>
          import('./theory/core-cs/operating-system/memory-management/memory-management.component').then(
            (m) => m.MemoryManagementComponent
          ),
        title: 'memory-management — PREORBIT',
      },
      {
        path: 'theory/core-cs/operating-system/process-management',
        loadComponent: () =>
          import('./theory/core-cs/operating-system/process-management/process-management.component').then(
            (m) => m.ProcessManagementComponent
          ),
        title: 'process-management — PREORBIT',
      },
      {
        path: 'theory/core-cs/operating-system/synchronization',
        loadComponent: () =>
          import('./theory/core-cs/operating-system/synchronization/synchronization.component').then(
            (m) => m.SynchronizationComponent
          ),
        title: 'synchronization — PREORBIT',
      },
      {
        path: 'theory/core-cs/operating-system/threads',
        loadComponent: () =>
          import('./theory/core-cs/operating-system/threads/threads.component').then(
            (m) => m.ThreadsComponent
          ),
        title: 'threads — PREORBIT',
      },
      {
        path: 'theory/core-cs/operating-system/virtual-memory',
        loadComponent: () =>
          import('./theory/core-cs/operating-system/virtual-memory/virtual-memory.component').then(
            (m) => m.VirtualMemoryComponent
          ),
        title: 'virtual-memory — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/aggregate-functions',
        loadComponent: () =>
          import('./theory/core-cs/sql/aggregate-functions/aggregate-functions.component').then(
            (m) => m.AggregateFunctionsComponent
          ),
        title: 'aggregate-functions — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/constraints',
        loadComponent: () =>
          import('./theory/core-cs/sql/constraints/constraints.component').then(
            (m) => m.ConstraintsComponent
          ),
        title: 'constraints — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/dcl',
        loadComponent: () =>
          import('./theory/core-cs/sql/dcl/dcl.component').then(
            (m) => m.DclComponent
          ),
        title: 'dcl — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/ddl',
        loadComponent: () =>
          import('./theory/core-cs/sql/ddl/ddl.component').then(
            (m) => m.DdlComponent
          ),
        title: 'ddl — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/dml',
        loadComponent: () =>
          import('./theory/core-cs/sql/dml/dml.component').then(
            (m) => m.DmlComponent
          ),
        title: 'dml — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/dql',
        loadComponent: () =>
          import('./theory/core-cs/sql/dql/dql.component').then(
            (m) => m.DqlComponent
          ),
        title: 'dql — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/group-by',
        loadComponent: () =>
          import('./theory/core-cs/sql/group-by/group-by.component').then(
            (m) => m.GroupByComponent
          ),
        title: 'group-by — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/having',
        loadComponent: () =>
          import('./theory/core-cs/sql/having/having.component').then(
            (m) => m.HavingComponent
          ),
        title: 'having — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/indexing',
        loadComponent: () =>
          import('./theory/core-cs/sql/indexing/indexing.component').then(
            (m) => m.IndexingComponent
          ),
        title: 'indexing — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/introduction',
        loadComponent: () =>
          import('./theory/core-cs/sql/introduction/introduction.component').then(
            (m) => m.IntroductionComponent
          ),
        title: 'introduction — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/joins',
        loadComponent: () =>
          import('./theory/core-cs/sql/joins/joins.component').then(
            (m) => m.JoinsComponent
          ),
        title: 'joins — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/queries',
        loadComponent: () =>
          import('./theory/core-cs/sql/queries/queries.component').then(
            (m) => m.QueriesComponent
          ),
        title: 'queries — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/select',
        loadComponent: () =>
          import('./theory/core-cs/sql/select/select.component').then(
            (m) => m.SelectComponent
          ),
        title: 'select — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/sql-introduction',
        loadComponent: () =>
          import('./theory/core-cs/sql/sql-introduction/sql-introduction.component').then(
            (m) => m.SqlIntroductionComponent
          ),
        title: 'sql-introduction — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/subqueries',
        loadComponent: () =>
          import('./theory/core-cs/sql/subqueries/subqueries.component').then(
            (m) => m.SubqueriesComponent
          ),
        title: 'subqueries — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/tcl',
        loadComponent: () =>
          import('./theory/core-cs/sql/tcl/tcl.component').then(
            (m) => m.TclComponent
          ),
        title: 'tcl — PREORBIT',
      },
      {
        path: 'theory/core-cs/sql/where',
        loadComponent: () =>
          import('./theory/core-cs/sql/where/where.component').then(
            (m) => m.WhereComponent
          ),
        title: 'where — PREORBIT',
      },
      {
        path: 'theory/java-dsa/arrays',
        loadComponent: () =>
          import('./theory/java-dsa/arrays/arrays.component').then(
            (m) => m.ArraysComponent
          ),
        title: 'arrays — PREORBIT',
      },
      {
        path: 'theory/java-dsa/bst',
        loadComponent: () =>
          import('./theory/java-dsa/bst/bst.component').then(
            (m) => m.BstComponent
          ),
        title: 'bst — PREORBIT',
      },
      {
        path: 'theory/java-dsa/dynamic-programming',
        loadComponent: () =>
          import('./theory/java-dsa/dynamic-programming/dynamic-programming.component').then(
            (m) => m.DynamicProgrammingComponent
          ),
        title: 'dynamic-programming — PREORBIT',
      },
      {
        path: 'theory/java-dsa/graphs',
        loadComponent: () =>
          import('./theory/java-dsa/graphs/graphs.component').then(
            (m) => m.GraphsComponent
          ),
        title: 'graphs — PREORBIT',
      },
      {
        path: 'theory/java-dsa/hashing',
        loadComponent: () =>
          import('./theory/java-dsa/hashing/hashing.component').then(
            (m) => m.HashingComponent
          ),
        title: 'hashing — PREORBIT',
      },
      {
        path: 'theory/java-dsa/heap',
        loadComponent: () =>
          import('./theory/java-dsa/heap/heap.component').then(
            (m) => m.HeapComponent
          ),
        title: 'heap — PREORBIT',
      },
      {
        path: 'theory/java-dsa/linked-list',
        loadComponent: () =>
          import('./theory/java-dsa/linked-list/linked-list.component').then(
            (m) => m.LinkedListComponent
          ),
        title: 'linked-list — PREORBIT',
      },
      {
        path: 'theory/java-dsa/queue',
        loadComponent: () =>
          import('./theory/java-dsa/queue/queue.component').then(
            (m) => m.QueueComponent
          ),
        title: 'queue — PREORBIT',
      },
      {
        path: 'theory/java-dsa/recursion',
        loadComponent: () =>
          import('./theory/java-dsa/recursion/recursion.component').then(
            (m) => m.RecursionComponent
          ),
        title: 'recursion — PREORBIT',
      },
      {
        path: 'theory/java-dsa/searching',
        loadComponent: () =>
          import('./theory/java-dsa/searching/searching.component').then(
            (m) => m.SearchingComponent
          ),
        title: 'searching — PREORBIT',
      },
      {
        path: 'theory/java-dsa/sorting',
        loadComponent: () =>
          import('./theory/java-dsa/sorting/sorting.component').then(
            (m) => m.SortingComponent
          ),
        title: 'sorting — PREORBIT',
      },
      {
        path: 'theory/java-dsa/stack',
        loadComponent: () =>
          import('./theory/java-dsa/stack/stack.component').then(
            (m) => m.StackComponent
          ),
        title: 'stack — PREORBIT',
      },
      {
        path: 'theory/java-dsa/strings',
        loadComponent: () =>
          import('./theory/java-dsa/strings/strings.component').then(
            (m) => m.StringsComponent
          ),
        title: 'strings — PREORBIT',
      },
      {
        path: 'theory/java-dsa/trees',
        loadComponent: () =>
          import('./theory/java-dsa/trees/trees.component').then(
            (m) => m.TreesComponent
          ),
        title: 'trees — PREORBIT',
      },
      

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

