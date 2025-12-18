import React, { useState } from "react";
import { API_BASE } from "../../configuration/centralized";

const FEEDBACK_TYPES = [
  "Bug Report",
  "Feature Request",
  "General Feedback",
  "Complaint",
  "Appreciation",
];

export default function FeedbackForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    feedback_type: "General Feedback",
    rating: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE}/api/feedback/submit/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({
        name: "",
        email: "",
        phone: "",
        feedback_type: "General Feedback",
        rating: "",
        subject: "",
        message: "",
      });
      onSuccess && onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-100 px-4">

      <div className="row g-3">
        {/* LEFT */}
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input className="form-control" name="name" value={form.name} onChange={handleChange} />

          <label className="form-label mt-3">Email</label>
          <input className="form-control" name="email" value={form.email} onChange={handleChange} />

          <label className="form-label mt-3">Phone</label>
          <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
        </div>

        {/* RIGHT */}
        <div className="col-md-6">
          <label className="form-label">Feedback Type</label>
          <select className="form-select" name="feedback_type" value={form.feedback_type} onChange={handleChange}>
            {FEEDBACK_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <label className="form-label mt-3">Rating</label>
          <select className="form-select" name="rating" value={form.rating} onChange={handleChange}>
            <option value="">--</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>

          <label className="form-label mt-3">Subject</label>
          <input className="form-control" name="subject" value={form.subject} onChange={handleChange} />
        </div>

        {/* MESSAGE FULL WIDTH */}
        <div className="col-12">
          <label className="form-label">Message *</label>
          <textarea
            className="form-control"
            rows="4"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* BUTTON CENTER */}
      <div className="text-center my-4">
        <button className="btn btn-primary px-5">Send Feedback</button>
      </div>
    </form>
  );
}
