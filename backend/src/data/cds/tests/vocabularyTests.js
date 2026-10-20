// ============================================================
// PREORBIT — CDS English Vocabulary Test Bank (6 Tests x 20 MCQs = 120 MCQs)
// ============================================================

const synAntTest = require('../../../scripts/seedCDSTests').vocabularyTestData;

const idiomsPhrasesTest = {
  module: 'cds',
  section: 'vocabulary',
  subject: 'vocabulary',
  chapterSlug: 'idioms-phrases',
  chapterName: 'Idioms and Phrases',
  testId: 'idioms-phrases-test-1',
  testName: 'Idioms & Phrases - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'Choose the correct meaning of the underlined idiom: The captain had to **bite the bullet** and order the tactical retreat.',
      options: [
        { key: 'A', text: 'To act aggressively without consideration' },
        { key: 'B', text: 'To endure an inevitable painful or grim situation with fortitude' },
        { key: 'C', text: 'To waste ammunition needlessly' },
        { key: 'D', text: 'To surrender to the adversary' }
      ],
      correctAnswer: 'B',
      explanation: '"Bite the bullet" means to face a difficult situation with courage and stoicism.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: By launching the night counter-offensive, the general **turned the tables** on the enemy.',
      options: [
        { key: 'A', text: 'Completely reversed a disadvantaged situation to gain the upper hand' },
        { key: 'B', text: 'Destroyed the peace treaty conference' },
        { key: 'C', text: 'Surrendered his strategic positions' },
        { key: 'D', text: 'Confused his own soldiers during combat' }
      ],
      correctAnswer: 'A',
      explanation: '"Turn the tables" means to change a situation from disadvantage to decisive superiority.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The commander warned his staff not to **add fuel to the fire** during tense border talks.',
      options: [
        { key: 'A', text: 'To intensify an already volatile or dangerous conflict' },
        { key: 'B', text: 'To supply diesel to combat vehicles' },
        { key: 'C', text: 'To warm the soldiers in freezing weather' },
        { key: 'D', text: 'To initiate peace negotiations' }
      ],
      correctAnswer: 'A',
      explanation: '"Add fuel to the fire" means to worsen an already agitated or explosive problem.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: After months of planning, the team finally **saw the light at the end of the tunnel**.',
      options: [
        { key: 'A', text: 'A long-awaited sign of hope or resolution after a prolonged ordeal' },
        { key: 'B', text: 'An unexpected railway obstruction' },
        { key: 'C', text: 'A sudden dangerous artillery flare' },
        { key: 'D', text: 'The completion of a subterranean bunker' }
      ],
      correctAnswer: 'A',
      explanation: '"Light at the end of the tunnel" denotes the prospect of success after severe hardship.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The sentry was advised to **keep his ear to the ground** for suspicious frontier activity.',
      options: [
        { key: 'A', text: 'To sleep on the ground during sentry duty' },
        { key: 'B', text: 'To remain alert, informed, and watchful of emerging developments' },
        { key: 'C', text: 'To test the soil moisture before rain' },
        { key: 'D', text: 'To camouflage his helmet with dirt' }
      ],
      correctAnswer: 'B',
      explanation: '"Keep one\'s ear to the ground" means to listen carefully for nascent trends and early warning signals.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The junior subaltern decided to **take the bull by the horns** and confront the supply shortage.',
      options: [
        { key: 'A', text: 'To tackle a daunting challenge directly with courage' },
        { key: 'B', text: 'To practice cattle farming' },
        { key: 'C', text: 'To avoid an impending operational review' },
        { key: 'D', text: 'To delegate duties to subordinates' }
      ],
      correctAnswer: 'A',
      explanation: '"Take the bull by the horns" means to confront a dangerous problem decisively.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The logistics officer **left no stone unturned** to secure essential medical supplies.',
      options: [
        { key: 'A', text: 'Tried every possible course of action in order to achieve something' },
        { key: 'B', text: 'Clearing mountain roads of physical rocks' },
        { key: 'C', text: 'Ignored the primary mission directives' },
        { key: 'D', text: 'Relied exclusively on external assistance' }
      ],
      correctAnswer: 'A',
      explanation: '"Leave no stone unturned" means to do everything feasible to achieve an objective.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: He is known to be **a wolf in sheep\'s clothing** in bureaucratic negotiations.',
      options: [
        { key: 'A', text: 'A hostile or dangerous person masquerading as a harmless friend' },
        { key: 'B', text: 'A coward dressed in military camouflage' },
        { key: 'C', text: 'A diplomat wearing woollen clothes' },
        { key: 'D', text: 'An aggressive warrior in open combat' }
      ],
      correctAnswer: 'A',
      explanation: '"A wolf in sheep\'s clothing" denotes a deceitful individual whose amiable exterior hides hostile intentions.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The naval squadron **burned their boats** by committing to the amphibious landing.',
      options: [
        { key: 'A', text: 'Destroyed enemy ships' },
        { key: 'B', text: 'Took a decisive step that made retreat impossible' },
        { key: 'C', text: 'Set fire to their own naval harbor accidentally' },
        { key: 'D', text: 'Requested emergency sea evacuation' }
      ],
      correctAnswer: 'B',
      explanation: '"Burn one\'s boats/bridges" means to commit oneself to an irrevocable course of action.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The intelligence operative was caught **red-handed** while copying confidential documents.',
      options: [
        { key: 'A', text: 'Apprehended in the very act of committing a crime' },
        { key: 'B', text: 'Injured with bleeding hands' },
        { key: 'C', text: 'Wearing red tactical gloves' },
        { key: 'D', text: 'Falsely accused by double agents' }
      ],
      correctAnswer: 'A',
      explanation: '"Caught red-handed" means discovered while actively committing an offense.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: His sudden decision to resign was like **a bolt from the blue**.',
      options: [
        { key: 'A', text: 'A complete and startling surprise' },
        { key: 'B', text: 'An anticipated thunderstorm' },
        { key: 'C', text: 'A planned regimental promotion' },
        { key: 'D', text: 'A trivial development' }
      ],
      correctAnswer: 'A',
      explanation: '"A bolt from the blue" describes an unexpected, shocking catastrophe or announcement.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The platoon had to **weather the storm** of fierce mortar shelling before advancing.',
      options: [
        { key: 'A', text: 'To survive a difficult and perilous ordeal successfully' },
        { key: 'B', text: 'To measure rain intensity with barometers' },
        { key: 'C', text: 'To abandon combat gear during heavy rains' },
        { key: 'D', text: 'To retreat inside a storm shelter' }
      ],
      correctAnswer: 'A',
      explanation: '"Weather the storm" means to endure and safely emerge from a dangerous crisis.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The diplomatic treaty was deemed **a dead letter** after renewed hostilities.',
      options: [
        { key: 'A', text: 'An agreement or law that is no longer observed or enforced' },
        { key: 'B', text: 'An intercepted confidential message' },
        { key: 'C', text: 'A letter delivered to a deceased soldier' },
        { key: 'D', text: 'A draft treaty awaiting presidential signature' }
      ],
      correctAnswer: 'A',
      explanation: '"A dead letter" refers to an official treaty, law, or ordinance that has lost legal validity or practical enforcement.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The young subaltern took the senior officer\'s harsh critique **with a grain of salt**.',
      options: [
        { key: 'A', text: 'Accepted it with skepticism and caution' },
        { key: 'B', text: 'Ate salted rations during duty' },
        { key: 'C', text: 'Became furious and argumentative' },
        { key: 'D', text: 'Accepted every single word as gospel truth' }
      ],
      correctAnswer: 'A',
      explanation: '"Take with a grain of salt" means to view information with healthy skepticism.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The regiment was determined to defend the fort **at all costs**.',
      options: [
        { key: 'A', text: 'Regardless of the expense, effort, or sacrifice required' },
        { key: 'B', text: 'Only if sufficient financial budget is allocated' },
        { key: 'C', text: 'At the cheapest logistical expense' },
        { key: 'D', text: 'With minimum military participation' }
      ],
      correctAnswer: 'A',
      explanation: '"At all costs" signifies resolute commitment regardless of losses or sacrifice.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The pilot managed to land the damaged aircraft **by the skin of his teeth**.',
      options: [
        { key: 'A', text: 'Only just; by a very narrow margin of safety' },
        { key: 'B', text: 'With immense ease and comfort' },
        { key: 'C', text: 'Suffering severe dental trauma' },
        { key: 'D', text: 'Without relying on instruments' }
      ],
      correctAnswer: 'A',
      explanation: '"By the skin of one\'s teeth" means barely escaping danger or succeeding by the narrowest margin.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The defense minister decided to **spill the beans** regarding the espionage operation.',
      options: [
        { key: 'A', text: 'To disclose secret information prematurely or indiscreetly' },
        { key: 'B', text: 'To drop agricultural cargo from an aircraft' },
        { key: 'C', text: 'To cancel a scheduled parliamentary debate' },
        { key: 'D', text: 'To resign from cabinet office' }
      ],
      correctAnswer: 'A',
      explanation: '"Spill the beans" means to reveal confidential or classified secrets.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: After twenty years of military service, the colonel decided to **hang up his boots**.',
      options: [
        { key: 'A', text: 'To retire from active service' },
        { key: 'B', text: 'To clean his tactical equipment' },
        { key: 'C', text: 'To take up mountain climbing' },
        { key: 'D', text: 'To face disciplinary court martial' }
      ],
      correctAnswer: 'A',
      explanation: '"Hang up one\'s boots" means to retire permanently from a career or active sport.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The two rival commanders decided to **bury the hatchet** and sign the border treaty.',
      options: [
        { key: 'A', text: 'To make peace and end an old feud' },
        { key: 'B', text: 'To bury their weapons in a trench' },
        { key: 'C', text: 'To dig trenches before an assault' },
        { key: 'D', text: 'To prepare for renewed armed conflict' }
      ],
      correctAnswer: 'A',
      explanation: '"Bury the hatchet" is an idiomatic metaphor for ending animosity and agreeing to peace.',
      marks: 1
    },
    {
      question: 'Choose the correct meaning of the underlined idiom: The forward outpost was attacked **out of the blue** on a foggy morning.',
      options: [
        { key: 'A', text: 'Completely unexpectedly and without prior warning' },
        { key: 'B', text: 'From the clear blue sky above' },
        { key: 'C', text: 'By aircraft painted blue' },
        { key: 'D', text: 'After days of formal diplomatic warnings' }
      ],
      correctAnswer: 'A',
      explanation: '"Out of the blue" denotes an event that happens suddenly without forewarning.',
      marks: 1
    }
  ]
};

const oneWordSubstitutionTest = {
  module: 'cds',
  section: 'vocabulary',
  subject: 'vocabulary',
  chapterSlug: 'one-word-substitution',
  chapterName: 'One-Word Substitution',
  testId: 'one-word-substitution-test-1',
  testName: 'One-Word Substitution - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'A person who is indifferent to pleasure, pain, joy, or grief is called a/an:',
      options: [
        { key: 'A', text: 'Stoic' },
        { key: 'B', text: 'Epicurean' },
        { key: 'C', text: 'Hedonist' },
        { key: 'D', text: 'Cynic' }
      ],
      correctAnswer: 'A',
      explanation: 'A "stoic" is an individual who endures hardship or suffering without complaint or displaying emotion.',
      marks: 1
    },
    {
      question: 'One who donates time and resources generously to promote human welfare is called a/an:',
      options: [
        { key: 'A', text: 'Philanthropist' },
        { key: 'B', text: 'Misanthrope' },
        { key: 'C', text: 'Misogynist' },
        { key: 'D', text: 'Anarchist' }
      ],
      correctAnswer: 'A',
      explanation: 'A "philanthropist" (from Greek philos + anthropos) is a lover of humanity who promotes social welfare.',
      marks: 1
    },
    {
      question: 'A government by wealthy and privileged elites is termed a/an:',
      options: [
        { key: 'A', text: 'Plutocracy' },
        { key: 'B', text: 'Oligarchy' },
        { key: 'C', text: 'Autocracy' },
        { key: 'D', text: 'Theocracy' }
      ],
      correctAnswer: 'A',
      explanation: '"Plutocracy" denotes governance controlled exclusively by the wealthy class.',
      marks: 1
    },
    {
      question: 'The scientific study of maps, charts, and mapmaking techniques is known as:',
      options: [
        { key: 'A', text: 'Cartography' },
        { key: 'B', text: 'Calligraphy' },
        { key: 'C', text: 'Topography' },
        { key: 'D', text: 'Demography' }
      ],
      correctAnswer: 'A',
      explanation: '"Cartography" is the science and art of drawing maps and nautical charts.',
      marks: 1
    },
    {
      question: 'A state of absolute lawlessness and political disorder due to absence of authority is called:',
      options: [
        { key: 'A', text: 'Anarchy' },
        { key: 'B', text: 'Monarchy' },
        { key: 'C', text: 'Democracy' },
        { key: 'D', text: 'Totalitarianism' }
      ],
      correctAnswer: 'A',
      explanation: '"Anarchy" (from Greek an- + archos) signifies the absence of any recognized government or law.',
      marks: 1
    },
    {
      question: 'An official pardon granted to individuals convicted of political offenses is termed:',
      options: [
        { key: 'A', text: 'Amnesty' },
        { key: 'B', text: 'Acquittal' },
        { key: 'C', text: 'Parole' },
        { key: 'D', text: 'Reprieve' }
      ],
      correctAnswer: 'A',
      explanation: '"Amnesty" is a formal sovereign act of general pardon for political offenses.',
      marks: 1
    },
    {
      question: 'A speech or presentation delivered without any previous preparation is termed:',
      options: [
        { key: 'A', text: 'Extempore' },
        { key: 'B', text: 'Soliloquy' },
        { key: 'C', text: 'Rhetoric' },
        { key: 'D', text: 'Monologue' }
      ],
      correctAnswer: 'A',
      explanation: '"Extempore" (or impromptu) describes a speech made on the spur of the moment without advance preparation.',
      marks: 1
    },
    {
      question: 'One who possesses varied and versatile talents across multiple disciplines is called:',
      options: [
        { key: 'A', text: 'Versatile' },
        { key: 'B', text: 'Pedant' },
        { key: 'C', text: 'Novice' },
        { key: 'D', text: 'Dilettante' }
      ],
      correctAnswer: 'A',
      explanation: '"Versatile" denotes adaptability and proficiency in many different skills or activities.',
      marks: 1
    },
    {
      question: 'A place where government documents and public historical records are preserved is a/an:',
      options: [
        { key: 'A', text: 'Archive' },
        { key: 'B', text: 'Arsenal' },
        { key: 'C', text: 'Museum' },
        { key: 'D', text: 'Sanctuary' }
      ],
      correctAnswer: 'A',
      explanation: 'An "archive" is a dedicated collection of historical records or the physical location where they are stored.',
      marks: 1
    },
    {
      question: 'The murder or killing of a king or sovereign monarch is termed:',
      options: [
        { key: 'A', text: 'Regicide' },
        { key: 'B', text: 'Homicide' },
        { key: 'C', text: 'Patricide' },
        { key: 'D', text: 'Fratricide' }
      ],
      correctAnswer: 'A',
      explanation: '"Regicide" (from Latin rex + caedere) is the deliberate killing of a king.',
      marks: 1
    },
    {
      question: 'A person who hates or distrusts the human race as a whole is a/an:',
      options: [
        { key: 'A', text: 'Misanthrope' },
        { key: 'B', text: 'Philanthropist' },
        { key: 'C', text: 'Altruist' },
        { key: 'D', text: 'Optimist' }
      ],
      correctAnswer: 'A',
      explanation: 'A "misanthrope" is someone who harbors an aversion or hostility toward humanity.',
      marks: 1
    },
    {
      question: 'A sound, signal, or message that cannot be heard is:',
      options: [
        { key: 'A', text: 'Inaudible' },
        { key: 'B', text: 'Incredible' },
        { key: 'C', text: 'Ineligible' },
        { key: 'D', text: 'Imperceptible' }
      ],
      correctAnswer: 'A',
      explanation: '"Inaudible" means incapable of being perceived by the sense of hearing.',
      marks: 1
    },
    {
      question: 'One who is capable of using both hands with equal dexterity and skill is:',
      options: [
        { key: 'A', text: 'Ambidextrous' },
        { key: 'B', text: 'Ambiguous' },
        { key: 'C', text: 'Amphibious' },
        { key: 'D', text: 'Ambivalent' }
      ],
      correctAnswer: 'A',
      explanation: '"Ambidextrous" (from ambi- + dexter) means proficient with both right and left hands equally.',
      marks: 1
    },
    {
      question: 'A disease or epidemic that spreads worldwide across international borders is termed a/an:',
      options: [
        { key: 'A', text: 'Pandemic' },
        { key: 'B', text: 'Endemic' },
        { key: 'C', text: 'Contagion' },
        { key: 'D', text: 'Sporadic' }
      ],
      correctAnswer: 'A',
      explanation: 'A "pandemic" affects an entire country or continent; "endemic" is confined to a local area.',
      marks: 1
    },
    {
      question: 'A person who leaves their native country to settle permanently in another nation is a/an:',
      options: [
        { key: 'A', text: 'Emigrant' },
        { key: 'B', text: 'Immigrant' },
        { key: 'C', text: 'Refugee' },
        { key: 'D', text: 'Exile' }
      ],
      correctAnswer: 'A',
      explanation: 'An "emigrant" leaves one\'s native country; an "immigrant" arrives into a foreign nation to reside.',
      marks: 1
    },
    {
      question: 'The military science of conducting large-scale maneuvers and planning battles is called:',
      options: [
        { key: 'A', text: 'Strategy' },
        { key: 'B', text: 'Drill' },
        { key: 'C', text: 'Reconnaissance' },
        { key: 'D', text: 'Espionage' }
      ],
      correctAnswer: 'A',
      explanation: '"Strategy" is high-level military planning, distinguished from "tactics" (local battlefield actions).',
      marks: 1
    },
    {
      question: 'A remedy or medicine purported to cure all diseases and ailments is a/an:',
      options: [
        { key: 'A', text: 'Panacea' },
        { key: 'B', text: 'Placebo' },
        { key: 'C', text: 'Antidote' },
        { key: 'D', text: 'Antibiotic' }
      ],
      correctAnswer: 'A',
      explanation: 'A "panacea" is a universal remedy or cure-all for all difficulties or diseases.',
      marks: 1
    },
    {
      question: 'A person who consumes only plant-based food and completely avoids meat is a/an:',
      options: [
        { key: 'A', text: 'Herbivore / Vegetarian' },
        { key: 'B', text: 'Carnivore' },
        { key: 'C', text: 'Omnivore' },
        { key: 'D', text: 'Piscivore' }
      ],
      correctAnswer: 'A',
      explanation: '"Herbivore" (for animals) or "Vegetarian" (for humans) denotes a diet based solely on plants.',
      marks: 1
    },
    {
      question: 'An inscription carved on a tombstone in memory of a deceased person is a/an:',
      options: [
        { key: 'A', text: 'Epitaph' },
        { key: 'B', text: 'Epilogue' },
        { key: 'C', text: 'Epithet' },
        { key: 'D', text: 'Epistle' }
      ],
      correctAnswer: 'A',
      explanation: 'An "epitaph" is a phrase or form of words written in memory of a person who has died, especially on a gravestone.',
      marks: 1
    },
    {
      question: 'A military position or fortress that cannot be captured or penetrated is described as:',
      options: [
        { key: 'A', text: 'Impregnable' },
        { key: 'B', text: 'Vulnerable' },
        { key: 'C', text: 'Inaccessible' },
        { key: 'D', text: 'Formidable' }
      ],
      correctAnswer: 'A',
      explanation: '"Impregnable" means unable to be captured or broken into as a result of strength.',
      marks: 1
    }
  ]
};

const spellingMasterTest = {
  module: 'cds',
  section: 'vocabulary',
  subject: 'vocabulary',
  chapterSlug: 'spelling-master',
  chapterName: 'Spelling Master',
  testId: 'spelling-master-test-1',
  testName: 'Spelling Master - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'Select the option with the correct spelling of the administrative term meaning government by officials:',
      options: [
        { key: 'A', text: 'Bureaucracy' },
        { key: 'B', text: 'Burocracy' },
        { key: 'C', text: 'Beurocracy' },
        { key: 'D', text: 'Bureaucrasy' }
      ],
      correctAnswer: 'A',
      explanation: 'The correct orthography is B-U-R-E-A-U-C-R-A-C-Y.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the verb meaning to provide lodging or adapt:',
      options: [
        { key: 'A', text: 'Accommodate' },
        { key: 'B', text: 'Acommodate' },
        { key: 'C', text: 'Accomodate' },
        { key: 'D', text: 'Acomodate' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling has double "c" and double "m": A-C-C-O-M-M-O-D-A-T-E.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the word signifying self-conscious distress or awkwardness:',
      options: [
        { key: 'A', text: 'Embarrassment' },
        { key: 'B', text: 'Embarassment' },
        { key: 'C', text: 'Embarasment' },
        { key: 'D', text: 'Emberrassment' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling has double "r" and double "s": E-M-B-A-R-R-A-S-S-M-E-N-T.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the adjective describing a playful or teasing nature:',
      options: [
        { key: 'A', text: 'Mischievous' },
        { key: 'B', text: 'Mischievious' },
        { key: 'C', text: 'Mischevous' },
        { key: 'D', text: 'Mischievus' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling is M-I-S-C-H-I-E-V-O-U-S (no "i" after "v").',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the military term for preliminary survey or scouting:',
      options: [
        { key: 'A', text: 'Reconnaissance' },
        { key: 'B', text: 'Reconaisance' },
        { key: 'C', text: 'Reconnoissance' },
        { key: 'D', text: 'Reconnaissancee' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct military spelling is R-E-C-O-N-N-A-I-S-S-A-N-C-E (double "n" and double "s").',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the junior commissioned officer military rank:',
      options: [
        { key: 'A', text: 'Lieutenant' },
        { key: 'B', text: 'Leutenant' },
        { key: 'C', text: 'Lieutenent' },
        { key: 'D', text: 'Lieutanant' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling is L-I-E-U-T-E-N-A-N-T.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the term referring to a period of one thousand years:',
      options: [
        { key: 'A', text: 'Millennium' },
        { key: 'B', text: 'Millenium' },
        { key: 'C', text: 'Milenium' },
        { key: 'D', text: 'Milennium' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling has double "l" and double "n": M-I-L-L-E-N-N-I-U-M.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the noun denoting a special right, immunity, or advantage:',
      options: [
        { key: 'A', text: 'Privilege' },
        { key: 'B', text: 'Priviledge' },
        { key: 'C', text: 'Privelege' },
        { key: 'D', text: 'Privelidge' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling is P-R-I-V-I-L-E-G-E (no "d").',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the noun denoting close observation of a suspect or area:',
      options: [
        { key: 'A', text: 'Surveillance' },
        { key: 'B', text: 'Surveilance' },
        { key: 'C', text: 'Survalience' },
        { key: 'D', text: 'Surveillence' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling is S-U-R-V-E-I-L-L-A-N-C-E (double "l" followed by "-ance").',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the noun denoting the process of preserving or supporting something:',
      options: [
        { key: 'A', text: 'Maintenance' },
        { key: 'B', text: 'Maintainance' },
        { key: 'C', text: 'Maintenence' },
        { key: 'D', text: 'Maintanance' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling is M-A-I-N-T-E-N-A-N-C-E (derived from maintain, but spelled "ten-ance").',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the word denoting dividing, parting, or existing distinct from others:',
      options: [
        { key: 'A', text: 'Separate' },
        { key: 'B', text: 'Seperate' },
        { key: 'C', text: 'Sepparate' },
        { key: 'D', text: 'Seprate' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling is S-E-P-A-R-A-T-E (with "par" in the middle, not "per").',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the noun denoting an incident, event, or happening:',
      options: [
        { key: 'A', text: 'Occurrence' },
        { key: 'B', text: 'Occurence' },
        { key: 'C', text: 'Ocurrence' },
        { key: 'D', text: 'Occurrance' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling has double "c", double "r", and ends in "-ence": O-C-C-U-R-R-E-N-C-E.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the adjective meaning easily seen or attracting attention:',
      options: [
        { key: 'A', text: 'Noticeable' },
        { key: 'B', text: 'Noticable' },
        { key: 'C', text: 'Noticeble' },
        { key: 'D', text: 'Noticible' }
      ],
      correctAnswer: 'A',
      explanation: 'Retains the silent "e" to preserve the soft "c" sound: N-O-T-I-C-E-A-B-L-E.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the adjective describing someone guided by duty and thorough care:',
      options: [
        { key: 'A', text: 'Conscientious' },
        { key: 'B', text: 'Conscentious' },
        { key: 'C', text: 'Consciencious' },
        { key: 'D', text: 'Conscientuous' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling is C-O-N-S-C-I-E-N-T-I-O-U-S.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the noun signifying steadfast persistence in the face of obstacles:',
      options: [
        { key: 'A', text: 'Perseverance' },
        { key: 'B', text: 'Perseverence' },
        { key: 'C', text: 'Perserverance' },
        { key: 'D', text: 'Persevearance' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling is P-E-R-S-E-V-E-R-A-N-C-E.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the noun meaning persistent annoyance, pressure, or intimidation:',
      options: [
        { key: 'A', text: 'Harassment' },
        { key: 'B', text: 'Harrassment' },
        { key: 'C', text: 'Harrassmant' },
        { key: 'D', text: 'Harassmant' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct British English spelling has single "r" and double "s": H-A-R-A-S-S-M-E-N-T.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the verb meaning to represent something beyond the truth or reality:',
      options: [
        { key: 'A', text: 'Exaggerate' },
        { key: 'B', text: 'Exagerate' },
        { key: 'C', text: 'Exagerrate' },
        { key: 'D', text: 'Exaggerite' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling has double "g": E-X-A-G-G-E-R-A-T-E.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the noun denoting an associate or fellow worker in a profession:',
      options: [
        { key: 'A', text: 'Colleague' },
        { key: 'B', text: 'Coleague' },
        { key: 'C', text: 'Collaegue' },
        { key: 'D', text: 'Collegue' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling is C-O-L-L-E-A-G-U-E.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the noun describing a system where members are ranked by status or authority:',
      options: [
        { key: 'A', text: 'Hierarchy' },
        { key: 'B', text: 'Heirarchy' },
        { key: 'C', text: 'Hierarcy' },
        { key: 'D', text: 'Hirarchy' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling begins with "hie": H-I-E-R-A-R-C-H-Y.',
      marks: 1
    },
    {
      question: 'Select the option with the correct spelling of the political term denoting supreme power, autonomy, or authority:',
      options: [
        { key: 'A', text: 'Sovereignty' },
        { key: 'B', text: 'Soverignty' },
        { key: 'C', text: 'Sovereinty' },
        { key: 'D', text: 'Sovreignty' }
      ],
      correctAnswer: 'A',
      explanation: 'Correct spelling is S-O-V-E-R-E-I-G-N-T-Y.',
      marks: 1
    }
  ]
};

const clozeCompositionTest = {
  module: 'cds',
  section: 'vocabulary',
  subject: 'vocabulary',
  chapterSlug: 'cloze-composition',
  chapterName: 'Cloze Composition',
  testId: 'cloze-composition-test-1',
  testName: 'Cloze Composition - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'The military expedition into the remote mountainous region was fraught [1] unpredictable logistical challenges.',
      options: [
        { key: 'A', text: 'with' },
        { key: 'B', text: 'of' },
        { key: 'C', text: 'by' },
        { key: 'D', text: 'at' }
      ],
      correctAnswer: 'A',
      explanation: 'The adjective "fraught" strictly takes the preposition "with" (fraught with danger/challenges).',
      marks: 1
    },
    {
      question: 'The soldiers had to endure freezing temperatures and [2] blizzards that impeded all movement.',
      options: [
        { key: 'A', text: 'relentless' },
        { key: 'B', text: 'moderate' },
        { key: 'C', text: 'intermittent' },
        { key: 'D', text: 'sporadic' }
      ],
      correctAnswer: 'A',
      explanation: '"Relentless" describes harsh, unyielding weather conditions that continually obstruct progress.',
      marks: 1
    },
    {
      question: 'Despite these extreme adversities, morale within the battalion [3] remarkably high.',
      options: [
        { key: 'A', text: 'remained' },
        { key: 'B', text: 'departed' },
        { key: 'C', text: 'diminished' },
        { key: 'D', text: 'faltered' }
      ],
      correctAnswer: 'A',
      explanation: '"Remained" indicates continuation of high morale despite the difficulties mentioned.',
      marks: 1
    },
    {
      question: 'The commanding officer emphasized the absolute necessity of maintaining [4] surveillance along the frontier.',
      options: [
        { key: 'A', text: 'vigilant' },
        { key: 'B', text: 'careless' },
        { key: 'C', text: 'occasional' },
        { key: 'D', text: 'nominal' }
      ],
      correctAnswer: 'A',
      explanation: '"Vigilant" surveillance is the exact military standard required for frontier security.',
      marks: 1
    },
    {
      question: 'Every soldier was instructed to report any unusual movement to headquarters [5] delay.',
      options: [
        { key: 'A', text: 'without' },
        { key: 'B', text: 'with' },
        { key: 'C', text: 'for' },
        { key: 'D', text: 'under' }
      ],
      correctAnswer: 'A',
      explanation: '"Without delay" is the standard idiomatic adverbial phrase denoting immediate action.',
      marks: 1
    },
    {
      question: 'Communication across the valley was maintained using [6] radio frequencies to thwart eavesdropping.',
      options: [
        { key: 'A', text: 'encrypted' },
        { key: 'B', text: 'public' },
        { key: 'C', text: 'distorted' },
        { key: 'D', text: 'unsecured' }
      ],
      correctAnswer: 'A',
      explanation: '"Encrypted" frequencies ensure signals security against hostile interception.',
      marks: 1
    },
    {
      question: 'The engineering unit constructed a reinforced bunker designed to [7] direct mortar impacts.',
      options: [
        { key: 'A', text: 'withstand' },
        { key: 'B', text: 'surrender' },
        { key: 'C', text: 'succumb' },
        { key: 'D', text: 'collapse' }
      ],
      correctAnswer: 'A',
      explanation: '"Withstand" means to resist or endure physical impact without giving way.',
      marks: 1
    },
    {
      question: 'Tactical air support was kept on continuous alert to [8] prompt assistance if required.',
      options: [
        { key: 'A', text: 'render' },
        { key: 'B', text: 'withhold' },
        { key: 'C', text: 'deprive' },
        { key: 'D', text: 'prevent' }
      ],
      correctAnswer: 'A',
      explanation: 'To "render assistance" is the standard formal collocation meaning to provide aid.',
      marks: 1
    },
    {
      question: 'The medical officers conducted daily health screenings to [9] outbreaks of high-altitude sickness.',
      options: [
        { key: 'A', text: 'avert' },
        { key: 'B', text: 'encourage' },
        { key: 'C', text: 'provoke' },
        { key: 'D', text: 'overlook' }
      ],
      correctAnswer: 'A',
      explanation: '"Avert" means to prevent an undesirable event from occurring.',
      marks: 1
    },
    {
      question: 'Strict adherence to discipline was deemed [10] to the success of the mission.',
      options: [
        { key: 'A', text: 'integral' },
        { key: 'B', text: 'irrelevant' },
        { key: 'C', text: 'superfluous' },
        { key: 'D', text: 'detrimental' }
      ],
      correctAnswer: 'A',
      explanation: '"Integral" means essential or fundamental to the mission.',
      marks: 1
    },
    {
      question: 'At dusk, the forward reconnaissance squad [11] contact with a concealed defensive bunker.',
      options: [
        { key: 'A', text: 'established' },
        { key: 'B', text: 'disrupted' },
        { key: 'C', text: 'severed' },
        { key: 'D', text: 'lost' }
      ],
      correctAnswer: 'A',
      explanation: '"Established contact" is the standard phrase for making verified visual or radio connection.',
      marks: 1
    },
    {
      question: 'The squad leader moved forward quietly to [12] the enemy position more accurately.',
      options: [
        { key: 'A', text: 'assess' },
        { key: 'B', text: 'dismiss' },
        { key: 'C', text: 'ignore' },
        { key: 'D', text: 'magnify' }
      ],
      correctAnswer: 'A',
      explanation: '"Assess" means to evaluate or gauge the strength and disposition of a position.',
      marks: 1
    },
    {
      question: 'He noticed that the adversary had installed barbed wire along the [13] approaches.',
      options: [
        { key: 'A', text: 'vulnerable' },
        { key: 'B', text: 'impregnable' },
        { key: 'C', text: 'secure' },
        { key: 'D', text: 'remote' }
      ],
      correctAnswer: 'A',
      explanation: 'Defenses are placed along "vulnerable" avenues of approach.',
      marks: 1
    },
    {
      question: 'Realizing that an overt assault would cause heavy casualties, he opted for a [14] flank maneuver.',
      options: [
        { key: 'A', text: 'stealthy' },
        { key: 'B', text: 'blatant' },
        { key: 'C', text: 'boisterous' },
        { key: 'D', text: 'chaotic' }
      ],
      correctAnswer: 'A',
      explanation: '"Stealthy" contrasts directly with "overt assault", highlighting covert tactical movement.',
      marks: 1
    },
    {
      question: 'The patrol moved silently through the dense undergrowth, [15] by the darkness of the new moon.',
      options: [
        { key: 'A', text: 'shrouded' },
        { key: 'B', text: 'exposed' },
        { key: 'C', text: 'blinded' },
        { key: 'D', text: 'detected' }
      ],
      correctAnswer: 'A',
      explanation: '"Shrouded" means covered or concealed by darkness.',
      marks: 1
    },
    {
      question: 'Within minutes, the team had surrounded the target [16] raising any alarm.',
      options: [
        { key: 'A', text: 'without' },
        { key: 'B', text: 'by' },
        { key: 'C', text: 'for' },
        { key: 'D', text: 'in' }
      ],
      correctAnswer: 'A',
      explanation: '"Without raising any alarm" conveys successful stealth infiltration.',
      marks: 1
    },
    {
      question: 'The decisive operation resulted in the [17] of vital intelligence documents and codebooks.',
      options: [
        { key: 'A', text: 'recovery' },
        { key: 'B', text: 'destruction' },
        { key: 'C', text: 'loss' },
        { key: 'D', text: 'leakage' }
      ],
      correctAnswer: 'A',
      explanation: '"Recovery" indicates successfully securing valuable intelligence materials.',
      marks: 1
    },
    {
      question: 'Headquarters praised the squad for their [18] execution of the raid.',
      options: [
        { key: 'A', text: 'flawless' },
        { key: 'B', text: 'clumsy' },
        { key: 'C', text: 'hasty' },
        { key: 'D', text: 'tardy' }
      ],
      correctAnswer: 'A',
      explanation: 'Praise from headquarters naturally matches "flawless" execution.',
      marks: 1
    },
    {
      question: 'The captured intelligence provided [19] insights into future adversary battle plans.',
      options: [
        { key: 'A', text: 'invaluable' },
        { key: 'B', text: 'worthless' },
        { key: 'C', text: 'trivial' },
        { key: 'D', text: 'redundant' }
      ],
      correctAnswer: 'A',
      explanation: '"Invaluable" means extremely useful and crucial.',
      marks: 1
    },
    {
      question: 'Such tactical successes demonstrate that preparation and bravery remain the [20] of military excellence.',
      options: [
        { key: 'A', text: 'hallmark' },
        { key: 'B', text: 'obstacle' },
        { key: 'C', text: 'byproduct' },
        { key: 'D', text: 'exception' }
      ],
      correctAnswer: 'A',
      explanation: '"Hallmark" denotes a distinctive feature of excellence or quality.',
      marks: 1
    }
  ]
};

const wordUsageTest = {
  module: 'cds',
  section: 'vocabulary',
  subject: 'vocabulary',
  chapterSlug: 'word-usage',
  chapterName: 'Word Usage & Confusing Words',
  testId: 'word-usage-test-1',
  testName: 'Word Usage - Test 1',
  testNumber: 1,
  questions: [
    {
      question: 'Choose the sentence where the word **AFFECT** is used correctly:',
      options: [
        { key: 'A', text: 'The sudden altitude change did not affect the stamina of the trained troops.' },
        { key: 'B', text: 'The new military policy had an immediate affect on border trade.' },
        { key: 'C', text: 'He studied the psychological affects of prolonged combat isolation.' },
        { key: 'D', text: 'What affect did the general\'s speech have on regimental morale?' }
      ],
      correctAnswer: 'A',
      explanation: '"Affect" functions as a verb meaning to influence or alter; in the other options, the noun "effect" is required.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **COMPLEMENT** is used correctly:',
      options: [
        { key: 'A', text: 'The naval radar system is an indispensable complement to satellite surveillance.' },
        { key: 'B', text: 'The general gave him a gracious complement on his physical endurance.' },
        { key: 'C', text: 'She paid him a high complement after the tactical parade.' },
        { key: 'D', text: 'I received many complements on my academic achievements.' }
      ],
      correctAnswer: 'A',
      explanation: '"Complement" (with an e) means something that completes or brings to perfection; "compliment" (with an i) is praise.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **PRINCIPAL** is used correctly:',
      options: [
        { key: 'A', text: 'Unimpeded sea navigation is the principal objective of the naval patrol.' },
        { key: 'B', text: 'He refused to compromise his moral principals under interrogation.' },
        { key: 'C', text: 'The fundamental principals of aerodynamics govern supersonic flight.' },
        { key: 'D', text: 'Discipline is one of the core principals of military training.' }
      ],
      correctAnswer: 'A',
      explanation: '"Principal" means primary or chief; "principle" means a fundamental truth or moral rule.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **EMINENT** is used correctly:',
      options: [
        { key: 'A', text: 'The lecture was delivered by an eminent defense strategist.' },
        { key: 'B', text: 'A heavy artillery bombardment was eminent within the next hour.' },
        { key: 'C', text: 'The danger of flash floods in the ravine is eminent.' },
        { key: 'D', text: 'They evacuated the base due to an eminent storm.' }
      ],
      correctAnswer: 'A',
      explanation: '"Eminent" means famous and respected; "imminent" means about to happen immediately.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **STATIONARY** is used correctly:',
      options: [
        { key: 'A', text: 'The convoy remained stationary until the minefield was cleared.' },
        { key: 'B', text: 'The clerk ordered fresh stationary for the headquarters office.' },
        { key: 'C', text: 'He wrote the official dispatch on official military stationary.' },
        { key: 'D', text: 'The envelope was made of high-quality embossed stationary.' }
      ],
      correctAnswer: 'A',
      explanation: '"Stationary" (with an a) means unmoving or in a fixed position; "stationery" (with an e) refers to writing materials.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **JUDICIOUS** is used correctly:',
      options: [
        { key: 'A', text: 'The commander made a judicious allocation of reserve troops.' },
        { key: 'B', text: 'The judicial case was tried in the regimental court.' },
        { key: 'C', text: 'The judicious magistrate sentenced the offender.' },
        { key: 'D', text: 'He filed a judicious petition before the high court.' }
      ],
      correctAnswer: 'A',
      explanation: '"Judicious" means showing good judgment or prudence; "judicial" relates to the administration of justice.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **ALLUSION** is used correctly:',
      options: [
        { key: 'A', text: 'The speaker made a subtle allusion to the historic Battle of Longewala.' },
        { key: 'B', text: 'Mirages in the desert create an optical allusion.' },
        { key: 'C', text: 'The camouflage created an allusion of dense jungle vegetation.' },
        { key: 'D', text: 'He suffered from the grand allusion that he could never be defeated.' }
      ],
      correctAnswer: 'A',
      explanation: '"Allusion" is an indirect literary or historical reference; "illusion" is a deceptive appearance.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **ELICIT** is used correctly:',
      options: [
        { key: 'A', text: 'The interrogators sought to elicit crucial tactical intelligence.' },
        { key: 'B', text: 'The trafficking of elicit narcotics across the border was intercepted.' },
        { key: 'C', text: 'He was convicted for running an elicit armory.' },
        { key: 'D', text: 'They uncovered an elicit subterranean supply tunnel.' }
      ],
      correctAnswer: 'A',
      explanation: '"Elicit" is a verb meaning to draw out a response or facts; "illicit" is an adjective meaning illegal.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **APPRAISE** is used correctly:',
      options: [
        { key: 'A', text: 'The board will appraise the operational performance of all squadrons.' },
        { key: 'B', text: 'The general took time to appraise the troops of the tactical changes.' },
        { key: 'C', text: 'He appraised me that the enemy was advancing rapidly.' },
        { key: 'D', text: 'Please appraise headquarters regarding the border ceasefire.' }
      ],
      correctAnswer: 'A',
      explanation: '"Appraise" means to assess the value or quality of something; "apprise" means to inform or notify.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **DISINTERESTED** is used correctly:',
      options: [
        { key: 'A', text: 'A neutral arbiter must remain completely disinterested in the outcome.' },
        { key: 'B', text: 'The student was bored and disinterested in military history.' },
        { key: 'C', text: 'He yawned because he was disinterested in the long lecture.' },
        { key: 'D', text: 'The lazy cadet was thoroughly disinterested in physical training.' }
      ],
      correctAnswer: 'A',
      explanation: '"Disinterested" means impartial and unbiased; "uninterested" means lacking interest or bored.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **COUNCIL** is used correctly:',
      options: [
        { key: 'A', text: 'The national security council convened an emergency conference.' },
        { key: 'B', text: 'He sought legal council before answering the court martial inquiries.' },
        { key: 'C', text: 'The veteran gave him wise council regarding mountain survival.' },
        { key: 'D', text: 'She acted as chief defense council for the accused officer.' }
      ],
      correctAnswer: 'A',
      explanation: '"Council" is an administrative advisory body; "counsel" refers to advice or legal attorney.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **CONTINUOUS** is used correctly:',
      options: [
        { key: 'A', text: 'The radar station emitted a continuous electronic beacon without pause.' },
        { key: 'B', text: 'His continuous interruptions disrupted the regimental briefing.' },
        { key: 'C', text: 'The telephone rang on a continuous basis throughout the busy day.' },
        { key: 'D', text: 'There were continuous pauses between the mortar salvos.' }
      ],
      correctAnswer: 'A',
      explanation: '"Continuous" means unbroken without interruption; "continual" means recurring at frequent intervals.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **CREDIBLE** is used correctly:',
      options: [
        { key: 'A', text: 'The reconnaissance patrol gathered credible evidence of border buildup.' },
        { key: 'B', text: 'He is so credible that he believes every rumor he hears.' },
        { key: 'C', text: 'Only a credible child would believe that mythical folklore.' },
        { key: 'D', text: 'The naive recruit was far too credible for counter-intelligence work.' }
      ],
      correctAnswer: 'A',
      explanation: '"Credible" means believable or convincing; "credulous" means gullible or easily fooled.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **SENSIBLE** is used correctly:',
      options: [
        { key: 'A', text: 'The commander took a sensible decision to hold the high ground.' },
        { key: 'B', text: 'Thermal cameras are highly sensible to minute heat differentials.' },
        { key: 'C', text: 'The wound was extremely sensible to cold water.' },
        { key: 'D', text: 'He has very sensible skin that burns quickly in the desert sun.' }
      ],
      correctAnswer: 'A',
      explanation: '"Sensible" means wise, prudent, and practical; "sensitive" means easily affected or responsive to stimuli.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **INGENIOUS** is used correctly:',
      options: [
        { key: 'A', text: 'The engineer devised an ingenious method to repair the suspension bridge.' },
        { key: 'B', text: 'The young recruit was so ingenious that he trusted the enemy defector.' },
        { key: 'C', text: 'Her ingenious nature made her oblivious to political intrigue.' },
        { key: 'D', text: 'An ingenious child is innocent and unsuspecting.' }
      ],
      correctAnswer: 'A',
      explanation: '"Ingenious" means clever and inventive; "ingenuous" means naive, candid, and innocent.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **DECENT** is used correctly:',
      options: [
        { key: 'A', text: 'The soldiers were provided with decent rations and clean lodging.' },
        { key: 'B', text: 'The dangerous decent down the cliff face took several hours.' },
        { key: 'C', text: 'Several opposition delegates voiced strong decent to the treaty.' },
        { key: 'D', text: 'The aircraft began its final decent towards the runway.' }
      ],
      correctAnswer: 'A',
      explanation: '"Decent" means respectable or satisfactory; "descent" is downward movement; "dissent" is disagreement.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **TEMPORARY** is used correctly:',
      options: [
        { key: 'A', text: 'The engineering unit erected a temporary pontoon bridge across the river.' },
        { key: 'B', text: 'He is a temporary writer of twenty-first-century prose.' },
        { key: 'C', text: 'Mahatma Gandhi and Churchill were temporary historical figures.' },
        { key: 'D', text: 'The two artists shared temporary studios in London.' }
      ],
      correctAnswer: 'A',
      explanation: '"Temporary" means lasting for a limited time; "contemporary" means living or occurring at the same period.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **CENSURE** is used correctly:',
      options: [
        { key: 'A', text: 'The officer faced severe parliamentary censure for violating protocol.' },
        { key: 'B', text: 'The military censures prohibited the publication of troop movements.' },
        { key: 'C', text: 'Government censures edited the battlefield news footage.' },
        { key: 'D', text: 'The national censures monitors all incoming telegrams.' }
      ],
      correctAnswer: 'A',
      explanation: '"Censure" means formal reprimand or severe disapproval; "censor" refers to suppression of objectionable matter.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **OFFICIAL** is used correctly:',
      options: [
        { key: 'A', text: 'The general released an official communiqué regarding the ceasefire.' },
        { key: 'B', text: 'The sentry was annoyed by the official clerk who meddled in patrol orders.' },
        { key: 'C', text: 'He was an official busybody offering unwanted tactical advice.' },
        { key: 'D', text: 'Stop being so official and mind your own business.' }
      ],
      correctAnswer: 'A',
      explanation: '"Official" means authorized or formal; "officious" means meddlesome or domineering.',
      marks: 1
    },
    {
      question: 'Choose the sentence where the word **ADVERSE** is used correctly:',
      options: [
        { key: 'A', text: 'The mission was aborted due to adverse weather conditions in the pass.' },
        { key: 'B', text: 'The commander is strongly adverse to unnecessary tactical risks.' },
        { key: 'C', text: 'I am not adverse to negotiating with diplomatic envoys.' },
        { key: 'D', text: 'He was adverse to signing the proposed disarmament pact.' }
      ],
      correctAnswer: 'A',
      explanation: '"Adverse" means hostile, unfavorable, or harmful; "averse" (usually followed by "to") means disinclined or reluctant.',
      marks: 1
    }
  ]
};

module.exports = [
  synAntTest,
  idiomsPhrasesTest,
  oneWordSubstitutionTest,
  spellingMasterTest,
  clozeCompositionTest,
  wordUsageTest
];
