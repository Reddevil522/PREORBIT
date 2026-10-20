// ============================================================
// PREORBIT — CDS English Reading Comprehension Test Bank
// (4 Tests x 2 Passages x 5 MCQs = 40 MCQs total across 8 Passages)
// ============================================================

const factualCompTest = require('../../../scripts/seedCDSTests').readingComprehensionTestData;

// ── 2. Inferential Comprehension Test ─────────────────────────
const inferentialP1Text = `The transition from mechanization to automation in deep-sea submarine warfare has transformed undersea deterrence doctrines. For decades, submarine detection relied primarily upon human sonar operators who distinguished between oceanic biological background noise and mechanical propeller cavitation through auditory intuition. Modern acoustic sensor suites, however, employ deep machine-learning algorithms that process micro-decibel sound pressure variations across multiple hydrophone arrays simultaneously. While this technological evolution vastly accelerates target acquisition, it fundamentally compresses the command response timeline. Submarine captains no longer possess the luxury of prolonged deliberations before making tactical evasive decisions. The speed of algorithmic threat detection demands that commanders either trust automated defensive countermeasures immediately or risk catastrophic vulnerability to high-speed supercavitating torpedoes. Consequently, the psychological burden on undersea commanders has shifted from intuitive listening to split-second algorithmic risk management.`;

const inferentialP2Text = `Throughout military history, geographic buffer zones have served to prevent direct kinetic clashes between rival continental empires. From the mountainous terrain of Central Asia during the Great Game to the demilitarized borders of the Cold War, neutral or uninhabited territorial cushions delayed mobilization and provided vital strategic depth. However, the proliferation of hypersonic cruise missiles, precision orbital kinetic strikes, and transcontinental cyber warfare has effectively nullified traditional concepts of geographic insulation. When an adversary can deliver a precision-guided warhead across continents in minutes or disable a national electrical grid through malicious code in seconds, physical distance no longer provides defensive security. Nations can no longer assume that geographical barriers alone guarantee sovereignty; security today is dictated by real-time radar networks, integrated missile shields, and resilient critical digital infrastructure.`;

const inferentialComprehensionTest = {
  module: 'cds',
  section: 'reading-comprehension',
  subject: 'reading-comprehension',
  chapterSlug: 'inferential-comprehension',
  chapterName: 'Inferential Comprehension',
  testId: 'inferential-comprehension-test-1',
  testName: 'Inferential Comprehension - Test 1',
  testNumber: 1,
  passages: [
    {
      number: 1,
      title: 'Algorithmic Automation in Undersea Warfare',
      text: inferentialP1Text
    },
    {
      number: 2,
      title: 'The Erosion of Geographic Buffer Zones',
      text: inferentialP2Text
    }
  ],
  questions: [
    // Passage 1: Questions 1–5
    {
      question: 'It can be inferred from Passage 1 that traditional sonar detection was:',
      options: [
        { key: 'A', text: 'More dependent on subjective human auditory judgment and acoustic experience' },
        { key: 'B', text: 'Entirely error-free compared to modern acoustic sensor suites' },
        { key: 'C', text: 'Faster than algorithmic target acquisition systems' },
        { key: 'D', text: 'Incapable of identifying mechanical propeller cavitation' }
      ],
      correctAnswer: 'A',
      explanation: 'The passage contrasts modern algorithms with past operators who "distinguished between oceanic biological background noise and mechanical propeller cavitation through auditory intuition."',
      passageNumber: 1,
      passageText: inferentialP1Text,
      passageTitle: 'Algorithmic Automation in Undersea Warfare',
      marks: 1
    },
    {
      question: 'According to Passage 1, the compression of the command response timeline implies that:',
      options: [
        { key: 'A', text: 'Undersea commanders must make high-stakes defensive decisions almost instantaneously' },
        { key: 'B', text: 'Submarines will no longer carry human crew members' },
        { key: 'C', text: 'Supercavitating torpedoes have become obsolete' },
        { key: 'D', text: 'Human intuition is more valuable than automated threat telemetry' }
      ],
      correctAnswer: 'A',
      explanation: 'The text directly notes that captains "no longer possess the luxury of prolonged deliberations" and must make split-second decisions.',
      passageNumber: 1,
      passageText: inferentialP1Text,
      passageTitle: 'Algorithmic Automation in Undersea Warfare',
      marks: 1
    },
    {
      question: 'The author\'s description of the shift in the submarine commander\'s burden suggests that modern commanders must:',
      options: [
        { key: 'A', text: 'Focus on managing and trusting algorithmic risk rather than acoustic listening' },
        { key: 'B', text: 'Personally calibrate hydrophone acoustic sensors during combat' },
        { key: 'C', text: 'Refuse automated defensive recommendations' },
        { key: 'D', text: 'Rely solely on surface warship communications' }
      ],
      correctAnswer: 'A',
      explanation: 'The concluding sentence explicitly highlights that the burden "has shifted from intuitive listening to split-second algorithmic risk management."',
      passageNumber: 1,
      passageText: inferentialP1Text,
      passageTitle: 'Algorithmic Automation in Undersea Warfare',
      marks: 1
    },
    {
      question: 'What is the implied danger if a submarine captain hesitates to trust automated countermeasures?',
      options: [
        { key: 'A', text: 'Extreme vulnerability to devastating high-speed weapon strikes' },
        { key: 'B', text: 'A total failure of submarine electrical propulsion' },
        { key: 'C', text: 'Hostile detection by biological marine life' },
        { key: 'D', text: 'Disciplinary reprimand by naval headquarters' }
      ],
      correctAnswer: 'A',
      explanation: 'The text states that captains who hesitate "risk catastrophic vulnerability to high-speed supercavitating torpedoes."',
      passageNumber: 1,
      passageText: inferentialP1Text,
      passageTitle: 'Algorithmic Automation in Undersea Warfare',
      marks: 1
    },
    {
      question: 'The author\'s attitude toward algorithmic target acquisition can best be characterized as:',
      options: [
        { key: 'A', text: 'Recognizing its speed while highlighting the profound decision pressures it creates' },
        { key: 'B', text: 'Dismissive of its tactical necessity' },
        { key: 'C', text: 'Uncritically enthusiastic without reservation' },
        { key: 'D', text: 'Nostalgic for manual acoustic methods' }
      ],
      correctAnswer: 'A',
      explanation: 'The author balances the undeniable speed advantage of algorithms with an analysis of the compressed timeline and psychological burden it imposes.',
      passageNumber: 1,
      passageText: inferentialP1Text,
      passageTitle: 'Algorithmic Automation in Undersea Warfare',
      marks: 1
    },

    // Passage 2: Questions 6–10
    {
      question: 'It can be inferred from Passage 2 that traditional geographic buffer zones were effective because:',
      options: [
        { key: 'A', text: 'Physical distance provided adequate reaction time and strategic depth against land invasion' },
        { key: 'B', text: 'Ancient empires possessed hypersonic missile systems' },
        { key: 'C', text: 'Mountains and deserts were completely impossible to cross' },
        { key: 'D', text: 'Neutral nations possessed stronger armies than continental empires' }
      ],
      correctAnswer: 'A',
      explanation: 'The passage notes that physical cushions "delayed mobilization and provided vital strategic depth" against rival empires.',
      passageNumber: 2,
      passageText: inferentialP2Text,
      passageTitle: 'The Erosion of Geographic Buffer Zones',
      marks: 1
    },
    {
      question: 'The passage suggests that modern hypersonic weapons and cyber warfare have:',
      options: [
        { key: 'A', text: 'Diminished the protective value of physical borders and geographical isolation' },
        { key: 'B', text: 'Eliminated the necessity for national defense spending' },
        { key: 'C', text: 'Strengthened the strategic depth of landlocked nations' },
        { key: 'D', text: 'Replaced all conventional infantry units' }
      ],
      correctAnswer: 'A',
      explanation: 'The text explicitly asserts that technological advances have "effectively nullified traditional concepts of geographic insulation."',
      passageNumber: 2,
      passageText: inferentialP2Text,
      passageTitle: 'The Erosion of Geographic Buffer Zones',
      marks: 1
    },
    {
      question: 'Which of the following scenarios best exemplifies the author\'s thesis in Passage 2?',
      options: [
        { key: 'A', text: 'A sovereign nation being crippled by a remote cyber strike on its power grid despite having mountain borders' },
        { key: 'B', text: 'An army repelling an adversary by building stone fortifications along a mountain pass' },
        { key: 'C', text: 'A landlocked nation purchasing conventional cavalry units' },
        { key: 'D', text: 'Two nations resolving territorial friction through traditional diplomatic treaties' }
      ],
      correctAnswer: 'A',
      explanation: 'The passage directly illustrates this paradox: an adversary can disable an electrical grid through code in seconds regardless of physical barriers.',
      passageNumber: 2,
      passageText: inferentialP2Text,
      passageTitle: 'The Erosion of Geographic Buffer Zones',
      marks: 1
    },
    {
      question: 'According to Passage 2, modern national security is now primarily determined by:',
      options: [
        { key: 'A', text: 'Integrated missile shields, real-time radar networks, and cyber resilience' },
        { key: 'B', text: 'Natural geographical barriers such as oceans and mountain ranges' },
        { key: 'C', text: 'Demilitarized buffer territories between rival empires' },
        { key: 'D', text: 'Large conventional infantry formations' }
      ],
      correctAnswer: 'A',
      explanation: 'The concluding sentence states that security is dictated by "real-time radar networks, integrated missile shields, and resilient critical digital infrastructure."',
      passageNumber: 2,
      passageText: inferentialP2Text,
      passageTitle: 'The Erosion of Geographic Buffer Zones',
      marks: 1
    },
    {
      question: 'The primary purpose of Passage 2 is to:',
      options: [
        { key: 'A', text: 'Argue that technological advancements have rendered physical distance obsolete in modern defense strategy' },
        { key: 'B', text: 'Praise the historical diplomacy of the Great Game in Central Asia' },
        { key: 'C', text: 'Advocate for the abolition of integrated missile defense systems' },
        { key: 'D', text: 'Provide a historical overview of Cold War border negotiations' }
      ],
      correctAnswer: 'A',
      explanation: 'The overarching argument demonstrates how modern missile and cyber capabilities nullified traditional geographic insulation.',
      passageNumber: 2,
      passageText: inferentialP2Text,
      passageTitle: 'The Erosion of Geographic Buffer Zones',
      marks: 1
    }
  ]
};

// ── 3. Tone and Theme Identification Test ─────────────────────
const toneThemeP1Text = `The discourse surrounding ethical autonomous weapons systems is frequently compromised by romanticized notions of human chivalry. Critics routinely assert that delegating lethal force to algorithmic calculations strips warfare of moral compassion. Yet historical combat records demonstrate that human soldiers under extreme psychological terror are notoriously susceptible to panic, visceral hatred, exhaustion, and revenge—factors that precipitate grave violations of the laws of armed conflict. An automated system, unclouded by fear and devoid of self-preservation instincts, can adhere strictly to predetermined rules of engagement without anger or spite. However, the critical ethical vulnerability remains: who bears criminal accountability when an algorithm misidentifies a civilian convoy as a hostile armored column? While machines may eliminate battlefield atrocities driven by human passion, they introduce a colder, systemic moral vacuum where culpability becomes dangerously diffuse across programmers, commanders, and software corporations.`;

const toneThemeP2Text = `The Himalayas are far more than a physical rampart shielding the Indian subcontinent from northern winds; they constitute the hydrological lifeline of nearly two billion people. The colossal glacial masses of the Karakoram and Tibetan Plateau feed the perennial river systems that sustain agriculture across the Indus, Ganges, and Brahmaputra river basins. Today, however, climate change and accelerated warming threaten this fragile ecological equilibrium. Glacial retreat is occurring at unprecedented speeds, creating unstable moraine-dammed lakes prone to catastrophic outburst floods. In the long term, the depletion of glacial reservoirs will transform perennial rivers into seasonal streams, triggering acute agrarian crises and resource conflicts across South Asia. Environmental conservation in the high Himalayas is therefore not merely an ecological sentiment; it is a critical national security imperative that will determine the demographic stability of the entire region.`;

const toneAndThemeTest = {
  module: 'cds',
  section: 'reading-comprehension',
  subject: 'reading-comprehension',
  chapterSlug: 'tone-and-theme',
  chapterName: 'Tone and Theme Identification',
  testId: 'tone-and-theme-test-1',
  testName: 'Tone and Theme - Test 1',
  testNumber: 1,
  passages: [
    {
      number: 1,
      title: 'Ethics and Accountability in Autonomous Warfare',
      text: toneThemeP1Text
    },
    {
      number: 2,
      title: 'Glacial Depletion and National Security in the Himalayas',
      text: toneThemeP2Text
    }
  ],
  questions: [
    // Passage 1: Questions 1–5
    {
      question: 'Which of the following best describes the author\'s tone in Passage 1?',
      options: [
        { key: 'A', text: 'Critical, nuanced, and intellectually rigorous' },
        { key: 'B', text: 'Overly sentimental and nostalgic' },
        { key: 'C', text: 'Aggressively dismissive of technology' },
        { key: 'D', text: 'Uncritically promotional of artificial intelligence' }
      ],
      correctAnswer: 'A',
      explanation: 'The author methodically weighs the advantages of algorithms over human panic while dissecting the grave moral dilemma of diffuse legal accountability.',
      passageNumber: 1,
      passageText: toneThemeP1Text,
      passageTitle: 'Ethics and Accountability in Autonomous Warfare',
      marks: 1
    },
    {
      question: 'Which of the following serves as the most suitable title for Passage 1?',
      options: [
        { key: 'A', text: 'Autonomous Arms: The Dilemma of Systemic Moral Accountability' },
        { key: 'B', text: 'The Total Superiority of Machine Warfare Over Humans' },
        { key: 'C', text: 'The Chivalric Traditions of Twentieth-Century Armies' },
        { key: 'D', text: 'How Programming Software Solves Warfare Conflicts' }
      ],
      correctAnswer: 'A',
      explanation: 'The title accurately captures both the subject (autonomous arms) and the central thesis (the ethical vacuum and accountability dilemma).',
      passageNumber: 1,
      passageText: toneThemeP1Text,
      passageTitle: 'Ethics and Accountability in Autonomous Warfare',
      marks: 1
    },
    {
      question: 'What is the primary theme explored by the author in Passage 1?',
      options: [
        { key: 'A', text: 'Autonomous weapons may mitigate emotional atrocities but create perilous accountability gaps' },
        { key: 'B', text: 'Human soldiers are inherently incapable of following rules of engagement' },
        { key: 'C', text: 'Software corporations should be granted sovereign immunity in war' },
        { key: 'D', text: 'Chivalry has always guaranteed ethical battlefield conduct' }
      ],
      correctAnswer: 'A',
      explanation: 'The central thesis balances the lack of human passion/fear in machines against the danger of diffuse legal culpability.',
      passageNumber: 1,
      passageText: toneThemeP1Text,
      passageTitle: 'Ethics and Accountability in Autonomous Warfare',
      marks: 1
    },
    {
      question: 'The author\'s phrase "a colder, systemic moral vacuum" is used to convey:',
      options: [
        { key: 'A', text: 'A dangerous condition where no clear human entity accepts guilt for lethal mistakes' },
        { key: 'B', text: 'The freezing temperatures inside automated computer servers' },
        { key: 'C', text: 'The complete cessation of all military conflicts' },
        { key: 'D', text: 'The moral superiority of mechanical weapons' }
      ],
      correctAnswer: 'A',
      explanation: 'The author uses this metaphor to describe the evasion and dilution of responsibility among software engineers, commanders, and manufacturers.',
      passageNumber: 1,
      passageText: toneThemeP1Text,
      passageTitle: 'Ethics and Accountability in Autonomous Warfare',
      marks: 1
    },
    {
      question: 'The author\'s perspective on human combatants can best be characterized as:',
      options: [
        { key: 'A', text: 'Realistically acknowledging that fear, panic, and revenge impair human judgment in battle' },
        { key: 'B', text: 'Idealizing soldiers as incorruptible moral paragons' },
        { key: 'C', text: 'Condemning all military personnel as malicious' },
        { key: 'D', text: 'Ignoring historical documentation of warfare' }
      ],
      correctAnswer: 'A',
      explanation: 'The author cites historical combat records showing humans under terror are prone to panic, exhaustion, and revenge.',
      passageNumber: 1,
      passageText: toneThemeP1Text,
      passageTitle: 'Ethics and Accountability in Autonomous Warfare',
      marks: 1
    },

    // Passage 2: Questions 6–10
    {
      question: 'Which of the following serves as the most appropriate title for Passage 2?',
      options: [
        { key: 'A', text: 'The Melting Water Towers: Himalayan Ecology as a National Security Imperative' },
        { key: 'B', text: 'A Tourist Guide to the Glaciers of the Tibetan Plateau' },
        { key: 'C', text: 'The Monsoons and Agriculture of the Brahmaputra Basin' },
        { key: 'D', text: 'Ancient Mountain Fortifications of the Subcontinent' }
      ],
      correctAnswer: 'A',
      explanation: 'Encapsulates both the ecological crisis (glacial retreat) and the overarching argument (national security and regional stability).',
      passageNumber: 2,
      passageText: toneThemeP2Text,
      passageTitle: 'Glacial Depletion and National Security in the Himalayas',
      marks: 1
    },
    {
      question: 'The author\'s primary purpose in Passage 2 is to:',
      options: [
        { key: 'A', text: 'Elevate Himalayan environmental conservation from mere ecology to an urgent national security priority' },
        { key: 'B', text: 'Argue against industrial agriculture in South Asian river valleys' },
        { key: 'C', text: 'Describe the geological formation of mountain ridges' },
        { key: 'D', text: 'Criticize weather monitoring stations in the high Karakoram' }
      ],
      correctAnswer: 'A',
      explanation: 'The concluding sentence synthesizes this thesis: environmental conservation is a critical national security imperative determining demographic stability.',
      passageNumber: 2,
      passageText: toneThemeP2Text,
      passageTitle: 'Glacial Depletion and National Security in the Himalayas',
      marks: 1
    },
    {
      question: 'The tone of Passage 2 is best described as:',
      options: [
        { key: 'A', text: 'Urgent, analytical, and prescriptive' },
        { key: 'B', text: 'Detached and indifferent' },
        { key: 'C', text: 'Sarcastic and humorous' },
        { key: 'D', text: 'Optimistic without qualification' }
      ],
      correctAnswer: 'A',
      explanation: 'The author urgently analyzes ecological data and prescriptively identifies Himalayan conservation as vital to national security.',
      passageNumber: 2,
      passageText: toneThemeP2Text,
      passageTitle: 'Glacial Depletion and National Security in the Himalayas',
      marks: 1
    },
    {
      question: 'What is the central theme of Passage 2?',
      options: [
        { key: 'A', text: 'Accelerated Himalayan glacial retreat threatens perennial water systems and regional demographic security' },
        { key: 'B', text: 'South Asian nations should replace agriculture with heavy industrial production' },
        { key: 'C', text: 'Mountain barriers prevent all modern geopolitical boundary friction' },
        { key: 'D', text: 'Glaciers expand during periods of regional temperature escalation' }
      ],
      correctAnswer: 'A',
      explanation: 'The central thesis links climate change and glacial retreat to catastrophic river depletion, agrarian collapse, and security crises.',
      passageNumber: 2,
      passageText: toneThemeP2Text,
      passageTitle: 'Glacial Depletion and National Security in the Himalayas',
      marks: 1
    },
    {
      question: 'The author refers to the Himalayas as a "hydrological lifeline" to emphasize:',
      options: [
        { key: 'A', text: 'Their indispensable role in feeding the perennial rivers that sustain two billion people' },
        { key: 'B', text: 'Their military role in blocking naval invasions' },
        { key: 'C', text: 'Their value as a recreational trekking corridor' },
        { key: 'D', text: 'Their capacity to generate hydro-electricity exclusively for factories' }
      ],
      correctAnswer: 'A',
      explanation: 'The text directly explains that the glaciers feed the perennial river systems sustaining agriculture for nearly two billion people.',
      passageNumber: 2,
      passageText: toneThemeP2Text,
      passageTitle: 'Glacial Depletion and National Security in the Himalayas',
      marks: 1
    }
  ]
};

// ── 4. Contextual Vocabulary in Passages Test ─────────────────
const contextualVocabP1Text = `The international community's response to volatile cyber warfare incursions has been largely **tentative**, characterized by cautious diplomacy rather than decisive deterrence. Unlike kinetic incursions across geographical borders, digital attacks occupy an **opaque** domain where state sponsors operate through proxy hacker collectives. Consequently, victim nations face a **conundrum**: retaliating aggressively against an unverified entity risks catastrophic escalation, while complete forbearance invites further **audacious** subversion. Legal scholars emphasize that until a multilateral consensus **crystallizes** regarding cyber rules of engagement, the international digital order will remain perilously unstable.`;

const contextualVocabP2Text = `The logistical challenges of maintaining an isolated mountain garrison throughout the winter months are **formidable**. Forward supply routes are routinely severed by **impassable** snowdrifts, rendering vehicular convoys completely ineffectual. In response, defense commands must exhibit exceptional **foresight**, stockpiling fuel, specialized rations, and medical inventories months in advance. The operational tempo shifts from aggressive patrolling to defensive **vigilance**, where endurance and mental fortitude **supersede** kinetic combat skills. A failure of logistical planning in such harsh environments produces **disastrous** attrition that cannot be mitigated by tactical bravery alone.`;

const contextualVocabularyTest = {
  module: 'cds',
  section: 'reading-comprehension',
  subject: 'reading-comprehension',
  chapterSlug: 'contextual-vocabulary',
  chapterName: 'Contextual Vocabulary in Passages',
  testId: 'contextual-vocabulary-test-1',
  testName: 'Contextual Vocabulary - Test 1',
  testNumber: 1,
  passages: [
    {
      number: 1,
      title: 'Digital Deterrence and Proxy Cyber Incursions',
      text: contextualVocabP1Text
    },
    {
      number: 2,
      title: 'Logistical Resilience in Mountain Warfare',
      text: contextualVocabP2Text
    }
  ],
  questions: [
    // Passage 1: Questions 1–5
    {
      question: 'As used in Passage 1, the word "TENTATIVE" most nearly means:',
      options: [
        { key: 'A', text: 'Hesitant and experimental rather than confident and firm' },
        { key: 'B', text: 'Aggressive and destructive' },
        { key: 'C', text: 'Permanent and unchanging' },
        { key: 'D', text: 'Secretive and illegal' }
      ],
      correctAnswer: 'A',
      explanation: 'In context, the response is characterized by cautious diplomacy and hesitation rather than decisive action.',
      passageNumber: 1,
      passageText: contextualVocabP1Text,
      passageTitle: 'Digital Deterrence and Proxy Cyber Incursions',
      marks: 1
    },
    {
      question: 'As used in Passage 1, the word "OPAQUE" most nearly means:',
      options: [
        { key: 'A', text: 'Murky, ambiguous, and difficult to scrutinize or verify' },
        { key: 'B', text: 'Physically solid and bulletproof' },
        { key: 'C', text: 'Completely transparent and clear' },
        { key: 'D', text: 'Brightly illuminated' }
      ],
      correctAnswer: 'A',
      explanation: 'The passage contrasts transparent kinetic borders with the digital domain where state sponsors hide behind proxy collectives.',
      passageNumber: 1,
      passageText: contextualVocabP1Text,
      passageTitle: 'Digital Deterrence and Proxy Cyber Incursions',
      marks: 1
    },
    {
      question: 'As used in Passage 1, the word "CONUNDRUM" most nearly means:',
      options: [
        { key: 'A', text: 'A perplexing and difficult dilemma with no easy solution' },
        { key: 'B', text: 'A military treaty signed by allies' },
        { key: 'C', text: 'A catastrophic physical defeat' },
        { key: 'D', text: 'A clear tactical victory' }
      ],
      correctAnswer: 'A',
      explanation: 'The text describes the difficult dilemma: aggressive retaliation risks escalation, while forbearance invites more attacks.',
      passageNumber: 1,
      passageText: contextualVocabP1Text,
      passageTitle: 'Digital Deterrence and Proxy Cyber Incursions',
      marks: 1
    },
    {
      question: 'As used in Passage 1, the word "AUDACIOUS" most nearly means:',
      options: [
        { key: 'A', text: 'Daringly bold and insolent' },
        { key: 'B', text: 'Timid and fearful' },
        { key: 'C', text: 'Moderate and polite' },
        { key: 'D', text: 'Clumsy and uncoordinated' }
      ],
      correctAnswer: 'A',
      explanation: '"Audacious subversion" refers to bold, brazen hostile interference.',
      passageNumber: 1,
      passageText: contextualVocabP1Text,
      passageTitle: 'Digital Deterrence and Proxy Cyber Incursions',
      marks: 1
    },
    {
      question: 'As used in Passage 1, the word "CRYSTALLIZES" most nearly means:',
      options: [
        { key: 'A', text: 'Becomes definite, clear, and firmly established' },
        { key: 'B', text: 'Freezes into physical ice' },
        { key: 'C', text: 'Shatters into fragile pieces' },
        { key: 'D', text: 'Disappears completely' }
      ],
      correctAnswer: 'A',
      explanation: 'Metaphorically, consensus "crystallizing" means emerging into a clear, solid, agreed-upon framework.',
      passageNumber: 1,
      passageText: contextualVocabP1Text,
      passageTitle: 'Digital Deterrence and Proxy Cyber Incursions',
      marks: 1
    },

    // Passage 2: Questions 6–10
    {
      question: 'As used in Passage 2, the word "FORMIDABLE" most nearly means:',
      options: [
        { key: 'A', text: 'Inspiring awe and respect through being impressively large or challenging' },
        { key: 'B', text: 'Trivial and easily resolved' },
        { key: 'C', text: 'Pleasant and enjoyable' },
        { key: 'D', text: 'Fragile and vulnerable' }
      ],
      correctAnswer: 'A',
      explanation: '"Formidable challenges" describes obstacles of immense difficulty and scale.',
      passageNumber: 2,
      passageText: contextualVocabP2Text,
      passageTitle: 'Logistical Resilience in Mountain Warfare',
      marks: 1
    },
    {
      question: 'As used in Passage 2, the word "IMPASSABLE" most nearly means:',
      options: [
        { key: 'A', text: 'Impossible to travel over or cross' },
        { key: 'B', text: 'Easily navigated by small cars' },
        { key: 'C', text: 'Pleasantly scenic' },
        { key: 'D', text: 'Densely populated' }
      ],
      correctAnswer: 'A',
      explanation: '"Impassable snowdrifts" completely block vehicular and foot movement.',
      passageNumber: 2,
      passageText: contextualVocabP2Text,
      passageTitle: 'Logistical Resilience in Mountain Warfare',
      marks: 1
    },
    {
      question: 'As used in Passage 2, the word "FORESIGHT" most nearly means:',
      options: [
        { key: 'A', text: 'The ability to predict and prepare for future needs and crises' },
        { key: 'B', text: 'Visual acuity with optical binoculars' },
        { key: 'C', text: 'Regret for past errors' },
        { key: 'D', text: 'Hesitation before taking action' }
      ],
      correctAnswer: 'A',
      explanation: 'Commands exhibit foresight by anticipating winter challenges and stockpiling fuel months in advance.',
      passageNumber: 2,
      passageText: contextualVocabP2Text,
      passageTitle: 'Logistical Resilience in Mountain Warfare',
      marks: 1
    },
    {
      question: 'As used in Passage 2, the word "SUPERSEDE" most nearly means:',
      options: [
        { key: 'A', text: 'To take the place of or become more important than' },
        { key: 'B', text: 'To be weakened or defeated by' },
        { key: 'C', text: 'To follow in chronological sequence' },
        { key: 'D', text: 'To eliminate completely' }
      ],
      correctAnswer: 'A',
      explanation: 'Endurance and fortitude "supersede" kinetic combat skills, meaning they become the paramount necessity.',
      passageNumber: 2,
      passageText: contextualVocabP2Text,
      passageTitle: 'Logistical Resilience in Mountain Warfare',
      marks: 1
    },
    {
      question: 'As used in Passage 2, the word "ATTRITION" most nearly means:',
      options: [
        { key: 'A', text: 'Gradual loss of military personnel and resources through relentless hardship' },
        { key: 'B', text: 'Rapid replenishment of munitions' },
        { key: 'C', text: 'Celebration of operational victory' },
        { key: 'D', text: 'Sudden mutiny among troops' }
      ],
      correctAnswer: 'A',
      explanation: 'In logistical contexts, "attrition" denotes the wearing down and exhaustion of manpower and supplies due to hostile environmental conditions.',
      passageNumber: 2,
      passageText: contextualVocabP2Text,
      passageTitle: 'Logistical Resilience in Mountain Warfare',
      marks: 1
    }
  ]
};

module.exports = [
  factualCompTest,
  inferentialComprehensionTest,
  toneAndThemeTest,
  contextualVocabularyTest
];
