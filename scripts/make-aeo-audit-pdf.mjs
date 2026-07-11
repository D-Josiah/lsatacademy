// Generates context/insights/AEO-Audit-LSAT-Academy.pdf from the HTML below using
// the Chromium that ships with @playwright/test. Run: node scripts/make-aeo-audit-pdf.mjs
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'context', 'insights');
const out = path.join(outDir, 'AEO-Audit-LSAT-Academy.pdf');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #102a36; margin: 0; padding: 40px 48px; font-size: 11.5px; line-height: 1.5; }
  h1 { font-size: 26px; margin: 0 0 2px; color: #023247; }
  .sub { color: #5b6770; margin: 0 0 4px; font-size: 12px; }
  .meta { color: #8a949c; font-size: 10.5px; margin: 0 0 20px; }
  h2 { font-size: 16px; margin: 26px 0 8px; color: #0d5a67; border-bottom: 2px solid #1a7d8c; padding-bottom: 5px; page-break-after: avoid; }
  h3 { font-size: 13px; margin: 16px 0 5px; color: #1a7d8c; page-break-after: avoid; }
  p { margin: 6px 0; }
  ul, ol { margin: 6px 0 12px; padding-left: 20px; }
  li { margin: 3px 0; }
  code { background: #f1f4f5; padding: 1px 5px; border-radius: 4px; font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 10px; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0 14px; font-size: 10.3px; }
  th { background: #0d5a67; color: #fff; text-align: left; padding: 6px 8px; font-weight: 600; }
  td { border: 1px solid #d9e2e6; padding: 5px 8px; vertical-align: top; }
  tr:nth-child(even) td { background: #f6f9fa; }
  .box { background: #f1f8f9; border: 1px solid #cfe6ea; border-radius: 8px; padding: 12px 16px; margin: 12px 0; }
  .crit { background: #fdf1ef; border: 1px solid #f0cdc6; border-radius: 8px; padding: 12px 16px; margin: 12px 0; }
  .crit b, .crit strong { color: #b3401f; }
  .tldr { background: #eef6ee; border-left: 4px solid #2f8f4e; border-radius: 4px; padding: 10px 16px; margin: 10px 0 18px; }
  .muted { color: #6b7680; }
  .r { color: #b3401f; font-weight: 700; }
  .o { color: #c07a17; font-weight: 700; }
  .y { color: #a6901a; font-weight: 700; }
  .g { color: #1f7a44; font-weight: 700; }
  .yes { color: #1f7a44; font-weight: 700; }
  .no { color: #b3401f; font-weight: 700; }
  .part { color: #c07a17; font-weight: 700; }
  .pagebreak { page-break-before: always; }
  .cols { column-count: 2; column-gap: 26px; }
  .cols ol { margin-top: 0; }
  ol.top20 li { margin: 5px 0; }
  .footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #d9e2e6; color: #8a949c; font-size: 10px; }
  .score-big { font-size: 15px; color: #b3401f; font-weight: 700; }
</style></head><body>

<h1>Answer Engine Optimization (AEO) Audit</h1>
<p class="sub">LSAT Academy &mdash; lsat.academy</p>
<p class="meta">Comprehensive AEO / LLM-citation audit &middot; Prepared July 2026 &middot; Coverage: Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini, Bing Copilot</p>

<div class="tldr"><b>TL;DR.</b> LSAT Academy has unusually strong foundations for a solo-tutor brand &mdash; clean schema, a real content library, genuine E-E-A-T, and AI crawlers explicitly allowed. But it is held back by <b>one critical technical flaw</b> (article body content is not in the static HTML, so non-JS AI crawlers see empty pages) and a <b>content model built for humans, not answer engines</b> (narrative essays instead of answer-first reference pages). Fixing those two things is ~80% of the opportunity. <b>Overall score: ~5.4 / 10.</b></div>

<h2>0. The single most important finding</h2>
<div class="crit">
<p>The prerender script (<code>scripts/prerender.mjs</code>) injects <b>only &lt;head&gt; metadata</b> &mdash; title, description, canonical, OG tags, Breadcrumb JSON-LD. <b>The &lt;div id="root"&gt; body stays empty.</b> Article text, indicator-word lists, pricing, and testimonials do not exist in the HTML until React hydrates in a browser. Confirmed by fetching the live homepage, which returned only the title tag.</p>
<p>Googlebot renders JavaScript (so Google AI Overviews likely see content), but the pure-LLM retrieval crawlers largely do not execute JS. You have <i>allowed</i> ChatGPT, Claude and Perplexity in robots.txt &mdash; then served them empty pages. <b>Fixing this is the highest-ROI action on the entire list.</b></p>
</div>
<table>
<tr><th>Crawler</th><th>Renders JS?</th><th>Sees article body today?</th></tr>
<tr><td>Googlebot (AI Overviews / Gemini)</td><td>Yes</td><td class="yes">Likely</td></tr>
<tr><td>GPTBot / OAI-SearchBot / ChatGPT-User</td><td>Weak / No</td><td class="no">No</td></tr>
<tr><td>ClaudeBot / Claude-SearchBot</td><td>No</td><td class="no">No</td></tr>
<tr><td>PerplexityBot</td><td>Weak</td><td class="no">Mostly no</td></tr>
<tr><td>Bing / Copilot</td><td>Partial</td><td class="part">Unreliable</td></tr>
</table>
<p><b>Verify live:</b> <code>curl -A "ClaudeBot" https://www.lsat.academy/indicator-words</code> &mdash; if the indicator-word lists are absent from the raw HTML, the issue is confirmed.</p>

<h2>1. Content Coverage</h2>
<p><b>Have:</b> 8&ndash;9 strategy articles (Indicator Words, Sufficient Assumption, Premises, MBT, RC Tips, Getting Stuck, Patterns, ABCs of Applying), an "LSAT Explained" primer, a books Library, an LR Drill Finder, a Q&amp;A page, Quizlet sets, plus service/testimonial/consultation pages.</p>
<table>
<tr><th>Gap</th><th>Why it matters</th><th>Priority</th></tr>
<tr><td>"Are Logic Games still on the LSAT?" / 2024&ndash;2026 format change</td><td>Logic Games retired Aug 2024, replaced by a 2nd scored LR section. Competitor content is stale. Highest-freshness opening available.</td><td class="r">Critical</td></tr>
<tr><td>Scoring reference pages (good score, average ~152, range 120&ndash;180, percentiles, raw&rarr;scaled)</td><td>Highest-volume informational cluster. You have none.</td><td class="r">Critical</td></tr>
<tr><td>"LSAT score for [law school]" per ABA school</td><td>Each school is its own high-volume query; rivals cover only the T-14.</td><td class="o">High</td></tr>
<tr><td>Full LR question-type library (~14 types)</td><td>LR is now ~50% of the test; extends your existing strength.</td><td class="o">High</td></tr>
<tr><td>Glossary of LSAT terms</td><td>Definitional queries are pure AEO fuel; no competitor owns a clean one.</td><td class="o">High</td></tr>
<tr><td>Study-schedule / "how long to study" pages</td><td>Highest-intent commercial cluster; ties to tutoring CTA.</td><td class="o">High</td></tr>
<tr><td>Comparison pages (tutor vs self-study, vs 7Sage/Demon)</td><td>Bottom-funnel; AI loves comparison tables.</td><td class="o">High</td></tr>
<tr><td>RC strategy depth</td><td>You have one RC tip; field is also weak.</td><td class="y">Medium</td></tr>
<tr><td>LSAT Writing, Test-day logistics, Scholarships</td><td>Under-served everywhere; easy authority wins.</td><td class="y">Medium</td></tr>
</table>
<p><b>Search-intent gap:</b> you cover <i>skills</i> well but almost nothing in <i>informational/decision</i> intent (good score, target schools, study length, cost) &mdash; exactly what students ask <i>before</i> hiring a tutor. Your own top-of-funnel is empty.</p>

<h2>2. Answer Quality</h2>
<p>Representative read (Indicator Words): excellent for a human, poor for an answer engine. Opens with a 3-paragraph LeBron James analogy before defining anything; no direct answer, no definition block, no TL;DR; the citable lists are buried ~150 lines down.</p>
<table>
<tr><th>Page</th><th>Direct?</th><th>Answer-first ¶?</th><th>AI-extractable?</th><th>Verdict</th></tr>
<tr><td>Indicator Words</td><td class="no">No</td><td class="no">No</td><td class="part">Lists, buried</td><td>Rewrite intro + surface lists</td></tr>
<tr><td>Sufficient Assumption</td><td class="part">Partial</td><td class="no">No</td><td class="part">Partial</td><td>Add formula box up top</td></tr>
<tr><td>LSAT Explained</td><td class="part">Partial</td><td class="part">Partial</td><td class="part">Partial</td><td>Add scoring table + FAQ + TL;DR</td></tr>
<tr><td>Services</td><td class="yes">Yes</td><td class="part">Partial</td><td class="yes">Yes</td><td>Add FAQ schema</td></tr>
<tr><td>Patterns / Getting Stuck</td><td class="no">No</td><td class="no">No</td><td class="no">No</td><td>Add key-takeaways box</td></tr>
</table>
<p><b>Rewrite pattern:</b> (1) question-based headings phrased as the real query; (2) a 40&ndash;60 word direct answer under each heading (~44% of AI citations come from the first ~30% of a page); (3) definition + TL;DR + key-takeaways blocks at top; (4) surface lists/tables into the first screenful.</p>

<h2>3. E-E-A-T</h2>
<p>A real strength &mdash; arguably your biggest asset vs. faceless corporate rivals.</p>
<table>
<tr><th>Dimension</th><th>Status</th><th>Evidence</th><th>Gap</th></tr>
<tr><td>Experience</td><td class="g">Strong</td><td>16 yrs, 3,000+ students, first-person patterns</td><td>Add original data</td></tr>
<tr><td>Expertise</td><td class="g">Strong</td><td>99th pct; named author + photo per article</td><td>No linked credentials/proof</td></tr>
<tr><td>Authoritativeness</td><td class="y">Medium</td><td>Reddit, Discord, subreddit</td><td>Few third-party mentions/press</td></tr>
<tr><td>Trust</td><td class="g">Good</td><td>Transparent pricing, free consult, privacy policy, honest advice</td><td>AggregateRating 5.0/25 has no Review schema</td></tr>
</table>
<p><b>Strengthen:</b> dedicated David McMaster bio page with Person schema (retiring <code>/about</code> and 301'ing to home <i>lost</i> an E-E-A-T anchor); verifiable anonymized score-outcome table; original research from the Drill Finder dataset; real Review schema on testimonials; earned third-party brand mentions.</p>

<h2>4. Structured Data</h2>
<p><b>Present:</b> EducationalOrganization, LocalBusiness (AggregateRating + AggregateOffer), WebSite, Article, Course, BreadcrumbList, Person (as founder), Offer.</p>
<table>
<tr><th>Schema</th><th>Status</th><th>Action</th></tr>
<tr><td>FAQPage</td><td class="no">Missing</td><td>Highest priority. Add to /lsat-answers, Services, LSAT Explained, every FAQ hub.</td></tr>
<tr><td>Review</td><td class="no">Missing</td><td>aggregateRating 5.0/25 has no individual Review objects &mdash; add them or the rating is unsubstantiated.</td></tr>
<tr><td>Person (standalone)</td><td class="part">Founder only</td><td>Full entity with sameAs, knowsAbout, credentials.</td></tr>
<tr><td>VideoObject</td><td class="no">Missing</td><td>Mark up YouTube once added &mdash; video is heavily cited.</td></tr>
<tr><td>HowTo</td><td class="no">Missing</td><td>Step-by-step method articles are HowTo candidates.</td></tr>
<tr><td>ItemList</td><td class="no">Missing</td><td>Resources hub, best-books, question-type lists.</td></tr>
<tr><td>Breadcrumb</td><td class="part">Articles only</td><td>Extend to all hierarchical pages.</td></tr>
</table>
<div class="crit"><b>Critical caveat:</b> all JSON-LD must land in the <b>prerendered HTML</b>. Article/FAQ/Person schema injected only via react-helmet-async at runtime is invisible to non-JS crawlers &mdash; same root problem as &sect;0. Move per-page JSON-LD into <code>prerender.mjs</code> output.</div>

<h2>5. AI Citation Potential</h2>
<p><b>Highest (once body is crawlable):</b> Indicator Words (the lists), LSAT Explained (primer), Services (structured pricing), Sufficient Assumption (formula).</p>
<p><b>Low as written:</b> Patterns, Getting Stuck, Premises, RC Tips &mdash; narrative essays with no extractable answer units.</p>
<p><b>New pages most likely to become AI references:</b> (1) "Are Logic Games still on the LSAT? (2026)"; (2) Scoring hub with percentile + raw-conversion tables; (3) LR question-type library; (4) Glossary; (5) "LSAT score for [school]" template.</p>

<h2>6. Topical Authority</h2>
<table>
<tr><th>Cluster</th><th>Leader</th><th>LSAT Academy</th><th>Opportunity</th></tr>
<tr><td>Scoring / percentiles</td><td>PowerScore, Princeton Review</td><td class="no">None</td><td>Build it &mdash; table-driven</td></tr>
<tr><td>Admissions data</td><td>7Sage, Blueprint</td><td class="part">ABCs article</td><td>Per-school pages</td></tr>
<tr><td>LR strategy</td><td>PowerScore</td><td class="g">Genuine strength</td><td>Extend to full cluster &mdash; win this</td></tr>
<tr><td>RC strategy</td><td>(weak field)</td><td class="part">One tip</td><td>Under-defended; go deeper</td></tr>
<tr><td>Study schedules</td><td>Blueprint, Demon</td><td class="no">None</td><td>High-intent commercial</td></tr>
<tr><td>"What is the LSAT"</td><td>Kaplan, Princeton Review</td><td class="part">LSAT Explained</td><td>Win on freshness, not DA</td></tr>
<tr><td>Format-change / 2026</td><td>nobody</td><td class="no">None</td><td>Wide open &mdash; claim it</td></tr>
</table>
<p><b>Internal linking:</b> currently hub-and-spoke via /resources only; articles do not cross-link. Add contextual in-body links (descriptive anchors), pillar&rarr;spoke loops per new cluster, and strategy-article&rarr;service CTAs. Build silos: <code>/lsat-scoring/*</code>, <code>/logical-reasoning/*</code>, <code>/admissions/*</code>, <code>/glossary/*</code>.</p>

<h2 class="pagebreak">7. Question Coverage (100+ pre-purchase questions)</h2>
<p><span class="yes">&#10003; answered</span> &nbsp; <span class="part">&asymp; partial/thin</span> &nbsp; <span class="no">&#10007; needs new content</span></p>

<h3>Beginner / What is the LSAT</h3>
<ol>
<li>What is the LSAT? <span class="part">&asymp;</span></li>
<li>How long is the LSAT? <span class="no">&#10007;</span></li>
<li>How many questions are on the LSAT? <span class="no">&#10007;</span></li>
<li>How many sections does it have now? <span class="no">&#10007;</span></li>
<li>Is the LSAT hard? <span class="no">&#10007;</span></li>
<li>What's on the LSAT in 2026? <span class="no">&#10007;</span></li>
<li>Are Logic Games still on the LSAT? <span class="no">&#10007;</span> <span class="r">(critical)</span></li>
<li>What replaced Logic Games? <span class="no">&#10007;</span></li>
<li>Is the LSAT multiple choice? <span class="no">&#10007;</span></li>
<li>LSAT vs GRE for law school? <span class="no">&#10007;</span></li>
</ol>
<h3>Study strategies</h3>
<ol start="11">
<li>How long should I study? <span class="no">&#10007;</span></li>
<li>How many hours to study? <span class="no">&#10007;</span></li>
<li>Can I self-study? <span class="no">&#10007;</span></li>
<li>Best study schedule? <span class="no">&#10007;</span></li>
<li>How do I make a study plan? <span class="no">&#10007;</span></li>
<li>1/2/3-month study plan? <span class="no">&#10007;</span></li>
<li>How do I improve my score? <span class="part">&asymp;</span></li>
<li>Why is my score plateauing? <span class="part">&asymp; (Patterns)</span></li>
<li>How do I review questions? <span class="part">&asymp;</span></li>
<li>Should I do blind review? <span class="no">&#10007;</span></li>
<li>Best study habits? <span class="part">&asymp; (Patterns)</span></li>
<li>How do I stay motivated? <span class="part">&asymp; (Getting Stuck)</span></li>
</ol>
<h3>Logic Games / Analytical Reasoning</h3>
<ol start="23">
<li>Are Logic Games gone? <span class="no">&#10007;</span> <span class="r">(critical)</span></li>
<li>Do I still need to learn LG? <span class="no">&#10007;</span></li>
<li>What was Analytical Reasoning? <span class="no">&#10007;</span></li>
<li>Is old LG prep still useful? <span class="no">&#10007;</span></li>
<li>How did the change affect scoring? <span class="no">&#10007;</span></li>
<li>Where can I still practice LG? <span class="no">&#10007;</span></li>
</ol>
<h3>Logical Reasoning</h3>
<ol start="29">
<li>What is Logical Reasoning? <span class="part">&asymp;</span></li>
<li>How many LR sections now? <span class="no">&#10007;</span></li>
<li>What are the LR question types? <span class="no">&#10007;</span></li>
<li>What are indicator words? <span class="yes">&#10003;</span></li>
<li>Sufficient vs necessary assumption? <span class="part">&asymp;</span></li>
<li>Flaw questions? <span class="no">&#10007;</span></li>
<li>Strengthen vs weaken? <span class="no">&#10007;</span></li>
<li>Inference / MBT questions? <span class="part">&asymp;</span></li>
<li>Parallel reasoning? <span class="no">&#10007;</span></li>
<li>Principle questions? <span class="no">&#10007;</span></li>
<li>Paradox / resolve? <span class="no">&#10007;</span></li>
<li>Method of reasoning? <span class="no">&#10007;</span></li>
<li>What is conditional reasoning? <span class="part">&asymp;</span></li>
<li>How do I diagram conditionals? <span class="part">&asymp;</span></li>
<li>What is a contrapositive? <span class="no">&#10007;</span></li>
<li>How do premises work? <span class="yes">&#10003;</span></li>
<li>Most common LR question type? <span class="no">&#10007; (you have the data)</span></li>
</ol>
<h3>Reading Comprehension</h3>
<ol start="46">
<li>How do I improve RC? <span class="part">&asymp; (RC Tips)</span></li>
<li>Should I read closely? <span class="yes">&#10003;</span></li>
<li>Comparative passages? <span class="no">&#10007;</span></li>
<li>RC main-point questions? <span class="no">&#10007;</span></li>
<li>RC inference questions? <span class="part">&asymp;</span></li>
<li>How do I speed up on RC? <span class="no">&#10007;</span></li>
<li>How to annotate passages? <span class="no">&#10007;</span></li>
<li>Strategy for science passages? <span class="no">&#10007;</span></li>
<li>How many RC passages/questions? <span class="no">&#10007;</span></li>
</ol>
<h3>Scoring</h3>
<ol start="55">
<li>What is a good LSAT score? <span class="no">&#10007;</span> <span class="r">(critical)</span></li>
<li>What's the average score? <span class="no">&#10007;</span></li>
<li>Score range? <span class="no">&#10007;</span></li>
<li>What's a 170 percentile? <span class="no">&#10007;</span></li>
<li>Is 160 a good score? <span class="no">&#10007;</span></li>
<li>Highest possible score? <span class="no">&#10007;</span></li>
<li>How is the LSAT scored? <span class="part">&asymp;</span></li>
<li>Raw-to-scaled conversion? <span class="no">&#10007;</span></li>
<li>How many can I miss for a 170? <span class="no">&#10007;</span></li>
<li>Competitive score for T-14? <span class="no">&#10007;</span></li>
<li>How much can I improve? <span class="part">&asymp;</span></li>
<li>Is the LSAT curved? <span class="no">&#10007;</span></li>
<li>Score needed for a scholarship? <span class="no">&#10007;</span></li>
<li>Do schools average or take highest? <span class="no">&#10007;</span></li>
</ol>
<h3>Admissions</h3>
<ol start="69">
<li>LSAT score for Harvard/Yale/Stanford? <span class="no">&#10007;</span> <span class="r">(critical)</span></li>
<li>LSAT score for [any school]? <span class="no">&#10007; (template)</span></li>
<li>LSAT vs GPA weighting? <span class="no">&#10007;</span></li>
<li>What is a splitter? <span class="no">&#10007;</span></li>
<li>Low-LSAT admission chances? <span class="no">&#10007;</span></li>
<li>When should I apply? <span class="part">&asymp; (ABCs)</span></li>
<li>How do LSAT + GPA combine? <span class="no">&#10007;</span></li>
<li>What's a personal statement? <span class="part">&asymp; (ABCs)</span></li>
<li>When should I take the LSAT? <span class="part">&asymp; (ABCs)</span></li>
<li>How many recommendations? <span class="part">&asymp; (ABCs)</span></li>
</ol>
<h3>Tutoring / Course selection</h3>
<ol start="79">
<li>Is LSAT tutoring worth it? <span class="part">&asymp; (LSAT Answers)</span></li>
<li>How much does tutoring cost? <span class="yes">&#10003; (Services)</span></li>
<li>Private vs group? <span class="part">&asymp;</span></li>
<li>What does a session look like? <span class="part">&asymp;</span></li>
<li>Free consultation? <span class="yes">&#10003;</span></li>
<li>LSAT Academy vs 7Sage/Demon/Blueprint? <span class="no">&#10007;</span></li>
<li>What makes a good tutor? <span class="no">&#10007;</span></li>
<li>How many tutoring hours do I need? <span class="no">&#10007;</span></li>
<li>Packages / discounts? <span class="yes">&#10003;</span></li>
<li>Is online tutoring effective? <span class="no">&#10007;</span></li>
</ol>
<h3>Practice tests</h3>
<ol start="89">
<li>How many PrepTests should I take? <span class="no">&#10007;</span></li>
<li>Where do I get official PrepTests? <span class="part">&asymp; (Library)</span></li>
<li>How often to take a full PT? <span class="no">&#10007;</span></li>
<li>How to simulate test day? <span class="no">&#10007;</span></li>
<li>Most representative PrepTests now? <span class="no">&#10007;</span></li>
<li>What's a drilling strategy? <span class="part">&asymp; (Drill Finder)</span></li>
</ol>
<h3>LSAT Writing</h3>
<ol start="95">
<li>What is LSAT Argumentative Writing? <span class="no">&#10007;</span></li>
<li>Does LSAT Writing affect my score? <span class="no">&#10007;</span></li>
</ol>
<h3>Test day</h3>
<ol start="97">
<li>What do I bring? <span class="no">&#10007;</span></li>
<li>Remote or in-person? <span class="no">&#10007;</span></li>
<li>What happens on test day / breaks? <span class="no">&#10007;</span></li>
</ol>
<h3>Scholarships / cost</h3>
<ol start="100">
<li>LSAT registration cost? <span class="no">&#10007;</span></li>
<li>LSAT fee assistance? <span class="no">&#10007;</span></li>
<li>How to negotiate scholarships? <span class="no">&#10007;</span></li>
<li>Does a higher LSAT save money? <span class="no">&#10007;</span></li>
</ol>
<p class="box"><b>Coverage summary:</b> ~10 fully answered, ~22 partial, <b>~71 need new content</b> &mdash; concentrated exactly where pre-purchase intent lives: scoring, admissions, study planning, format change, test day.</p>

<h2 class="pagebreak">8. Competitor Comparison &amp; Where You Can Win</h2>
<table>
<tr><th>Competitor</th><th>Their AEO moat</th><th>Your opening</th></tr>
<tr><td>7Sage</td><td>Forums, admissions predictor, free LG videos</td><td>LG library now obsolete; out-structure their messy forum</td></tr>
<tr><td>LSAT Demon</td><td>Daily podcast transcripts, scholarship angle</td><td>Weak on definitional/table content &mdash; beat on scoring</td></tr>
<tr><td>Blueprint</td><td>High DA, calculators, study schedules</td><td>Value gated behind signup; publish yours ungated</td></tr>
<tr><td>Princeton Review</td><td>Very high DA scoring page</td><td>Can't beat DA &mdash; beat on freshness (2026) + depth</td></tr>
<tr><td>Kaplan</td><td>Free how-tos, high DA, 403s bots</td><td>Anti-bot posture hurts their AI crawlability; you allow bots</td></tr>
<tr><td>PowerScore</td><td>LR "Bibles," scoring reference, forum</td><td>Aging LG content, no calculator widget, dated UX</td></tr>
</table>
<p><b>Where a small player wins in AI search:</b> (1) freshness &mdash; be the current source on the post-2024 format; (2) structure &mdash; clean FAQPage/definition blocks beat essays/forums/transcripts; (3) ungated + crawlable answers; (4) named human expertise (Person schema) beats faceless brands; (5) original data from your Drill Finder dataset.</p>

<h2>9. Technical AEO</h2>
<table>
<tr><th>Area</th><th>Status</th><th>Issue / Action</th></tr>
<tr><td>Body content in HTML</td><td class="r">Broken</td><td>Prerender head-only; body invisible to non-JS AI crawlers. Prerender full DOM (headless Chrome / react-snap) or migrate articles to static MDX. #1 fix.</td></tr>
<tr><td>JSON-LD in static HTML</td><td class="o">Partial</td><td>Only Breadcrumb prerendered; Article/Course/FAQ/Person runtime-only. Bake all into prerender output.</td></tr>
<tr><td>Heading hierarchy</td><td class="y">OK</td><td>Good nesting but thematic, not query-shaped. Rewrite as questions.</td></tr>
<tr><td>Semantic HTML</td><td class="g">Good</td><td>Proper main/article/section.</td></tr>
<tr><td>Readability</td><td class="y">Fair</td><td>Long paragraphs; add lists/tables/summaries.</td></tr>
<tr><td>Internal links</td><td class="o">Weak</td><td>No article-to-article cross-linking; hub-only.</td></tr>
<tr><td>Anchor text</td><td class="y">Fair</td><td>"get it here" / "Download" &mdash; use descriptive anchors.</td></tr>
<tr><td>Page speed</td><td class="g">Good</td><td>Code-split, lazy images, preconnect, immutable caching.</td></tr>
<tr><td>Crawlability</td><td class="g">Good</td><td>robots.txt allows GPTBot/ClaudeBot/PerplexityBot/Google-Extended.</td></tr>
<tr><td>Indexability</td><td class="g">Good</td><td>noindex on portal/payment/thank-you correctly.</td></tr>
<tr><td>Canonicals / Metadata / Sitemap</td><td class="g">Good</td><td>Per-page canonicals, strong titles/OG, 23-URL image sitemap.</td></tr>
<tr><td>vercel.json rewrite</td><td class="y">Verify</td><td>Catch-all rewrite could shadow route snapshots &mdash; confirm bots get route-specific titles.</td></tr>
<tr><td>llms.txt</td><td class="muted">Optional</td><td>Low priority; no major provider confirms reading it.</td></tr>
</table>

<h2>10. AI-Friendly Content Improvements</h2>
<p>Apply to every strategy/reference page: <b>TL;DR</b> up top; <b>40&ndash;60 word direct answer</b> under each question-heading; <b>definition blocks</b> (glossary-linked); <b>tables</b> (scoring, raw-conversion, per-school, question-type, pricing); <b>bulleted lists</b> (surface the indicator-word lists higher); <b>HowTo step-by-steps</b> (the diagram&rarr;simplify&rarr;find-the-hole method); <b>Key Takeaways</b> box; <b>Common Mistakes</b> section; <b>decision trees</b> ("which question type is this?", "self-study or tutor?"); clearly labeled <b>worked examples</b> with the answer near the question.</p>

<h2>11. Content Roadmap</h2>
<h3>Quick wins (1&ndash;2 weeks)</h3>
<table>
<tr><th>Action</th><th>Impact</th><th>Effort</th></tr>
<tr><td>Prerender full body HTML (headless snapshot)</td><td class="r">High</td><td>Med</td></tr>
<tr><td>Bake all JSON-LD (Article/Course/Person) into prerender</td><td class="g">High</td><td>Low</td></tr>
<tr><td>Add FAQPage schema to /lsat-answers + Services</td><td class="g">High</td><td>Low</td></tr>
<tr><td>Publish "Are Logic Games still on the LSAT? (2026)"</td><td class="r">High</td><td>Low</td></tr>
<tr><td>Rewrite article intros answer-first + TL;DRs</td><td class="g">High</td><td>Med</td></tr>
<tr><td>Add Review schema to testimonials</td><td class="y">Med</td><td>Low</td></tr>
<tr><td>Query-shape headings; fix Article headline to include "LSAT"</td><td class="y">Med</td><td>Low</td></tr>
<tr><td>Verify Vercel serves route-specific snapshots to bots</td><td class="g">High</td><td>Low</td></tr>
</table>
<h3>Medium-term (1&ndash;2 months)</h3>
<table>
<tr><th>Action</th><th>Impact</th><th>Effort</th></tr>
<tr><td>Scoring hub (good score / average / percentiles / raw-conversion tables)</td><td class="r">High</td><td>Med</td></tr>
<tr><td>Complete LR question-type cluster (~14 pages)</td><td class="g">High</td><td>High</td></tr>
<tr><td>Glossary (30&ndash;50 terms, definition blocks)</td><td class="g">High</td><td>Med</td></tr>
<tr><td>Study-schedule pages (1/2/3-month, hours)</td><td class="g">High</td><td>Med</td></tr>
<tr><td>Article-to-article internal linking overhaul</td><td class="y">Med</td><td>Low</td></tr>
<tr><td>Standalone David McMaster bio + Person schema</td><td class="y">Med</td><td>Low</td></tr>
<tr><td>Comparison pages (tutor vs self-study; vs 7Sage/Demon)</td><td class="y">Med</td><td>Med</td></tr>
</table>
<h3>Long-term authority (3&ndash;12 months)</h3>
<table>
<tr><th>Action</th><th>Impact</th><th>Effort</th></tr>
<tr><td>"LSAT score for [school]" templated pages (all ABA schools)</td><td class="g">High</td><td>High</td></tr>
<tr><td>Interactive score/percentile calculator (current format)</td><td class="g">High</td><td>High</td></tr>
<tr><td>YouTube channel w/ keyword titles + transcripts</td><td class="r">High</td><td>High</td></tr>
<tr><td>Original research from Drill Finder data</td><td class="g">High</td><td>Med</td></tr>
<tr><td>Earned brand mentions / Reddit / directory presence</td><td class="r">High</td><td>Ongoing</td></tr>
<tr><td>RC + LSAT Writing + Test-day clusters</td><td class="y">Med</td><td>Med</td></tr>
</table>

<h2>12. Final Score</h2>
<table>
<tr><th>Dimension</th><th>Score</th><th>Notes</th></tr>
<tr><td>Traditional SEO</td><td>7.5 / 10</td><td>Clean metadata, schema, sitemap, speed; needs content breadth</td></tr>
<tr><td>AEO</td><td>4 / 10</td><td>Body not crawlable by LLM bots; essays not answer-first</td></tr>
<tr><td>AI citation readiness</td><td>3.5 / 10</td><td>Great material, hidden from non-JS crawlers, hard to extract</td></tr>
<tr><td>Topical authority</td><td>4.5 / 10</td><td>Strong narrow LR core; missing scoring/admissions/study</td></tr>
<tr><td>E-E-A-T</td><td>8 / 10</td><td>Genuine, named, experienced expert &mdash; standout strength</td></tr>
<tr><td>Technical optimization</td><td>6.5 / 10</td><td>Excellent crawl controls &amp; speed, undercut by head-only prerender</td></tr>
<tr><td>Content quality</td><td>7.5 / 10</td><td>Genuinely good writing; wrong format for AI</td></tr>
<tr><td><b>Overall</b></td><td class="score-big">~5.4 / 10</td><td>High-potential foundation, two fixable bottlenecks</td></tr>
</table>

<h2>Top 20 Highest-ROI Actions (ordered by expected return)</h2>
<ol class="top20">
<li>Prerender full page body (not just &lt;head&gt;) so AI crawlers can read your content. Everything depends on this.</li>
<li>Bake all JSON-LD (Article, Course, FAQPage, Person) into the prerendered HTML.</li>
<li>Publish "Are Logic Games still on the LSAT? (2025&ndash;2026 format)".</li>
<li>Build a Scoring hub with percentile + raw-conversion tables.</li>
<li>Rewrite every article answer-first (TL;DR + 40&ndash;60-word answer under each heading).</li>
<li>Add FAQPage schema to Q&amp;A, Services, and each new hub.</li>
<li>Query-shape all headings; fix the Article headline to include "LSAT".</li>
<li>Complete the LR question-type cluster (~14 pages).</li>
<li>Create a glossary of LSAT terms with definition blocks.</li>
<li>Add real Review schema to substantiate the 5.0/25 rating.</li>
<li>Study-schedule pages (1/2/3-month, hours) tied to tutoring CTAs.</li>
<li>Restore a proper David McMaster bio page with full Person schema.</li>
<li>Cross-link articles with descriptive anchors; build cluster loops.</li>
<li>Verify Vercel serves route-specific snapshots to bots.</li>
<li>"LSAT score for [school]" templated pages across all ABA schools.</li>
<li>Launch YouTube with keyword-rich titles + transcripts.</li>
<li>Publish original research from your Drill Finder dataset.</li>
<li>Earn brand mentions (Reddit, Quora, directories, press).</li>
<li>Add Key-Takeaways + Common-Mistakes + tables to existing essays.</li>
<li>Build comparison pages (tutor vs self-study; vs 7Sage/Demon/Blueprint).</li>
</ol>

<div class="box"><b>Verify before publishing scoring/cost pages:</b> current LSAT registration fee (~$238&ndash;248) and exact scored-question count under the post-2024 format, against the live LSAC schedule.</div>

<p class="footer">AEO Audit &mdash; LSAT Academy (lsat.academy) &middot; Generated July 2026 &middot; context/insights/AEO-Audit-LSAT-Academy.pdf</p>

</body></html>`;

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  margin: { top: '14mm', bottom: '16mm', left: '0', right: '0' },
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: '<div style="width:100%;font-size:8px;color:#8a949c;padding:0 48px;text-align:right;">LSAT Academy AEO Audit &nbsp;&middot;&nbsp; Page <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
});
await browser.close();
console.log('Wrote', out);
