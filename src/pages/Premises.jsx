import React from "react";
import { Helmet } from "react-helmet-async";
import Img from "../components/Img";

const Premises = () => {
  return (
    <>
      <Helmet>
        <title>In Defense of the Utility of Premises | LSAT Academy</title>
        <meta name="description" content="David McMaster on why focusing only on conclusions isn't always enough — and why premises play a crucial role in answering LSAT weaken questions correctly." />
        <link rel="canonical" href="https://www.lsat.academy/premises" />
        <meta property="og:title" content="In Defense of the Utility of Premises | LSAT Academy" />
        <meta property="og:description" content="David McMaster on why focusing only on conclusions isn't always enough — and why premises play a crucial role in answering LSAT weaken questions correctly." />
        <meta property="og:url" content="https://www.lsat.academy/premises" />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content="In Defense of the Utility of Premises | LSAT Academy" />
        <meta name="twitter:description" content="David McMaster on why focusing only on conclusions isn't always enough — and why premises play a crucial role in answering LSAT weaken questions correctly." />
        <script type="application/ld+json">{`
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "In Defense of the Utility of Premises",
    "description": "David McMaster on why focusing only on conclusions isn't always enough — and why premises play a crucial role in answering LSAT weaken questions correctly.",
    "image": "https://www.lsat.academy/600-logo.png",
    "datePublished": "2026-01-19",
    "dateModified": "2026-01-19",
    "author": {
      "@type": "Person",
      "name": "David McMaster",
      "url": "https://www.lsat.academy/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LSAT Academy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.lsat.academy/600-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.lsat.academy/premises"
    }
  }
`}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lsat.academy/" },
              { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://www.lsat.academy/resources" },
              { "@type": "ListItem", "position": 3, "name": "Premises", "item": "https://www.lsat.academy/premises" }
            ]
          }
        `}</script>
      </Helmet>
      <main className="blogs max padding spacer">
        <article>
          <h1>In Defense of the Utility of Premises</h1>
          <section className="blog-details">
            <div className="title">
              <h3 className="date">19 January 2026</h3>
              <div className="author">
                <Img src="/assets/david.png" alt="David McMaster, LSAT Tutor" width="60" height="60" loading="lazy" decoding="async" />
                <p className="david">David McMaster</p>
              </div>
            </div>
          </section>

          <p className="sub-heading">Focusing on conclusions really does change many stimuli from impossible-to-solve to fairly-doable. But focusing solely on conclusions will only get you so far.</p>

          <p>Someone made a comment the other day about how their score went from the 160s to the 170s once they stopped focusing on the overall gestalt of the stimulus — when they stopped trying to "get" the author's various ideas — and instead started focusing on the literal conclusion. And for this comment they were rightly upvoted.</p>

          <p>Focusing on conclusions, the author's literal, exact, main point, really does change many stimuli from being impossible-to-solve to being fairly-doable. And sure, most students KNOW the concepts of premises and conclusions, but never once use them as tools when solving questions — especially when under timed conditions.</p>

          <p>But focusing solely on conclusions will only get you so far.</p>

          <h2>When the Conclusion Alone Isn't Enough</h2>

          <p>If finding the conclusion is your only tool, there are still some questions you're going to get wrong. For instance, suppose some LSAT stimulus has a "Weaken" question stem, and the argument within the stimulus concludes that "David must be a great tutor." That's the conclusion. That's what you're trying to weaken.</p>

          <p>If all you're focusing on is the conclusion, you might accept any answer choice that kicks that conclusion in the teeth, such as:</p>

          <ul>
            <li>"A couple of people I know both said he didn't help them improve"</li>
            <li>"His posts on Reddit about the LSAT are super confusing"</li>
            <li>"He last took an actual LSAT a long time ago"</li>
          </ul>

          <p>And honestly? Sure. A lot of times, answer choices like these that only attack the conclusion will be enough. Any single one of these might work as the right answer choice, potentially, if all other answer choices do nothing at all to weaken the conclusion.</p>

          <p>That having been said…</p>

          <h2>Same Conclusion, Very Different Premises</h2>

          <p>Look at these 3 following arguments — all different, all of which we're trying to weaken, but all of which have the same conclusion:</p>

          <p><em>"A bunch of unknown random people have posted nice things about his tutoring online, therefore David must be a great tutor."</em></p>

          <p><em>"David is old and grumpy, therefore David must be a great tutor."</em></p>

          <p><em>"He got a really high LSAT score, therefore David must be a great tutor."</em></p>

          <p>Same conclusion. Exact same conclusion. But very different premises. And because the premises are so very different, just knowing the conclusion might not be enough.</p>

          <p>For the first argument, an answer choice asserting that <em>"Anonymous posts on websites provide little in the way of substantive evidence for anything"</em> is a FAR better weakener than any general attack on the conclusion.</p>

          <p>But for the second argument, that "Anonymous posts" answer choice wouldn't work at all. On the other hand, an answer choice claiming <em>"A person's age and habitual mood rarely offer much of an indication of their ability to do their job"</em> would be a great weakener.</p>

          <p>And finally, neither of those two answer choices would weaken the third argument at all — but <em>"One's ability to achieve at a high level in some field has very little correlation with one's ability to successfully teach within that field"</em> would be a fantastic weakener.</p>

          <h2>A Minor but Important Distinction</h2>

          <p>Sometimes weaken questions say "Which one of the following most weakens the <strong>conclusion</strong>," and sometimes they say "Which one of the following most weakens the <strong>argument</strong>."</p>

          <p>If we are being asked specifically to weaken an argument, it's considerably more likely that the correct answer choice will attempt to push apart the given premise from the given conclusion, rather than just kicking the conclusion in the teeth.</p>

          <p className="end">Often finding the literal conclusion is more than enough to get the right answer. But sometimes just knowing the conclusion is not enough. The premises often have a role to play in constructing correct answer choices as well — and knowing the difference can be the key to unlocking those tougher questions.</p>
        </article>
      </main>
    </>
  );
};

export default Premises;