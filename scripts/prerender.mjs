// Postbuild prerender for SEO.
//
// Vite's CSR output ships one index.html. Crawlers that don't execute JS
// (Bing, social previews, most LLM scrapers) only see the homepage <title> /
// <meta> for every route. This script walks the route manifest and writes a
// dist/<route>/index.html for each one with the per-page <title>, description,
// canonical, OG/Twitter tags, and JSON-LD baked into the HTML head — so
// crawlers get correct metadata immediately, and the React app still hydrates
// on top normally.
//
// To add or update a route: edit the `routes` array below. Keep it in sync
// with src/App.jsx and public/sitemap.xml.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const SITE = 'https://www.lsat.academy';
const DEFAULT_OG_IMAGE = `${SITE}/600-logo.png`;

const routes = [
  // path, title, description, ogType, optional ogImage, optional extraJsonLd (string)
  {
    path: '/about',
    title: 'About David McMaster | LSAT Academy Tutor',
    description: 'Meet David McMaster — 99th percentile LSAT scorer, former elite test-prep instructor, and founder of LSAT Academy with 15 years of tutoring experience.',
    ogType: 'website',
    ogImage: `${SITE}/assets/david.png`,
    breadcrumbs: [['Home', '/'], ['About', '/about']],
  },
  {
    path: '/services',
    title: 'LSAT Tutoring Services & Pricing | LSAT Academy',
    description: 'Explore LSAT tutoring options with David McMaster. Private 1-on-1 sessions at $85/hr, discounted 10 and 20-hour packages, group tutoring, and a free consultation.',
    ogType: 'website',
    breadcrumbs: [['Home', '/'], ['Services', '/services']],
  },
  {
    path: '/testimonials',
    title: 'Student Testimonials | LSAT Academy',
    description: 'Real student reviews and survey results from LSAT Academy. See how David McMaster\'s tutoring helped students into Harvard, Yale, and full-ride T14 scholarships.',
    ogType: 'website',
    breadcrumbs: [['Home', '/'], ['Testimonials', '/testimonials']],
  },
  {
    path: '/consultation',
    title: 'Book a Free LSAT Consultation | LSAT Academy',
    description: 'Schedule your free 1-hour LSAT consultation with David McMaster. Discuss your goals, get personalized advice, and find out if private tutoring is right for you.',
    ogType: 'website',
    breadcrumbs: [['Home', '/'], ['Free Consultation', '/consultation']],
  },
  {
    path: '/lsat-explained',
    title: 'The LSAT Explained: Everything You Need to Know | LSAT Academy',
    description: 'What is the LSAT? Understand the test format, scoring scale, 2025–2026 test dates, how to study, and what score you need to get into your target law school.',
    ogType: 'article',
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['The LSAT Explained', '/lsat-explained']],
  },
  {
    path: '/group-tutoring',
    title: 'Group LSAT Tutoring | LSAT Academy',
    description: 'Join LSAT Academy\'s group tutoring program — an affordable way to study LSAT with peers in a collaborative environment led by David McMaster. Join the waitlist today.',
    ogType: 'website',
    breadcrumbs: [['Home', '/'], ['Services', '/services'], ['Group Tutoring', '/group-tutoring']],
  },
  {
    path: '/library',
    title: 'LSAT Book Library | Best LSAT Prep Books | LSAT Academy',
    description: 'Browse David McMaster\'s recommended LSAT prep books and study materials. Curated list of the best resources to help you prepare for the LSAT effectively.',
    ogType: 'website',
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['Library', '/library']],
  },
  {
    path: '/resources',
    title: 'Free LSAT Prep Resources | LSAT Academy',
    description: 'Free LSAT articles and study tools from David McMaster — sixteen years of LSAT teaching distilled into focused reads.',
    ogType: 'website',
    breadcrumbs: [['Home', '/'], ['Resources', '/resources']],
  },
  {
    path: '/lsat-answers',
    title: 'LSAT Answer Explanations | LSAT Academy',
    description: 'Get clear, expert explanations for LSAT questions. Submit a question and receive a detailed breakdown from David McMaster, 99th percentile LSAT tutor.',
    ogType: 'website',
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['LSAT Answers', '/lsat-answers']],
  },
  {
    path: '/lsat-quizlet',
    title: 'LSAT Quizlet Flashcards | LSAT Academy',
    description: 'Study LSAT vocabulary, logical reasoning terms, and key concepts with free Quizlet flashcard sets curated by David McMaster at LSAT Academy.',
    ogType: 'website',
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['LSAT Quizlet', '/lsat-quizlet']],
  },
  {
    path: '/discord',
    title: 'Join the LSAT Discord Community | LSAT Academy',
    description: 'Join LSAT Academy\'s free Discord server — real-time study groups, LSAT tips from David McMaster, peer support, and resources to help you ace the LSAT.',
    ogType: 'website',
    breadcrumbs: [['Home', '/'], ['Discord Community', '/discord']],
  },
  {
    path: '/sufficient-assumption',
    title: 'Sufficient Assumption Questions: A Better Approach | LSAT Academy',
    description: 'Learn a clearer, more reliable method for tackling Sufficient Assumption questions on the LSAT. Free guide from 99th percentile tutor David McMaster.',
    ogType: 'article',
    ogImage: `${SITE}/assets/SufficientAssumption.png`,
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['Sufficient Assumption', '/sufficient-assumption']],
  },
  {
    path: '/indicator-words',
    title: 'LSAT Indicator Words: A Core Logical Reasoning Fundamental | LSAT Academy',
    description: 'Master LSAT indicator words — the key to understanding argument structure. Free guide from expert tutor David McMaster covering the most important logical connectives.',
    ogType: 'article',
    ogImage: `${SITE}/assets/IndicatorWords.png`,
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['Indicator Words', '/indicator-words']],
  },
  {
    path: '/abc',
    title: 'The ABCs of Applying to Law School | LSAT Academy',
    description: 'A comprehensive guide to applying to law school — from choosing when to apply and studying for the LSAT to crafting your personal statement and gathering recommendations.',
    ogType: 'article',
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['ABCs of Applying to Law School', '/abc']],
  },
  {
    path: '/patterns',
    title: 'LSAT Patterns After 15 Years of Tutoring | LSAT Academy',
    description: 'David McMaster shares the recurring LSAT patterns he\'s observed after 15 years of tutoring — common mistakes, test-taking habits, and what separates high scorers.',
    ogType: 'article',
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['LSAT Patterns', '/patterns']],
  },
  {
    path: '/rc-tips',
    title: 'RC Tip: Stop TRYING to Understand the RC Passages | LSAT Academy',
    description: 'A counterintuitive Reading Comprehension tip from David McMaster — why over-analyzing RC passages backfires and what to do instead.',
    ogType: 'article',
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['RC Tips', '/rc-tips']],
  },
  {
    path: '/getting-stuck',
    title: 'Getting Stuck on Challenging LSAT Problems | LSAT Academy',
    description: 'Practical strategies for what to do when you get stuck on a hard LSAT question — from pattern recognition to strategic guessing.',
    ogType: 'article',
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['Getting Stuck', '/getting-stuck']],
  },
  {
    path: '/premises',
    title: 'In Defense of the Utility of Premises | LSAT Academy',
    description: 'A deep dive into why premises matter in LSAT logical reasoning — and how to use them to find the right answer faster.',
    ogType: 'article',
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['Premises', '/premises']],
  },
  {
    path: '/mbt-questions',
    title: 'The 3 Kinds of MBT Questions on the RC Section | LSAT Academy',
    description: 'David McMaster breaks down the three types of Must Be True questions that appear in the LSAT Reading Comprehension section.',
    ogType: 'article',
    breadcrumbs: [['Home', '/'], ['Resources', '/resources'], ['MBT Questions', '/mbt-questions']],
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | LSAT Academy',
    description: 'Read the LSAT Academy privacy policy to understand how we collect, use, and protect your personal information.',
    ogType: 'website',
    breadcrumbs: [['Home', '/'], ['Privacy Policy', '/privacy-policy']],
  },
];

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildBreadcrumbJsonLd(crumbs) {
  const items = crumbs.map(([name, p], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${SITE}${p === '/' ? '/' : p}`,
  }));
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  });
}

function buildHead(route, base) {
  const url = `${SITE}${route.path}`;
  const ogImage = route.ogImage || DEFAULT_OG_IMAGE;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const breadcrumbJson = route.breadcrumbs ? buildBreadcrumbJsonLd(route.breadcrumbs) : null;

  // Replace title
  let html = base.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?\s*>/,
    `<meta name="description" content="${description}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?\s*>/,
    `<link rel="canonical" href="${url}" />`
  );

  // Build the per-route OG/Twitter override block
  const ogBlock = [
    `<meta property="og:title" content="${title}" data-prerender />`,
    `<meta property="og:description" content="${description}" data-prerender />`,
    `<meta property="og:url" content="${url}" data-prerender />`,
    `<meta property="og:type" content="${route.ogType || 'website'}" data-prerender />`,
    `<meta property="og:image" content="${ogImage}" data-prerender />`,
    `<meta name="twitter:title" content="${title}" data-prerender />`,
    `<meta name="twitter:description" content="${description}" data-prerender />`,
    `<meta name="twitter:image" content="${ogImage}" data-prerender />`,
  ].join('\n    ');

  // Strip any existing og:title/og:description/og:url/og:type/twitter:* lines
  // so we don't end up with two of each. The base index.html has homepage
  // versions; we replace them with route-specific ones.
  html = html.replace(/<meta property="og:title"[^>]*\/?\s*>\s*/g, '');
  html = html.replace(/<meta property="og:description"[^>]*\/?\s*>\s*/g, '');
  html = html.replace(/<meta property="og:url"[^>]*\/?\s*>\s*/g, '');
  html = html.replace(/<meta property="og:type"[^>]*\/?\s*>\s*/g, '');
  html = html.replace(/<meta property="og:image"[^>]*\/?\s*>\s*/g, '');
  html = html.replace(/<meta property="og:image:[^"]+"[^>]*\/?\s*>\s*/g, '');
  html = html.replace(/<meta property="og:image:alt"[^>]*\/?\s*>\s*/g, '');
  html = html.replace(/<meta name="twitter:title"[^>]*\/?\s*>\s*/g, '');
  html = html.replace(/<meta name="twitter:description"[^>]*\/?\s*>\s*/g, '');
  html = html.replace(/<meta name="twitter:image"[^>]*\/?\s*>\s*/g, '');
  html = html.replace(/<meta name="twitter:image:alt"[^>]*\/?\s*>\s*/g, '');

  // Inject our route-specific block + breadcrumb JSON-LD just before </head>
  const breadcrumbScript = breadcrumbJson
    ? `\n    <script type="application/ld+json" data-prerender>${breadcrumbJson}</script>`
    : '';

  html = html.replace(
    '</head>',
    `    ${ogBlock}${breadcrumbScript}\n  </head>`
  );

  return html;
}

async function main() {
  const indexPath = path.join(DIST, 'index.html');
  let base;
  try {
    base = await readFile(indexPath, 'utf8');
  } catch (err) {
    console.error(`prerender: could not read ${indexPath}. Run 'vite build' first.`);
    process.exit(1);
  }

  let count = 0;
  for (const route of routes) {
    const html = buildHead(route, base);
    const outDir = path.join(DIST, route.path.replace(/^\//, ''));
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), html, 'utf8');
    count++;
  }

  console.log(`prerender: wrote ${count} route snapshots to dist/`);
}

main().catch((err) => {
  console.error('prerender failed:', err);
  process.exit(1);
});
