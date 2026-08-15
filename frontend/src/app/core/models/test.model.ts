// ============================================================
// PREORBIT — Test Metadata Model
// ============================================================

export type TestStatus = 'not-available' | 'available' | 'completed' | 'locked';

export interface TestMetadata {
  id: string; // Used as testId
  section?: string;
  subject?: string;
  chapterSlug: string;
  testNumber: number;
  title: string;
  totalQuestions: number;
  totalMarks?: number;
  multipleChoiceCount?: number;
  mcqCount?: number;
  status: TestStatus;
}
