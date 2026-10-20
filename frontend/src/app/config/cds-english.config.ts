// ============================================================
// PREORBIT — CDS English Configuration
// ============================================================
// Curriculum hierarchy and topic definitions for CDS English.
// Derived from Prompt 1 architecture audit and UPSC CDS baseline.
// ============================================================

export interface CdsChapter {
  title: string;
  slug: string;
  description: string;
  order: number;
  icon: string;
  section: 'grammar' | 'vocabulary' | 'reading-comprehension';
  rulesNote?: string;
  subtopics?: string[];
}

export const grammarChapters: CdsChapter[] = [
  {
    title: 'Spotting Errors',
    slug: 'spotting-errors',
    description: 'Grammar rules on subject-verb agreement, tenses, pronouns, and modifiers.',
    order: 1,
    icon: 'ph-bug',
    section: 'grammar',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Subject-Verb Agreement',
      'Tense Consistency',
      'Pronoun-Antecedent Agreement',
      'Modifier Placement',
      'Conditionals & Inversion'
    ]
  },
  {
    title: 'Sentence Improvement',
    slug: 'sentence-improvement',
    description: 'Phrasal replacements, grammatical corrections, and sentence conciseness.',
    order: 2,
    icon: 'ph-pencil-line',
    section: 'grammar',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Grammatical Correctness',
      'Redundancy & Wordiness',
      'Parallel Structure',
      'Idiomatic Phrasing'
    ]
  },
  {
    title: 'Prepositions & Determiners',
    slug: 'prepositions-determiners',
    description: 'Fixed prepositions, prepositional phrases, articles, and quantifiers.',
    order: 3,
    icon: 'ph-arrows-split',
    section: 'grammar',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Fixed Prepositions',
      'Prepositions of Time & Place',
      'Definite & Indefinite Articles',
      'Quantifiers & Determiners'
    ]
  },
  {
    title: 'Parts of Speech Identification',
    slug: 'parts-of-speech',
    description: 'Identifying word classes (nouns, adjectives, adverbs, conjunctions, gerunds) in context.',
    order: 4,
    icon: 'ph-tag',
    section: 'grammar',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Word Class Context',
      'Adjectives vs Adverbs',
      'Participles vs Gerunds',
      'Conjunctions vs Prepositions'
    ]
  },
  {
    title: 'Active and Passive Voice',
    slug: 'active-passive-voice',
    description: 'Voice transformation across tenses, imperatives, and interrogative sentences.',
    order: 5,
    icon: 'ph-arrows-clockwise',
    section: 'grammar',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Simple, Continuous & Perfect Tenses',
      'Imperative Sentences',
      'Modal Verbs in Passive',
      'Prepositional Passive Verbs'
    ]
  },
  {
    title: 'Direct and Indirect Speech',
    slug: 'direct-indirect-speech',
    description: 'Narration changes, tense shifts, pronoun rules, and reporting verbs.',
    order: 6,
    icon: 'ph-quotes',
    section: 'grammar',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Assertive Sentences',
      'Interrogative Sentences',
      'Imperative & Exclamatory Sentences',
      'Backshift of Tenses & Time Expressions'
    ]
  },
  {
    title: 'Fill in the Blanks',
    slug: 'fill-in-the-blanks',
    description: 'Contextual sentence completion using appropriate grammar structures and vocabulary.',
    order: 7,
    icon: 'ph-textbox',
    section: 'grammar',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Grammar Fillers',
      'Conjunctions & Connectors',
      'Collocations',
      'Phrasal Verb Fillers'
    ]
  },
  {
    title: 'Ordering of Words in a Sentence',
    slug: 'ordering-of-words',
    description: 'Jumbled sentence fragments (P, Q, R, S) rearranged into coherent syntax.',
    order: 8,
    icon: 'ph-shuffle',
    section: 'grammar',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Subject-Predicate Linking',
      'Modifier Adjacency',
      'Conjunction Placement',
      'Prepositional Phrase Positioning'
    ]
  },
  {
    title: 'Ordering of Sentences in a Paragraph',
    slug: 'ordering-of-sentences',
    description: 'Arranging sentences between anchor statements (S1 and S6) to construct a coherent paragraph.',
    order: 9,
    icon: 'ph-list-numbers',
    section: 'grammar',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Mandatory Pairs',
      'Pronoun Tracking',
      'Chronological & Logical Order',
      'Transition Signal Words'
    ]
  }
];

export const vocabularyChapters: CdsChapter[] = [
  {
    title: 'Synonyms & Antonyms',
    slug: 'synonyms-antonyms',
    description: 'Combined chapter for testing word meanings and opposite values in sentence contexts.',
    order: 1,
    icon: 'ph-arrows-left-right',
    section: 'vocabulary',
    rulesNote: '20 MCQs per test: Exactly 10 Synonyms (Q1-10) and 10 Antonyms (Q11-20).',
    subtopics: [
      'Contextual Synonyms (Questions 1–10)',
      'Contextual Antonyms (Questions 11–20)',
      'High-Frequency Exam Vocabulary',
      'Nuanced Meaning Distinctions'
    ]
  },
  {
    title: 'Idioms and Phrases',
    slug: 'idioms-phrases',
    description: 'Figurative expressions, popular idioms, and phrasal idioms with contextual meanings.',
    order: 2,
    icon: 'ph-chat-centered-text',
    section: 'vocabulary',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'High-Frequency Defense Idioms',
      'Metaphorical Expressions',
      'Phrasal Verb Idioms',
      'Contextual Sentence Usage'
    ]
  },
  {
    title: 'One-Word Substitution',
    slug: 'one-word-substitution',
    description: 'Single-word equivalents for descriptive phrases, sciences, beliefs, and human traits.',
    order: 3,
    icon: 'ph-text-aa',
    section: 'vocabulary',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Fields of Study & Specialties',
      'Human Behavior & Personality Traits',
      'Governance & Systems',
      'Literary & Legal Terms'
    ]
  },
  {
    title: 'Spelling Master',
    slug: 'spelling-master',
    description: 'Spotting correctly spelt words and identifying common orthographic errors.',
    order: 4,
    icon: 'ph-spell-check',
    section: 'vocabulary',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Double Consonants',
      'Silent Letters',
      'Commonly Misspelt Words',
      'Prefix and Suffix Rules'
    ]
  },
  {
    title: 'Cloze Composition',
    slug: 'cloze-composition',
    description: 'Comprehensive paragraph passages with numbered blanks testing vocabulary and grammar in context.',
    order: 5,
    icon: 'ph-article',
    section: 'vocabulary',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Contextual Flow & Tone',
      'Vocabulary Precision',
      'Collocations in Context',
      'Prepositional Fillers'
    ]
  },
  {
    title: 'Word Usage & Confusing Words',
    slug: 'word-usage',
    description: 'Distinguishing homophones, paronyms, and frequently confused word pairs.',
    order: 6,
    icon: 'ph-scales',
    section: 'vocabulary',
    rulesNote: '20 MCQs per test. Single correct option.',
    subtopics: [
      'Homophones & Homonyms',
      'Confused Verb Pairs',
      'Formal vs Informal Usage',
      'Grammatical Collocations'
    ]
  }
];

export const readingComprehensionChapters: CdsChapter[] = [
  {
    title: 'Factual Comprehension',
    slug: 'factual-comprehension',
    description: 'Locating direct statements, factual data, and explicit details within complex passages.',
    order: 1,
    icon: 'ph-file-search',
    section: 'reading-comprehension',
    rulesNote: '10 MCQs per test: Exactly 2 Passages (5 questions per passage).',
    subtopics: [
      'Explicit Fact Retrieval',
      'Key Information Scanning',
      'Event Chronology',
      'Cause and Effect Identification'
    ]
  },
  {
    title: 'Inferential Comprehension',
    slug: 'inferential-comprehension',
    description: 'Drawing logical deductions, implied meanings, and conclusions not directly stated.',
    order: 2,
    icon: 'ph-lightbulb',
    section: 'reading-comprehension',
    rulesNote: '10 MCQs per test: Exactly 2 Passages (5 questions per passage).',
    subtopics: [
      'Reading Between the Lines',
      'Logical Assumptions',
      'Author Argument Deduction',
      'Implied Conclusions'
    ]
  },
  {
    title: 'Tone and Theme Identification',
    slug: 'tone-and-theme',
    description: 'Analyzing the author\'s attitude, writing style, central thesis, and suitable title.',
    order: 3,
    icon: 'ph-pen-nib',
    section: 'reading-comprehension',
    rulesNote: '10 MCQs per test: Exactly 2 Passages (5 questions per passage).',
    subtopics: [
      'Identifying Central Idea / Theme',
      'Author\'s Tone (Objective, Critical, Sarcastic, Laudatory)',
      'Suitable Title Selection',
      'Author\'s Primary Purpose'
    ]
  },
  {
    title: 'Contextual Vocabulary in Passages',
    slug: 'contextual-vocabulary',
    description: 'Determining the meaning of words and idioms as specifically used in the passage context.',
    order: 4,
    icon: 'ph-book-bookmark',
    section: 'reading-comprehension',
    rulesNote: '10 MCQs per test: Exactly 2 Passages (5 questions per passage).',
    subtopics: [
      'Contextual Meaning Determination',
      'Passage-Specific Synonyms',
      'Metaphorical Interpretations',
      'Phrase Signification'
    ]
  }
];

export function getCdsChaptersBySection(section: 'grammar' | 'vocabulary' | 'reading-comprehension'): CdsChapter[] {
  switch (section) {
    case 'grammar':
      return grammarChapters;
    case 'vocabulary':
      return vocabularyChapters;
    case 'reading-comprehension':
      return readingComprehensionChapters;
    default:
      return [];
  }
}
