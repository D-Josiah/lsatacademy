import React, { useEffect } from "react";
import ContactForm from "../components/ContactForm";

const Services = () => {
  useEffect(() => {
    // Load Calendly script
    const calendlyScript = document.createElement("script");
    calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
    calendlyScript.async = true;
    document.body.appendChild(calendlyScript);

  }, []);

  return (
    <>
      <main className="services max padding spacer">
        <section className="content">
          <h1>Free LSAT Consultation</h1>
          <p>
            Take the first step toward achieving your LSAT goals. Let’s discuss your strengths, pinpoint areas for improvement, and create a personalized plan. 
            With 15+ years of expertise, I’m here to guide you every step of the way. No pressure! Just a conversation to explore how I can help you succeed. 
            Schedule your free consultation today.
          </p>
        </section>


        {/* Calendly Widget */}
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/dave-mcmaster/free-lsat-consultation?text_color=023247&primary_color=023247"
          style={{ minWidth: "320px", height: "700px" }}
        ></div>

        {/* Ensure ContactForm has the correct ID */}
        <ContactForm id="get-in-touch" />
      </main>
    </>
  );
};

export default Services;
