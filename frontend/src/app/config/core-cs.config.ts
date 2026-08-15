import { TestMetadata } from '../core/models/test.model';

export interface CoreCsChapter {
  title: string;
  slug: string;
  description: string;
  order: number;
}

export interface CoreCsSubject {
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  chapters: CoreCsChapter[];
}

export const oopChapters: CoreCsChapter[] = [
  { title: 'Introduction to OOP', slug: 'introduction-to-oop', description: 'Basic concepts and paradigms of Object-Oriented Programming', order: 1 },
  { title: 'Classes and Objects', slug: 'classes-and-objects', description: 'Understanding classes, objects, and instantiation', order: 2 },
  { title: 'Constructors', slug: 'constructors', description: 'Types of constructors and object initialization', order: 3 },
  { title: 'Inheritance', slug: 'inheritance', description: 'Reusability and types of inheritance', order: 4 },
  { title: 'Polymorphism', slug: 'polymorphism', description: 'Compile-time and run-time polymorphism', order: 5 },
  { title: 'Abstraction', slug: 'abstraction', description: 'Hiding implementation details using abstract classes', order: 6 },
  { title: 'Encapsulation', slug: 'encapsulation', description: 'Data hiding and getters/setters', order: 7 },
  { title: 'Interfaces', slug: 'interfaces', description: 'Contracts and multiple inheritance', order: 8 },
  { title: 'Exception Handling', slug: 'exception-handling', description: 'Try, catch, throw, and custom exceptions', order: 9 }
];

export const dbmsChapters: CoreCsChapter[] = [
  { title: 'Introduction to DBMS', slug: 'introduction-to-dbms', description: 'File systems vs DBMS, architectures', order: 1 },
  { title: 'ER Model', slug: 'er-model', description: 'Entities, attributes, and relationships', order: 2 },
  { title: 'Relational Model', slug: 'relational-model', description: 'Tables, tuples, and relational algebra', order: 3 },
  { title: 'Keys', slug: 'keys', description: 'Primary, foreign, candidate, and super keys', order: 4 },
  { title: 'Normalization', slug: 'normalization', description: '1NF, 2NF, 3NF, and BCNF', order: 5 },
  { title: 'Transactions', slug: 'transactions', description: 'ACID properties and transaction states', order: 6 },
  { title: 'Concurrency Control', slug: 'concurrency-control', description: 'Locks, timestamps, and protocols', order: 7 },
  { title: 'Indexing', slug: 'indexing', description: 'B-trees, B+ trees, and hashing', order: 8 },
  { title: 'Database Security', slug: 'database-security', description: 'Authentication and access control', order: 9 }
];

export const osChapters: CoreCsChapter[] = [
  { title: 'Introduction to OS', slug: 'introduction-to-os', description: 'Types of OS and system calls', order: 1 },
  { title: 'Process Management', slug: 'process-management', description: 'Process states and PCB', order: 2 },
  { title: 'Threads', slug: 'threads', description: 'User-level vs kernel-level threads', order: 3 },
  { title: 'CPU Scheduling', slug: 'cpu-scheduling', description: 'FCFS, SJF, Round Robin algorithms', order: 4 },
  { title: 'Synchronization', slug: 'synchronization', description: 'Mutex, semaphores, and critical section problem', order: 5 },
  { title: 'Deadlocks', slug: 'deadlocks', description: 'Prevention, avoidance, and Banker\'s algorithm', order: 6 },
  { title: 'Memory Management', slug: 'memory-management', description: 'Paging, segmentation, and fragmentation', order: 7 },
  { title: 'Virtual Memory', slug: 'virtual-memory', description: 'Demand paging and page replacement algorithms', order: 8 },
  { title: 'File Systems', slug: 'file-systems', description: 'File allocation methods and directory structures', order: 9 }
];

export const cnChapters: CoreCsChapter[] = [
  { title: 'Introduction to Networks', slug: 'introduction-to-networks', description: 'Topologies, LAN, MAN, WAN', order: 1 },
  { title: 'OSI Model', slug: 'osi-model', description: 'The 7 layers of OSI reference model', order: 2 },
  { title: 'TCP/IP Model', slug: 'tcp-ip-model', description: 'Protocols in the TCP/IP suite', order: 3 },
  { title: 'Network Devices', slug: 'network-devices', description: 'Hubs, switches, routers, and gateways', order: 4 },
  { title: 'IP Addressing', slug: 'ip-addressing', description: 'IPv4, IPv6, and classes of IP addresses', order: 5 },
  { title: 'Subnetting', slug: 'subnetting', description: 'Creating subnets and calculating masks', order: 6 },
  { title: 'TCP', slug: 'tcp', description: 'Transmission Control Protocol features and headers', order: 7 },
  { title: 'UDP', slug: 'udp', description: 'User Datagram Protocol and its applications', order: 8 },
  { title: 'Routing', slug: 'routing', description: 'Distance vector and link state routing protocols', order: 9 },
  { title: 'HTTP/HTTPS', slug: 'http-https', description: 'Web protocols and security', order: 10 },
  { title: 'DNS', slug: 'dns', description: 'Domain Name System resolution process', order: 11 }
];

export const sqlChapters: CoreCsChapter[] = [
  { title: 'SQL Introduction', slug: 'sql-introduction', description: 'Basic syntax and history of SQL', order: 1 },
  { title: 'DDL', slug: 'ddl', description: 'CREATE, ALTER, DROP, TRUNCATE', order: 2 },
  { title: 'DML', slug: 'dml', description: 'INSERT, UPDATE, DELETE', order: 3 },
  { title: 'DQL', slug: 'dql', description: 'Data Query Language and SELECT basics', order: 4 },
  { title: 'DCL', slug: 'dcl', description: 'GRANT and REVOKE', order: 5 },
  { title: 'TCL', slug: 'tcl', description: 'COMMIT, ROLLBACK, SAVEPOINT', order: 6 },
  { title: 'SELECT', slug: 'select', description: 'Advanced SELECT statements', order: 7 },
  { title: 'WHERE', slug: 'where', description: 'Filtering records and conditional operators', order: 8 },
  { title: 'GROUP BY', slug: 'group-by', description: 'Grouping data for aggregate operations', order: 9 },
  { title: 'HAVING', slug: 'having', description: 'Filtering grouped data', order: 10 },
  { title: 'JOINS', slug: 'joins', description: 'INNER, LEFT, RIGHT, and FULL joins', order: 11 },
  { title: 'Subqueries', slug: 'subqueries', description: 'Nested queries and correlated subqueries', order: 12 },
  { title: 'Aggregate Functions', slug: 'aggregate-functions', description: 'SUM, COUNT, AVG, MIN, MAX', order: 13 },
  { title: 'Constraints', slug: 'constraints', description: 'NOT NULL, UNIQUE, CHECK, DEFAULT', order: 14 }
];

export const coreCsSubjects: CoreCsSubject[] = [
  {
    title: 'OOP',
    slug: 'oop',
    description: 'Object-Oriented Programming principles and concepts',
    icon: 'ph-code-block',
    order: 1,
    chapters: oopChapters
  },
  {
    title: 'DBMS',
    slug: 'dbms',
    description: 'Database Management Systems and relational concepts',
    icon: 'ph-database',
    order: 2,
    chapters: dbmsChapters
  },
  {
    title: 'Operating System',
    slug: 'operating-system',
    description: 'Process management, memory, and OS architecture',
    icon: 'ph-cpu',
    order: 3,
    chapters: osChapters
  },
  {
    title: 'Computer Networks',
    slug: 'computer-networks',
    description: 'Protocols, layers, and networking fundamentals',
    icon: 'ph-globe-hemisphere-west',
    order: 4,
    chapters: cnChapters
  },
  {
    title: 'SQL',
    slug: 'sql',
    description: 'Structured Query Language for database interactions',
    icon: 'ph-table',
    order: 5,
    chapters: sqlChapters
  }
];

// ── Tests ──────────────────────────────────────────────────────
// Generate minimum 4 tests per chapter per subject with 'not-available' status

export const oopTests: TestMetadata[] = [];
oopChapters.forEach(chapter => {
  for (let i = 1; i <= 4; i++) {
    oopTests.push({
      id: `oop-${chapter.slug}-test-${i}`,
      section: 'core-cs', subject: 'oop',
      chapterSlug: chapter.slug, testNumber: i,
      title: `${chapter.title} Test ${i}`,
      totalQuestions: 25, status: 'not-available'
    });
  }
});

export const dbmsTests: TestMetadata[] = [];
dbmsChapters.forEach(chapter => {
  for (let i = 1; i <= 4; i++) {
    dbmsTests.push({
      id: `dbms-${chapter.slug}-test-${i}`,
      section: 'core-cs', subject: 'dbms',
      chapterSlug: chapter.slug, testNumber: i,
      title: `${chapter.title} Test ${i}`,
      totalQuestions: 25, status: 'not-available'
    });
  }
});

export const osTests: TestMetadata[] = [];
osChapters.forEach(chapter => {
  for (let i = 1; i <= 4; i++) {
    osTests.push({
      id: `os-${chapter.slug}-test-${i}`,
      section: 'core-cs', subject: 'operating-system',
      chapterSlug: chapter.slug, testNumber: i,
      title: `${chapter.title} Test ${i}`,
      totalQuestions: 25, status: 'not-available'
    });
  }
});

export const cnTests: TestMetadata[] = [];
cnChapters.forEach(chapter => {
  for (let i = 1; i <= 4; i++) {
    cnTests.push({
      id: `cn-${chapter.slug}-test-${i}`,
      section: 'core-cs', subject: 'computer-networks',
      chapterSlug: chapter.slug, testNumber: i,
      title: `${chapter.title} Test ${i}`,
      totalQuestions: 25, status: 'not-available'
    });
  }
});

export const sqlTests: TestMetadata[] = [];
sqlChapters.forEach(chapter => {
  for (let i = 1; i <= 4; i++) {
    sqlTests.push({
      id: `sql-${chapter.slug}-test-${i}`,
      section: 'core-cs', subject: 'sql',
      chapterSlug: chapter.slug, testNumber: i,
      title: `${chapter.title} Test ${i}`,
      totalQuestions: 25, status: 'not-available'
    });
  }
});
