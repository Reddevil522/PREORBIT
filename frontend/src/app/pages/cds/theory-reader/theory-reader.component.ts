// ============================================================
// PREORBIT — CDS Theory Reader Component
// ============================================================
// Displays structured theory for a specific CDS English chapter:
//   - Topic Overview
//   - Definitions & Rules
//   - Exceptions
//   - Examples
//   - Common Mistakes
//   - Revision Summary
//   - Direct link to Chapter Tests
// ============================================================

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CdsChapter } from '../../../config/cds-english.config';
import { CdsEnglishPracticeService } from '../../../core/services/cds-english-practice.service';
import { ProgressService } from '../../../core/services/progress.service';

export interface TheorySectionBlock {
  heading: string;
  content: string[];
}

export interface TheoryDocument {
  title: string;
  slug: string;
  section: string;
  overview: string;
  rules: TheorySectionBlock[];
  exceptions: string[];
  examples: { context: string; correct: string; incorrect?: string; explanation: string }[];
  commonMistakes: { mistake: string; correction: string; why: string }[];
  revisionSummary: string[];
}

@Component({
  selector: 'app-cds-theory-reader',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './theory-reader.component.html',
  styleUrl: './theory-reader.component.css'
})
export class TheoryReaderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cdsPracticeService = inject(CdsEnglishPracticeService);
  private progressService = inject(ProgressService);

  section = signal<'grammar' | 'vocabulary' | 'reading-comprehension'>('grammar');
  chapterSlug = signal<string>('');
  chapter = signal<CdsChapter | null>(null);
  
  isCompleted = signal<boolean>(false);
  isMarking = signal<boolean>(false);
  isLoading = signal<boolean>(true);
  notFound = signal<boolean>(false);

  theoryDoc = signal<TheoryDocument | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const sec = (params.get('section') || 'grammar') as 'grammar' | 'vocabulary' | 'reading-comprehension';
      const slug = (params.get('chapterSlug') || '').toLowerCase();

      this.section.set(sec);
      this.chapterSlug.set(slug);

      const ch = this.cdsPracticeService.getChapterBySlug(sec, slug);
      if (!ch) {
        this.notFound.set(true);
        this.isLoading.set(false);
        return;
      }

      this.chapter.set(ch);
      this.notFound.set(false);
      this.loadTheory(ch);
      this.checkCompletionStatus(slug);
    });
  }

  private checkCompletionStatus(slug: string): void {
    this.progressService.getProgress().subscribe({
      next: (res) => {
        if (!res?.data?.chapters) return;
        const record = res.data.chapters.find((c: any) => (c.chapterSlug || '').toLowerCase() === slug);
        this.isCompleted.set(!!(record && record.theoryCompleted));
      },
      error: () => this.isCompleted.set(false)
    });
  }

  private loadTheory(ch: CdsChapter): void {
    this.isLoading.set(true);

    // Build structured curriculum schema according to requirements
    const doc: TheoryDocument = {
      title: ch.title,
      slug: ch.slug,
      section: ch.section,
      overview: ch.description,
      rules: (ch.subtopics || []).map((sub, idx) => ({
        heading: `Rule ${idx + 1}: ${sub}`,
        content: [
          `Master the fundamental criteria governing ${sub} as tested in the UPSC CDS examination.`,
          `Ensure contextual consistency, correct tense coordination, and precise syntactic agreement across the entire sentence.`
        ]
      })),
      exceptions: [
        'Collective nouns take singular verbs when operating as a single unit, but plural verbs when individual members act separately.',
        'Sentences beginning with negative adverbials (e.g., Seldom, Rarely, Scarcely) require subject-verb inversion.',
        'Certain prepositions are fixed by idiom and do not permit literal translation from regional dialects.'
      ],
      examples: [
        {
          context: 'Subject-Verb & Preposition Agreement',
          incorrect: 'Neither of the officers were present on the briefing yesterday.',
          correct: 'Neither of the officers was present at the briefing yesterday.',
          explanation: '"Neither" is distributive and takes a singular verb ("was"). The fixed preposition with briefing/events is "at", not "on".'
        },
        {
          context: 'Conditional Syntax',
          incorrect: 'If he would have arrived on time, he would not have missed the inspection.',
          correct: 'Had he arrived on time, he would not have missed the inspection.',
          explanation: 'In third conditional clauses, the condition takes past perfect ("had arrived"), never "would have".'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Using "discuss about" or "order for"',
          correction: 'Use "discuss the issue" and "order food"',
          why: 'Transitive verbs like discuss, describe, order, and reach do not take prepositions directly after them.'
        },
        {
          mistake: 'Confusing "scarcely... than" with "scarcely... when"',
          correction: 'Use "Scarcely had we begun when the alarm sounded."',
          why: '"Scarcely" and "Hardly" correlate with "when/before", whereas "No sooner" correlates with "than".'
        }
      ],
      revisionSummary: [
        'Always scan the subject first to determine singular or plural concord before evaluating modifiers.',
        'Verify fixed prepositions against standardized idiomatic expressions.',
        'Watch for pronoun case alignment after prepositions and comparative conjunctions.'
      ]
    };

    this.theoryDoc.set(doc);
    this.isLoading.set(false);
  }

  markComplete(): void {
    if (this.isCompleted() || this.isMarking()) return;

    this.isMarking.set(true);
    this.progressService.markTheoryCompleted(this.chapterSlug()).subscribe({
      next: () => {
        this.isCompleted.set(true);
        this.isMarking.set(false);
      },
      error: (err) => {
        console.error('Failed to record theory completion:', err);
        this.isMarking.set(false);
      }
    });
  }
}
