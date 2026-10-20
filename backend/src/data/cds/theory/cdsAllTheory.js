// ============================================================
// PREORBIT — CDS English Comprehensive Theory Bank (All 19 Chapters)
// ============================================================
// Each chapter satisfies the 10-point CDS Theory Standard:
//   1. Chapter title & learning objectives
//   2. Definitions & core concepts (overview)
//   3. Rules & subrules (coreRules)
//   4. Exceptions & edge cases (exceptions)
//   5. Worked examples (examExamples)
//   6. Common traps & candidate mistakes (commonTraps)
//   7. Contrast with easily confused concepts (confusedConcepts)
//   8. Short revision notes (summary)
//   9. Practice examples with explanations (practiceExercises)
//  10. Links/references to related chapters (relatedChapters)
// ============================================================

const cdsAllTheory = {
  // ──────────────────────────────────────────────────────────
  // GRAMMAR (9 CHAPTERS)
  // ──────────────────────────────────────────────────────────

  'spotting-errors': {
    title: 'Spotting Errors',
    section: 'grammar',
    chapterSlug: 'spotting-errors',
    learningObjectives: [
      'Master subject-verb agreement across inverted and parenthetical constructions.',
      'Detect pronoun-antecedent inconsistencies and case misalignments.',
      'Apply correct tense sequences and conditional clauses without error.',
      'Recognize misplaced modifiers, dangling participles, and non-parallel structures.'
    ],
    overview: 'Spotting Errors in the CDS examination tests a candidate\'s command over fundamental grammatical rules, syntactic agreement, tense consistency, and idiomatic phrasing. Each question presents a sentence divided into three lettered parts (A, B, C) with (D) designating "No Error". Identifying the precise faulty segment requires systematic grammatical parsing.',
    coreRules: [
      'Subject-Verb Agreement: A singular subject requires a singular verb; a plural subject takes a plural verb regardless of intervening parenthetical phrases (e.g., "The commander, as well as his captains, was present").',
      'Distributive Pronouns: Indefinite pronouns like "each", "everyone", "neither", and "either" are inherently singular and govern singular verbs and possessives.',
      'Tense Consistency: Sentences expressing sequences of past actions require the Past Perfect (had + V3) for the earlier event and Simple Past (V2) for the subsequent event.',
      'Correlative Conjunctions: Paired conjunctions (either...or, neither...nor, not only...but also) must link syntactically identical grammatical elements and agree with the closer subject.',
      'Prepositional Case: Pronouns following prepositions must invariably take the objective case (e.g., "between you and me", not "between you and I").'
    ],
    exceptions: [
      'Inversion after Negative Adverbials: Sentences opening with "Hardly", "Scarcely", "Seldom", or "No sooner" invert the auxiliary verb and subject ("No sooner did the siren sound than...").',
      'Subjunctive Mood: Verbs denoting hypothetical conditions or demands take the base form ("It is essential that he submit his report immediately").',
      'Collective Nouns: Nouns like "jury", "committee", or "panel" take singular verbs when acting unanimously, but plural verbs when members act in discord or individuality.'
    ],
    examExamples: [
      {
        question: 'Neither the principal (A) / nor the teachers (B) / was present in the auditorium. (C) / No Error (D)',
        correctAnswer: 'C',
        explanation: 'In "neither...nor" constructions, the verb agrees with the nearer subject. Since "teachers" is plural, the verb must be "were present".'
      },
      {
        question: 'Scarcely had the bell rung (A) / than the students (B) / rushed out of the classrooms. (C) / No Error (D)',
        correctAnswer: 'B',
        explanation: '"Scarcely" and "hardly" are paired with "when", not "than". Replace "than" with "when".'
      }
    ],
    commonTraps: [
      'Confusing the true subject with an intervening prepositional noun (e.g., "The quality of these mangoes is good", not "are good").',
      'Using double negatives such as "Unless you do not..." or "Scarcely had he not...".',
      'Failing to notice the absence of "that of" in comparative statements (e.g., "The climate of Dehradun is better than Delhi").'
    ],
    confusedConcepts: [
      'Each other vs. One another: "Each other" is applied to two entities; "one another" refers to three or more entities.',
      'Lie vs. Lay: "Lie" (lay, lain) is intransitive (to recline); "Lay" (laid, laid) is transitive and requires a direct object (to place something down).'
    ],
    summary: 'Always isolate the bare subject and predicate by mentally stripping non-essential parenthetical clauses. Verify correlative pairs (hardly...when, no sooner...than), check pronoun cases after prepositions, and ensure comparative balance.',
    practiceExercises: [
      {
        question: 'One of the soldiers (A) / who has been awarded the Param Vir Chakra (B) / lives in my neighborhood. (C) / No Error (D)',
        correctAnswer: 'B',
        explanation: 'In the construction "one of those/the + plural noun + who", the relative pronoun refers to the plural antecedent ("soldiers"), requiring the plural verb "have been awarded".'
      }
    ],
    relatedChapters: ['sentence-improvement', 'prepositions-determiners', 'parts-of-speech']
  },

  'sentence-improvement': {
    title: 'Sentence Improvement',
    section: 'grammar',
    chapterSlug: 'sentence-improvement',
    learningObjectives: [
      'Replace underlined syntactic errors with grammatically sound, concise alternatives.',
      'Eliminate dangling participles and misaligned modifiers.',
      'Avoid redundant wordiness without changing the original semantic intention.',
      'Identify the standard "No Improvement" condition when the original phrasing is optimal.'
    ],
    overview: 'Sentence Improvement evaluates your ability to enhance an underlined phrase for clarity, conciseness, and strict grammatical precision. Rather than simply spotting a flaw, candidates must choose the single best stylistic and grammatical replacement among four options, including "No Improvement".',
    coreRules: [
      'Dangling Modifiers: An introductory participial phrase must modify the immediate subject of the following clause (e.g., "Walking in the garden, a snake bit him" -> "While he was walking in the garden, a snake bit him").',
      'Parallelism: Elements joined by coordinating conjunctions or comparatives must share identical syntactic form (e.g., "He likes swimming, hiking, and to jog" -> "swimming, hiking, and jogging").',
      'Economy and Conciseness: Avoid redundant phrases like "return back", "repeat again", or "reason why...because".',
      'Conditional Symmetry: In hypothetical conditional sentences, maintain the canonical pairing: "If + Past Perfect, then would/could have + V3".'
    ],
    exceptions: [
      'Absolute Phrases: An absolute participial phrase containing its own noun subject is grammatically independent and does not dangle (e.g., "The rain having stopped, the battalion resumed its march").',
      'Split Infinitives: While traditionally avoided, single-word adverbial insertions between "to" and the verb are acceptable when avoiding ambiguity ("to clearly understand").'
    ],
    examExamples: [
      {
        question: 'Having finished his homework, the television was turned on by Rahul.',
        correctAnswer: 'Rahul turned on the television after finishing his homework.',
        explanation: 'The television cannot finish homework. The subject of the introductory participial phrase must be Rahul.'
      }
    ],
    commonTraps: [
      'Choosing an option that corrects the grammar but introduces an unwanted tense shift or omits key information.',
      'Assuming that a more complex or verbose option is inherently more formal and correct.'
    ],
    confusedConcepts: [
      'Because vs. Due to: "Because" is a subordinating conjunction introducing a clause; "Due to" is an adjectival phrase modifying a noun and typically following a form of the verb "to be".'
    ],
    summary: 'Identify the exact grammatical fault in the underlined portion before inspecting choices. Eliminate options that repeat the error or create clumsy passive structures.',
    practiceExercises: [
      {
        question: 'The captain asked the platoon to **refrain from smoking cigarettes** inside the armory.',
        correctAnswer: 'No improvement',
        explanation: '"Refrain from" is the exact standard prepositional idiom governing a gerund. The sentence is already grammatically impeccable.'
      }
    ],
    relatedChapters: ['spotting-errors', 'fill-in-the-blanks']
  },

  'prepositions-determiners': {
    title: 'Prepositions & Determiners',
    section: 'grammar',
    chapterSlug: 'prepositions-determiners',
    learningObjectives: [
      'Master fixed prepositional collocations governed by specific verbs, adjectives, and nouns.',
      'Distinguish prepositions of spatial relationship, direction, instrument, and time.',
      'Apply definite (the) and indefinite (a/an) articles with geographic and conceptual precision.',
      'Use quantifiers (few, a few, the few, little, a little, the little) accurately.'
    ],
    overview: 'Prepositions and determiners constitute one of the most heavily tested mechanics in the CDS examination. This chapter covers fixed prepositions (words tied to specific verbs or adjectives) alongside articles and quantitative determiners.',
    coreRules: [
      'Fixed Prepositions: Certain words require invariable prepositions regardless of context: "abstain from", "comply with", "prohibit from", "conducive to", "accustomed to".',
      'Between vs. Among: "Between" is used for distinct individual entities (even if more than two when mutually interacting); "among" is used for non-distinct collective groups.',
      'Since vs. For: "Since" marks a specific point in past time; "for" denotes an entire duration or period of time.',
      'Quantifiers (Countable vs. Uncountable): "Few" (hardly any, negative), "A few" (some, positive), "The few" (all that remain) apply to countable nouns. "Little", "A little", "The little" apply to uncountable nouns.'
    ],
    exceptions: [
      'Omission of Articles: Zero article before names of languages, meals, abstract nouns, and proper materials unless qualified by a defining relative clause.',
      'Preposition Omission with Transitive Verbs: Verbs like "order", "enter" (a place), "reach", "discuss", and "resemble" take direct objects without prepositions (e.g., "He entered the room", NOT "entered into").'
    ],
    examExamples: [
      {
        question: 'The court acquitted the defendant ______ all criminal charges.',
        correctAnswer: 'of',
        explanation: 'The verb "acquit" strictly takes the preposition "of" (acquit somebody of a charge).'
      }
    ],
    commonTraps: [
      'Adding prepositions after verbs like "comprise" (correct: "comprises four units", NOT "comprises of").',
      'Confusing "beside" (by the side of) with "besides" (in addition to).'
    ],
    confusedConcepts: [
      'Agree to vs. Agree with: One agrees "to" a proposal or terms; one agrees "with" a person or viewpoint.',
      'Die of vs. Die from: One dies "of" a disease; one dies "from" an external cause such as starvation or overwork.'
    ],
    summary: 'Memorize high-frequency fixed prepositions. Remember that "enter into" is used only metaphorically (e.g., entering into an agreement), never for entering a physical room or building.',
    practiceExercises: [
      {
        question: 'He is proficient ______ mathematics and physics.',
        correctAnswer: 'in',
        explanation: 'One is "proficient in" an academic discipline, but "good at" an activity or sport.'
      }
    ],
    relatedChapters: ['spotting-errors', 'fill-in-the-blanks', 'cloze-composition']
  },

  'parts-of-speech': {
    title: 'Parts of Speech Identification',
    section: 'grammar',
    chapterSlug: 'parts-of-speech',
    learningObjectives: [
      'Identify word classes based on contextual functional role rather than orthographic spelling.',
      'Distinguish participles, gerunds, and verbal nouns in sentence context.',
      'Differentiate adverbs from adjectives when words share identical forms (fast, hard, early).',
      'Recognize subordinate conjunctions vs. prepositions sharing identical words (before, after, since).'
    ],
    overview: 'In recent CDS examinations, UPSC features a dedicated 10-to-20 question section requiring candidates to identify the exact grammatical class of an underlined word within a sentence. Success relies strictly on functional contextual analysis rather than fixed dictionary definitions.',
    coreRules: [
      'Contextual Function Determines Category: A word\'s part of speech is governed entirely by the function it performs in that specific clause.',
      'Gerund vs. Present Participle: A word ending in -ing is a gerund if it acts as a noun (subject or object); it is a participle if it acts as an adjective modifying a noun or as part of a continuous verb phrase.',
      'Conjunction vs. Preposition: If a connective is followed by a complete clause (subject + finite verb), it is a conjunction. If followed solely by a noun/pronoun object, it is a preposition.',
      'Adverb vs. Adjective: An adjective modifies a noun or pronoun; an adverb modifies a verb, adjective, or another adverb.'
    ],
    exceptions: [
      'Flat Adverbs: Adverbs that share the exact morphology of adjectives without -ly (e.g., "fast", "hard", "late", "near"). In "He ran fast", "fast" is an adverb; in "He is a fast runner", "fast" is an adjective.',
      'Verbal Nouns: When an -ing form is preceded by "the" and followed by "of" ("the reading of books"), it functions as a verbal noun rather than a bare gerund.'
    ],
    examExamples: [
      {
        question: 'He has not seen his family **since** he left for the border outpost.',
        correctAnswer: 'Conjunction',
        explanation: '"Since" links two complete clauses ("He has not seen his family" and "he left for the border outpost"), functioning as a subordinating conjunction of time.'
      }
    ],
    commonTraps: [
      'Assuming all words ending in -ly are adverbs (words like "friendly", "lonely", "cowardly", "brotherly" are adjectives).',
      'Confusing an adverb of degree modifying an adjective with an adjective modifying a noun.'
    ],
    confusedConcepts: [
      'Like vs. As: "Like" functions as a preposition followed by a noun phrase ("He acts like a hero"); "As" functions as a conjunction followed by a clause ("He fought as he was trained to do").'
    ],
    summary: 'Analyze what the word does: Does it name (noun), replace (pronoun), describe a noun (adjective), describe action/modifier (adverb), show relation (preposition), or connect ideas (conjunction)? Function always overrides form.',
    practiceExercises: [
      {
        question: '**Swimming** is an excellent cardiovascular exercise.',
        correctAnswer: 'Noun / Gerund',
        explanation: '"Swimming" serves as the grammatical subject of the sentence, making it a gerund functioning as a noun.'
      }
    ],
    relatedChapters: ['spotting-errors', 'prepositions-determiners']
  },

  'active-passive-voice': {
    title: 'Active and Passive Voice',
    section: 'grammar',
    chapterSlug: 'active-passive-voice',
    learningObjectives: [
      'Transform sentences between active and passive voice without altering tense or core meaning.',
      'Master voice conversion for modal verbs, imperatives, and quasi-passive constructions.',
      'Handle sentences with dual objects (direct and indirect objects).',
      'Accurately transform interrogative structures beginning with "Who" or auxiliary verbs.'
    ],
    overview: 'Active and Passive Voice questions in CDS test your structural mastery of verb conjugation, tense preservation, and agent placement. In active voice, the subject performs the action; in passive voice, the subject undergoes the action.',
    coreRules: [
      'Tense Invariance: The tense of the original active sentence must NEVER be altered during conversion. The passive form invariably uses the appropriate form of "be" + Past Participle (V3).',
      'Object-to-Subject Shift: The direct object of the active verb becomes the subject of the passive verb.',
      'Continuous Tenses: Present and Past Continuous passives require the insertion of "being" (is/am/are being + V3; was/were being + V3). Note: Perfect continuous tenses have no standard passive voice.',
      'Modal Verbs: Passive conversion follows the formula "Modal + be + V3" (or "Modal + have been + V3" for past modals).',
      'Imperative Sentences: Commands or requests transform using "Let + object + be + V3" or "You are requested/advised/ordered to + base verb".'
    ],
    exceptions: [
      'Prepositional Verbs: If a verb has an attached preposition in active voice, the preposition must be retained next to V3 in passive voice (e.g., "The car ran over the dog" -> "The dog was run over by the car").',
      'Verbs taking "to" instead of "by": Certain verbs govern specific prepositions in passive voice: "known to", "surprised at", "pleased with", "alarmed at", "contained in".'
    ],
    examExamples: [
      {
        question: 'Active: The commander will give the orders tomorrow morning.',
        correctAnswer: 'Passive: The orders will be given by the commander tomorrow morning.',
        explanation: 'Future simple modal "will give" becomes "will be given", keeping tense identical.'
      }
    ],
    commonTraps: [
      'Confusing voice conversion with direct/indirect narration (in voice, the tense NEVER shifts back into the past).',
      'Dropping the essential auxiliary "being" in continuous tense transformations.'
    ],
    confusedConcepts: [
      'Active voice emphasis vs. Passive voice emphasis: Active emphasizes the agent; passive emphasizes the action or the receiver of the action when the agent is unknown or irrelevant.'
    ],
    summary: 'Key formula: Passive = form of "be" + Past Participle (V3). Never change tenses (unlike indirect speech). Always retain attached prepositions ("laugh at" -> "laughed at by").',
    practiceExercises: [
      {
        question: 'Active: Who wrote this tactical operational handbook?',
        correctAnswer: 'Passive: By whom was this tactical operational handbook written?',
        explanation: '"Who" transforms into "By whom", followed by auxiliary inversion "was...written".'
      }
    ],
    relatedChapters: ['direct-indirect-speech', 'spotting-errors']
  },

  'direct-indirect-speech': {
    title: 'Direct and Indirect Speech',
    section: 'grammar',
    chapterSlug: 'direct-indirect-speech',
    learningObjectives: [
      'Convert direct quotes into reported speech adhering to canonical tense backshifts.',
      'Adjust personal pronouns, demonstratives, and adverbs of time and place accurately.',
      'Handle reporting of questions (wh- and yes/no questions using if/whether).',
      'Transform imperative orders, advice, requests, and exclamatory statements.'
    ],
    overview: 'Direct and Indirect Speech (Narration) tests your ability to convey another speaker\'s statements, questions, or commands accurately into reported speech while maintaining logical temporal and deictic shifts.',
    coreRules: [
      'Reporting Verb Past Shift: If the reporting verb is in the past (e.g., "said", "remarked"), the tenses of the reported speech shift back one step: Simple Present -> Simple Past; Present Continuous -> Past Continuous; Present Perfect -> Past Perfect; Simple Past -> Past Perfect.',
      'Pronoun Shifts: First-person pronouns shift according to the speaker (subject of the reporting verb); second-person pronouns shift to the listener (object of the reporting verb); third-person pronouns remain unchanged (SON rule: 1-Subject, 2-Object, 3-No change).',
      'Deictic Shifts: Words expressing temporal or spatial proximity convert into words of distance: "now" -> "then", "here" -> "there", "today" -> "that day", "yesterday" -> "the previous day", "tomorrow" -> "the next day", "this" -> "that".',
      'Interrogatives: In indirect questions, inverted question order becomes normal assertive word order (Subject + Verb) without quotation marks or question marks. Yes/No questions use "if" or "whether".'
    ],
    exceptions: [
      'Universal Truths and Habitual Facts: If the reported statement expresses a universal truth, scientific principle, or perpetual fact, the tense remains in the present ("The teacher said that water boils at 100 degrees Celsius").',
      'Present or Future Reporting Verb: If the reporting verb is in the present or future ("He says", "She will say"), NO tense shift occurs in the reported speech.'
    ],
    examExamples: [
      {
        question: 'Direct: Rahul said, "I am planning to visit the military academy tomorrow."',
        correctAnswer: 'Indirect: Rahul said that he was planning to visit the military academy the next day.',
        explanation: 'Present continuous "am planning" backshifts to "was planning", "I" becomes "he", and "tomorrow" shifts to "the next day".'
      }
    ],
    commonTraps: [
      'Retaining interrogative inverted order in indirect questions (e.g., saying "He asked me where was I going" instead of "where I was going").',
      'Using "that" alongside "if", "whether", or "wh-" question words (e.g., "He asked that where...").'
    ],
    confusedConcepts: [
      'Say vs. Tell: "Say" does not take an immediate indirect object ("He said that..."); "Tell" strictly requires a personal indirect object ("He told me that...").'
    ],
    summary: 'Check the reporting verb tense first. If past, apply the backshift rule, update pronouns using the SON guideline, replace time/place markers, and ensure indirect questions use assertive word order.'
    ,
    practiceExercises: [
      {
        question: 'Direct: The colonel said to the troops, "Do not compromise your defensive perimeter."',
        correctAnswer: 'Indirect: The colonel ordered the troops not to compromise their defensive perimeter.',
        explanation: 'Imperative negative command converts into "ordered... not to" with base verb.'
      }
    ],
    relatedChapters: ['active-passive-voice', 'spotting-errors']
  },

  'fill-in-the-blanks': {
    title: 'Fill in the Blanks',
    section: 'grammar',
    chapterSlug: 'fill-in-the-blanks',
    learningObjectives: [
      'Identify the missing lexical or grammatical component through contextual clue analysis.',
      'Select precise phrasal verbs, idioms, and collocations appropriate to the sentence tone.',
      'Ensure strict agreement between connectors, subject-verb structures, and tense markers.'
    ],
    overview: 'Fill in the Blanks questions present a sentence with one or two missing words. Candidates must choose the option that makes the sentence grammatically accurate, logically consistent, and stylistically seamless.',
    coreRules: [
      'Contextual Tone Matching: The missing word must fit both the grammatical category required by syntax and the semantic tone (positive, negative, cautionary) established by the context.',
      'Structural Clues: Identify transition indicators (e.g., "although", "consequently", "whereas") which signal contrast, causality, or concession.',
      'Phrasal Verb Precision: Select the exact particle attached to the base verb (e.g., "call off" = cancel; "call on" = visit; "call for" = demand).'
    ],
    exceptions: [
      'Collocational Constraints: Words that appear synonymous in isolation cannot always substitute in idiomatic collocations (e.g., one can say "heavy rain" or "strong wind", but not "strong rain").'
    ],
    examExamples: [
      {
        question: 'Due to severe fog, the air operations were ______ until weather cleared.',
        correctAnswer: 'suspended',
        explanation: '"Suspended" specifically denotes a temporary interruption of formal operations.'
      }
    ],
    commonTraps: [
      'Choosing a word that sounds impressive but violates the grammatical agreement required by surrounding prepositions.',
      'Ignoring negative polarity words (hardly, scarcely, barely) in the surrounding sentence.'
    ],
    confusedConcepts: [
      'Compliment vs. Complement: A "compliment" is praise; a "complement" completes or enhances something.'
    ],
    summary: 'Read the complete sentence with the blank left open to ascertain whether a noun, verb, adjective, or connective is demanded. Test each option by reading the full sentence silently.'
    ,
    practiceExercises: [
      {
        question: 'He was so exhausted that he could ______ keep his eyes open during the briefing.',
        correctAnswer: 'barely',
        explanation: '"Barely" means only just or almost not, matching the extreme fatigue described.'
      }
    ],
    relatedChapters: ['prepositions-determiners', 'cloze-composition']
  },

  'ordering-of-words': {
    title: 'Ordering of Words in a Sentence',
    section: 'grammar',
    chapterSlug: 'ordering-of-words',
    learningObjectives: [
      'Reassemble jumbled sentence segments (labelled P, Q, R, S) into standard English syntax.',
      'Identify grammatical anchors: the core subject, primary verb, and direct/indirect objects.',
      'Position prepositional phrases and adverbial modifiers in natural syntactic order.',
      'Eliminate distractors quickly using mandatory pairing techniques.'
    ],
    overview: 'Ordering of Words questions present a scrambled sentence divided into four parts designated as P, Q, R, and S. Candidates must determine the only sequential order that constructs a grammatically impeccable and logical sentence.',
    coreRules: [
      'Locate the Independent Subject: The sentence must typically open with a noun or pronoun that serves as the grammatical subject of the main clause.',
      'Establish Mandatory Pairs: Connect parts that cannot be separated—such as a transitive verb and its immediate object, an auxiliary verb and its main verb, or correlative pairs (not only...but also).',
      'Modifier Proximity: Participial phrases and relative clauses (who, which, that) must stand immediately adjacent to the noun they modify.',
      'Option Elimination by Opening/Closing Parts: Check which letter options can logically initiate or conclude the sentence to eliminate incorrect combinations.'
    ],
    exceptions: [
      'Inverted Opening: When an adverbial or prepositional phrase of location/time opens the sentence ("In the deep valley..."), the subject immediately follows the verb.'
    ],
    examExamples: [
      {
        question: 'P: to the mountain summit / Q: the expedition team / R: after enduring bitter blizzards / S: finally made their ascent',
        correctAnswer: 'Q-R-S-P',
        explanation: '"The expedition team" (Q) is the subject, followed by the modifier "after enduring..." (R), predicate "finally made..." (S), and directional complement "to the mountain summit" (P).'
      }
    ],
    commonTraps: [
      'Assuming the order follows the sequence in which the words appear in your mother tongue.',
      'Splitting fixed idiomatic phrases across non-consecutive segments.'
    ],
    confusedConcepts: [
      'Relative Pronoun Attachment: A relative clause introduced by "which" or "who" must adhere to the noun preceding it, never floating at the end of an unrelated clause.'
    ],
    summary: 'Find the subject-verb core first. Identify mandatory links between parts (e.g., preposition ending in P connecting to noun beginning in R). Verify the final order by reading it as one continuous sentence.',
    practiceExercises: [
      {
        question: 'P: in international peacekeeping missions / Q: has earned global admiration / R: the exemplary discipline / S: of the Indian armed forces',
        correctAnswer: 'R-S-P-Q',
        explanation: 'Subject "The exemplary discipline" (R) connects to "of the Indian armed forces" (S), location phrase (P), and predicate verb "has earned global admiration" (Q).'
      }
    ],
    relatedChapters: ['ordering-of-sentences', 'spotting-errors']
  },

  'ordering-of-sentences': {
    title: 'Ordering of Sentences in a Paragraph',
    section: 'grammar',
    chapterSlug: 'ordering-of-sentences',
    learningObjectives: [
      'Rearrange scrambled intermediary sentences (P, Q, R, S) between fixed opening (S1) and closing (S6) statements.',
      'Track pronoun referents and noun antecedents across sentence transitions.',
      'Recognize chronological, spatial, causal, and contrastive sequencing markers.',
      'Deduce paragraph coherence using mandatory transitional links.'
    ],
    overview: 'This chapter covers paragraph reordering (frequently presented as S1-P-Q-R-S-S6 in CDS). S1 establishes the context and S6 provides the conclusion. Candidates rearrange P, Q, R, and S to ensure cohesive narrative and logical progression.',
    coreRules: [
      'Pronoun Tracking: A pronoun (he, it, they, these) in one sentence must be preceded by the explicit noun antecedent in an earlier sentence.',
      'Chronological and Causal Flow: Historical dates, sequential procedures, and cause-effect chains must adhere to logical temporal sequence.',
      'Transition Signal Words: Words like "however", "consequently", "moreover", "on the contrary" indicate the logical link with the immediately preceding sentence.',
      'Direct Continuity with S1 and S6: The opening choice among P, Q, R, S must logically flow from S1; the closing choice must transition seamlessly into S6.'
    ],
    exceptions: [
      'General to Specific Flow: In expository prose, a general conceptual statement precedes granular data or statistical illustrations.'
    ],
    examExamples: [
      {
        question: 'S1: Renewable energy is vital for sustainable development.\nP: Solar energy, in particular, has seen drastic cost reductions.\nQ: These technological innovations make clean power affordable.\nR: It minimizes reliance on polluting fossil fuels.\nS: Global energy grids are adopting clean sources rapidly.\nS6: Thus, a cleaner energy future is well within our reach.',
        correctAnswer: 'R-P-Q-S',
        explanation: 'S1 introduces renewable energy. R gives the direct reason ("It minimizes..."). P provides the solar example. Q refers to "These technological innovations", and S transitions into the global grid adoption before S6 concluding.'
      }
    ],
    commonTraps: [
      'Selecting an opening sentence that uses a pronoun referring to a noun that has not yet been introduced in S1.',
      'Ignoring the ending anchor S6 when choosing between two final permutation options.'
    ],
    confusedConcepts: [
      'Inductive vs. Deductive paragraph progression: Deductive starts with a thesis and proves it; inductive builds evidence towards a climactic conclusion.'
    ],
    summary: 'Inspect S1 and determine which of P/Q/R/S directly continues the thought. Form mandatory pairs using pronoun-noun and cause-effect links. Verify that your final choice connects into S6 naturally.',
    practiceExercises: [
      {
        question: 'S1: The reconnaissance unit reached the crest of the hill at dawn.\nP: Through their thermal binoculars, they observed the enemy encampment.\nQ: Silence was maintained to preserve operational surprise.\nR: The terrain was rugged and choked with thorny shrubs.\nS: Despite the obstacles, every soldier took up a concealed firing position.\nS6: They now awaited the radio confirmation to initiate contact.',
        correctAnswer: 'R-S-Q-P',
        explanation: 'S1 establishes arrival. R describes the difficult terrain. S shows overcoming the terrain to take positions. Q emphasizes the silence maintained. P describes observing the target, flowing into S6 awaiting confirmation.'
      }
    ],
    relatedChapters: ['ordering-of-words', 'factual-comprehension']
  },

  // ──────────────────────────────────────────────────────────
  // VOCABULARY (6 CHAPTERS)
  // ──────────────────────────────────────────────────────────

  'synonyms-antonyms': {
    title: 'Synonyms & Antonyms (Combined)',
    section: 'vocabulary',
    chapterSlug: 'synonyms-antonyms',
    learningObjectives: [
      'Deduce target word meanings from contextual sentence cues rather than rote memorization.',
      'Identify the closest synonym in connotation, register, and grammatical word class.',
      'Identify the exact opposite antonym, avoiding near-synonym and distractor traps.',
      'Seamlessly switch between finding closest meanings (Questions 1–10) and opposite meanings (Questions 11–20).'
    ],
    overview: 'In the CDS examination, Synonyms and Antonyms are combined into one single vocabulary test section. In accordance with strict CDS requirements, every test comprises exactly 10 Synonyms (Q1–10) followed by exactly 10 Antonyms (Q11–20), each embedded within an illustrative contextual sentence.',
    coreRules: [
      'Grammatical Category Matching: A target adjective requires an adjective synonym/antonym; target verbs match verbs; target nouns match nouns.',
      'Connotation Consistency: Discern whether the underlined word conveys a positive, neutral, or pejorative tone in the sentence.',
      'Root, Prefix, and Suffix Analysis: Deconstruct complex Latin and Greek roots (e.g., mal- = bad; bene- = good; circum- = around; pug- = fight).',
      'Dual Direction Attention: Always observe the section header: Questions 1–10 require the NEAREST meaning; Questions 11–20 require the OPPOSITE meaning.'
    ],
    exceptions: [
      'Context-Dependent Meaning (Polysemy): Certain words shift meanings drastically based on domain (e.g., "sanction" can mean legal authorization or punitive economic penalty).'
    ],
    examExamples: [
      {
        question: 'The officer showed **audacity** by leading the reconnaissance patrol into hostile territory. (SYNONYM)',
        correctAnswer: 'Daring',
        explanation: '"Audacity" denotes bold courage or willingness to take daring risks. The nearest synonym is "Daring".'
      },
      {
        question: 'The cease-fire brought a **transient** peace to the disputed valley. (ANTONYM)',
        correctAnswer: 'Permanent',
        explanation: '"Transient" means lasting for a very short duration. The exact opposite (antonym) is "Permanent".'
      }
    ],
    commonTraps: [
      'Selecting a synonym when the prompt demands an antonym, or vice versa.',
      'Falling for false cognates (words that sound similar to native language words but carry completely different meanings).'
    ],
    confusedConcepts: [
      'Exact Synonym vs. Contextual Synonym: Rare words seldom have exact 100% mathematical duplicates; choose the option that most faithfully reproduces the contextual intent.'
    ],
    summary: 'First 10 questions = Closest Meaning (Synonym). Last 10 questions = Opposite Meaning (Antonym). Check part of speech, analyze positive/negative charge, and eliminate distractors matching the opposite requirement.',
    practiceExercises: [
      {
        question: 'The commander warned that **complacency** during peacetime poses a grave threat. (SYNONYM)',
        correctAnswer: 'Self-satisfaction',
        explanation: '"Complacency" means a state of uncritical, smug satisfaction leading to vulnerability.'
      }
    ],
    relatedChapters: ['word-usage', 'cloze-composition', 'contextual-vocabulary']
  },

  'idioms-phrases': {
    title: 'Idioms and Phrases',
    section: 'vocabulary',
    chapterSlug: 'idioms-phrases',
    learningObjectives: [
      'Decipher figurative and idiomatic expressions frequently tested in UPSC examinations.',
      'Distinguish literal meanings from metaphorical and historical idiomatic senses.',
      'Identify phrasal verbs and contextual prepositional expressions in formal prose.'
    ],
    overview: 'Idioms and Phrases evaluate a candidate\'s command of figurative language, cultural expressions, and phrasal verbs. UPSC tests these either as direct idioms with definition choices or embedded in contextual sentences.',
    coreRules: [
      'Non-Literal Interpretation: The meaning of an idiom cannot be deduced simply by concatenating the literal definitions of its individual words.',
      'Contextual Implication: When embedded in a sentence, examine the surrounding situational clues to infer the idiomatic sense.',
      'Historical/Metaphorical Roots: Many English idioms derive from naval, military, agricultural, or classical traditions (e.g., "burn one\'s boats" = leave no possibility of retreat).'
    ],
    exceptions: [
      'Deceptively Similar Idioms: Phrases with minor prepositional differences possess entirely different meanings (e.g., "in the red" = in debt; "in the black" = financially solvent).'
    ],
    examExamples: [
      {
        question: 'To **burn the candle at both ends** means:',
        correctAnswer: 'To overwork and exhaust oneself by leading an excessively busy life',
        explanation: 'The idiom denotes working late into the night and rising early, leading to exhaustion.'
      }
    ],
    commonTraps: [
      'Selecting an answer choice that gives the literal physical interpretation of the words (e.g., interpreting "spill the beans" as dropping legumes).',
      'Confusing idioms of similar imagery with opposite outcomes.'
    ],
    confusedConcepts: [
      'Take after vs. Look after: "Take after" means to resemble an ancestor; "Look after" means to care for someone.'
    ],
    summary: 'Never choose the literal interpretation. Look for figurative, symbolic, or metaphorical connotations that describe human behavior, strategy, conflict, or emotion.',
    practiceExercises: [
      {
        question: 'To **take the bull by the horns** means:',
        correctAnswer: 'To face a difficult challenge directly with courage',
        explanation: 'Denotes confronting a problem boldly and decisively rather than procrastinating.'
      }
    ],
    relatedChapters: ['synonyms-antonyms', 'fill-in-the-blanks']
  },

  'one-word-substitution': {
    title: 'One-Word Substitution',
    section: 'vocabulary',
    chapterSlug: 'one-word-substitution',
    learningObjectives: [
      'Replace elaborate descriptive phrases with exact, single-word lexical equivalents.',
      'Categorize vocabulary systematically: sciences, philosophies, governance forms, and character traits.',
      'Utilize root prefixes and suffixes (-cide, -cracy, -ology, -phile, -phobe) to identify obscure terms.'
    ],
    overview: 'One-Word Substitution tests vocabulary economy and lexical precision. Candidates identify single academic words that encapsulate multi-word definitions, personality attributes, medical specialties, or governmental paradigms.',
    coreRules: [
      'Suffix Categorization: Suffixes define the conceptual category: "-ology" (study of), "-cracy" (rule/governance), "-cide" (act of killing), "-phobia" (irrational fear), "-phile" (lover/enthusiast).',
      'Prefix Precision: Prefixes dictate orientation: "ambi-" (both), "omni-" (all), "poly-" (many), "mono-" (single), "pan-" (universal).',
      'Precision of Nuance: Differentiate close synonyms (e.g., "altruist" = one who loves and aids humanity; "philanthropist" = one who donates wealth for social welfare).'
    ],
    exceptions: [
      'Irregular Derivations: Some historical terms do not follow transparent classical roots and must be memorized through direct study (e.g., "charlatan" = a fraud or imposter claiming knowledge).'
    ],
    examExamples: [
      {
        question: 'A person who is indifferent to pleasure or pain is called a/an:',
        correctAnswer: 'Stoic',
        explanation: 'A "stoic" is an individual who endures hardship or suffering without complaint or display of emotion.'
      }
    ],
    commonTraps: [
      'Confusing words with opposite prefixes (e.g., "misanthrope" = hater of mankind; "philanthropist" = lover of mankind).',
      'Selecting a related field of study instead of the practitioner (e.g., "dermatology" vs. "dermatologist").'
    ],
    confusedConcepts: [
      'Egoist vs. Egotist: An "egoist" is self-centered and motivated solely by self-interest; an "egotist" constantly talks boasting about himself.'
    ],
    summary: 'Focus on root words, prefixes, and suffixes. Memorize core clusters: governance forms (plutocracy, oligarchy), human traits (introvert, gregarious), and literary/scientific disciplines.',
    practiceExercises: [
      {
        question: 'An unexpected piece of good fortune or sudden gain is termed:',
        correctAnswer: 'Windfall',
        explanation: 'A "windfall" is an unexpected unearned gain or fortunate bonus.'
      }
    ],
    relatedChapters: ['synonyms-antonyms', 'word-usage']
  },

  'spelling-master': {
    title: 'Spelling Master (Orthography)',
    section: 'vocabulary',
    chapterSlug: 'spelling-master',
    learningObjectives: [
      'Spot correctly spelt words among common orthographic distractors.',
      'Apply standard English spelling rules: double consonants, silent letters, and diphthongs.',
      'Master the "i before e except after c" rule and its notable exceptions.',
      'Recognize spelling modifications when adding suffixes (-able, -ible, -ous, -ment).'
    ],
    overview: 'Spelling questions in CDS require candidates to identify the single correctly spelt word among four options (or identify the single misspelt word). UPSC tests words containing silent letters, double consonants, and ambiguous vowel combinations.',
    coreRules: [
      'Double Consonants in Prefixes and Suffixes: Words like "accommodation", "embarrassment", "millennium", and "recommendation" contain double letter clusters that candidates frequently omit.',
      'The "I before E" Rule: "I before E except after C" (e.g., "believe", "relief"; but "receive", "deceive").',
      'Retaining Silent E: A final silent "e" is dropped before a vowel suffix ("hope" -> "hoping"), but retained before a consonant suffix ("hope" -> "hopeful").',
      'Y to I Rule: When a word ends in a consonant + "y", change "y" to "i" before adding a suffix ("happy" -> "happiness"), unless the suffix begins with "i" ("carrying").'
    ],
    exceptions: [
      'Exceptions to "I before E": "weird", "seize", "leisure", "neighbor", "foreign", "sovereign", "forfeit".',
      'Retaining "e" after soft "c" or "g": Retained before -able or -ous to preserve the soft sound: "noticeable", "courageous".'
    ],
    examExamples: [
      {
        question: 'Identify the correctly spelt word:',
        correctAnswer: 'Bureaucracy',
        explanation: 'Correct spelling is B-U-R-E-A-U-C-R-A-C-Y (derived from French "bureau" + Greek "kratos").'
      }
    ],
    commonTraps: [
      'American vs. British Spelling: CDS tests formal British English ("programme", "defence", "colour", "cancelled").',
      'Confusing single and double letters in compound suffixes (e.g., "fulfil" vs. "fulfilled").'
    ],
    confusedConcepts: [
      'Stationery vs. Stationary: "Stationery" (with an e) refers to writing materials; "Stationary" (with an a) means remaining in a fixed position.'
    ],
    summary: 'Write the word on scratch paper without looking at the distractors first; visual memory helps avoid the confusing optical effects created by distorted options.',
    practiceExercises: [
      {
        question: 'Which of the following options is correctly spelt?',
        correctAnswer: 'Mischievous',
        explanation: 'Correct spelling is M-I-S-C-H-I-E-V-O-U-S (three syllables, not four; no "i" after "v").'
      }
    ],
    relatedChapters: ['word-usage', 'synonyms-antonyms']
  },

  'cloze-composition': {
    title: 'Cloze Composition',
    section: 'vocabulary',
    chapterSlug: 'cloze-composition',
    learningObjectives: [
      'Complete numbered blanks within an extended coherent passage without disrupting context.',
      'Synthesize vocabulary choices with overall passage tone, register, and theme.',
      'Apply connective markers and grammatical concordance across paragraph sentences.',
      'Maintain logical narrative and argumentative consistency throughout the passage.'
    ],
    overview: 'Cloze Composition presents an extended analytical, historical, or literary passage with numbered blanks. Candidates choose the word that best completes each blank, testing simultaneous vocabulary precision, collocation knowledge, and grammatical cohesion.',
    coreRules: [
      'Read First for Macro Understanding: Skim the entire passage from start to finish before attempting to fill any individual blank.',
      'Identify Sentence Function: Determine whether the blank requires a noun, verb, conjunction, or preposition based on immediate syntactic surroundings.',
      'Collocation Alignment: Choose words that naturally collocate with adjacent prepositions or objects (e.g., "wreak havoc", "cast doubts", "pave the way").',
      'Tone Concordance: Ensure the chosen word harmonizes with the objective, critical, or admiring tone of the passage.'
    ],
    exceptions: [
      'Forward Clues: The answer to blank number 3 is frequently clarified or constrained by a clue located in the subsequent sentence (blank 4 or 5).'
    ],
    examExamples: [
      {
        question: 'The treaty was signed to ______ diplomatic relations between the two border nations.',
        correctAnswer: 'restore',
        explanation: 'Contextual flow indicates re-establishing broken peace ties, making "restore" optimal.'
      }
    ],
    commonTraps: [
      'Filling each blank in isolation without considering the author\'s primary thesis.',
      'Selecting a word that fits the local sentence but contradicts the broader paragraph argument.'
    ],
    confusedConcepts: [
      'Comprehensive vs. Comprehensible: "Comprehensive" means all-inclusive; "Comprehensible" means intelligible or understandable.'
    ],
    summary: 'Skim the entire passage first. Determine the grammatical role of each missing word. Watch for linking words (however, furthermore, consequently) that dictate logical direction.',
    practiceExercises: [
      {
        question: 'Despite numerous setbacks, the engineering battalion displayed ______ determination to finish the mountain bridge.',
        correctAnswer: 'unflinching',
        explanation: '"Unflinching" matches the concessive clause introduced by "Despite numerous setbacks".'
      }
    ],
    relatedChapters: ['fill-in-the-blanks', 'synonyms-antonyms', 'factual-comprehension']
  },

  'word-usage': {
    title: 'Word Usage & Confusing Words',
    section: 'vocabulary',
    chapterSlug: 'word-usage',
    learningObjectives: [
      'Distinguish homophones, paronyms, and words of similar appearance or sound.',
      'Identify correct contextual usage across easily confused verb and noun pairs.',
      'Evaluate whether a word is used correctly in multiple distinct sample sentences.'
    ],
    overview: 'Word Usage questions test your ability to differentiate paronyms, homophones, and words frequently misused due to phonetic similarity. CDS tests whether candidates understand the exact semantic boundaries of closely related words.',
    coreRules: [
      'Homophone Differentiation: Homophones share identical pronunciation but differ in orthography and meaning (e.g., "cite", "sight", "site").',
      'Paronym Differentiation: Words derived from the same root that have diverged in meaning (e.g., "artistic" = creative talent; "artificial" = man-made/synthetic).',
      'Transitive vs. Intransitive Pairs: Words frequently confused because one takes an object while the other does not (e.g., "raise/rise", "set/sit", "lay/lie").'
    ],
    exceptions: [
      'Semantic Shifts: Some words can function as both noun and verb with subtle shifts in stress and meaning (e.g., "produce" as verb vs. "produce" as agricultural harvest).'
    ],
    examExamples: [
      {
        question: 'Choose the sentence where the word **affect** is used correctly:',
        correctAnswer: 'The sudden change in policy will directly affect civilian trade.',
        explanation: '"Affect" functions as a verb meaning to influence or produce a change.'
      }
    ],
    commonTraps: [
      'Confusing "affect" (verb) with "effect" (noun denoting the result of a cause).',
      'Confusing "allusion" (indirect reference) with "illusion" (deceptive appearance).'
    ],
    confusedConcepts: [
      'Continual vs. Continuous: "Continual" means recurring frequently with periodic interruptions; "Continuous" means proceeding without any break or interruption in time.'
    ],
    summary: 'Pay attention to part of speech. Memorize standard confusing pairs: complement/compliment, principal/principle, council/counsel, eminent/imminent.',
    practiceExercises: [
      {
        question: 'The supreme military commander was ______ in his decision to fortify the base.',
        correctAnswer: 'judicious',
        explanation: '"Judicious" means showing good judgment and sense; "judicial" relates to a court of law.'
      }
    ],
    relatedChapters: ['synonyms-antonyms', 'spelling-master']
  },

  // ──────────────────────────────────────────────────────────
  // READING COMPREHENSION (4 CHAPTERS)
  // ──────────────────────────────────────────────────────────

  'factual-comprehension': {
    title: 'Factual Comprehension',
    section: 'reading-comprehension',
    chapterSlug: 'factual-comprehension',
    learningObjectives: [
      'Locate explicit textual statements, chronological events, and statistical figures with speed and accuracy.',
      'Recognize accurate paraphrases of factual statements in answer options.',
      'Eliminate distractors that introduce external knowledge not corroborated by the passage text.'
    ],
    overview: 'Factual Comprehension evaluates your ability to extract direct information, identify explicit causal relationships, and follow the empirical details presented across two dense editorial or literary passages (5 questions per passage, 10 questions total).',
    coreRules: [
      'Strict Textual Reliance: Every factual answer must be directly supported by a specific sentence or paragraph in the passage.',
      'Paraphrasing Identification: The correct option will rarely repeat the exact verbatim words from the text; it expresses the same fact using synonymous phrasing.',
      'Avoid Outside Assumptions: Never select an answer based on what is generally true in the real world if it is not affirmed by the passage text.',
      'Keyword Scanning: Identify key technical terms, dates, and proper nouns in the question stem to locate the relevant paragraph rapidly.'
    ],
    exceptions: [
      'Absolute Statements: Options containing words like "always", "never", "only", or "impossible" are almost always incorrect unless explicitly asserted in the passage.'
    ],
    examExamples: [
      {
        question: 'According to the passage, what is the primary catalyst for sustainable economic transition?',
        correctAnswer: 'Strategic investment in renewable energy coupled with rigorous regulatory oversight.',
        explanation: 'Paragraph 2 directly links the long-term transition to strategic renewable capitalization.'
      }
    ],
    commonTraps: [
      'Choosing an answer that is true in everyday reality but completely unmentioned in the passage.',
      'Confusing an incidental supporting detail with a direct cause.'
    ],
    confusedConcepts: [
      'Explicit Fact vs. Inference: A fact is directly asserted in the text; an inference is logically deduced from the facts.'
    ],
    summary: 'Scan for question keywords in the text. Read two sentences before and after the matched sentence. Validate the answer choice against explicit textual evidence.',
    practiceExercises: [
      {
        question: 'According to the text, the Malacca Strait accounts for what proportion of global maritime commerce?',
        correctAnswer: 'Over sixty percent',
        explanation: 'Directly corroborated by explicit numerical data in the passage.'
      }
    ],
    relatedChapters: ['inferential-comprehension', 'tone-and-theme']
  },

  'inferential-comprehension': {
    title: 'Inferential Comprehension',
    section: 'reading-comprehension',
    chapterSlug: 'inferential-comprehension',
    learningObjectives: [
      'Deduce unstated assumptions, implied conclusions, and underlying logic from passage arguments.',
      'Distinguish between sound, conservative inferences and overreaching speculative assumptions.',
      'Identify what the author implies or suggests regarding future developments or historical trends.'
    ],
    overview: 'Inferential Comprehension tests your ability to read between the lines. Rather than retrieving verbatim facts, candidates must deduce unstated assumptions, logical corollaries, and the author\'s implicit reasoning based on facts established in the text.',
    coreRules: [
      'Conservative Deduction: A valid inference is a necessary logical consequence of what is explicitly stated in the text.',
      'Never Speculate Beyond the Scope: If the passage discusses the economic benefits of solar energy, do not infer that fossil fuels should be abolished tomorrow unless the author explicitly implies it.',
      'Author Argument Tracking: Identify the premises of the author\'s argument to recognize what conclusion logically follows.',
      'Tone Cues: Conditional phrasing ("may suggest", "indicates a potential") provides clues to the author\'s implicit conclusions.'
    ],
    exceptions: [
      'Implicit Negatives: An author\'s heavy irony or praise of an alternative approach implies strong criticism of the current policy without stating it overtly.'
    ],
    examExamples: [
      {
        question: 'It can be inferred from the author\'s discussion of autonomous defense algorithms that:',
        correctAnswer: 'Unchecked algorithmic autonomy poses catastrophic escalation risks under real-world warfare conditions.',
        explanation: 'The passage highlights the critical necessity of human-in-the-loop oversight to prevent unintended escalation.'
      }
    ],
    commonTraps: [
      'Selecting an overextended inference that goes beyond what the passage can logically sustain.',
      'Confusing a character\'s perspective within the passage with the author\'s overarching viewpoint.'
    ],
    confusedConcepts: [
      'Inference vs. Assumption: An assumption is an unstated premise upon which an argument rests; an inference is a conclusion derived from established evidence.'
    ],
    summary: 'Look for the logical next step. A valid inference must be 100% defendable from the text. Reject choices that use hyperbolic or extreme wording.'
    ,
    practiceExercises: [
      {
        question: 'The author\'s critique of rapid urban industrialization implies that:',
        correctAnswer: 'Environmental conservation has been subordinated to short-term economic gains.',
        explanation: 'Follows logically from the author\'s discussion of unchecked habitat degradation in industrial corridors.'
      }
    ],
    relatedChapters: ['factual-comprehension', 'tone-and-theme']
  },

  'tone-and-theme': {
    title: 'Tone and Theme Identification',
    section: 'reading-comprehension',
    chapterSlug: 'tone-and-theme',
    learningObjectives: [
      'Discern the author\'s overarching attitude, stance, and tone (objective, critical, laudatory, skeptical, cynical).',
      'Formulate the central thesis, primary purpose, and core message of complex passages.',
      'Select the most fitting, comprehensive, and non-misleading title for a passage.'
    ],
    overview: 'Tone and Theme questions assess macro-level comprehension. Candidates must synthesize the entire passage to identify the author\'s primary objective, attitude towards the subject matter, and the overarching thematic core.',
    coreRules: [
      'Tone Identification: Scrutinize adjective and adverb choices. Objective/analytical = balanced, fact-based; Critical = exposing flaws; Laudatory = praising achievements; Skeptical = questioning claims; Pedagogical = instructional/educating.',
      'Theme vs. Incidental Topic: The central theme must encompass the entire passage from beginning to end, not merely a single illustrative paragraph.',
      'Title Selection Criteria: A good title is neither too narrow (covering only one subtopic) nor too broad (encompassing an entire academic field), but precisely captures the author\'s central thesis.'
    ],
    exceptions: [
      'Shift in Tone: Long passages often start with an objective exposition and conclude with a forceful critical warning or prescriptive recommendation; the tone of the concluding paragraphs carries the author\'s final stance.'
    ],
    examExamples: [
      {
        question: 'The tone of the author regarding modern international maritime diplomacy is best described as:',
        correctAnswer: 'Analytical and cautionary',
        explanation: 'The author dispassionately assesses geopolitical facts while cautioning against unilateral territorial aggression.'
      }
    ],
    commonTraps: [
      'Choosing a title that describes only the first paragraph or an incidental case study.',
      'Mistaking an ironic or sarcastic comment for a sincere laudatory statement.'
    ],
    confusedConcepts: [
      'Subject vs. Theme: The subject is the general topic (e.g., "Artificial Intelligence"); the theme is the author\'s specific insight about that topic (e.g., "The imperative for human oversight in AI defense systems").'
    ],
    summary: 'Ask: Why did the author write this passage? What is the author\'s emotional and intellectual stance? Select titles and themes that embrace the full scope of the text.'
    ,
    practiceExercises: [
      {
        question: 'Which of the following serves as the most suitable title for the passage on Indo-Pacific maritime strategy?',
        correctAnswer: 'Strategic Interoperability: Safeguarding Indo-Pacific Sea Lanes',
        explanation: 'Encapsulates both the geographic theater and the operational thesis discussed throughout the passage.'
      }
    ],
    relatedChapters: ['inferential-comprehension', 'contextual-vocabulary']
  },

  'contextual-vocabulary': {
    title: 'Contextual Vocabulary in Passages',
    section: 'reading-comprehension',
    chapterSlug: 'contextual-vocabulary',
    learningObjectives: [
      'Deduce the meaning of words, phrases, and metaphors as used within the specific passage context.',
      'Distinguish general dictionary definitions from domain-specific or figurative textual applications.',
      'Identify contextual synonyms and antonyms that preserve textual coherence.'
    ],
    overview: 'Contextual Vocabulary questions require candidates to define an underlined or referenced word based specifically on its role in the reading passage, rather than its generic dictionary definition.',
    coreRules: [
      'Context Overrides Dictionary: The primary dictionary definition is frequently a distractor; the correct answer matches the specific nuance intended by the passage.',
      'Substitution Method: Substitute each of the four answer choices into the passage in place of the target word; the correct choice must preserve logical meaning and grammatical syntax.',
      'Metaphorical Awareness: In editorial prose, everyday words often carry metaphorical weight (e.g., "a sea of data", "a hawkish stance").'
    ],
    exceptions: [
      'Archaic or Specialized Jargon: In historical or military passages, technical terms carry highly constrained formal meanings (e.g., "theater" = military combat zone).'
    ],
    examExamples: [
      {
        question: 'As used in paragraph 2, the word **fidelity** most nearly means:',
        correctAnswer: 'Accuracy and precision',
        explanation: 'In the context of algorithmic data synthesis, "fidelity" refers to how accurately and precisely the data represents reality.'
      }
    ],
    commonTraps: [
      'Selecting the most common dictionary definition without checking if it fits the sentence in the passage.',
      'Ignoring prepositions following the target word in the text.'
    ],
    confusedConcepts: [
      'Literal meaning vs. Contextual signification: Words take their color and nuance from the surrounding intellectual discourse.'
    ],
    summary: 'Locate the word in the passage. Read the entire sentence. Mentally substitute each option into the sentence to verify which one maintains exact conceptual continuity.'
    ,
    practiceExercises: [
      {
        question: 'The author notes that the military unit faced **attrition**. Here, "attrition" refers to:',
        correctAnswer: 'Gradual reduction of strength through sustained hostile pressure',
        explanation: 'In military strategy, attrition denotes the systematic wearing down of personnel and equipment.'
      }
    ],
    relatedChapters: ['synonyms-antonyms', 'factual-comprehension']
  }
};

module.exports = cdsAllTheory;
