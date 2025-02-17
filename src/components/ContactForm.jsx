import React, { useState } from "react";
import emailjs from "@emailjs/browser";


const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await emailjs.sendForm(
        "service_v2nms5o",      // Service ID
        "template_da3xczk",      // Template ID
        e.target,                // Form data
        "vAlH0oPhePwpjdMFK"      // User token
      );
      console.log("SUCCESS!", result.status, result.text);
      setShowPopup(true); // Show the popup
    } catch (error) {
      console.log("FAILED...", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <>
      <form onSubmit={handleSubmit} >
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
