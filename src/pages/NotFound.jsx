import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | LSAT Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        textAlign: "center",
        padding: "60px 2rem",
        fontFamily: "'Poppins', sans-serif",
        color: "#023247"
      }}>
        <h1 style={{
          fontFamily: "'Bree Serif', serif",
          fontSize: "6rem",
          fontWeight: "100",
          margin: "0",
          lineHeight: "1",
          color: "#2A8E9E"
        }}>404</h1>

        <h2 style={{
          fontFamily: "'Bree Serif', serif",
          fontSize: "2rem",
          fontWeight: "100",
          margin: "20px 0 12px"
        }}>Page Not Found</h2>

        <p style={{
          fontSize: "1.1rem",
          opacity: "0.65",
          maxWidth: "420px",
          lineHeight: "1.7",
          marginBottom: "40px"
        }}>
          Looks like this page doesn't exist. Let's get you back on track.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/" style={{
            padding: "14px 32px",
            borderRadius: "50px",
            background: "#023247",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1rem",
            textDecoration: "none"
          }}>
            Go Home
          </Link>
          <Link to="/consultation" style={{
            padding: "14px 32px",
            borderRadius: "50px",
            background: "transparent",
            color: "#023247",
            fontWeight: "600",
            fontSize: "1rem",
            textDecoration: "none",
            border: "2px solid #023247"
          }}>
            Book a Consultation
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;