import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const articles = [
  { to: "/lsat-explained", label: "The LSAT Explained: Everything You Need to Know" },
  { to: "/rc-tips", label: "RC Tip: Stop TRYING to Understand the RC Passages" },
  { to: "/getting-stuck", label: "Getting Stuck on Challenging Problems" },
  { to: "/premises", label: "In Defense of the Utility of Premises" },
  { to: "/mbt-questions", label: "The Three Kinds of MBT Questions on the RC Section" },
  { to: "/sufficient-assumption", label: "A Simple Way to Level up Your Sufficient Assumption Approach" },
  { to: "/indicator-words", label: "Indicator Words as Essential Fundamentals" },
  { to: "/abc", label: "The ABCs of Applying to Law School" },
  { to: "/patterns", label: "Some Patterns That Jump Out After 15 Years of Tutoring" },
  { to: "/lsat-quizlet", label: "LSAT Quizlet" },
];

const Resources = () => {
  return (
    <>
      <Helmet>
        <title>Free LSAT Prep Resources | LSAT Academy</title>
        <meta name="description" content="Free LSAT study resources from David McMaster — guides on sufficient assumption, indicator words, logical reasoning patterns, law school application tips, and more." />
        <link rel="canonical" href="https://www.lsat.academy/resources" />
        <meta property="og:title" content="Free LSAT Prep Resources | LSAT Academy" />
        <meta property="og:description" content="Free LSAT study resources from David McMaster — guides on sufficient assumption, indicator words, logical reasoning patterns, law school application tips, and more." />
        <meta property="og:url" content="https://www.lsat.academy/resources" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Free LSAT Prep Resources | LSAT Academy" />
        <meta name="twitter:description" content="Free LSAT study resources from David McMaster — guides on sufficient assumption, indicator words, logical reasoning patterns, law school application tips, and more." />
      </Helmet>

      <style>{`
        .resources { padding-bottom: 80px !important; }
        .resources h1 { margin: 48px 0 48px; }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px 48px;
          list-style: none;
          padding: 0;
          margin: 0 auto;
          max-width: 1100px;
          width: 100%;
        }

        .blog-grid .resource {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 4px;
          border-bottom: 1px solid #e8eef1;
          transition: background-color 0.2s ease, padding 0.2s ease;
        }

        .blog-grid .resource:hover {
          background-color: #f7fafc;
          padding-left: 12px;
          padding-right: 12px;
        }

        .blog-grid .redirect {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          opacity: 0.65;
        }

        .blog-grid .resource-link {
          font-size: 1.15rem;
          line-height: 1.5;
          color: #023247;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }

        .blog-grid .resource-link:hover {
          color: #2A8E9E;
        }

        @media (max-width: 680px) {
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 0;
            max-width: 560px;
          }
          .resources h1 { margin: 32px 0 32px; }
          .blog-grid .resource { padding: 20px 4px; gap: 14px; }
          .blog-grid .resource-link { font-size: 1.05rem; }
        }
      `}</style>

      <main className="resources max padding">
        <h1>Blog</h1>

        <ul className="blog-grid">
          {articles.map(({ to, label }) => (
            <li key={to} className="resource">
              <img src="/assets/redirect-icon.png" alt="LSAT blog article link" className="redirect" loading="lazy" />
              <Link to={to} className="resource-link">{label}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Resources;