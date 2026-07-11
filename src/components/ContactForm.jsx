import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showPopup, setShowPopup] = useState(false);
  // Bot mitigation (SEC-006): a hidden honeypot field real users never fill,
  // and a minimum time-on-form so scripted instant submits are dropped. Real
  // rate-limiting still belongs in the EmailJS dashboard (allowed origins).
  const [website, setWebsite] = useState(""); // honeypot
  const mountedAt = useRef(Date.now());

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Drop obvious bots silently: honeypot filled, or submitted < 3s after load.
    if (website || Date.now() - mountedAt.current < 3000) {
      setShowPopup(true); // show the same success UI; don't tip off the bot
      return;
    }

    try {
      const result = await emailjs.sendForm(
        "service_0yhiz5p",      // Service ID
        "template_bpp5mkj",      // Template ID
        e.target,                // Form data
        "vAlH0oPhePwpjdMFK"      // User token
      );
      console.log("SUCCESS!", result.status, result.text);
      setShowPopup(true); // Show the popup

      // Trigger a HubSpot tracking event
      window._hsq = window._hsq || [];
      window._hsq.push(["trackEvent", {
        id: "contact_form_submission", // Custom event ID
        value: "Form submitted with data", // Custom description
        name: formData.name,            // Optional: include form data like name, email
        email: formData.email
      }]);
    } catch (error) {
      console.log("FAILED...", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Get in Touch</h2>
        <div className="input">
          <div className="details">
            <div className="name">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="message">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        {/* Honeypot — visually hidden, off-screen, not tabbable. Bots fill it. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          aria-hidden="true"
        />
        <button type="submit">Send</button>
      </form>

      {/* Popup for form submission success */}
      {showPopup && (
        <div className="pop-up-modal" id="popup">
          <div className="modal-content">
            <h2>Thank you for reaching out to LSAT ACADEMY!</h2>
            <p>We’ve received your message and will get back to you shortly.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
