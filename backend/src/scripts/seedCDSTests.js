// ============================================================
// PREORBIT — CDS English Test Seeding Script
// ============================================================
// Idempotently seeds verified CDS English test content:
//   1. Grammar: Spotting Errors (20 valid MCQs)
//   2. Vocabulary: Synonyms & Antonyms (10 Synonyms + 10 Antonyms = 20 MCQs)
//   3. Reading Comprehension: Factual Comprehension (2 Passages x 5 MCQs = 10 MCQs)
//
// All tests are strictly validated through CDSTestPublishingService
// before publication to ensure atomic integrity.
// ============================================================

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const { connectDatabase } = require('../config/database');
const mongoose = require('mongoose');
const CDSTestPublishingService = require('../services/cds/CDSTestPublishingService');

// ── 1. Grammar Test: Spotting Errors (20 MCQs) ────────────────
const grammarTestData = {
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

// ── 2. Vocabulary Test: Synonyms & Antonyms (10 Syn + 10 Ant) ──
const vocabularyTestData = {
  module: 'cds',
  section: 'vocabulary',
  subject: 'vocabulary',
  chapterSlug: 'synonyms-antonyms',
  chapterName: 'Synonyms & Antonyms',
  testId: 'synonyms-antonyms-test-1',
  testName: 'Synonyms & Antonyms - Test 1',
  testNumber: 1,
  questions: [
    // ── 10 SYNONYMS (Q1–10) ─────────────────────────────────
    {
      question: 'The officer showed **audacity** by leading the reconnaissance patrol into hostile territory. (SYNONYM)',
      options: [
        { key: 'A', text: 'Daring' },
        { key: 'B', text: 'Timidity' },
        { key: 'C', text: 'Indifference' },
        { key: 'D', text: 'Humility' }
      ],
      correctAnswer: 'A',
      explanation: '"Audacity" denotes a willingness to take bold, fearless risks. The nearest synonym is "Daring".',
      subTopic: 'synonym',
      marks: 1
    },
    {
      question: 'The diplomat made an **ambiguous** statement regarding the ceasefire protocol. (SYNONYM)',
      options: [
        { key: 'A', text: 'Precise' },
        { key: 'B', text: 'Equivocal' },
        { key: 'C', text: 'Definitive' },
        { key: 'D', text: 'Luminous' }
      ],
      correctAnswer: 'B',
      explanation: '"Ambiguous" means open to more than one interpretation or vague. "Equivocal" is the exact synonym.',
      subTopic: 'synonym',
      marks: 1
    },
    {
      question: 'Her **candid** feedback helped the team rectify the strategy prior to the inspection. (SYNONYM)',
      options: [
        { key: 'A', text: 'Deceitful' },
        { key: 'B', text: 'Frank' },
        { key: 'C', text: 'Subtle' },
        { key: 'D', text: 'Guarded' }
      ],
      correctAnswer: 'B',
      explanation: '"Candid" means truthful and straightforward; frank. The nearest synonym is "Frank".',
      subTopic: 'synonym',
      marks: 1
    },
    {
      question: 'The monsoon rainfall had a **deleterious** effect on the mountain convoy route. (SYNONYM)',
      options: [
        { key: 'A', text: 'Beneficial' },
        { key: 'B', text: 'Harmful' },
        { key: 'C', text: 'Invigorating' },
        { key: 'D', text: 'Marginal' }
      ],
      correctAnswer: 'B',
      explanation: '"Deleterious" means causing harm or damage. The nearest synonym is "Harmful".',
      subTopic: 'synonym',
      marks: 1
    },
    {
      question: 'He was known for his **impeccable** record of service and flawless integrity. (SYNONYM)',
      options: [
        { key: 'A', text: 'Flawless' },
        { key: 'B', text: 'Defective' },
        { key: 'C', text: 'Ordinary' },
        { key: 'D', text: 'Questionable' }
      ],
      correctAnswer: 'A',
      explanation: '"Impeccable" means in accordance with the highest standards; faultless. The nearest synonym is "Flawless".',
      subTopic: 'synonym',
      marks: 1
    },
    {
      question: 'The commander warned that **complacency** during peacetime poses a grave threat. (SYNONYM)',
      options: [
        { key: 'A', text: 'Vigilance' },
        { key: 'B', text: 'Self-satisfaction' },
        { key: 'C', text: 'Agitation' },
        { key: 'D', text: 'Humility' }
      ],
      correctAnswer: 'B',
      explanation: '"Complacency" means a feeling of smug or uncritical satisfaction with oneself or one\'s achievements. "Self-satisfaction" is the nearest synonym.',
      subTopic: 'synonym',
      marks: 1
    },
    {
      question: 'The scientist offered an **ingenious** resolution to the radar interference problem. (SYNONYM)',
      options: [
        { key: 'A', text: 'Clever' },
        { key: 'B', text: 'Clumsy' },
        { key: 'C', text: 'Naive' },
        { key: 'D', text: 'Conventional' }
      ],
      correctAnswer: 'A',
      explanation: '"Ingenious" means clever, original, and inventive. The nearest synonym is "Clever".',
      subTopic: 'synonym',
      marks: 1
    },
    {
      question: 'The young lieutenant remained **intrepid** under heavy artillery bombardment. (SYNONYM)',
      options: [
        { key: 'A', text: 'Cowardly' },
        { key: 'B', text: 'Fearless' },
        { key: 'C', text: 'Anxious' },
        { key: 'D', text: 'Hesitant' }
      ],
      correctAnswer: 'B',
      explanation: '"Intrepid" means resolute, fearless, and adventurous. The nearest synonym is "Fearless".',
      subTopic: 'synonym',
      marks: 1
    },
    {
      question: 'The minister was **adamant** that the procurement guidelines must not be bypassed. (SYNONYM)',
      options: [
        { key: 'A', text: 'Flexible' },
        { key: 'B', text: 'Unyielding' },
        { key: 'C', text: 'Indifferent' },
        { key: 'D', text: 'Uncertain' }
      ],
      correctAnswer: 'B',
      explanation: '"Adamant" means refusing to be persuaded or to change one\'s mind. The nearest synonym is "Unyielding".',
      subTopic: 'synonym',
      marks: 1
    },
    {
      question: 'The general delivered a **succinct** briefing outlining the tactical objectives. (SYNONYM)',
      options: [
        { key: 'A', text: 'Verbose' },
        { key: 'B', text: 'Concise' },
        { key: 'C', text: 'Ambiguous' },
        { key: 'D', text: 'Elaborate' }
      ],
      correctAnswer: 'B',
      explanation: '"Succinct" means briefly and clearly expressed. The nearest synonym is "Concise".',
      subTopic: 'synonym',
      marks: 1
    },

    // ── 10 ANTONYMS (Q11–20) ────────────────────────────────
    {
      question: 'His **altruistic** gestures earned the gratitude of the entire village community. (ANTONYM)',
      options: [
        { key: 'A', text: 'Selfish' },
        { key: 'B', text: 'Benevolent' },
        { key: 'C', text: 'Generous' },
        { key: 'D', text: 'Magnanimous' }
      ],
      correctAnswer: 'A',
      explanation: '"Altruistic" means showing unselfish concern for others. The opposite (antonym) is "Selfish".',
      subTopic: 'antonym',
      marks: 1
    },
    {
      question: 'The committee was criticized for reaching a **hasty** decision on the strategic treaty. (ANTONYM)',
      options: [
        { key: 'A', text: 'Deliberate' },
        { key: 'B', text: 'Abrupt' },
        { key: 'C', text: 'Rash' },
        { key: 'D', text: 'Impulsive' }
      ],
      correctAnswer: 'A',
      explanation: '"Hasty" means done with excessive speed or urgency. The opposite (antonym) is "Deliberate".',
      subTopic: 'antonym',
      marks: 1
    },
    {
      question: 'The squad leader displayed **stoic** calm despite the perilous circumstances. (ANTONYM)',
      options: [
        { key: 'A', text: 'Emotional' },
        { key: 'B', text: 'Composed' },
        { key: 'C', text: 'Unflinching' },
        { key: 'D', text: 'Resigned' }
      ],
      correctAnswer: 'A',
      explanation: '"Stoic" means enduring pain or hardship without showing feelings. The opposite (antonym) is "Emotional".',
      subTopic: 'antonym',
      marks: 1
    },
    {
      question: 'The army launched a **clandestine** operation across the borderline at dusk. (ANTONYM)',
      options: [
        { key: 'A', text: 'Covert' },
        { key: 'B', text: 'Overt' },
        { key: 'C', text: 'Furtive' },
        { key: 'D', text: 'Stealthy' }
      ],
      correctAnswer: 'B',
      explanation: '"Clandestine" means kept secret or done secretly. The direct antonym is "Overt" (done openly).',
      subTopic: 'antonym',
      marks: 1
    },
    {
      question: 'The region is blessed with an **abundance** of fresh water resources. (ANTONYM)',
      options: [
        { key: 'A', text: 'Surfeit' },
        { key: 'B', text: 'Scarcity' },
        { key: 'C', text: 'Plethora' },
        { key: 'D', text: 'Copiousness' }
      ],
      correctAnswer: 'B',
      explanation: '"Abundance" means a very large quantity of something. The opposite (antonym) is "Scarcity".',
      subTopic: 'antonym',
      marks: 1
    },
    {
      question: 'The new rules are **mandatory** for all cadets undergoing pre-commission training. (ANTONYM)',
      options: [
        { key: 'A', text: 'Compulsory' },
        { key: 'B', text: 'Optional' },
        { key: 'C', text: 'Obligatory' },
        { key: 'D', text: 'Inescapable' }
      ],
      correctAnswer: 'B',
      explanation: '"Mandatory" means required by law or rules; compulsory. The opposite (antonym) is "Optional".',
      subTopic: 'antonym',
      marks: 1
    },
    {
      question: 'The colonel praised the **zealous** dedication of the engineering regiment. (ANTONYM)',
      options: [
        { key: 'A', text: 'Apathetic' },
        { key: 'B', text: 'Enthusiastic' },
        { key: 'C', text: 'Ardent' },
        { key: 'D', text: 'Fervent' }
      ],
      correctAnswer: 'A',
      explanation: '"Zealous" means having great energy or enthusiasm. The opposite (antonym) is "Apathetic".',
      subTopic: 'antonym',
      marks: 1
    },
    {
      question: 'The cease-fire brought a **transient** peace to the disputed valley. (ANTONYM)',
      options: [
        { key: 'A', text: 'Permanent' },
        { key: 'B', text: 'Fleeting' },
        { key: 'C', text: 'Ephemeral' },
        { key: 'D', text: 'Brief' }
      ],
      correctAnswer: 'A',
      explanation: '"Transient" means lasting only for a short time; impermanent. The opposite (antonym) is "Permanent".',
      subTopic: 'antonym',
      marks: 1
    },
    {
      question: 'The evidence presented during the court martial was wholly **conclusive**. (ANTONYM)',
      options: [
        { key: 'A', text: 'Decisive' },
        { key: 'B', text: 'Dubious' },
        { key: 'C', text: 'Irrefutable' },
        { key: 'D', text: 'Definite' }
      ],
      correctAnswer: 'B',
      explanation: '"Conclusive" means serving to settle an issue or convincing. The opposite (antonym) is "Dubious".',
      subTopic: 'antonym',
      marks: 1
    },
    {
      question: 'The government took stringent steps to **mitigate** the effects of the drought. (ANTONYM)',
      options: [
        { key: 'A', text: 'Alleviate' },
        { key: 'B', text: 'Aggravate' },
        { key: 'C', text: 'Assuage' },
        { key: 'D', text: 'Moderate' }
      ],
      correctAnswer: 'B',
      explanation: '"Mitigate" means make less severe, serious, or painful. The opposite (antonym) is "Aggravate" (to worsen).',
      subTopic: 'antonym',
      marks: 1
    }
  ]
};

// ── 3. Reading Comprehension Test: Factual Comprehension (2 Passages x 5 MCQs = 10 MCQs)
const rcPassage1Text = `The geopolitical significance of the Indo-Pacific region has escalated dramatically over the past two decades. As the primary maritime highway connecting the energy-rich Persian Gulf with the burgeoning manufacturing hubs of East and Southeast Asia, the sea lanes traversing the Malacca Strait and the South China Sea sustain over sixty percent of maritime commerce globally. Ensuring unimpeded freedom of navigation, upholding a rules-based international order, and fostering multilateral security dialogues have consequently become paramount strategic objectives for littoral nations. Modern naval doctrines increasingly prioritize interoperability, joint surveillance, and maritime domain awareness across vast oceanic corridors to prevent unilateral territorial assertions and safeguard critical supply chains.`;

const rcPassage2Text = `Artificial Intelligence (AI) and autonomous systems are fundamentally revolutionizing defense paradigms and electronic warfare. Unlike conventional platforms that rely exclusively on human decision-cycles, algorithmic systems can synthesize petabytes of multispectral surveillance telemetry in milliseconds, identifying tactical anomalies and predicting adversary maneuvers with unprecedented fidelity. However, the integration of autonomous decision algorithms into command-and-control architectures introduces profound ethical, legal, and operational dilemmas. Military strategists emphasize that preserving meaningful human-in-the-loop oversight is vital to prevent unintended escalation, mitigate catastrophic algorithmic hallucinations, and ensure accountability under international humanitarian law.`;

const readingComprehensionTestData = {
  module: 'cds',
  section: 'reading-comprehension',
  subject: 'reading-comprehension',
  chapterSlug: 'factual-comprehension',
  chapterName: 'Factual Comprehension',
  testId: 'factual-comprehension-test-1',
  testName: 'Factual Comprehension - Test 1',
  testNumber: 1,
  passages: [
    {
      number: 1,
      title: 'Strategic Dynamics in the Indo-Pacific Sea Lanes',
      text: rcPassage1Text
    },
    {
      number: 2,
      title: 'Artificial Intelligence and Modern Military Parity',
      text: rcPassage2Text
    }
  ],
  questions: [
    // ── PASSAGE 1 QUESTIONS (Q1–5) ──────────────────────────
    {
      question: 'According to Passage 1, what makes the Indo-Pacific sea lanes critically important to global trade?',
      options: [
        { key: 'A', text: 'They connect energy suppliers in the Persian Gulf with Asian manufacturing hubs' },
        { key: 'B', text: 'They host the world\'s largest offshore oil extraction platforms' },
        { key: 'C', text: 'They are completely immune to geopolitical tensions and territorial disputes' },
        { key: 'D', text: 'They are governed by a single supranational maritime authority' }
      ],
      correctAnswer: 'A',
      explanation: 'The passage explicitly states that these sea lanes connect the energy-rich Persian Gulf with the manufacturing hubs of East and Southeast Asia, carrying over sixty percent of global maritime commerce.',
      passageNumber: 1,
      passageText: rcPassage1Text,
      passageTitle: 'Strategic Dynamics in the Indo-Pacific Sea Lanes',
      marks: 1
    },
    {
      question: 'Approximately what fraction of global maritime commerce passes through the Indo-Pacific corridors?',
      options: [
        { key: 'A', text: 'Less than twenty percent' },
        { key: 'B', text: 'Exactly forty percent' },
        { key: 'C', text: 'Over sixty percent' },
        { key: 'D', text: 'Nearly ninety-five percent' }
      ],
      correctAnswer: 'C',
      explanation: 'The passage directly notes that the sea lanes "sustain over sixty percent of maritime commerce globally."',
      passageNumber: 1,
      passageText: rcPassage1Text,
      passageTitle: 'Strategic Dynamics in the Indo-Pacific Sea Lanes',
      marks: 1
    },
    {
      question: 'Which of the following is highlighted as a primary goal of littoral nations in the region?',
      options: [
        { key: 'A', text: 'Imposing unilateral transit tariffs on foreign shipping' },
        { key: 'B', text: 'Ensuring freedom of navigation and upholding a rules-based order' },
        { key: 'C', text: 'Privatizing port facilities across the Malacca Strait' },
        { key: 'D', text: 'Phasing out multilateral security dialogues' }
      ],
      correctAnswer: 'B',
      explanation: 'The text highlights "ensuring unimpeded freedom of navigation, upholding a rules-based international order, and fostering multilateral security dialogues".',
      passageNumber: 1,
      passageText: rcPassage1Text,
      passageTitle: 'Strategic Dynamics in the Indo-Pacific Sea Lanes',
      marks: 1
    },
    {
      question: 'What do modern naval doctrines prioritize to prevent unilateral territorial assertions?',
      options: [
        { key: 'A', text: 'Complete isolation of regional merchant vessels' },
        { key: 'B', text: 'Interoperability, joint surveillance, and maritime domain awareness' },
        { key: 'C', text: 'Decommissioning maritime surveillance satellites' },
        { key: 'D', text: 'Relying exclusively on land-based artillery batteries' }
      ],
      correctAnswer: 'B',
      explanation: 'The passage mentions that "Modern naval doctrines increasingly prioritize interoperability, joint surveillance, and maritime domain awareness across vast oceanic corridors".',
      passageNumber: 1,
      passageText: rcPassage1Text,
      passageTitle: 'Strategic Dynamics in the Indo-Pacific Sea Lanes',
      marks: 1
    },
    {
      question: 'The author\'s tone in Passage 1 can best be described as:',
      options: [
        { key: 'A', text: 'Sarcastic and dismissive' },
        { key: 'B', text: 'Analytical and strategic' },
        { key: 'C', text: 'Pessimistic and sensational' },
        { key: 'D', text: 'Sentimental and nostalgic' }
      ],
      correctAnswer: 'B',
      explanation: 'The author methodically explains economic statistics, strategic goals, and modern naval doctrines in an analytical and objective manner.',
      passageNumber: 1,
      passageText: rcPassage1Text,
      passageTitle: 'Strategic Dynamics in the Indo-Pacific Sea Lanes',
      marks: 1
    },

    // ── PASSAGE 2 QUESTIONS (Q6–10) ─────────────────────────
    {
      question: 'According to Passage 2, what capability distinguishes algorithmic defense systems from conventional platforms?',
      options: [
        { key: 'A', text: 'Synthesizing petabytes of multispectral telemetry in milliseconds' },
        { key: 'B', text: 'Operating completely without energy consumption' },
        { key: 'C', text: 'Eliminating the need for software updates or human supervision' },
        { key: 'D', text: 'Replacing international humanitarian law entirely' }
      ],
      correctAnswer: 'A',
      explanation: 'Passage 2 states that algorithmic systems "synthesize petabytes of multispectral surveillance telemetry in milliseconds".',
      passageNumber: 2,
      passageText: rcPassage2Text,
      passageTitle: 'Artificial Intelligence and Modern Military Parity',
      marks: 1
    },
    {
      question: 'What is an acknowledged risk of integrating autonomous algorithms into command-and-control systems?',
      options: [
        { key: 'A', text: 'Profound ethical, legal, and operational dilemmas' },
        { key: 'B', text: 'A total decrease in computing processing speeds' },
        { key: 'C', text: 'Universal consensus among all global powers' },
        { key: 'D', text: 'Complete elimination of warfare dilemmas' }
      ],
      correctAnswer: 'A',
      explanation: 'The passage explicitly mentions that integration "introduces profound ethical, legal, and operational dilemmas."',
      passageNumber: 2,
      passageText: rcPassage2Text,
      passageTitle: 'Artificial Intelligence and Modern Military Parity',
      marks: 1
    },
    {
      question: 'Why do military strategists emphasize preserving "human-in-the-loop" oversight?',
      options: [
        { key: 'A', text: 'To slow down battlefield processing speeds intentionally' },
        { key: 'B', text: 'To prevent unintended escalation and ensure legal accountability' },
        { key: 'C', text: 'To avoid purchasing modern computer hardware' },
        { key: 'D', text: 'To replace human officers with civilian contractors' }
      ],
      correctAnswer: 'B',
      explanation: 'The text notes human-in-the-loop oversight is vital "to prevent unintended escalation, mitigate catastrophic algorithmic hallucinations, and ensure accountability under international humanitarian law."',
      passageNumber: 2,
      passageText: rcPassage2Text,
      passageTitle: 'Artificial Intelligence and Modern Military Parity',
      marks: 1
    },
    {
      question: 'The term "catastrophic algorithmic hallucinations" in the context of the passage refers to:',
      options: [
        { key: 'A', text: 'Spontaneous hardware power shutdowns' },
        { key: 'B', text: 'Severe false inferences or erroneous tactical outputs generated by AI' },
        { key: 'C', text: 'Daydreaming by human command operators' },
        { key: 'D', text: 'Visual illusions caused by defective radar lenses' }
      ],
      correctAnswer: 'B',
      explanation: 'In AI and defense contexts, hallucinations refer to erroneous outputs or fabricated patterns generated by machine learning models that could lead to dangerous tactical decisions.',
      passageNumber: 2,
      passageText: rcPassage2Text,
      passageTitle: 'Artificial Intelligence and Modern Military Parity',
      marks: 1
    },
    {
      question: 'Which of the following summaries best captures the core thesis of Passage 2?',
      options: [
        { key: 'A', text: 'AI should be banned entirely from all defense applications' },
        { key: 'B', text: 'AI offers revolutionary tactical capabilities but requires strict human oversight' },
        { key: 'C', text: 'Conventional military doctrines are already obsolete in every operational theatre' },
        { key: 'D', text: 'Autonomous algorithms have eradicated all errors from tactical decision-making' }
      ],
      correctAnswer: 'B',
      explanation: 'The passage balances the immense processing speed and predictive benefits of AI with the imperative for ethical human-in-the-loop oversight to prevent unintended crises.',
      passageNumber: 2,
      passageText: rcPassage2Text,
      passageTitle: 'Artificial Intelligence and Modern Military Parity',
      marks: 1
    }
  ]
};

async function seedCDSTests() {
  console.log('====================================================');
  console.log('PREORBIT — Starting CDS English Test Seeding');
  console.log('====================================================');

  try {
    await connectDatabase();

    // 1. Seed Grammar Test (20 MCQs)
    console.log('\n[1/3] Publishing Grammar Test: Spotting Errors...');
    const grammarResult = await CDSTestPublishingService.publishTest(grammarTestData, true);
    console.log(`   ✓ ${grammarResult.message}`);

    // 2. Seed Combined Synonyms & Antonyms Test (10+10 = 20 MCQs)
    console.log('\n[2/3] Publishing Vocabulary Test: Synonyms & Antonyms...');
    const vocabResult = await CDSTestPublishingService.publishTest(vocabularyTestData, true);
    console.log(`   ✓ ${vocabResult.message}`);

    // 3. Seed Reading Comprehension Test (2 Passages x 5 MCQs = 10 MCQs)
    console.log('\n[3/3] Publishing Reading Comprehension Test: Factual Comprehension...');
    const rcResult = await CDSTestPublishingService.publishTest(readingComprehensionTestData, true);
    console.log(`   ✓ ${rcResult.message}`);

    console.log('\n====================================================');
    console.log('✓ CDS English tests successfully and idempotently seeded!');
    console.log('====================================================\n');

  } catch (err) {
    console.error('\n❌ CDS Test Seeding Failed:', err.message);
    if (err.validationErrors) {
      console.error('Validation errors:', err.validationErrors);
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
}

if (require.main === module) {
  seedCDSTests();
}

module.exports = {
  grammarTestData,
  vocabularyTestData,
  readingComprehensionTestData,
  seedCDSTests
};
