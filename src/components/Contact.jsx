import { useState } from "react";
import Reveal from "./Reveal";

// Contact: request-a-viewing form with confirmation.
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "" });
  const [done, setDone] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setDone(true); };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Get in Touch</span>
          <h2 className="section-title">Book a <em>Viewing</em></h2>
          <p className="section-subtitle">Tell us what you're looking for and an agent will reach out within a day.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="contact-card">
            {done ? (
              <div className="confirmation">
                <h3>Thank you, {form.name}!</h3>
                <p>An agent will contact you shortly at {form.email}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                </div>
                <div className="form-group">
                  <label>What are you looking for?</label>
                  <input name="interest" value={form.interest} onChange={handleChange} placeholder="e.g. 3-bed house in Westfield" />
                </div>
                <button type="submit" className="btn btn-sand" style={{ width: "100%", justifyContent: "center" }}>Request a Viewing</button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;
