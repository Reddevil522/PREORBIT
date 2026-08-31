// ============================================================
// PREORBIT — Seed Global Career Links (v2)
// ============================================================
// Seeds all 26 curated internship / hackathon opportunities
// from internship-programs.pdf as isGlobal: true entries.
//
// Usage:
//   cd backend
//   node src/scripts/seedGlobalCareerLinks.js
//
// Safe to re-run:
//   - New entries    → inserted via $setOnInsert
//   - Existing entries → sortOrder is always updated via $set
//     so that calendar re-ordering takes effect immediately.
// ============================================================

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const mongoose = require('mongoose');
const CareerLink = require('../models/CareerLink');

// ── 26 Opportunities — sorted chronologically Jan → Dec ─────
// sortOrder: integer 1–26, based on FIRST month of tentativeMonth.
//   Jan=1xx, Feb=2xx, Mar=3xx, Apr=4xx, May=5xx,
//   Jun=6xx, Jul=7xx, Aug=8xx, Sep=9xx, Oct=10xx, Nov=11xx, Dec=12xx
// Within the same month, relative order preserved from PDF.
// ────────────────────────────────────────────────────────────
const GLOBAL_OPPORTUNITIES = [

  // ── January (Jan–Feb) ───────────────────────────────────────
  {
    sortOrder: 1,
    companyName: 'Companies x Google',
    jobTitle: 'Google Summer of Code (GSoC)',
    tentativeMonth: 'Jan–Feb',
    quarter: 'Q4',
    url: 'https://summerofcode.withgoogle.com',
    category: 'Internship',
    notes: 'Google Summer of Code (GSoC) — global program connecting students with open source organizations. Paid stipend for contributing to OSS projects over summer.',
  },
  {
    sortOrder: 2,
    companyName: 'MLH Fellowship',
    jobTitle: 'MLH Fellowship',
    tentativeMonth: 'Jan–Feb',
    quarter: 'Q4',
    url: 'https://fellowship.mlh.io',
    category: 'Internship',
    notes: 'MLH Fellowship — 12-week remote internship alternative where students contribute to open source projects and build portfolio-worthy work.',
  },
  {
    sortOrder: 3,
    companyName: 'Microsoft',
    jobTitle: 'Microsoft Research',
    tentativeMonth: 'Jan–Feb',
    quarter: 'Q4',
    url: 'https://www.microsoft.com/en-us/research/academic-programs',
    category: 'Internship',
    notes: 'Microsoft Research Internship — research internships across AI, systems, theory, and applied sciences. Open to undergraduate and graduate students.',
  },

  // ── February (Feb–Mar) ──────────────────────────────────────
  {
    sortOrder: 4,
    companyName: 'Google',
    jobTitle: 'Google Student Researcher Program',
    tentativeMonth: 'Feb–Mar',
    quarter: 'Q4',
    url: 'https://research.google/outreach/student-researcher-program',
    category: 'Internship',
    notes: 'Google Student Researcher Program — part-time, academic year research program for undergrad and grad students to work with Google Research teams.',
  },
  {
    sortOrder: 5,
    companyName: 'TCS',
    jobTitle: 'TCS Research Internship',
    tentativeMonth: 'Feb–Mar',
    quarter: 'Q4',
    url: 'https://www.tcs.com/careers/india/tcs-research-academic-internship',
    category: 'Internship',
    notes: 'TCS Research & Innovation Internship — research internship program for students to work on applied research problems with TCS scientists.',
  },

  // ── March (Mar–Apr) ─────────────────────────────────────────
  {
    sortOrder: 6,
    companyName: 'Companies x Govt. of India',
    jobTitle: 'PM Internship Scheme',
    tentativeMonth: 'Mar–Apr',
    quarter: 'Q4',
    url: 'https://pminternship.mca.gov.in',
    category: 'Internship',
    notes: 'PM Internship Scheme — Government of India initiative providing internships to youth in top companies. Includes monthly stipend and certificate.',
  },

  // ── April (Apr–May) ─────────────────────────────────────────
  {
    sortOrder: 7,
    companyName: 'DRDO',
    jobTitle: 'DRDO Student Project Training',
    tentativeMonth: 'Apr–May',
    quarter: 'Q1',
    url: 'https://www.drdo.gov.in/apprenticeship-training',
    category: 'Internship',
    notes: 'DRDO Student Project Training — Defence Research & Development Organisation offers project training to engineering and science students at DRDO labs.',
  },
  {
    sortOrder: 8,
    companyName: 'DoS / ISRO',
    jobTitle: 'DoS / ISRO Student Project Training',
    tentativeMonth: 'Apr–May',
    quarter: 'Q1',
    url: 'https://www.isro.gov.in/InternShipTraining.html',
    category: 'Internship',
    notes: 'DoS / ISRO Student Project Training — Department of Space / ISRO training program for engineering and science students at ISRO centres.',
  },

  // ── May (May–Jun) ───────────────────────────────────────────
  {
    sortOrder: 9,
    companyName: 'Dept. of Telecommunications',
    jobTitle: '5G Innovation Hackathon',
    tentativeMonth: 'May–Jun',
    quarter: 'Q1',
    url: 'https://dot.gov.in/5g-hackathon',
    category: 'Other',
    notes: "Dept. of Telecommunications 5G Innovation Hackathon — government-backed hackathon inviting students to build innovative use cases on India's 5G network.",
  },
  {
    sortOrder: 10,
    companyName: 'Govt. of India',
    jobTitle: 'Digital India Internship',
    tentativeMonth: 'May–Jun',
    quarter: 'Q1',
    url: 'https://internship.aicte-india.org',
    category: 'Internship',
    notes: 'Digital India Internship — internship opportunities under various Govt. of India ministries and departments as part of the Digital India initiative.',
  },

  // ── August (Aug–Sep) ────────────────────────────────────────
  {
    sortOrder: 11,
    companyName: 'Microsoft',
    jobTitle: 'Microsoft Explore Internship',
    tentativeMonth: 'Aug–Sep',
    quarter: 'Q2',
    url: 'https://apply.careers.microsoft.com/careers',
    category: 'Internship',
    notes: 'Microsoft Explore Internship — for pre-final year students. Covers software engineering, product management, and hardware engineering roles.',
  },

  // ── September (Sep–Oct) ─────────────────────────────────────
  {
    sortOrder: 12,
    companyName: 'Cisco',
    jobTitle: 'Cisco Ideathon',
    tentativeMonth: 'Sep–Oct',
    quarter: 'Q2',
    url: 'https://ideathon.cisco.com',
    category: 'Internship',
    notes: 'Cisco Ideathon — innovation hackathon for engineering students. Teams propose solutions to real-world networking and tech problems.',
  },
  {
    sortOrder: 13,
    companyName: 'Flipkart',
    jobTitle: 'Flipkart GriD',
    tentativeMonth: 'Sep–Oct',
    quarter: 'Q2',
    url: 'https://unstop.com/p/grid-60-flipkart-1177270',
    category: 'Internship',
    notes: 'Flipkart GriD — annual engineering campus challenge by Flipkart. Covers software development, data engineering, and ML tracks.',
  },
  {
    sortOrder: 14,
    companyName: 'JP Morgan',
    jobTitle: 'Code for Good',
    tentativeMonth: 'Sep–Oct',
    quarter: 'Q2',
    url: 'https://careers.jpmorgan.com/us/en/students/programs/code-for-good',
    category: 'Internship',
    notes: 'JP Morgan Code for Good — 24-hour hackathon where students build tech solutions for non-profit organizations.',
  },
  {
    sortOrder: 15,
    companyName: 'Amazon',
    jobTitle: 'Hackon with Amazon',
    tentativeMonth: 'Sep–Oct',
    quarter: 'Q2',
    url: 'https://unstop.com/hackathons/hackon-with-amazon-season-5-amazon-india-1074093',
    category: 'Internship',
    notes: "Hackon with Amazon — Amazon's annual hackathon for students. Build innovative solutions using AWS and Amazon technologies.",
  },
  {
    sortOrder: 16,
    companyName: 'Infosys',
    jobTitle: 'Infosys INSTEP',
    tentativeMonth: 'Sep–Oct',
    quarter: 'Q2',
    url: 'https://www.infosys.com/instep',
    category: 'Internship',
    notes: 'Infosys INSTEP — global internship program for students from top universities worldwide. Work on live projects across technology domains.',
  },

  // ── October (Oct–Nov) ───────────────────────────────────────
  {
    sortOrder: 17,
    companyName: 'Google',
    jobTitle: 'Google STEP Internship',
    tentativeMonth: 'Oct–Nov',
    quarter: 'Q3',
    url: 'https://buildyourfuture.withgoogle.com/programs/step',
    category: 'Internship',
    notes: 'Google STEP (Student Training in Engineering Program) — internship for first and second year undergrad students underrepresented in tech.',
  },
  {
    sortOrder: 18,
    companyName: 'Juspay',
    jobTitle: 'Juspay Hiring Challenge',
    tentativeMonth: 'Oct–Nov',
    quarter: 'Q3',
    url: 'https://unstop.com/jobs/juspay-hiring-challenge',
    category: 'Internship',
    notes: "Juspay Hiring Challenge — coding competition for internship and full-time roles at Juspay, India's leading payments tech company.",
  },
  {
    sortOrder: 19,
    companyName: 'Accenture',
    jobTitle: 'Tech Next Challenge',
    tentativeMonth: 'Oct–Nov',
    quarter: 'Q3',
    url: 'https://www.accenture.com/in-en/careers/local/tech-next-challenge',
    category: 'Internship',
    notes: 'Accenture Tech Next Challenge — campus innovation competition for final and pre-final year students.',
  },
  {
    sortOrder: 20,
    companyName: 'Goldman Sachs',
    jobTitle: 'Goldman Sachs India Hackathon',
    tentativeMonth: 'Oct–Nov',
    quarter: 'Q3',
    url: 'https://www.hackerrank.com/goldman-sachs-india-hackathon',
    category: 'Internship',
    notes: 'Goldman Sachs India Hackathon — annual engineering hackathon to solve finance and technology problems. Top performers get fast-tracked for interviews.',
  },
  {
    sortOrder: 21,
    companyName: 'Colleges x Govt. of India',
    jobTitle: 'Smart India Hackathon (SIH)',
    tentativeMonth: 'Oct–Nov',
    quarter: 'Q3',
    url: 'https://www.sih.gov.in',
    category: 'Other',
    notes: 'Smart India Hackathon (SIH) — national-level hackathon by Govt. of India. Students solve real problems from government ministries and industries.',
  },

  // ── November (Nov–Dec) ──────────────────────────────────────
  {
    sortOrder: 22,
    companyName: 'Microsoft',
    jobTitle: 'Microsoft ImagineCup',
    tentativeMonth: 'Nov–Dec',
    quarter: 'Q3',
    url: 'https://imaginecup.microsoft.com',
    category: 'Other',
    notes: 'Microsoft Imagine Cup — global student technology competition. Build innovative solutions using AI, Azure, and Microsoft technologies.',
  },
  {
    sortOrder: 23,
    companyName: 'Google',
    jobTitle: 'Google Solutions Challenge',
    tentativeMonth: 'Nov–Dec',
    quarter: 'Q3',
    url: '',              // Link Coming soon (as per PDF)
    category: 'Other',
    notes: 'Google Solutions Challenge — competition for Google Developer Student Club (GDSC) members. Build solutions addressing UN Sustainable Development Goals.',
  },
  {
    sortOrder: 24,
    companyName: 'Meta',
    jobTitle: 'Hackercup',
    tentativeMonth: 'Nov–Dec',
    quarter: 'Q3',
    url: 'https://www.facebook.com/codingcompetitions/hacker-cup',
    category: 'Other',
    notes: 'Meta Hacker Cup — annual worldwide programming competition by Meta. Multiple rounds; top performers earn prizes and recognition.',
  },
  {
    sortOrder: 25,
    companyName: 'Microsoft',
    jobTitle: 'Microsoft University Internship',
    tentativeMonth: 'Nov–Dec',
    quarter: 'Q3',
    url: 'https://careers.microsoft.com/students/us/en/universityinternship',
    category: 'Internship',
    notes: 'Microsoft University Internship — full-time summer internship for undergraduate and graduate students across engineering, product, and design roles.',
  },
  {
    sortOrder: 26,
    companyName: 'Amazon',
    jobTitle: 'Amazon Internship',
    tentativeMonth: 'Nov–Dec',
    quarter: 'Q3',
    url: 'https://www.amazon.jobs/en/business_categories/student-programs',
    category: 'Internship',
    notes: 'Amazon Student Programs — summer internships for undergraduate and graduate students in software development, data science, and operations.',
  },
];

// ── Seed function ────────────────────────────────────────────
async function seedGlobalCareerLinks() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env');
    process.exit(1);
  }

  console.log('🔌 Connecting to MongoDB…');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected.\n');

  let inserted = 0;
  let updated = 0;
  let unchanged = 0;

  const MONTH_MAP = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
  };

  for (const opp of GLOBAL_OPPORTUNITIES) {
    // Dynamically calculate sortOrder based on FIRST month to ensure strict chronological sorting
    let baseMonth = 13; // Default for 'Year Round' or unknown
    const tMonth = (opp.tentativeMonth || '').toLowerCase();
    if (!tMonth.includes('year round')) {
      const match = tMonth.match(/([a-z]{3})/);
      if (match && MONTH_MAP[match[1]]) {
        baseMonth = MONTH_MAP[match[1]];
      }
    }
    // baseMonth * 100 ensures month dominates, while opp.sortOrder keeps original relative order
    opp.sortOrder = baseMonth * 100 + opp.sortOrder;

    const filter = {
      isGlobal: true,
      companyName: opp.companyName,
      jobTitle: opp.jobTitle,
    };

    const onInsert = {
      isGlobal: true,
      userId: null,
      status: 'Saved',
      location: '',
    };

    // sortOrder, url, and other changeable fields are ALWAYS updated
    const result = await CareerLink.updateOne(
      filter,
      {
        $set: { 
          url: opp.url,
          tentativeMonth: opp.tentativeMonth,
          quarter: opp.quarter,
          category: opp.category,
          notes: opp.notes,
          sortOrder: opp.sortOrder 
        },
        $setOnInsert: onInsert,
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log(`  ✅ Inserted [${String(opp.sortOrder).padStart(2, ' ')}]: ${opp.companyName} — ${opp.jobTitle}`);
      inserted++;
    } else if (result.modifiedCount > 0) {
      console.log(`  🔄 Updated  [${String(opp.sortOrder).padStart(2, ' ')}]: ${opp.companyName} — ${opp.jobTitle}`);
      updated++;
    } else {
      console.log(`  ⏭  OK      [${String(opp.sortOrder).padStart(2, ' ')}]: ${opp.companyName} — ${opp.jobTitle}`);
      unchanged++;
    }
  }

  console.log(`\n────────────────────────────────────`);
  console.log(`✅ Done. ${inserted} inserted, ${updated} updated, ${unchanged} already correct.`);
  console.log(`   Total global opportunities in DB: ${inserted + updated + unchanged}`);
  console.log(`────────────────────────────────────\n`);

  await mongoose.disconnect();
  process.exit(0);
}

seedGlobalCareerLinks().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
