import React from "react";
import { Link } from "react-router-dom";


const PrivacyPolicy = () => {
  return (
    <>
      <main className="privacy max padding spacer">
        <div className="privacy-container">
          <h1 className="privacy-title">Privacy Policy for LSAT Academy</h1>
          <p className="privacy-date">Effective Date: January 1, 2025</p>

          <section className="privacy-section">
            <h2>Overview</h2>
            <p>
              At LSAT Academy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our LSAT tutoring services and book appointments through our website.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Information We Collect</h2>
            <p>We collect only the minimum information necessary to provide our tutoring services:</p>
            <ul>
              <li><strong>Name:</strong> To identify you and personalize our services</li>
              <li><strong>Email Address:</strong> To communicate with you regarding your tutoring sessions, send appointment confirmations, and provide updates about our services</li>
            </ul>
            <p>We do not collect any other personal information unless you voluntarily provide it to us.</p>
          </section>

          <section className="privacy-section">
            <h2>How We Use Your Information</h2>
            <p>We use your name and email address solely for the following purposes:</p>
            <ul>
              <li>Processing and confirming your tutoring session bookings</li>
              <li>Sending appointment reminders and scheduling updates</li>
              <li>Communicating important information about your tutoring sessions</li>
              <li>Responding to your inquiries and providing customer support</li>
              <li>Sending occasional updates about our services (with your consent)</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Data Storage and Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your information is stored securely and accessed only by authorized personnel who need it to provide our services.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Data Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul>
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or respond to lawful requests</li>
              <li>To protect our rights, privacy, safety, or property</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of any inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications at any time</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Marketing Communications</h2>
            <p>
              If you have opted to receive updates about our services, you can unsubscribe at any time by clicking the unsubscribe link in our emails or by contacting us directly.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website with an updated effective date.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <div className="contact-info">
              <p><strong>LSAT Academy</strong></p>
              <p>Email: <a href="mailto:david@lsat.academy">info@lsat.academy</a></p>
              <p>Website: <a href="https://www.lsat.academy/" target="_blank" rel="noopener noreferrer">https://www.lsat.academy/</a></p>
            </div>
          </section>

          <div className="privacy-footer">
            <p><em>By using our services, you acknowledge that you have read and understood this Privacy Policy.</em></p>
          </div>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;