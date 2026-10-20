// ============================================================
// PREORBIT — CDS English Grammar Test Bank (9 Tests x 20 MCQs = 180 MCQs)
// ============================================================
const spottingErrorsTest = {
  module: 'cds',
  section: 'grammar',
  subject: 'grammar',
  chapterSlug: 'spotting-errors',
  chapterName: 'Spotting Errors',
  testId: 'spotting-errors-test-1',
  testName: 'Spotting Errors - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'Neither of the two candidates (A) / who had applied for the position (B) / were found suitable for the post. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'Neither of the two candidates' },
        { key: 'B', text: 'who had applied for the position' },
        { key: 'C', text: 'were found suitable for the post' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'C',
      explanation: '"Neither" is an indefinite pronoun that is singular and takes a singular verb. "Were" should be replaced with "was".',
      marks: 1
    },
    {
      question: 'Hardly had he entered the conference room (A) / than the delegates (B) / began to question him aggressively. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'Hardly had he entered the conference room' },
        { key: 'B', text: 'than the delegates' },
        { key: 'C', text: 'began to question him aggressively' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'B',
      explanation: '"Hardly" and "scarcely" are correlative conjunctions paired with "when", not "than". Replace "than" with "when".',
      marks: 1
    },
    {
      question: 'The captain, along with all his crew members, (A) / have been rescued safely (B) / from the sinking vessel. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'The captain, along with all his crew members' },
        { key: 'B', text: 'have been rescued safely' },
        { key: 'C', text: 'from the sinking vessel' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'B',
      explanation: 'When two nouns are connected by "along with", "as well as", or "together with", the verb agrees with the first subject ("The captain", which is singular). Use "has been" instead of "have been".',
      marks: 1
    },
    {
      question: 'The committee have decided (A) / to submit its unanimous report (B) / before the end of this month. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'The committee have decided' },
        { key: 'B', text: 'to submit its unanimous report' },
        { key: 'C', text: 'before the end of this month' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'A',
      explanation: 'When a collective noun ("committee") acts unanimously as a single unit, it takes a singular verb. Replace "have decided" with "has decided".',
      marks: 1
    },
    {
      question: 'Each of the students (A) / were given a certificate of merit (B) / at the annual convocation. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'Each of the students' },
        { key: 'B', text: 'were given a certificate of merit' },
        { key: 'C', text: 'at the annual convocation' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'B',
      explanation: '"Each" is singular and requires the singular verb "was given" instead of "were given".',
      marks: 1
    },
    {
      question: 'Scarcely had the train arrived (A) / when the passengers rushed forward (B) / to occupy the vacant seats. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'Scarcely had the train arrived' },
        { key: 'B', text: 'when the passengers rushed forward' },
        { key: 'C', text: 'to occupy the vacant seats' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'D',
      explanation: 'The sentence correctly pairs "Scarcely...when" with appropriate inversion and verb tenses. Hence, No Error.',
      marks: 1
    },
    {
      question: 'One of the most pressing problems (A) / facing the developing nations (B) / are the rapid depletion of natural resources. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'One of the most pressing problems' },
        { key: 'B', text: 'facing the developing nations' },
        { key: 'C', text: 'are the rapid depletion of natural resources' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'C',
      explanation: 'The real subject is "One", which is singular. Therefore, the verb must be "is", not "are".',
      marks: 1
    },
    {
      question: 'No sooner did the bell ring (A) / than all the children (B) / dashed happily into the playground. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'No sooner did the bell ring' },
        { key: 'B', text: 'than all the children' },
        { key: 'C', text: 'dashed happily into the playground' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'D',
      explanation: 'The sentence correctly uses "No sooner did...than" with the base form of the verb "ring". No Error.',
      marks: 1
    },
    {
      question: 'The teacher asked the boy (A) / why was he absent (B) / from school the previous day. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'The teacher asked the boy' },
        { key: 'B', text: 'why was he absent' },
        { key: 'C', text: 'from school the previous day' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'B',
      explanation: 'In indirect interrogative clauses, normal assertive word order is required (subject before auxiliary verb). Replace "why was he" with "why he was".',
      marks: 1
    },
    {
      question: 'Unless you do not work hard, (A) / you will not be able (B) / to secure a commission in the armed forces. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'Unless you do not work hard' },
        { key: 'B', text: 'you will not be able' },
        { key: 'C', text: 'to secure a commission in the armed forces' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'A',
      explanation: '"Unless" already contains a negative connotation ("if not"). Using "do not" creates an erroneous double negative. Replace with "Unless you work hard".',
      marks: 1
    },
    {
      question: 'She is one of those rare officers (A) / who never compromises (B) / on ethical standards or military discipline. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'She is one of those rare officers' },
        { key: 'B', text: 'who never compromises' },
        { key: 'C', text: 'on ethical standards or military discipline' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'B',
      explanation: 'In the construction "one of those + plural noun + relative pronoun (who)", the relative pronoun refers to the plural antecedent ("officers"). The verb must be plural: "compromise".',
      marks: 1
    },
    {
      question: 'The quality of the fabrics manufactured (A) / in this traditional weaving center (B) / are superior to those imported from abroad. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'The quality of the fabrics manufactured' },
        { key: 'B', text: 'in this traditional weaving center' },
        { key: 'C', text: 'are superior to those imported from abroad' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'C',
      explanation: 'The grammatical subject is "The quality" (singular), not "fabrics". The verb should be "is superior", not "are superior".',
      marks: 1
    },
    {
      question: 'He told me that (A) / he would rather resign (B) / than accepting the unfair compromise. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'He told me that' },
        { key: 'B', text: 'he would rather resign' },
        { key: 'C', text: 'than accepting the unfair compromise' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'C',
      explanation: '"Would rather" takes a bare infinitive in parallel constructions. "Resign" must be paralleled by "accept", not "accepting".',
      marks: 1
    },
    {
      question: 'Ten miles are a long distance (A) / for an infantry battalion (B) / to march in full tactical gear. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'Ten miles are a long distance' },
        { key: 'B', text: 'for an infantry battalion' },
        { key: 'C', text: 'to march in full tactical gear' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'A',
      explanation: 'A plural unit of measurement or distance thought of as a single whole takes a singular verb. Replace "are" with "is".',
      marks: 1
    },
    {
      question: 'Between you and I, (A) / there are several operational flaws (B) / in the newly drafted combat doctrine. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'Between you and I' },
        { key: 'B', text: 'there are several operational flaws' },
        { key: 'C', text: 'in the newly drafted combat doctrine' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'A',
      explanation: 'The preposition "Between" requires objective case pronouns. Replace "Between you and I" with "Between you and me".',
      marks: 1
    },
    {
      question: 'The climate of Dehradun (A) / is much cooler and pleasant (B) / than Delhi during the peak of summer. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'The climate of Dehradun' },
        { key: 'B', text: 'is much cooler and pleasant' },
        { key: 'C', text: 'than Delhi during the peak of summer' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'C',
      explanation: 'Comparison must be made between corresponding terms. You must compare the climate of Dehradun with the climate of Delhi: "than that of Delhi".',
      marks: 1
    },
    {
      question: 'If he had informed the headquarters in time, (A) / the reinforcements could have reached (B) / before the enemy surrounded the post. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'If he had informed the headquarters in time' },
        { key: 'B', text: 'the reinforcements could have reached' },
        { key: 'C', text: 'before the enemy surrounded the post' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'D',
      explanation: 'Past hypothetical conditional (third conditional) is correctly formulated with "If + had + V3... could have + V3". No Error.',
      marks: 1
    },
    {
      question: 'The commander prohibited the soldiers (A) / from not disclosing any tactical details (B) / to unauthorized personnel. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'The commander prohibited the soldiers' },
        { key: 'B', text: 'from not disclosing any tactical details' },
        { key: 'C', text: 'to unauthorized personnel' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'B',
      explanation: '"Prohibit" itself has a restrictive, negative meaning. Adding "not" creates an unintended double negative. Remove "not".',
      marks: 1
    },
    {
      question: 'Many a student have failed (A) / to clear the rigorous physical fitness test (B) / during the preliminary screening. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'Many a student have failed' },
        { key: 'B', text: 'to clear the rigorous physical fitness test' },
        { key: 'C', text: 'during the preliminary screening' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'A',
      explanation: '"Many a" is followed by a singular noun and requires a singular verb. Replace "have failed" with "has failed".',
      marks: 1
    },
    {
      question: 'The aircraft had barely touched the runway (A) / when a burst tyre caused it (B) / to veer off into the grassy embankment. (C) / No Error (D)',
      options: [
        { key: 'A', text: 'The aircraft had barely touched the runway' },
        { key: 'B', text: 'when a burst tyre caused it' },
        { key: 'C', text: 'to veer off into the grassy embankment' },
        { key: 'D', text: 'No Error' }
      ],
      correctAnswer: 'D',
      explanation: 'The sentence correctly links "barely...when" with appropriate tense agreement and sequencing. No Error.',
      marks: 1
    }
  ]
};
const sentenceImprovementTest = {
  module: 'cds',
  section: 'grammar',
  subject: 'grammar',
  chapterSlug: 'sentence-improvement',
  chapterName: 'Sentence Improvement',
  testId: 'sentence-improvement-test-1',
  testName: 'Sentence Improvement - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'The commander asked the troops to **refrain from smoking cigarettes** inside the tactical armory.',
      options: [
        { key: 'A', text: 'refrain to smoke cigarettes' },
        { key: 'B', text: 'abstain from smoking cigarettes' },
        { key: 'C', text: 'refrain from smoking cigarettes' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'D',
      explanation: '"Refrain from" correctly governs the gerund "smoking". The sentence is grammatically standard as written, so "No improvement" is correct.',
      marks: 1
    },
    {
      question: 'Being an experienced diplomat, **the dispute was resolved amicably by him** within days.',
      options: [
        { key: 'A', text: 'the dispute resolved amicably by him' },
        { key: 'B', text: 'he resolved the dispute amicably' },
        { key: 'C', text: 'the dispute had been resolved amicably by him' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'B',
      explanation: 'The introductory participial phrase "Being an experienced diplomat" modifies the person, not the dispute. "He" must be the immediate subject.',
      marks: 1
    },
    {
      question: 'The officer insisted on **me accompanying him** to the strategic review meeting.',
      options: [
        { key: 'A', text: 'my accompanying him' },
        { key: 'B', text: 'I accompanying him' },
        { key: 'C', text: 'me to accompany him' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: 'A gerund ("accompanying") is traditionally preceded by a possessive pronoun ("my", not the objective "me").',
      marks: 1
    },
    {
      question: 'She worked hard **lest she should not fail** in the preliminary qualifying examination.',
      options: [
        { key: 'A', text: 'lest she should fail' },
        { key: 'B', text: 'lest she will not fail' },
        { key: 'C', text: 'lest she may fail' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: '"Lest" inherently conveys a negative consequence ("for fear that") and is paired with "should" without an additional "not".',
      marks: 1
    },
    {
      question: 'If the naval escort had arrived earlier, the merchant vessel **would not be captured** by pirates.',
      options: [
        { key: 'A', text: 'would not have been captured' },
        { key: 'B', text: 'could not be captured' },
        { key: 'C', text: 'would not capture' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: 'Third conditional requires "had arrived" in the if-clause and "would have been + V3" in the result clause.',
      marks: 1
    },
    {
      question: 'He is superior **than all other candidates** in tactical maneuvering and field navigation.',
      options: [
        { key: 'A', text: 'to all other candidates' },
        { key: 'B', text: 'from all other candidates' },
        { key: 'C', text: 'over all other candidates' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: 'Latin comparative adjectives ending in "-ior" (superior, inferior, senior, junior, prior) take the preposition "to", never "than".',
      marks: 1
    },
    {
      question: 'The platoon leader requested the soldiers to **repeat the coordinate grid again**.',
      options: [
        { key: 'A', text: 'repeat the coordinate grid' },
        { key: 'B', text: 'repeat back the coordinate grid' },
        { key: 'C', text: 're-repeat the coordinate grid' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: '"Repeat" already signifies saying or doing something again. Combining it with "again" creates a redundant tautology.',
      marks: 1
    },
    {
      question: 'Scarcely had the artillery barrage ceased **then the infantry advanced**.',
      options: [
        { key: 'A', text: 'when the infantry advanced' },
        { key: 'B', text: 'than the infantry advanced' },
        { key: 'C', text: 'while the infantry advanced' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: '"Scarcely" is paired correlatively with "when", not "then" or "than".',
      marks: 1
    },
    {
      question: 'The climate of Shillong is cooler than **that of Guwahati**.',
      options: [
        { key: 'A', text: 'than Guwahati' },
        { key: 'B', text: 'than those of Guwahati' },
        { key: 'C', text: 'that of Guwahati' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'D',
      explanation: '"That of Guwahati" correctly compares the climate of Shillong with the climate of Guwahati. No improvement needed.',
      marks: 1
    },
    {
      question: 'Not only did he command the regiment with distinction **but also guided** the junior officers.',
      options: [
        { key: 'A', text: 'but he also guided' },
        { key: 'B', text: 'also he guided' },
        { key: 'C', text: 'and also guided' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: 'Maintaining parallel structure across full clauses: "Not only did he command... but he also guided...".',
      marks: 1
    },
    {
      question: 'The cadets were warned **to not make any noise** during night surveillance.',
      options: [
        { key: 'A', text: 'not to make any noise' },
        { key: 'B', text: 'to make not any noise' },
        { key: 'C', text: 'to don\'t make any noise' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: 'Negative infinitive placement places "not" before the particle "to": "not to make any noise".',
      marks: 1
    },
    {
      question: 'He has been serving in the border security force **since the last five years**.',
      options: [
        { key: 'A', text: 'for the last five years' },
        { key: 'B', text: 'from the last five years' },
        { key: 'C', text: 'in the last five years' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: '"For" is required for an entire duration or period of time ("five years"), whereas "since" denotes a specific starting point.',
      marks: 1
    },
    {
      question: 'Neither the general nor his staff officers **was convinced** by the preliminary reconnaissance report.',
      options: [
        { key: 'A', text: 'were convinced' },
        { key: 'B', text: 'has been convinced' },
        { key: 'C', text: 'is convinced' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: 'In "neither...nor" constructions, the verb agrees with the nearer subject ("staff officers", plural), demanding "were convinced".',
      marks: 1
    },
    {
      question: 'The reconnaissance aircraft **resembles to a bird of prey** in its aerodynamic silhouette.',
      options: [
        { key: 'A', text: 'resembles with a bird of prey' },
        { key: 'B', text: 'resembles a bird of prey' },
        { key: 'C', text: 'resembles like a bird of prey' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'B',
      explanation: 'The transitive verb "resemble" takes a direct object without any following preposition ("resembles a bird of prey").',
      marks: 1
    },
    {
      question: 'No sooner had the alarm sounded **than the emergency response team assembled**.',
      options: [
        { key: 'A', text: 'when the emergency response team assembled' },
        { key: 'B', text: 'then the emergency response team assembled' },
        { key: 'C', text: 'than the emergency response team assembled' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'D',
      explanation: '"No sooner" is correctly paired with "than" alongside past perfect inversion. No improvement needed.',
      marks: 1
    },
    {
      question: 'The instructor asked the cadet **why was he late for parade**.',
      options: [
        { key: 'A', text: 'why he was late for parade' },
        { key: 'B', text: 'that why was he late for parade' },
        { key: 'C', text: 'why did he late for parade' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: 'In indirect reported questions, inverted interrogative order converts to assertive word order ("why he was late").',
      marks: 1
    },
    {
      question: 'The army doctor advised him to **lay down for an hour** after vaccination.',
      options: [
        { key: 'A', text: 'lie down for an hour' },
        { key: 'B', text: 'laid down for an hour' },
        { key: 'C', text: 'lain down for an hour' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: '"Lie" is the intransitive verb meaning to recline; "lay" requires a direct object.',
      marks: 1
    },
    {
      question: 'He is one of those soldiers who **sacrifices personal comfort** for the honor of the regiment.',
      options: [
        { key: 'A', text: 'sacrifice personal comfort' },
        { key: 'B', text: 'has sacrificed personal comfort' },
        { key: 'C', text: 'is sacrificing personal comfort' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: 'In "one of those + plural noun + who", the relative pronoun refers to the plural antecedent ("soldiers"), demanding the plural verb "sacrifice".',
      marks: 1
    },
    {
      question: 'The logistics convoy was held up **due to heavy landslides** in the mountain pass.',
      options: [
        { key: 'A', text: 'because of heavy landslides' },
        { key: 'B', text: 'owing of heavy landslides' },
        { key: 'C', text: 'for heavy landslides' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: '"Because of" functions adverbially modifying the verb phrase "was held up", which is stylistically and grammatically preferred in formal English.',
      marks: 1
    },
    {
      question: 'Supposing if the enemy launches a counter-attack, **what measures will we take**?',
      options: [
        { key: 'A', text: 'Supposing the enemy launches' },
        { key: 'B', text: 'If supposing the enemy launches' },
        { key: 'C', text: 'Supposing that if the enemy launches' },
        { key: 'D', text: 'No improvement' }
      ],
      correctAnswer: 'A',
      explanation: '"Supposing" and "if" are synonymous in conditional clauses; using both simultaneously is a redundant error. Use either "Supposing" or "If".',
      marks: 1
    }
  ]
};

const prepositionsDeterminersTest = {
  module: 'cds',
  section: 'grammar',
  subject: 'grammar',
  chapterSlug: 'prepositions-determiners',
  chapterName: 'Prepositions & Determiners',
  testId: 'prepositions-determiners-test-1',
  testName: 'Prepositions & Determiners - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'The military tribunal acquitted the colonel ______ all allegations of procedural misconduct.',
      options: [
        { key: 'A', text: 'from' },
        { key: 'B', text: 'of' },
        { key: 'C', text: 'with' },
        { key: 'D', text: 'off' }
      ],
      correctAnswer: 'B',
      explanation: 'The verb "acquit" strictly takes the fixed preposition "of" (acquit somebody of a charge).',
      marks: 1
    },
    {
      question: 'The regiment was tasked to comply ______ the updated ceasefire guidelines immediately.',
      options: [
        { key: 'A', text: 'by' },
        { key: 'B', text: 'with' },
        { key: 'C', text: 'to' },
        { key: 'D', text: 'on' }
      ],
      correctAnswer: 'B',
      explanation: '"Comply" takes the preposition "with" (comply with regulations/orders).',
      marks: 1
    },
    {
      question: 'Prolonged exposure to sub-zero temperatures is detrimental ______ human endurance.',
      options: [
        { key: 'A', text: 'for' },
        { key: 'B', text: 'to' },
        { key: 'C', text: 'towards' },
        { key: 'D', text: 'with' }
      ],
      correctAnswer: 'B',
      explanation: 'Adjectives signifying injury or disadvantage (detrimental, harmful, injurious) take the preposition "to".',
      marks: 1
    },
    {
      question: 'The veteran commander was accustomed ______ rigorous mountain maneuvers.',
      options: [
        { key: 'A', text: 'to' },
        { key: 'B', text: 'with' },
        { key: 'C', text: 'in' },
        { key: 'D', text: 'for' }
      ],
      correctAnswer: 'A',
      explanation: '"Accustomed" takes the preposition "to", followed by a noun or gerund.',
      marks: 1
    },
    {
      question: 'There is a deep-seated rivalry ______ the two neighboring desert outposts.',
      options: [
        { key: 'A', text: 'among' },
        { key: 'B', text: 'between' },
        { key: 'C', text: 'within' },
        { key: 'D', text: 'amidst' }
      ],
      correctAnswer: 'B',
      explanation: '"Between" is specifically used when distinguishing two distinct individual entities.',
      marks: 1
    },
    {
      question: 'The battalion has been garrisoned along the international border ______ March last year.',
      options: [
        { key: 'A', text: 'for' },
        { key: 'B', text: 'since' },
        { key: 'C', text: 'from' },
        { key: 'D', text: 'during' }
      ],
      correctAnswer: 'B',
      explanation: '"Since" marks a definite point in past time from which an action has continued into the present.',
      marks: 1
    },
    {
      question: 'He abstained ______ casting his ballot in the disputed regimental election.',
      options: [
        { key: 'A', text: 'from' },
        { key: 'B', text: 'to' },
        { key: 'C', text: 'of' },
        { key: 'D', text: 'with' }
      ],
      correctAnswer: 'A',
      explanation: '"Abstain" and "refrain" strictly take the preposition "from" followed by a gerund.',
      marks: 1
    },
    {
      question: 'The army convoy was prohibited ______ traversing the vulnerable mountain gorge after dusk.',
      options: [
        { key: 'A', text: 'to' },
        { key: 'B', text: 'from' },
        { key: 'C', text: 'against' },
        { key: 'D', text: 'for' }
      ],
      correctAnswer: 'B',
      explanation: '"Prohibit" requires the construction "prohibit someone from doing something".',
      marks: 1
    },
    {
      question: 'The peace accord was signed in ______ presence of representatives from four neutral nations.',
      options: [
        { key: 'A', text: 'a' },
        { key: 'B', text: 'an' },
        { key: 'C', text: 'the' },
        { key: 'D', text: 'no article' }
      ],
      correctAnswer: 'C',
      explanation: 'The definite article "the" is required in the specific defining phrase "in the presence of".',
      marks: 1
    },
    {
      question: 'Unfortunately, ______ candidates who cleared the physical trials possessed leadership aptitude.',
      options: [
        { key: 'A', text: 'few' },
        { key: 'B', text: 'a few' },
        { key: 'C', text: 'the few' },
        { key: 'D', text: 'little' }
      ],
      correctAnswer: 'A',
      explanation: '"Few" without an article conveys a negative sense meaning "hardly any", matching the word "Unfortunately".',
      marks: 1
    },
    {
      question: 'Although he had ______ knowledge of tactical artillery, his natural instincts guided him.',
      options: [
        { key: 'A', text: 'little' },
        { key: 'B', text: 'a little' },
        { key: 'C', text: 'the little' },
        { key: 'D', text: 'few' }
      ],
      correctAnswer: 'A',
      explanation: '"Little" applies to uncountable nouns ("knowledge") and conveys the negative sense of "hardly any".',
      marks: 1
    },
    {
      question: 'The young subaltern takes ______ his father in his unflinching dedication to service.',
      options: [
        { key: 'A', text: 'after' },
        { key: 'B', text: 'to' },
        { key: 'C', text: 'for' },
        { key: 'D', text: 'with' }
      ],
      correctAnswer: 'A',
      explanation: '"Takes after" is an idiomatic phrasal verb meaning to resemble an older relative in appearance or character.',
      marks: 1
    },
    {
      question: 'The general was confident ______ achieving victory in the upcoming spring offensive.',
      options: [
        { key: 'A', text: 'of' },
        { key: 'B', text: 'for' },
        { key: 'C', text: 'in' },
        { key: 'D', text: 'with' }
      ],
      correctAnswer: 'A',
      explanation: 'The adjective "confident" takes the preposition "of" when followed by a gerund or noun.',
      marks: 1
    },
    {
      question: 'He is proficient ______ three foreign languages and several regional dialects.',
      options: [
        { key: 'A', text: 'at' },
        { key: 'B', text: 'in' },
        { key: 'C', text: 'with' },
        { key: 'D', text: 'for' }
      ],
      correctAnswer: 'B',
      explanation: 'One is "proficient in" a subject or language, but "good at" an activity.',
      marks: 1
    },
    {
      question: 'The sentry stood vigil ______ the entrance of the subterranean bunker.',
      options: [
        { key: 'A', text: 'at' },
        { key: 'B', text: 'in' },
        { key: 'C', text: 'on' },
        { key: 'D', text: 'over' }
      ],
      correctAnswer: 'A',
      explanation: '"At" specifies an exact geographical point or portal (at the entrance).',
      marks: 1
    },
    {
      question: 'The officer died ______ wounds sustained during the counter-insurgency operation.',
      options: [
        { key: 'A', text: 'of' },
        { key: 'B', text: 'from' },
        { key: 'C', text: 'by' },
        { key: 'D', text: 'with' }
      ],
      correctAnswer: 'B',
      explanation: 'One dies "of" a disease (e.g., cholera), but "from" an external cause, injury, or wounds.',
      marks: 1
    },
    {
      question: 'He has lived in New Delhi ______ more than a decade.',
      options: [
        { key: 'A', text: 'since' },
        { key: 'B', text: 'for' },
        { key: 'C', text: 'during' },
        { key: 'D', text: 'from' }
      ],
      correctAnswer: 'B',
      explanation: '"For" is required to designate a complete duration or time period ("more than a decade").',
      marks: 1
    },
    {
      question: 'The committee concurred ______ the recommendations submitted by the defense analyst.',
      options: [
        { key: 'A', text: 'to' },
        { key: 'B', text: 'with' },
        { key: 'C', text: 'in' },
        { key: 'D', text: 'on' }
      ],
      correctAnswer: 'C',
      explanation: 'One concurs "with" a person, but concurs "in" a decision, finding, or recommendation.',
      marks: 1
    },
    {
      question: '______ Ganges is considered a sacred river across Northern India.',
      options: [
        { key: 'A', text: 'A' },
        { key: 'B', text: 'An' },
        { key: 'C', text: 'The' },
        { key: 'D', text: 'No article' }
      ],
      correctAnswer: 'C',
      explanation: 'Names of major rivers, oceans, and mountain ranges require the definite article "The".',
      marks: 1
    },
    {
      question: 'He is senior ______ me by nearly five years in regimental service.',
      options: [
        { key: 'A', text: 'than' },
        { key: 'B', text: 'to' },
        { key: 'C', text: 'over' },
        { key: 'D', text: 'from' }
      ],
      correctAnswer: 'B',
      explanation: 'Comparative adjectives ending in -ior take "to", never "than".',
      marks: 1
    }
  ]
};

const partsOfSpeechTest = {
  module: 'cds',
  section: 'grammar',
  subject: 'grammar',
  chapterSlug: 'parts-of-speech',
  chapterName: 'Parts of Speech Identification',
  testId: 'parts-of-speech-test-1',
  testName: 'Parts of Speech - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'Identify the part of speech of the capitalized word: The soldiers fought **BRAVELY** until reinforcements arrived.',
      options: [
        { key: 'A', text: 'Adjective' },
        { key: 'B', text: 'Adverb' },
        { key: 'C', text: 'Noun' },
        { key: 'D', text: 'Conjunction' }
      ],
      correctAnswer: 'B',
      explanation: '"Bravely" modifies the verb "fought", indicating the manner of action; thus it is an Adverb of manner.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: **SWIMMING** across the river required immense stamina.',
      options: [
        { key: 'A', text: 'Gerund / Noun' },
        { key: 'B', text: 'Present Participle / Adjective' },
        { key: 'C', text: 'Finite Verb' },
        { key: 'D', text: 'Adverb' }
      ],
      correctAnswer: 'A',
      explanation: '"Swimming" acts as the grammatical subject of the sentence, functioning as a Gerund (verbal noun).',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: He ran **FAST** to deliver the urgent message.',
      options: [
        { key: 'A', text: 'Adjective' },
        { key: 'B', text: 'Adverb' },
        { key: 'C', text: 'Preposition' },
        { key: 'D', text: 'Noun' }
      ],
      correctAnswer: 'B',
      explanation: '"Fast" modifies the verb "ran", functioning as an adverb (flat adverb).',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: This is a **FAST** train heading directly towards the border base.',
      options: [
        { key: 'A', text: 'Adjective' },
        { key: 'B', text: 'Adverb' },
        { key: 'C', text: 'Noun' },
        { key: 'D', text: 'Pronoun' }
      ],
      correctAnswer: 'A',
      explanation: 'Here "fast" modifies the noun "train", functioning as an Adjective.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: We have not seen him **SINCE** he was commissioned into the artillery.',
      options: [
        { key: 'A', text: 'Preposition' },
        { key: 'B', text: 'Conjunction' },
        { key: 'C', text: 'Adverb' },
        { key: 'D', text: 'Pronoun' }
      ],
      correctAnswer: 'B',
      explanation: '"Since" connects two complete independent clauses, functioning as a subordinating Conjunction of time.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: He has been absent **SINCE** Monday.',
      options: [
        { key: 'A', text: 'Preposition' },
        { key: 'B', text: 'Conjunction' },
        { key: 'C', text: 'Adverb' },
        { key: 'D', text: 'Noun' }
      ],
      correctAnswer: 'A',
      explanation: '"Since" is followed solely by a noun object ("Monday") indicating starting time, making it a Preposition.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: **ALAS**! We could not save the historic garrison.',
      options: [
        { key: 'A', text: 'Conjunction' },
        { key: 'B', text: 'Interjection' },
        { key: 'C', text: 'Adverb' },
        { key: 'D', text: 'Preposition' }
      ],
      correctAnswer: 'B',
      explanation: '"Alas" is an exclamatory word expressing grief or sorrow, classifying it as an Interjection.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: The officer gave a **FRIENDLY** wave to the villagers.',
      options: [
        { key: 'A', text: 'Adverb' },
        { key: 'B', text: 'Adjective' },
        { key: 'C', text: 'Noun' },
        { key: 'D', text: 'Verb' }
      ],
      correctAnswer: 'B',
      explanation: '"Friendly" modifies the noun "wave". Despite ending in -ly, it is an Adjective.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: **NEITHER** of the two solutions is operationally viable.',
      options: [
        { key: 'A', text: 'Conjunction' },
        { key: 'B', text: 'Pronoun' },
        { key: 'C', text: 'Adjective' },
        { key: 'D', text: 'Adverb' }
      ],
      correctAnswer: 'B',
      explanation: '"Neither" stands in place of a noun as the subject of the clause, functioning as a Distributive Pronoun.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: **NEITHER** plan was approved by headquarters.',
      options: [
        { key: 'A', text: 'Distributive Adjective / Determiner' },
        { key: 'B', text: 'Pronoun' },
        { key: 'C', text: 'Conjunction' },
        { key: 'D', text: 'Adverb' }
      ],
      correctAnswer: 'A',
      explanation: 'Here "Neither" modifies the noun "plan" directly, functioning as a Distributive Adjective/Determiner.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: The **BARKING** dog alerted the patrol unit.',
      options: [
        { key: 'A', text: 'Gerund' },
        { key: 'B', text: 'Participle (Verbal Adjective)' },
        { key: 'C', text: 'Finite Verb' },
        { key: 'D', text: 'Noun' }
      ],
      correctAnswer: 'B',
      explanation: '"Barking" modifies the noun "dog", functioning as a Present Participle serving as an adjective.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: He stood **BEFORE** the military tribunal with quiet dignity.',
      options: [
        { key: 'A', text: 'Preposition' },
        { key: 'B', text: 'Conjunction' },
        { key: 'C', text: 'Adverb' },
        { key: 'D', text: 'Adjective' }
      ],
      correctAnswer: 'A',
      explanation: '"Before" shows spatial relation followed by noun phrase "the military tribunal", acting as a Preposition.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: Look **UP** at the military transport aircraft.',
      options: [
        { key: 'A', text: 'Preposition' },
        { key: 'B', text: 'Adverb' },
        { key: 'C', text: 'Noun' },
        { key: 'D', text: 'Adjective' }
      ],
      correctAnswer: 'B',
      explanation: '"Up" modifies the verb "Look" indicating direction of gaze, functioning as an Adverb.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: The bullet passed **THROUGH** the armor plate.',
      options: [
        { key: 'A', text: 'Preposition' },
        { key: 'B', text: 'Adverb' },
        { key: 'C', text: 'Conjunction' },
        { key: 'D', text: 'Noun' }
      ],
      correctAnswer: 'A',
      explanation: '"Through" relates the verb "passed" to the object noun phrase "the armor plate", acting as a Preposition.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: She is **VERY** diligent in her cryptographic duties.',
      options: [
        { key: 'A', text: 'Adjective' },
        { key: 'B', text: 'Adverb' },
        { key: 'C', text: 'Pronoun' },
        { key: 'D', text: 'Preposition' }
      ],
      correctAnswer: 'B',
      explanation: '"Very" modifies the adjective "diligent", functioning as an Adverb of degree.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: **STILL** waters run deep.',
      options: [
        { key: 'A', text: 'Adverb' },
        { key: 'B', text: 'Adjective' },
        { key: 'C', text: 'Noun' },
        { key: 'D', text: 'Verb' }
      ],
      correctAnswer: 'B',
      explanation: '"Still" modifies the plural noun "waters", functioning as an Adjective meaning calm or motionless.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: He is **STILL** waiting for his deployment orders.',
      options: [
        { key: 'A', text: 'Adverb' },
        { key: 'B', text: 'Adjective' },
        { key: 'C', text: 'Conjunction' },
        { key: 'D', text: 'Preposition' }
      ],
      correctAnswer: 'A',
      explanation: '"Still" modifies the verb phrase "is waiting", functioning as an Adverb of time.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: **EACH** cadet was presented with a ceremonial dagger.',
      options: [
        { key: 'A', text: 'Distributive Adjective' },
        { key: 'B', text: 'Distributive Pronoun' },
        { key: 'C', text: 'Adverb' },
        { key: 'D', text: 'Conjunction' }
      ],
      correctAnswer: 'A',
      explanation: '"Each" immediately modifies the noun "cadet", functioning as a Distributive Adjective.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: All the soldiers returned safely, **BUT** one remained behind.',
      options: [
        { key: 'A', text: 'Coordinating Conjunction' },
        { key: 'B', text: 'Preposition' },
        { key: 'C', text: 'Adverb' },
        { key: 'D', text: 'Relative Pronoun' }
      ],
      correctAnswer: 'A',
      explanation: '"But" connects two coordinate clauses, functioning as an adversative Coordinating Conjunction.',
      marks: 1
    },
    {
      question: 'Identify the part of speech of the capitalized word: There was no one left **BUT** him.',
      options: [
        { key: 'A', text: 'Preposition' },
        { key: 'B', text: 'Conjunction' },
        { key: 'C', text: 'Adverb' },
        { key: 'D', text: 'Pronoun' }
      ],
      correctAnswer: 'A',
      explanation: '"But" is used here in the sense of "except", taking the objective pronoun "him", functioning as a Preposition.',
      marks: 1
    }
  ]
};

const activePassiveVoiceTest = {
  module: 'cds',
  section: 'grammar',
  subject: 'grammar',
  chapterSlug: 'active-passive-voice',
  chapterName: 'Active and Passive Voice',
  testId: 'active-passive-voice-test-1',
  testName: 'Active and Passive Voice - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'Change into Passive Voice: The commanding officer will inspect the barracks tomorrow.',
      options: [
        { key: 'A', text: 'The barracks will be inspected by the commanding officer tomorrow.' },
        { key: 'B', text: 'The barracks would be inspected by the commanding officer tomorrow.' },
        { key: 'C', text: 'The barracks are inspected by the commanding officer tomorrow.' },
        { key: 'D', text: 'The barracks will have been inspected by the commanding officer tomorrow.' }
      ],
      correctAnswer: 'A',
      explanation: 'Future simple active "will inspect" transforms into passive "will be inspected" + agent.',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: They are constructing a new radar facility near the border.',
      options: [
        { key: 'A', text: 'A new radar facility was being constructed near the border.' },
        { key: 'B', text: 'A new radar facility is being constructed near the border.' },
        { key: 'C', text: 'A new radar facility has been constructed near the border.' },
        { key: 'D', text: 'A new radar facility is constructed near the border.' }
      ],
      correctAnswer: 'B',
      explanation: 'Present continuous active "are constructing" transforms into "is being constructed".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: The artillery destroyed the enemy ammunition depot.',
      options: [
        { key: 'A', text: 'The enemy ammunition depot had been destroyed by the artillery.' },
        { key: 'B', text: 'The enemy ammunition depot was destroyed by the artillery.' },
        { key: 'C', text: 'The enemy ammunition depot is destroyed by the artillery.' },
        { key: 'D', text: 'The enemy ammunition depot was being destroyed by the artillery.' }
      ],
      correctAnswer: 'B',
      explanation: 'Simple past active "destroyed" transforms into passive "was destroyed".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: Who designed this sophisticated naval frigate?',
      options: [
        { key: 'A', text: 'By whom was this sophisticated naval frigate designed?' },
        { key: 'B', text: 'By whom had this sophisticated naval frigate been designed?' },
        { key: 'C', text: 'Who was this sophisticated naval frigate designed by?' },
        { key: 'D', text: 'Whom was designed this sophisticated naval frigate by?' }
      ],
      correctAnswer: 'A',
      explanation: '"Who" converts to "By whom", followed by auxiliary inversion "was + subject + designed".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: Shut all the perimeter gates immediately.',
      options: [
        { key: 'A', text: 'Let all the perimeter gates be shut immediately.' },
        { key: 'B', text: 'All the perimeter gates must shut immediately.' },
        { key: 'C', text: 'Let all the perimeter gates shut immediately.' },
        { key: 'D', text: 'You should shut all perimeter gates immediately.' }
      ],
      correctAnswer: 'A',
      explanation: 'Imperative command transforms into passive using "Let + object + be + V3 (shut)".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: The engineering regiment has built three temporary bridges.',
      options: [
        { key: 'A', text: 'Three temporary bridges have been built by the engineering regiment.' },
        { key: 'B', text: 'Three temporary bridges had been built by the engineering regiment.' },
        { key: 'C', text: 'Three temporary bridges were built by the engineering regiment.' },
        { key: 'D', text: 'Three temporary bridges are built by the engineering regiment.' }
      ],
      correctAnswer: 'A',
      explanation: 'Present perfect active "has built" becomes plural passive "have been built".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: The sentry was checking the identity cards of all visitors.',
      options: [
        { key: 'A', text: 'The identity cards of all visitors were being checked by the sentry.' },
        { key: 'B', text: 'The identity cards of all visitors had been checked by the sentry.' },
        { key: 'C', text: 'The identity cards of all visitors were checked by the sentry.' },
        { key: 'D', text: 'The identity cards of all visitors are being checked by the sentry.' }
      ],
      correctAnswer: 'A',
      explanation: 'Past continuous active "was checking" converts into plural passive "were being checked".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: One must keep one\'s promises under all circumstances.',
      options: [
        { key: 'A', text: 'Promises must be kept under all circumstances.' },
        { key: 'B', text: 'One\'s promises should be kept by one.' },
        { key: 'C', text: 'Promises must keep by everyone.' },
        { key: 'D', text: 'One\'s promises are to be kept.' }
      ],
      correctAnswer: 'A',
      explanation: 'With impersonal "one", the passive drops the redundant agent: "Promises must be kept".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: His sudden resignation surprised everyone in the ministry.',
      options: [
        { key: 'A', text: 'Everyone in the ministry was surprised at his sudden resignation.' },
        { key: 'B', text: 'Everyone in the ministry was surprised by his sudden resignation.' },
        { key: 'C', text: 'Everyone in the ministry had been surprised with his sudden resignation.' },
        { key: 'D', text: 'Everyone in the ministry is surprised at his sudden resignation.' }
      ],
      correctAnswer: 'A',
      explanation: 'The verb "surprised" conventionally governs the preposition "at" (surprised at something).',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: The villagers laughed at the boastful soldier.',
      options: [
        { key: 'A', text: 'The boastful soldier was laughed at by the villagers.' },
        { key: 'B', text: 'The boastful soldier was laughed by the villagers.' },
        { key: 'C', text: 'The boastful soldier had been laughed at by the villagers.' },
        { key: 'D', text: 'The boastful soldier is laughed at by the villagers.' }
      ],
      correctAnswer: 'A',
      explanation: 'Prepositional verb "laughed at" retains its fixed preposition: "was laughed at by".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: The intelligence operative had deciphered the encrypted code.',
      options: [
        { key: 'A', text: 'The encrypted code had been deciphered by the intelligence operative.' },
        { key: 'B', text: 'The encrypted code was deciphered by the intelligence operative.' },
        { key: 'C', text: 'The encrypted code has been deciphered by the intelligence operative.' },
        { key: 'D', text: 'The encrypted code is being deciphered by the intelligence operative.' }
      ],
      correctAnswer: 'A',
      explanation: 'Past perfect active "had deciphered" transforms into passive "had been deciphered".',
      marks: 1
    },
    {
      question: 'Change into Active Voice: The wounded officer was attended to by two field medics.',
      options: [
        { key: 'A', text: 'Two field medics attended to the wounded officer.' },
        { key: 'B', text: 'Two field medics were attending to the wounded officer.' },
        { key: 'C', text: 'Two field medics had attended to the wounded officer.' },
        { key: 'D', text: 'Two field medics attend to the wounded officer.' }
      ],
      correctAnswer: 'A',
      explanation: 'Passive "was attended to" transforms back to simple past active "attended to".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: We should not underestimate the tactical capabilities of our adversary.',
      options: [
        { key: 'A', text: 'The tactical capabilities of our adversary should not be underestimated.' },
        { key: 'B', text: 'The tactical capabilities of our adversary must not underestimate.' },
        { key: 'C', text: 'The tactical capabilities of our adversary could not be underestimated.' },
        { key: 'D', text: 'The tactical capabilities of our adversary are not to be underestimated.' }
      ],
      correctAnswer: 'A',
      explanation: 'Modal "should not underestimate" transforms into passive "should not be underestimated".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: The president conferred the gallantry award upon the pilot.',
      options: [
        { key: 'A', text: 'The gallantry award was conferred upon the pilot by the president.' },
        { key: 'B', text: 'The gallantry award has been conferred upon the pilot by the president.' },
        { key: 'C', text: 'The gallantry award had been conferred upon the pilot by the president.' },
        { key: 'D', text: 'The gallantry award was being conferred upon the pilot by the president.' }
      ],
      correctAnswer: 'A',
      explanation: 'Simple past "conferred" transforms into passive "was conferred upon".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: Can anyone solve this complex ballistics equation?',
      options: [
        { key: 'A', text: 'Can this complex ballistics equation be solved by anyone?' },
        { key: 'B', text: 'Could this complex ballistics equation be solved by anyone?' },
        { key: 'C', text: 'Can this complex ballistics equation solve by anyone?' },
        { key: 'D', text: 'Is this complex ballistics equation can be solved by anyone?' }
      ],
      correctAnswer: 'A',
      explanation: 'Modal question "Can anyone solve" becomes "Can [subject] be solved by anyone?".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: Please maintain complete radio silence during the operation.',
      options: [
        { key: 'A', text: 'You are requested to maintain complete radio silence during the operation.' },
        { key: 'B', text: 'Complete radio silence must maintain during the operation.' },
        { key: 'C', text: 'Let complete radio silence be maintained by you.' },
        { key: 'D', text: 'Complete radio silence should be maintained.' }
      ],
      correctAnswer: 'A',
      explanation: 'Polite imperative with "Please" converts to "You are requested to + V1".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: They know him to be an honorable and brave soldier.',
      options: [
        { key: 'A', text: 'He is known to be an honorable and brave soldier.' },
        { key: 'B', text: 'He was known to be an honorable and brave soldier.' },
        { key: 'C', text: 'He has been known to be an honorable and brave soldier.' },
        { key: 'D', text: 'An honorable and brave soldier is known by him.' }
      ],
      correctAnswer: 'A',
      explanation: 'Simple present "They know him" becomes "He is known to be...".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: The rescue team could not find any survivors in the wreckage.',
      options: [
        { key: 'A', text: 'No survivors could be found in the wreckage by the rescue team.' },
        { key: 'B', text: 'Any survivors could not be found in the wreckage by the rescue team.' },
        { key: 'C', text: 'Survivors could not find in the wreckage.' },
        { key: 'D', text: 'No survivors were being found in the wreckage by the rescue team.' }
      ],
      correctAnswer: 'A',
      explanation: '"Not...any survivors" cleanly converts to negative subject "No survivors could be found".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: The military police arrested three suspects outside the armory.',
      options: [
        { key: 'A', text: 'Three suspects were arrested outside the armory by the military police.' },
        { key: 'B', text: 'Three suspects have been arrested outside the armory by the military police.' },
        { key: 'C', text: 'Three suspects had been arrested outside the armory by the military police.' },
        { key: 'D', text: 'Three suspects are arrested outside the armory by the military police.' }
      ],
      correctAnswer: 'A',
      explanation: 'Simple past "arrested" becomes plural passive "were arrested".',
      marks: 1
    },
    {
      question: 'Change into Passive Voice: The heavy snowfall delayed the supply convoy for two days.',
      options: [
        { key: 'A', text: 'The supply convoy was delayed for two days by the heavy snowfall.' },
        { key: 'B', text: 'The supply convoy had been delayed for two days by the heavy snowfall.' },
        { key: 'C', text: 'The supply convoy has been delayed for two days by the heavy snowfall.' },
        { key: 'D', text: 'The supply convoy was being delayed for two days by the heavy snowfall.' }
      ],
      correctAnswer: 'A',
      explanation: 'Simple past "delayed" becomes passive "was delayed".',
      marks: 1
    }
  ]
};

const directIndirectSpeechTest = {
  module: 'cds',
  section: 'grammar',
  subject: 'grammar',
  chapterSlug: 'direct-indirect-speech',
  chapterName: 'Direct and Indirect Speech',
  testId: 'direct-indirect-speech-test-1',
  testName: 'Direct and Indirect Speech - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'Convert into Indirect Speech: The general said, "We must maintain vigilance along the northern border."',
      options: [
        { key: 'A', text: 'The general said that they had to maintain vigilance along the northern border.' },
        { key: 'B', text: 'The general said that we must maintain vigilance along the northern border.' },
        { key: 'C', text: 'The general said that they must have maintained vigilance along the northern border.' },
        { key: 'D', text: 'The general said that we should maintain vigilance along the northern border.' }
      ],
      correctAnswer: 'A',
      explanation: 'Modal "must" expressing present obligation shifts into past "had to", and pronoun "we" shifts to "they".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The instructor said to the cadet, "Why did you miss the morning physical drill?"',
      options: [
        { key: 'A', text: 'The instructor asked the cadet why he had missed the morning physical drill.' },
        { key: 'B', text: 'The instructor asked the cadet that why had he missed the morning physical drill.' },
        { key: 'C', text: 'The instructor asked the cadet why did he miss the morning physical drill.' },
        { key: 'D', text: 'The instructor asked the cadet why he missed the morning physical drill.' }
      ],
      correctAnswer: 'A',
      explanation: 'Simple past "did you miss" backshifts to past perfect "he had missed", with assertive word order.',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: Rahul said, "I have completed the reconnaissance mapping today."',
      options: [
        { key: 'A', text: 'Rahul said that he had completed the reconnaissance mapping that day.' },
        { key: 'B', text: 'Rahul said that he has completed the reconnaissance mapping today.' },
        { key: 'C', text: 'Rahul said that he completed the reconnaissance mapping that day.' },
        { key: 'D', text: 'Rahul said that I had completed the reconnaissance mapping that day.' }
      ],
      correctAnswer: 'A',
      explanation: 'Present perfect "have completed" backshifts to "had completed", and "today" shifts to "that day".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The captain said, "Bravo! You fought valiantly, men."',
      options: [
        { key: 'A', text: 'The captain applauded his men, saying that they had fought valiantly.' },
        { key: 'B', text: 'The captain said that his men fought valiantly with bravo.' },
        { key: 'C', text: 'The captain exclaimed that his men have fought valiantly.' },
        { key: 'D', text: 'The captain told his men that you fought valiantly.' }
      ],
      correctAnswer: 'A',
      explanation: '"Bravo" is transformed into an applause reporting phrase ("applauded his men, saying that...").',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The doctor said to the patient, "Take these pills twice a day."',
      options: [
        { key: 'A', text: 'The doctor advised the patient to take those pills twice a day.' },
        { key: 'B', text: 'The doctor ordered the patient that take these pills twice a day.' },
        { key: 'C', text: 'The doctor suggested the patient to took those pills twice a day.' },
        { key: 'D', text: 'The doctor asked the patient that he should take those pills twice a day.' }
      ],
      correctAnswer: 'A',
      explanation: 'Medical imperative advice transforms to "advised... to take", and "these" shifts to "those".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: He said, "The earth revolves around the sun."',
      options: [
        { key: 'A', text: 'He said that the earth revolves around the sun.' },
        { key: 'B', text: 'He said that the earth revolved around the sun.' },
        { key: 'C', text: 'He said that the earth has revolved around the sun.' },
        { key: 'D', text: 'He said that the earth had revolved around the sun.' }
      ],
      correctAnswer: 'A',
      explanation: 'Universal scientific truths and geographical facts NEVER backshift into past tense.',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The sentry said, "Halt! Who goes there?"',
      options: [
        { key: 'A', text: 'The sentry shouted to halt and demanded to know who went there.' },
        { key: 'B', text: 'The sentry ordered to halt and asked who went there.' },
        { key: 'C', text: 'The sentry said to halt and who was going there.' },
        { key: 'D', text: 'The sentry asked who went there and to halt.' }
      ],
      correctAnswer: 'A',
      explanation: 'Exclamatory command and question combination appropriately rendered into reported speech.',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: She said to me, "Can you decipher this cipher text for me?"',
      options: [
        { key: 'A', text: 'She asked me if I could decipher that cipher text for her.' },
        { key: 'B', text: 'She asked me that if I can decipher that cipher text for her.' },
        { key: 'C', text: 'She asked me whether could I decipher this cipher text for her.' },
        { key: 'D', text: 'She told me if I could decipher that cipher text for her.' }
      ],
      correctAnswer: 'A',
      explanation: 'Yes/No modal question transforms with "if/whether", "can" becomes "could", "this" becomes "that", and pronouns shift.',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The colonel said, "We will commence tactical operations tomorrow morning."',
      options: [
        { key: 'A', text: 'The colonel said that they would commence tactical operations the next morning.' },
        { key: 'B', text: 'The colonel said that they will commence tactical operations tomorrow morning.' },
        { key: 'C', text: 'The colonel said that we would commence tactical operations the next morning.' },
        { key: 'D', text: 'The colonel said that they should commence tactical operations tomorrow morning.' }
      ],
      correctAnswer: 'A',
      explanation: '"Will" shifts to "would", "we" shifts to "they", and "tomorrow morning" shifts to "the next morning".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The cadet said, "Sir, may I ask a question regarding navigation?"',
      options: [
        { key: 'A', text: 'The cadet respectfully asked if he might ask a question regarding navigation.' },
        { key: 'B', text: 'The cadet asked sir that may he ask a question regarding navigation.' },
        { key: 'C', text: 'The cadet said respectfully that he may ask a question regarding navigation.' },
        { key: 'D', text: 'The cadet asked if could he ask a question regarding navigation.' }
      ],
      correctAnswer: 'A',
      explanation: '"Sir" converts to "respectfully", "may" shifts to "might", and question shifts to assertive order.',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: He said, "I was reviewing the defense logistics files yesterday."',
      options: [
        { key: 'A', text: 'He said that he had been reviewing the defense logistics files the previous day.' },
        { key: 'B', text: 'He said that he was reviewing the defense logistics files the previous day.' },
        { key: 'C', text: 'He said that he had reviewed the defense logistics files yesterday.' },
        { key: 'D', text: 'He said that I had been reviewing the defense logistics files the day before.' }
      ],
      correctAnswer: 'A',
      explanation: 'Past continuous "was reviewing" backshifts to past perfect continuous "had been reviewing".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The officer said, "Let us review the patrol sectors once again."',
      options: [
        { key: 'A', text: 'The officer proposed that they should review the patrol sectors once again.' },
        { key: 'B', text: 'The officer ordered that they must review the patrol sectors once again.' },
        { key: 'C', text: 'The officer said that let them review the patrol sectors once again.' },
        { key: 'D', text: 'The officer asked to review the patrol sectors once again.' }
      ],
      correctAnswer: 'A',
      explanation: '"Let us" expressing a suggestion or proposal converts into "proposed/suggested that they should...".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: She said, "Alas! All our communication gear has been destroyed."',
      options: [
        { key: 'A', text: 'She exclaimed sorrowfully that all their communication gear had been destroyed.' },
        { key: 'B', text: 'She exclaimed with sorrow that all our communication gear has been destroyed.' },
        { key: 'C', text: 'She said alas that all their communication gear had been destroyed.' },
        { key: 'D', text: 'She told sorrowfully that all their communication gear was destroyed.' }
      ],
      correctAnswer: 'A',
      explanation: '"Alas" converts to "exclaimed sorrowfully", "has been" backshifts to "had been", and "our" becomes "their".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The commander said to the subaltern, "Do not leave the command post until relieved."',
      options: [
        { key: 'A', text: 'The commander ordered the subaltern not to leave the command post until relieved.' },
        { key: 'B', text: 'The commander ordered the subaltern to not leave the command post until relieved.' },
        { key: 'C', text: 'The commander told the subaltern that do not leave the command post until relieved.' },
        { key: 'D', text: 'The commander prohibited the subaltern not to leave the command post until relieved.' }
      ],
      correctAnswer: 'A',
      explanation: 'Negative command transforms into "ordered... not to leave".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: He said to me, "Where are you going for your field posting?"',
      options: [
        { key: 'A', text: 'He asked me where I was going for my field posting.' },
        { key: 'B', text: 'He asked me that where was I going for my field posting.' },
        { key: 'C', text: 'He asked me where was I going for my field posting.' },
        { key: 'D', text: 'He told me where I was going for my field posting.' }
      ],
      correctAnswer: 'A',
      explanation: 'Present continuous question shifts to assertive order "where I was going".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The instructor says, "Discipline is the backbone of any military unit."',
      options: [
        { key: 'A', text: 'The instructor says that discipline is the backbone of any military unit.' },
        { key: 'B', text: 'The instructor said that discipline was the backbone of any military unit.' },
        { key: 'C', text: 'The instructor says that discipline was the backbone of any military unit.' },
        { key: 'D', text: 'The instructor told that discipline is the backbone of any military unit.' }
      ],
      correctAnswer: 'A',
      explanation: 'When the reporting verb is in the present tense ("says"), NO backshift of tense occurs in the reported speech.',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The pilot said, "I have been flying continuously for seven hours."',
      options: [
        { key: 'A', text: 'The pilot said that he had been flying continuously for seven hours.' },
        { key: 'B', text: 'The pilot said that he has been flying continuously for seven hours.' },
        { key: 'C', text: 'The pilot said that I had been flying continuously for seven hours.' },
        { key: 'D', text: 'The pilot said that he was flying continuously for seven hours.' }
      ],
      correctAnswer: 'A',
      explanation: 'Present perfect continuous "have been flying" backshifts to "had been flying".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The diplomat said, "What an unprecedented breakthrough this peace treaty is!"',
      options: [
        { key: 'A', text: 'The diplomat exclaimed that that peace treaty was an unprecedented breakthrough.' },
        { key: 'B', text: 'The diplomat said what an unprecedented breakthrough that peace treaty was.' },
        { key: 'C', text: 'The diplomat exclaimed that what a breakthrough this peace treaty was.' },
        { key: 'D', text: 'The diplomat told that that peace treaty is an unprecedented breakthrough.' }
      ],
      correctAnswer: 'A',
      explanation: 'Exclamatory statement transforms to assertive reported clause: "exclaimed that that peace treaty was...".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: The sentry said, "I did not notice any suspicious movement last night."',
      options: [
        { key: 'A', text: 'The sentry said that he had not noticed any suspicious movement the previous night.' },
        { key: 'B', text: 'The sentry said that he did not notice any suspicious movement last night.' },
        { key: 'C', text: 'The sentry said that he had not noticed any suspicious movement last night.' },
        { key: 'D', text: 'The sentry said that I had not noticed any suspicious movement the night before.' }
      ],
      correctAnswer: 'A',
      explanation: 'Simple past negative "did not notice" backshifts to "had not noticed", and "last night" shifts to "the previous night".',
      marks: 1
    },
    {
      question: 'Convert into Indirect Speech: She said, "If I were the commander, I would reinforce the southern sector."',
      options: [
        { key: 'A', text: 'She said that if she were the commander, she would reinforce the southern sector.' },
        { key: 'B', text: 'She said that if she had been the commander, she would have reinforced the southern sector.' },
        { key: 'C', text: 'She said that if she was the commander, she will reinforce the southern sector.' },
        { key: 'D', text: 'She said that if I were the commander, I would reinforce the southern sector.' }
      ],
      correctAnswer: 'A',
      explanation: 'Unreal hypothetical subjunctive conditions ("If I were...") do not backshift further in indirect speech.',
      marks: 1
    }
  ]
};

const fillInTheBlanksTest = {
  module: 'cds',
  section: 'grammar',
  subject: 'grammar',
  chapterSlug: 'fill-in-the-blanks',
  chapterName: 'Fill in the Blanks',
  testId: 'fill-in-the-blanks-test-1',
  testName: 'Fill in the Blanks - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'Due to severe monsoons, the river ______ its banks and inundated surrounding villages.',
      options: [
        { key: 'A', text: 'overflowed' },
        { key: 'B', text: 'overflown' },
        { key: 'C', text: 'overflew' },
        { key: 'D', text: 'overflying' }
      ],
      correctAnswer: 'A',
      explanation: 'The past tense of "overflow" (to spill over) is "overflowed". "Overflown" is the participle of "overfly" (to fly over).',
      marks: 1
    },
    {
      question: 'The army command decided to ______ the operational exercise until weather conditions improved.',
      options: [
        { key: 'A', text: 'call off' },
        { key: 'B', text: 'call on' },
        { key: 'C', text: 'call out' },
        { key: 'D', text: 'call up' }
      ],
      correctAnswer: 'A',
      explanation: '"Call off" is the phrasal verb meaning to cancel or postpone indefinitely.',
      marks: 1
    },
    {
      question: 'He was found guilty of dereliction of duty and was subsequently ______ of his rank.',
      options: [
        { key: 'A', text: 'stripped' },
        { key: 'B', text: 'deprived' },
        { key: 'C', text: 'reft' },
        { key: 'D', text: 'divested' }
      ],
      correctAnswer: 'A',
      explanation: 'In military terminology, one is "stripped of" military rank or insignia.',
      marks: 1
    },
    {
      question: 'The peace delegates struggled to ______ an agreement on territorial boundaries.',
      options: [
        { key: 'A', text: 'reach' },
        { key: 'B', text: 'arrive' },
        { key: 'C', text: 'achieve' },
        { key: 'D', text: 'conclude' }
      ],
      correctAnswer: 'A',
      explanation: 'Collocationally, parties "reach an agreement" (or "arrive at an agreement").',
      marks: 1
    },
    {
      question: 'The mountain pass was so narrow that vehicles could only proceed in ______ file.',
      options: [
        { key: 'A', text: 'single' },
        { key: 'B', text: 'sole' },
        { key: 'C', text: 'lone' },
        { key: 'D', text: 'solitary' }
      ],
      correctAnswer: 'A',
      explanation: '"Single file" is the fixed English idiom denoting a line of people or vehicles one behind another.',
      marks: 1
    },
    {
      question: 'Hardly had the general finished his address ______ the audience gave him a standing ovation.',
      options: [
        { key: 'A', text: 'when' },
        { key: 'B', text: 'than' },
        { key: 'C', text: 'then' },
        { key: 'D', text: 'while' }
      ],
      correctAnswer: 'A',
      explanation: '"Hardly" requires the correlative conjunction "when".',
      marks: 1
    },
    {
      question: 'The officer was commended for his ______ in defusing the explosive device under fire.',
      options: [
        { key: 'A', text: 'bravery' },
        { key: 'B', text: 'cowardice' },
        { key: 'C', text: 'negligence' },
        { key: 'D', text: 'timidity' }
      ],
      correctAnswer: 'A',
      explanation: 'Contextual sentence positive commendation demands "bravery".',
      marks: 1
    },
    {
      question: 'He has an insatiable appetite ______ historical and strategic military literature.',
      options: [
        { key: 'A', text: 'for' },
        { key: 'B', text: 'of' },
        { key: 'C', text: 'in' },
        { key: 'D', text: 'to' }
      ],
      correctAnswer: 'A',
      explanation: 'The noun "appetite" is idiomatically followed by the preposition "for".',
      marks: 1
    },
    {
      question: 'Neither the pilots nor the navigator ______ able to pinpoint the radar malfunction.',
      options: [
        { key: 'A', text: 'was' },
        { key: 'B', text: 'were' },
        { key: 'C', text: 'are' },
        { key: 'D', text: 'have been' }
      ],
      correctAnswer: 'A',
      explanation: 'The nearer subject is "the navigator" (singular), requiring the singular past verb "was".',
      marks: 1
    },
    {
      question: 'The regiment was ordered to ______ from retaliation despite extreme provocation.',
      options: [
        { key: 'A', text: 'refrain' },
        { key: 'B', text: 'resist' },
        { key: 'C', text: 'forbid' },
        { key: 'D', text: 'prevent' }
      ],
      correctAnswer: 'A',
      explanation: '"Refrain" is the verb paired with "from" indicating self-restraint.',
      marks: 1
    },
    {
      question: 'The continuous rains ______ the completion of the forward runway construction.',
      options: [
        { key: 'A', text: 'impeded' },
        { key: 'B', text: 'impelled' },
        { key: 'C', text: 'accelerated' },
        { key: 'D', text: 'expedited' }
      ],
      correctAnswer: 'A',
      explanation: '"Impeded" means hindered or obstructed, matching the adverse weather context.',
      marks: 1
    },
    {
      question: 'The young soldier was eager ______ prove his worth during the tactical simulation.',
      options: [
        { key: 'A', text: 'to' },
        { key: 'B', text: 'for' },
        { key: 'C', text: 'in' },
        { key: 'D', text: 'with' }
      ],
      correctAnswer: 'A',
      explanation: 'The adjective "eager" takes an infinitive verb phrase: "eager to prove".',
      marks: 1
    },
    {
      question: 'He is ______ honest man who refuses to compromise on military values.',
      options: [
        { key: 'A', text: 'a' },
        { key: 'B', text: 'an' },
        { key: 'C', text: 'the' },
        { key: 'D', text: 'no article' }
      ],
      correctAnswer: 'B',
      explanation: '"Honest" begins with a silent "h" vowel sound, requiring the indefinite article "an".',
      marks: 1
    },
    {
      question: 'The defense treaty was ratified ______ both parliaments with unanimous support.',
      options: [
        { key: 'A', text: 'by' },
        { key: 'B', text: 'with' },
        { key: 'C', text: 'through' },
        { key: 'D', text: 'from' }
      ],
      correctAnswer: 'A',
      explanation: 'Passive agent indicating ratification by governing bodies takes "by".',
      marks: 1
    },
    {
      question: 'Unless you ______ strict physical conditioning, you will not endure the high-altitude trek.',
      options: [
        { key: 'A', text: 'maintain' },
        { key: 'B', text: 'do not maintain' },
        { key: 'C', text: 'will maintain' },
        { key: 'D', text: 'maintained' }
      ],
      correctAnswer: 'A',
      explanation: '"Unless" takes affirmative present tense in the conditional clause without double negatives.',
      marks: 1
    },
    {
      question: 'The intelligence report was so confidential that it was shared ______ only a select few.',
      options: [
        { key: 'A', text: 'with' },
        { key: 'B', text: 'to' },
        { key: 'C', text: 'among' },
        { key: 'D', text: 'between' }
      ],
      correctAnswer: 'A',
      explanation: 'One shares confidential information "with" people.',
      marks: 1
    },
    {
      question: 'The army battalion was deployed to ______ peace in the border district.',
      options: [
        { key: 'A', text: 'maintain' },
        { key: 'B', text: 'retain' },
        { key: 'C', text: 'sustain' },
        { key: 'D', text: 'attain' }
      ],
      correctAnswer: 'A',
      explanation: 'Standard diplomatic/military collocation is to "maintain peace".',
      marks: 1
    },
    {
      question: 'The radar station was constructed on a ______ hill overlooking the river valley.',
      options: [
        { key: 'A', text: 'prominent' },
        { key: 'B', text: 'imminent' },
        { key: 'C', text: 'eminent' },
        { key: 'D', text: 'permanent' }
      ],
      correctAnswer: 'A',
      explanation: '"Prominent" describes a physical feature that stands out conspicuously.',
      marks: 1
    },
    {
      question: 'No sooner did the alarm sound ______ the fighter jets scrambled into the sky.',
      options: [
        { key: 'A', text: 'than' },
        { key: 'B', text: 'when' },
        { key: 'C', text: 'then' },
        { key: 'D', text: 'while' }
      ],
      correctAnswer: 'A',
      explanation: '"No sooner" is strictly followed by "than".',
      marks: 1
    },
    {
      question: 'The cadets listened to the veteran\'s battle memoirs with ______ attention.',
      options: [
        { key: 'A', text: 'rapt' },
        { key: 'B', text: 'wrapped' },
        { key: 'C', text: 'rapturous' },
        { key: 'D', text: 'ruptured' }
      ],
      correctAnswer: 'A',
      explanation: '"Rapt attention" is the established idiom denoting intense, fascinated focus.',
      marks: 1
    }
  ]
};

const orderingOfWordsTest = {
  module: 'cds',
  section: 'grammar',
  subject: 'grammar',
  chapterSlug: 'ordering-of-words',
  chapterName: 'Ordering of Words in a Sentence',
  testId: 'ordering-of-words-test-1',
  testName: 'Ordering of Words - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: to the mountain summit / Q: the expedition team / R: after enduring bitter blizzards / S: finally made their ascent',
      options: [
        { key: 'A', text: 'Q-R-S-P' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-Q-P' },
        { key: 'D', text: 'Q-P-S-R' }
      ],
      correctAnswer: 'A',
      explanation: 'Subject (Q: the expedition team) + modifier (R: after enduring bitter blizzards) + verb phrase (S: finally made their ascent) + prepositional phrase (P: to the mountain summit).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: in international peacekeeping missions / Q: has earned global admiration / R: the exemplary discipline / S: of the Indian armed forces',
      options: [
        { key: 'A', text: 'R-S-P-Q' },
        { key: 'B', text: 'P-R-S-Q' },
        { key: 'C', text: 'Q-R-S-P' },
        { key: 'D', text: 'S-R-P-Q' }
      ],
      correctAnswer: 'A',
      explanation: 'R (the exemplary discipline) + S (of the Indian armed forces) + P (in international peacekeeping missions) + Q (has earned global admiration).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: with utmost precision / Q: the special forces / R: executed the rescue operation / S: during the dark hours of night',
      options: [
        { key: 'A', text: 'Q-R-P-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-Q-P' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'Subject (Q: the special forces) + predicate (R: executed the rescue operation) + manner (P: with utmost precision) + time (S: during the dark hours of night).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: despite heavy shelling / Q: held their defensive positions / R: the brave soldiers / S: without yielding an inch',
      options: [
        { key: 'A', text: 'R-Q-P-S' },
        { key: 'B', text: 'P-R-Q-S' },
        { key: 'C', text: 'Q-R-S-P' },
        { key: 'D', text: 'S-R-Q-P' }
      ],
      correctAnswer: 'B',
      explanation: 'Concessive opening (P: despite heavy shelling) + subject (R: the brave soldiers) + verb phrase (Q: held their defensive positions) + adverbial phrase (S: without yielding an inch).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: of advanced radar systems / Q: the successful deployment / R: has greatly bolstered / S: our maritime border security',
      options: [
        { key: 'A', text: 'Q-P-R-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-Q-P' },
        { key: 'D', text: 'S-R-Q-P' }
      ],
      correctAnswer: 'A',
      explanation: 'Subject head (Q: the successful deployment) + prepositional modifier (P: of advanced radar systems) + verb (R: has greatly bolstered) + object (S: our maritime border security).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: by the military academy / Q: rigorous standards of physical fitness / R: were demanded / S: from all newly commissioned officers',
      options: [
        { key: 'A', text: 'Q-R-P-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-Q-P-S' },
        { key: 'D', text: 'S-R-P-Q' }
      ],
      correctAnswer: 'A',
      explanation: 'Q (Rigorous standards of physical fitness) + R (were demanded) + P (by the military academy) + S (from all newly commissioned officers).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: for their supreme sacrifice / Q: the nation / R: will forever remain indebted / S: to the fallen martyrs',
      options: [
        { key: 'A', text: 'Q-R-S-P' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-Q-R-P' }
      ],
      correctAnswer: 'A',
      explanation: 'Subject (Q: the nation) + predicate (R: will forever remain indebted) + recipient (S: to the fallen martyrs) + reason (P: for their supreme sacrifice).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: through difficult terrain / Q: the infantry division / R: advanced steadily / S: towards the enemy strongpoint',
      options: [
        { key: 'A', text: 'Q-R-P-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-Q-P' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'Q (the infantry division) + R (advanced steadily) + P (through difficult terrain) + S (towards the enemy strongpoint).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: across the international airspace / Q: two unidentified fighter jets / R: were intercepted / S: by our air defense patrol',
      options: [
        { key: 'A', text: 'Q-R-S-P' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-R-Q-P' }
      ],
      correctAnswer: 'A',
      explanation: 'Subject (Q: two unidentified fighter jets) + verb (R: were intercepted) + agent (S: by our air defense patrol) + location (P: across the international airspace).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: in modern asymmetric warfare / Q: strategic cyber defense / R: is as crucial as / S: conventional kinetic firepower',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-R-S-P' },
        { key: 'C', text: 'R-S-Q-P' },
        { key: 'D', text: 'S-R-Q-P' }
      ],
      correctAnswer: 'A',
      explanation: 'Contextual opener (P: in modern asymmetric warfare) + subject (Q: strategic cyber defense) + comparison (R: is as crucial as) + complement (S: conventional kinetic firepower).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: the diplomatic mission / Q: after months of negotiations / R: successfully brokered / S: a comprehensive ceasefire accord',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-R-P-Q' }
      ],
      correctAnswer: 'B',
      explanation: 'Time modifier (Q: after months of negotiations) + subject (P: the diplomatic mission) + verb (R: successfully brokered) + object (S: a comprehensive ceasefire accord).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: to avert collateral casualties / Q: the drone strike / R: was called off / S: at the final minute',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-R-S-P' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-R-Q-P' }
      ],
      correctAnswer: 'A',
      explanation: 'Purpose infinitive (P: to avert collateral casualties) + subject (Q: the drone strike) + predicate (R: was called off) + time (S: at the final minute).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: throughout the grueling winter / Q: the border outposts / R: remained operational / S: despite extreme blizzards',
      options: [
        { key: 'A', text: 'Q-R-S-P' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-Q-P' },
        { key: 'D', text: 'S-Q-R-P' }
      ],
      correctAnswer: 'B',
      explanation: 'P (throughout the grueling winter) + Q (the border outposts) + R (remained operational) + S (despite extreme blizzards).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: in the field of ballistics / Q: technological advancements / R: have transformed / S: modern artillery accuracy',
      options: [
        { key: 'A', text: 'Q-P-R-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-Q-P' },
        { key: 'D', text: 'S-R-P-Q' }
      ],
      correctAnswer: 'B',
      explanation: 'Domain (P: in the field of ballistics) + subject (Q: technological advancements) + verb (R: have transformed) + object (S: modern artillery accuracy).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: to the frontline commanders / Q: the updated reconnaissance data / R: was dispatched / S: via secure satellite links',
      options: [
        { key: 'A', text: 'Q-R-P-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-Q-P' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'Subject (Q: the updated reconnaissance data) + verb (R: was dispatched) + recipient (P: to the frontline commanders) + means (S: via secure satellite links).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: under hostile fire / Q: the medical evacuation helicopter / R: safely landed / S: in the mountainous jungle clearing',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-R-S-P' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-R-Q-P' }
      ],
      correctAnswer: 'A',
      explanation: 'Adverbial condition (P: under hostile fire) + subject (Q: the medical evacuation helicopter) + verb (R: safely landed) + location (S: in the mountainous jungle clearing).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: by the unified naval command / Q: joint maritime drills / R: were conducted / S: to enhance regional interoperability',
      options: [
        { key: 'A', text: 'Q-R-P-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'Q (joint maritime drills) + R (were conducted) + P (by the unified naval command) + S (to enhance regional interoperability).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: of combat readiness / Q: rigorous physical standards / R: are indispensable / S: for sustaining high morale',
      options: [
        { key: 'A', text: 'Q-P-R-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-R-Q-P' }
      ],
      correctAnswer: 'A',
      explanation: 'Subject (Q: rigorous physical standards) + modifier (P: of combat readiness) + predicate (R: are indispensable) + purpose (S: for sustaining high morale).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: with strategic intelligence / Q: the counter-terrorism squad / R: raided the hideout / S: before dawn',
      options: [
        { key: 'A', text: 'Q-R-P-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-Q-R-P' }
      ],
      correctAnswer: 'A',
      explanation: 'Subject (Q: the counter-terrorism squad) + verb (R: raided the hideout) + means (P: with strategic intelligence) + time (S: before dawn).',
      marks: 1
    },
    {
      question: 'Rearrange the segments into a coherent sentence:\nP: to the nation\'s armed forces / Q: the supreme commander / R: delivered a message / S: of resolute fortitude',
      options: [
        { key: 'A', text: 'Q-R-S-P' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-R-Q-P' }
      ],
      correctAnswer: 'A',
      explanation: 'Subject (Q: the supreme commander) + verb (R: delivered a message) + description (S: of resolute fortitude) + audience (P: to the nation\'s armed forces).',
      marks: 1
    }
  ]
};

const orderingOfSentencesTest = {
  module: 'cds',
  section: 'grammar',
  subject: 'grammar',
  chapterSlug: 'ordering-of-sentences',
  chapterName: 'Ordering of Sentences in a Paragraph',
  testId: 'ordering-of-sentences-test-1',
  testName: 'Ordering of Sentences - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Renewable energy is vital for sustainable national development.\nP: Solar energy, in particular, has seen drastic cost reductions worldwide.\nQ: These technological innovations make clean power affordable for millions.\nR: It minimizes reliance on polluting imported fossil fuels.\nS: Global electrical grids are integrating renewable sources rapidly.\nS6: Thus, a cleaner energy paradigm is well within our reach.',
      options: [
        { key: 'A', text: 'R-P-Q-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'Q-R-S-P' },
        { key: 'D', text: 'S-R-P-Q' }
      ],
      correctAnswer: 'A',
      explanation: 'S1 introduces renewable energy. R gives the direct reason ("It minimizes..."). P provides the specific solar example. Q refers back to "These technological innovations", and S transitions into grid integration before S6 concluding.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: The reconnaissance unit reached the crest of the hill at dawn.\nP: Through thermal binoculars, they observed the fortified enemy outpost.\nQ: Complete radio silence was maintained to preserve operational surprise.\nR: The terrain was rugged and choked with sharp rocky scree.\nS: Despite the physical obstacles, every soldier secured a concealed firing position.\nS6: They now awaited the final command to initiate tactical contact.',
      options: [
        { key: 'A', text: 'R-S-Q-P' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'Q-R-S-P' },
        { key: 'D', text: 'S-R-Q-P' }
      ],
      correctAnswer: 'A',
      explanation: 'S1 establishes arrival. R describes the difficult terrain. S shows overcoming the terrain to take positions. Q emphasizes the silence maintained. P describes observing the target, flowing into S6 awaiting confirmation.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Water conservation has emerged as a critical strategic imperative.\nP: Rapid urbanization and industrial demand have depleted underground aquifers.\nQ: Without prompt mitigation, several metropolitan areas face acute water scarcity.\nR: Traditional rainwater harvesting mechanisms can replenish groundwater levels.\nS: Community-driven watershed management projects offer sustainable remedies.\nS6: Comprehensive policy enforcement will ensure future ecological resilience.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-R-P-Q' }
      ],
      correctAnswer: 'A',
      explanation: 'S1 introduces the imperative. P identifies the cause of depletion. Q states the imminent risk. R and S present traditional and community solutions, connecting seamlessly into S6.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: High altitude mountain warfare presents formidable physiological hurdles.\nP: Hypoxia and freezing winds diminish physical endurance rapidly.\nQ: Consequently, soldiers must undergo progressive altitude acclimatization.\nR: Specialized nutritional diets help maintain metabolic body heat.\nS: Advanced thermal clothing protects against frostbite and hypothermia.\nS6: Proper training protocols transform troops into elite mountain fighting units.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-S-R' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'S1 introduces hurdles. P elaborates on hypoxia. Q gives the acclimatization consequence. R and S explain nutritional and thermal gear countermeasures leading into S6.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: The invention of radar revolutionized twentieth-century aerial combat.\nP: Ground operators could now detect incoming bombers beyond visual range.\nQ: Early warning systems permitted defensive fighters to intercept threats in time.\nR: Electromagnetic pulses bounced off metallic aircraft surfaces to reveal position.\nS: This capability proved decisive during the Battle of Britain.\nS6: Radar remains a cornerstone of modern aerospace defense architectures.',
      options: [
        { key: 'A', text: 'R-P-Q-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'Q-R-S-P' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'S1 introduces radar. R explains the scientific mechanism of radio pulses. P describes operator detection. Q shows fighter interception consequence. S cites the historical Battle of Britain before S6 modern continuity.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Cyber warfare has expanded the traditional boundaries of military conflict.\nP: Critical civilian infrastructure like electrical grids can be disabled remotely.\nQ: Hostile state actors employ sophisticated malware to infiltrate networks.\nR: Attribution of these covert attacks is notoriously difficult to verify.\nS: Nations must therefore establish robust autonomous cyber defense commands.\nS6: Digital deterrence is now as vital as conventional territorial defense.',
      options: [
        { key: 'A', text: 'Q-P-R-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'S1 introduces cyber conflict. Q introduces hostile infiltration. P gives concrete examples of targets. R highlights the difficulty of attribution. S concludes the necessity of defense commands leading into S6.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: The Indian Naval Academy imparts rigorous training to newly inducted cadets.\nP: Physical endurance marches and boat pulling build sheer physical stamina.\nQ: Academic curricula in engineering and nautical science ensure intellectual rigor.\nR: Cadets learn the essential virtues of camaraderie and unquestioned discipline.\nS: Leadership exercises simulate realistic maritime crisis decision-making.\nS6: Graduating officers emerge fully equipped to command modern warships.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-S-R' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'P and Q establish physical and academic training. R highlights internal discipline. S outlines operational leadership, resulting in S6 graduation ready to command.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Satellite technology provides indispensable domain awareness for defense forces.\nP: High-resolution imaging satellites monitor troop movements across borders.\nQ: Secure communications constellations enable real-time joint-force telemetry.\nR: Weather satellites forecast oceanic cyclones and high-altitude storms.\nS: Together, these orbital assets form an unblinking surveillance network.\nS6: Space supremacy has thus become integral to terrestrial operational success.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'P, Q, and R systematically enumerate imaging, communications, and weather satellites. S aggregates them ("Together, these orbital assets..."), connecting into S6.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: The peace treaty brought an end to three years of intense border friction.\nP: Both armies withdrew their heavy armor and artillery from forward sectors.\nQ: Neutral observers were stationed along demilitarized zones to monitor compliance.\nR: Displaced civilian populations began returning to their reconstructed towns.\nS: Trade corridors and cross-border transport routes were steadily reopened.\nS6: Normalcy returned gradually to the once-embattled frontier valley.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-R-P-Q' }
      ],
      correctAnswer: 'A',
      explanation: 'Chronological progression: P (military withdrawal) -> Q (neutral monitoring) -> R (civilian return) -> S (economic reopening) -> S6 (full normalcy).',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Effective leadership in the armed forces is rooted in moral integrity.\nP: Soldiers readily follow an officer who leads from the front in crisis.\nQ: True authority springs from competence and selfless dedication, not mere rank.\nR: Ethical decisions inspire enduring trust across all military ranks.\nS: In contrast, self-serving actions erode discipline and combat effectiveness.\nS6: Character remains the ultimate touchstone of a military commander.',
      options: [
        { key: 'A', text: 'Q-P-R-S' },
        { key: 'B', text: 'P-Q-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'Q explains the source of authority. P illustrates leading from the front. R highlights ethical trust. S provides the negative contrast ("In contrast, self-serving actions..."), leading directly into S6.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Desert operations present distinctive logistical and navigational trials.\nP: Shifting sand dunes alter the landscape, making visual landmarks unreliable.\nQ: Extreme daytime heat causes severe vehicle engine overheating and dehydration.\nR: Satellite-based GPS navigation and specialized water tankers are essential.\nS: Tactical maneuvers are predominantly planned during the cooler night hours.\nS6: Adaptability to the harsh arid climate dictates the tempo of desert warfare.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-S-R' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'P and Q describe navigation and temperature obstacles. R describes logistical tools. S indicates nocturnal operations, culminating in S6 conclusion.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Unmanned aerial vehicles (UAVs) have altered the doctrine of modern warfare.\nP: They conduct persistent surveillance over hostile territory without endangering pilots.\nQ: Armed variants can strike precision targets with laser-guided munitions.\nR: Modern electronic warfare can disrupt their datalinks and command signals.\nS: Anti-drone jamming systems are therefore deployed around critical assets.\nS6: The battle between autonomous drones and counter-drone systems continues to escalate.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'P and Q outline UAV capabilities. R introduces vulnerabilities (electronic warfare). S outlines counter-jamming deployments, connecting into S6.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Submarine warfare relies on stealth and acoustic concealment in deep waters.\nP: Diesel-electric submarines run on batteries to eliminate engine noise during patrol.\nQ: Sonar operators listen intently for hydrothermal anomalies and propeller churn.\nR: Surface warships employ active sonar pinging to detect submerged hulls.\nS: A single tactical miscalculation can betray the submarine\'s coordinates to depth charges.\nS6: Silent running remains the golden rule of undersea survival.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'P explains silent battery propulsion. Q describes acoustic listening. R shows the surface hunter counterpart. S highlights the peril of detection, flowing into S6.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Disaster relief operations require rapid coordination between civil and military authorities.\nP: Armed forces helicopters evacuate stranded citizens from inundated regions.\nQ: Army engineering regiments erect pontoon bridges to reconnect severed road corridors.\nR: Field hospitals provide emergency medical care and prevent epidemic outbreaks.\nS: Air force transport aircraft drop essential food grains and clean water packets.\nS6: Synergy between all agencies saves precious lives in national emergencies.',
      options: [
        { key: 'A', text: 'P-Q-S-R' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'P describes helicopter evacuations. Q describes bridging severed roads. S describes airdropping rations. R describes medical care, flowing into S6 synergy.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: The psychological fortitude of a soldier is tested most severely in solitary outposts.\nP: Prolonged isolation and freezing blizzards can induce severe mental strain.\nQ: Regular radio contact with base headquarters maintains morale and connectedness.\nR: Recreational sports and team drills foster strong interpersonal camaraderie.\nS: Dedicated counseling and buddy systems ensure emotional resilience.\nS6: A mentally tough soldier withstands the harshest rigors of frontier duty.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-S-R' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'P outlines isolation strain. Q, R, and S describe communication, team activities, and counseling remedies, leading into S6 toughness.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Camouflage and concealment techniques are foundational to infantry survival.\nP: Soldiers blend into natural foliage by wearing disruptive pattern uniforms.\nQ: Facial paint breaks the natural contours and reflections of human skin.\nR: Foliage is attached to combat helmets to obscure distinct silhouette edges.\nS: Movement is conducted in short, unpredictable bounds between shadows.\nS6: To remain unseen by the adversary is the first principle of fieldcraft.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'Progression from uniform patterns (P), to skin paint (Q), helmet foliage (R), and tactical movement (S), concluding into S6 principle.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: The history of naval aviation began with daring experimental flights off wooden decks.\nP: Early biplanes lacked arresting gear and required tailhooks to halt landing rolls.\nQ: As engines gained power, dedicated aircraft carriers were constructed with flat decks.\nR: Steam catapults were invented to launch heavier jet fighters into ocean winds.\nS: Today, angled flight decks and computerized guidance facilitate all-weather operations.\nS6: Modern aircraft carriers project unmatched maritime air power across global oceans.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'Chronological technological progression: biplanes (P) -> carrier hulls (Q) -> steam catapults (R) -> modern angled decks (S) -> S6 supremacy.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Strategic deterrence between nuclear-armed nations rests on mutual vulnerability.\nP: Second-strike capability ensures retaliatory destruction even after a surprise attack.\nQ: Ballistic missile submarines provide the most survivable leg of the nuclear triad.\nR: Clear communication hotlines prevent miscalculated escalation during crises.\nS: Defense analysts emphasize that stable deterrence prevents all-out conventional war.\nS6: Preserving strategic equilibrium remains the world\'s paramount geopolitical task.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'P introduces second strike. Q highlights submarine survivability. R highlights crisis hotlines. S states the preventive effect, leading into S6 equilibrium.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Military logistics is the unsung backbone of victory in armed conflict.\nP: Ammunition, fuel, and rations must reach frontline positions without interruption.\nQ: Heavy transport trucks traverse precarious mountain tracks under heavy rain.\nR: Supply depots are strategically dispersed to prevent destruction by air strikes.\nS: In the absence of sustained logistics, even the finest fighting battalion falters.\nS6: Generalship in modern war is as much about supply management as battlefield tactics.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'P outlines supplies needed. Q describes transport trucks. R describes dispersed depots. S shows the fatal consequence of failure, leading into S6.',
      marks: 1
    },
    {
      question: 'Rearrange the intermediate sentences between S1 and S6:\nS1: Field communication security is vital to thwart adversary signals intelligence.\nP: Encryption algorithms scramble voice and data transmissions into unreadable code.\nQ: Frequency-hopping radios switch transmission bands thousands of times per second.\nR: These technological safeguards prevent hostile intercept stations from eavesdropping.\nS: Regular security audits ensure that cryptographic keys are rotated routinely.\nS6: Operational surprise is guaranteed when tactical communication remains impenetrable.',
      options: [
        { key: 'A', text: 'P-Q-R-S' },
        { key: 'B', text: 'Q-P-R-S' },
        { key: 'C', text: 'R-S-P-Q' },
        { key: 'D', text: 'S-P-Q-R' }
      ],
      correctAnswer: 'A',
      explanation: 'P and Q describe encryption and frequency-hopping. R describes their protective outcome. S outlines key rotation maintenance, culminating in S6 surprise.',
      marks: 1
    }
  ]
};

module.exports = [
  spottingErrorsTest,
  sentenceImprovementTest,
  prepositionsDeterminersTest,
  partsOfSpeechTest,
  activePassiveVoiceTest,
  directIndirectSpeechTest,
  fillInTheBlanksTest,
  orderingOfWordsTest,
  orderingOfSentencesTest
];
