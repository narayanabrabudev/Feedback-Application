import React from "react";

export default function FeedbackDatas({ feedbacks = [] }) {
  if (!feedbacks.length) {
    return <div className="no-data">No feedback yet.</div>;
  }

  return (
    <div className="feedback-list-wrapper">
      <div className="feedback-table-scroll">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Rating</th>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((f, i) => (
              <tr key={i} className="feedback-row">
                <td data-label="Name">{f.name || "-"}</td>
                <td data-label="Email">{f.email || "-"}</td>
                <td data-label="Type">{f.feedback_type || "-"}</td>
                <td data-label="Rating">{f.rating ?? "-"}</td>
                <td data-label="Subject">{f.subject || "-"}</td>
                <td data-label="Message">{f.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
