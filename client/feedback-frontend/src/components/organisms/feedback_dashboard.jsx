// import React, { useEffect, useState } from 'react';
// import FeedbackForm from '../molecules/feedback_form';
// import FeedbackDatas from '../molecules/feedback_datas';
// import { API_BASE } from '../../configuration/centralized';

// export default function Home() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchFeedbacks = async () => {
//     setLoading(true);
//     setError(null);
//     if (!API_BASE) {
//       setError('API base is not configured for the current environment; skipping fetch');
//       setFeedbacks([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       const listUrl = `${API_BASE}/api/feedback/list/`;
//       const res = await fetch(listUrl);
//       if (!res.ok) throw new Error('Failed to fetch');
//       const data = await res.json();
//       setFeedbacks(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFeedbacks();
//   }, []);

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
//         padding: '40px 20px',
//         fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <h1 style={{ color: '#2c3e50', marginBottom: 40, fontSize: 36, fontWeight: 700 }}>
//         Feedback Dashboard
//       </h1>

//       {/* Feedback Form Card */}
//       <div
//         style={{
//           width: '100%',
//           maxWidth: 720,
//           backgroundColor: '#ffffff',
//           padding: 30,
//           borderRadius: 15,
//           boxShadow: '0 12px 25px rgba(0,0,0,0.1)',
//           marginBottom: 50,
//           transition: 'all 0.3s ease',
//         }}
//       >
//         <h2 style={{ marginBottom: 25, color: '#34495e', fontWeight: 600 }}>Submit Feedback</h2>
//         <FeedbackForm onSuccess={fetchFeedbacks} />
//       </div>

//       {/* Feedback List Card */}
//       <div
//         style={{
//           width: '100%',
//           maxWidth: 720,
//           backgroundColor: '#ffffff',
//           padding: 30,
//           borderRadius: 15,
//           boxShadow: '0 12px 25px rgba(0,0,0,0.1)',
//           transition: 'all 0.3s ease',
//         }}
//       >
//         <h2 style={{ marginBottom: 25, color: '#34495e', fontWeight: 600 }}>Submitted Feedbacks</h2>

//         {loading && (
//           <div style={{ textAlign: 'center', color: '#7f8c8d', fontStyle: 'italic' }}>
//             Loading feedbacks...
//           </div>
//         )}

//         {error && <div style={{ color: 'red', marginBottom: 15 }}>{error}</div>}

//         {!loading && feedbacks.length === 0 && !error && (
//           <div style={{ textAlign: 'center', color: '#95a5a6', fontStyle: 'italic' }}>
//             No feedback submitted yet.
//           </div>
//         )}

//         {/* Feedback Cards */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
//           <FeedbackDatas feedbacks={feedbacks} />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import FeedbackForm from "../molecules/feedback_form";
import FeedbackDatas from "../molecules/feedback_datas";
import { API_BASE } from "../../configuration/centralized";
import "../../styles/feedback.css";

export default function Home() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!API_BASE) {
        setFeedbacks([]);
        return;
      }

      const res = await fetch(`${API_BASE}/api/feedback/list/`);
      if (!res.ok) throw new Error("Failed to fetch feedbacks");

      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback-page">

      {/* ================= FORM SECTION (FIXED) ================= */}
      <div className="form-area">
        <h2 className="title">Feedback Form</h2>

        <FeedbackForm onSuccess={fetchFeedbacks} />
      </div>

      {/* ================= LIST SECTION (SCROLL ONLY HERE) ================= */}
      <div className="list-area">
        <h3 className="title small">Submitted Feedbacks</h3>

        {loading && (
          <div className="text-center text-muted">Loading feedbacks...</div>
        )}

        {error && (
          <div className="text-center text-danger">{error}</div>
        )}

        {!loading && !error && (
          <div className="list-scroll">
            <FeedbackDatas feedbacks={feedbacks} />
          </div>
        )}
      </div>

    </div>
  );
}
