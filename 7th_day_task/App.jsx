// ===== QUIZ DASHBOARD WITH NAVIGATION (HOME QUIZ CARDS + HISTORY + PROFILE KPI) =====
// Install before running:
// npm install recharts framer-motion axios

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

const pageStyle = {
  background: "linear-gradient(120deg,#f8fafc,#eef2ff,#f1f5f9)",
  minHeight: "100vh",
  padding: 30,
  color: "#0f172a",
  fontFamily: "Segoe UI"
};

const glass = {
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(18px)",
  borderRadius: 22,
  padding: 26,
  boxShadow: "0 15px 45px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.7)"
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 28px",
  marginBottom: 30,
  ...glass
};

export default function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [history, setHistory] = useState([]);
  const [section, setSection] = useState("home");

  useEffect(() => {
    axios.get("http://localhost:5000/analytics")
      .then(res => setAnalyticsData(res.data))
      .catch(() => setAnalyticsData([
        { name: "Week1", score: 60 },
        { name: "Week2", score: 75 },
        { name: "Week3", score: 82 },
        { name: "Week4", score: 92 }
      ]));

    axios.get("http://localhost:5000/history")
      .then(res => setHistory(res.data))
      .catch(() => setHistory([
        { quiz: "React Basics", score: 90, date: "12 Feb", status: "Completed" },
        { quiz: "SQL Quiz", score: 65, date: "10 Feb", status: "Completed" }
      ]));
  }, []);

  const quizzes = [
    {
      title: "React Quiz",
      questions: 25,
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600"
    },
    {
      title: "Python Quiz",
      questions: 20,
      img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600"
    },
    {
      title: "SQL Quiz",
      questions: 30,
      img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600"
    },
    {
      title: "JavaScript Quiz",
      questions: 18,
      img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600"
    }
  ];

  return (
    <div style={pageStyle}>

      {/* NAVBAR */}
      <div style={navStyle}>
        <h2>Quiz Dashboard</h2>
        <div style={{ display: "flex", gap: 20 }}>
          <span style={{ cursor: "pointer" }} onClick={() => setSection("home")}>Home</span>
          <span style={{ cursor: "pointer" }} onClick={() => setSection("history")}>History</span>
          <span style={{ cursor: "pointer" }} onClick={() => setSection("profile")}>Profile</span>
          <span style={{ color: "red" }}>Logout</span>
        </div>
      </div>

      {/* HOME SECTION */}
      {section === "home" && (
        <>
          <h2>Available Quizzes</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {quizzes.map((q, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} style={{ ...glass, padding: 0, overflow: "hidden" }}>
                <img src={q.img} alt="quiz" style={{ width: "100%", height: 160, objectFit: "cover" }} />
                <div style={{ padding: 20 }}>
                  <h3>{q.title}</h3>
                  <p>{q.questions} Questions Available</p>
                  <button style={{ padding: "10px 18px", borderRadius: 12, border: "none", background: "#6366f1", color: "white", cursor: "pointer" }}>
                    Start Quiz
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* HISTORY SECTION */}
      {section === "history" && (
        <div style={glass}>
          <h2>Quiz History</h2>

          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={analyticsData}>
              <CartesianGrid stroke="#e2e8f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="score" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>

          <table style={{ width: "100%", marginTop: 20 }}>
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Score</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i}>
                  <td>{h.quiz}</td>
                  <td>{h.score}%</td>
                  <td>{h.date}</td>
                  <td>{h.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PROFILE KPI DASHBOARD */}
      {section === "profile" && (
        <>
          <h2>Profile Dashboard</h2>

          {/* Profile header */}
          <div style={{...glass,display:"flex",alignItems:"center",gap:20,marginBottom:20}}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              width="80"
              style={{borderRadius:"50%"}}
            />
            <div>
              <h3 style={{margin:0}}>Abhishek L D</h3>
              <p style={{margin:0,opacity:0.7}}>Quiz Performance Dashboard</p>
            </div>
          </div>

          {/* KPI cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            <div style={glass}><h3>Total Quizzes</h3><h1>42</h1></div>
            <div style={glass}><h3>Average Score</h3><h1>84%</h1></div>
            <div style={glass}><h3>Best Score</h3><h1>96%</h1></div>
            <div style={glass}><h3>Rank</h3><h1>#5</h1></div>
          </div>

          {/* Analytics chart in profile */}
          <div style={{...glass,marginTop:25}}>
            <h3>Performance Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={analyticsData}>
                <CartesianGrid stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="score" stroke="#6366f1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

    </div>
  );
}
