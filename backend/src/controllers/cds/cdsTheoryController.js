// ============================================================
// PREORBIT — CDS Theory Controller
// ============================================================

const cdsTheoryBank = require('../../data/cdsTheoryContent');
const { sendSuccess, sendError } = require('../../utils/response');

function formatChapterTitle(slug) {
  if (!slug) return 'Chapter Theory';
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

exports.getChapterTheory = async (req, res, next) => {
  try {
    const { section, chapterSlug } = req.params;

    if (!section || !chapterSlug) {
      return sendError(res, 400, 'Section and chapterSlug are required');
    }

    const cleanSlug = chapterSlug.toLowerCase().trim();
    const cleanSection = section.toLowerCase().trim();

    // Check pre-configured theory content
    const existingTheory = cdsTheoryBank[cleanSlug];
    if (existingTheory && existingTheory.section === cleanSection) {
      return sendSuccess(res, 200, 'Chapter theory retrieved successfully', {
        theory: existingTheory
      });
    }

    // Dynamic curriculum template for any other valid CDS English chapter
    const title = formatChapterTitle(cleanSlug);
    const dynamicTheory = {
      title,
      section: cleanSection,
      chapterSlug: cleanSlug,
      overview: `${title} is a core component of the CDS English curriculum. Master the foundational rules, structural patterns, and application strategies to maximize your score.`,
      coreRules: [
        `Understand the fundamental grammatical and contextual principles governing ${title}.`,
        'Identify key structural markers and syntactical patterns in sentence formation.',
        'Apply elimination strategies for options that violate standard English usage or UPSC question conventions.'
      ],
      exceptions: [
        'Pay special attention to irregular forms, archaic exceptions, and idiomatic subtleties.',
        'Beware of false cognates and context-dependent shifts in meaning.'
      ],
      examExamples: [
        {
          question: `Representative CDS examination question for ${title}.`,
          correctAnswer: 'A',
          explanation: 'Demonstrates correct grammatical application according to UPSC standard guidelines.'
        }
      ],
      commonTraps: [
        'Assuming colloquial spoken English is acceptable in formal examination syntax.',
        'Rushing through answer options without reading all choices.'
      ],
      summary: `Consistently apply the core rules for ${title}. Review key patterns and practice targeted mock questions to build speed and accuracy.`
    };

    return sendSuccess(res, 200, 'Chapter theory retrieved successfully', {
      theory: dynamicTheory
    });
  } catch (error) {
    next(error);
  }
};
