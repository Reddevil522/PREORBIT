import { TestMetadata } from '../core/models/test.model';

export interface AptitudeChapter {
  title: string;
  slug: string;
  description: string;
  order: number;
  icon: string;
}

export const quantitativeChapters: AptitudeChapter[] = [
  {
    title: 'Percentage',
    slug: 'percentage',
    description: 'Concepts of percentage, successive percentage, and real-world applications.',
    order: 1,
    icon: 'ph-percent'
  },
  {
    title: 'Profit & Loss',
    slug: 'profit-loss',
    description: 'Cost price, selling price, markups, discounts, and successive discounts.',
    order: 2,
    icon: 'ph-chart-line-up'
  },
  {
    title: 'Ratio & Proportion',
    slug: 'ratio-proportion',
    description: 'Comparison of quantities, direct and inverse proportions, variations.',
    order: 3,
    icon: 'ph-scales'
  },
  {
    title: 'Average',
    slug: 'average',
    description: 'Arithmetic mean, weighted average, and problems on ages.',
    order: 4,
    icon: 'ph-math-operations'
  },
  {
    title: 'Time & Work',
    slug: 'time-work',
    description: 'Individual efficiency, joint efficiency, and pipes & cisterns.',
    order: 5,
    icon: 'ph-clock'
  },
  {
    title: 'Time, Speed & Distance',
    slug: 'time-speed-distance',
    description: 'Relative speed, trains, boats, and streams.',
    order: 6,
    icon: 'ph-car-profile'
  },
  {
    title: 'Simple Interest',
    slug: 'simple-interest',
    description: 'Principal, rate of interest, and time calculations.',
    order: 7,
    icon: 'ph-coin'
  },
  {
    title: 'Compound Interest',
    slug: 'compound-interest',
    description: 'Compounding frequency, effective rates, and population growth.',
    order: 8,
    icon: 'ph-coins'
  },
  {
    title: 'Probability',
    slug: 'probability',
    description: 'Permutations, combinations, and basics of probability.',
    order: 9,
    icon: 'ph-dice-five'
  }
];

export const logicalReasoningChapters: AptitudeChapter[] = [
  {
    title: 'Coding-Decoding',
    slug: 'coding-decoding',
    description: 'Letter coding, number coding, and substitution.',
    order: 1,
    icon: 'ph-password'
  },
  {
    title: 'Blood Relations',
    slug: 'blood-relations',
    description: 'Family tree, coded relations, and pointing-based questions.',
    order: 2,
    icon: 'ph-users-three'
  },
  {
    title: 'Direction Sense',
    slug: 'direction-sense',
    description: 'Compass directions, shadows, and relative positioning.',
    order: 3,
    icon: 'ph-compass'
  },
  {
    title: 'Syllogism',
    slug: 'syllogism',
    description: 'Logical deduction using Venn diagrams and statements.',
    order: 4,
    icon: 'ph-intersect-three'
  },
  {
    title: 'Analogy',
    slug: 'analogy',
    description: 'Word, number, and letter-based relational analogies.',
    order: 5,
    icon: 'ph-link'
  },
  {
    title: 'Classification',
    slug: 'classification',
    description: 'Odd one out based on patterns and properties.',
    order: 6,
    icon: 'ph-squares-four'
  },
  {
    title: 'Series',
    slug: 'series',
    description: 'Number series, letter series, and alphanumeric series.',
    order: 7,
    icon: 'ph-trend-up'
  },
  {
    title: 'Seating Arrangement',
    slug: 'seating-arrangement',
    description: 'Linear, circular, and matrix-based arrangements.',
    order: 8,
    icon: 'ph-armchair'
  }
];

// ── Tests ──────────────────────────────────────────────────────
// Generate minimum 4 tests per chapter with 'not-available' status

export const quantitativeTests: TestMetadata[] = [];
quantitativeChapters.forEach(chapter => {
  for (let i = 1; i <= 4; i++) {
    quantitativeTests.push({
      id: `quant-${chapter.slug}-test-${i}`,
      section: 'aptitude', subject: 'quantitative',
      chapterSlug: chapter.slug, testNumber: i,
      title: `${chapter.title} Test ${i}`,
      totalQuestions: 25, status: 'not-available'
    });
  }
});

export const logicalReasoningTests: TestMetadata[] = [];
logicalReasoningChapters.forEach(chapter => {
  for (let i = 1; i <= 4; i++) {
    logicalReasoningTests.push({
      id: `lr-${chapter.slug}-test-${i}`,
      section: 'aptitude', subject: 'logical-reasoning',
      chapterSlug: chapter.slug, testNumber: i,
      title: `${chapter.title} Test ${i}`,
      totalQuestions: 25, status: 'not-available'
    });
  }
});
