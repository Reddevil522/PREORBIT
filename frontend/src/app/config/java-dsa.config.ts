// ============================================================
// PREORBIT — Java DSA Configuration
// ============================================================

import { TestMetadata } from '../core/models/test.model';

export interface JavaDsaChapter {
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
}

export const javaDsaChapters: JavaDsaChapter[] = [
  { title: 'Arrays', slug: 'arrays', description: 'Learn array fundamentals and operations.', icon: 'ph-squares-four', order: 1 },
  { title: 'Strings', slug: 'strings', description: 'Master string manipulation and algorithms.', icon: 'ph-text-aa', order: 2 },
  { title: 'Linked List', slug: 'linked-list', description: 'Understand singly and doubly linked lists.', icon: 'ph-link', order: 3 },
  { title: 'Stack', slug: 'stack', description: 'LIFO data structure operations and applications.', icon: 'ph-stack', order: 4 },
  { title: 'Queue', slug: 'queue', description: 'FIFO data structure and its variations.', icon: 'ph-queue', order: 5 },
  { title: 'Hashing', slug: 'hashing', description: 'Hash maps, sets, and collision resolution.', icon: 'ph-hash', order: 6 },
  { title: 'Recursion', slug: 'recursion', description: 'Solving problems using recursive functions.', icon: 'ph-arrows-clockwise', order: 7 },
  { title: 'Searching', slug: 'searching', description: 'Linear and binary search algorithms.', icon: 'ph-magnifying-glass', order: 8 },
  { title: 'Sorting', slug: 'sorting', description: 'Common sorting algorithms and complexities.', icon: 'ph-sort-ascending', order: 9 },
  { title: 'Trees', slug: 'trees', description: 'Hierarchical data structures and traversals.', icon: 'ph-tree-structure', order: 10 },
  { title: 'BST', slug: 'bst', description: 'Binary Search Trees operations and logic.', icon: 'ph-graph', order: 11 },
  { title: 'Heap', slug: 'heap', description: 'Priority queues and heap sort.', icon: 'ph-triangle', order: 12 },
  { title: 'Graphs', slug: 'graphs', description: 'Graph representations and pathfinding algorithms.', icon: 'ph-git-fork', order: 13 },
  { title: 'Dynamic Programming', slug: 'dynamic-programming', description: 'Optimization using memoization and tabulation.', icon: 'ph-lightning', order: 14 }
];

export const javaDsaTests: TestMetadata[] = [];

// Generate minimum 4 tests per chapter with 'not-ready' status
javaDsaChapters.forEach(chapter => {
  for (let i = 1; i <= 4; i++) {
    javaDsaTests.push({
      id: `${chapter.slug}-test-${i}`,
      chapterSlug: chapter.slug,
      testNumber: i,
      title: `${chapter.title} Test ${i}`,
      totalQuestions: 25,
      multipleChoiceCount: 5,
      mcqCount: 20,
      status: 'not-available'
    });
  }
});
