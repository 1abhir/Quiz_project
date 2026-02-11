import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const historyData = [
    { quiz: "React Basics", score: 18, date: "Feb 10" },
    { quiz: "DBMS Quiz", score: 12, date: "Feb 8" },
    { quiz: "Algorithms", score: 9, date: "Feb 6" }
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const filtered = historyData.filter(q =>
    q.quiz.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={layout}>

      {/* Sidebar with hover animation */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={sidebar}
      >
        <h2 style={{ color: "cyan", marginBottom: 30 }}>QuizDash</h2>
        {navItems.map(n => (
          <motion.p
            key={n}
            whileHover={{ x: 6, color: "cyan" }}
            style={navStyle}
          >
            {n}
          </motion.p>
        ))}
      </motion.aside>

      {/* Main */}
      <div style={{ flex: 1, padding: 30 }}>

        {/* Navbar */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={navbar}
        >
          <input
            placeholder="Search quizzes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={searchBox}
          />
          <span style={{ fontWeight: "bold" }}>Abhishek</span>
        </motion.div>

        {/* Stats Cards */}
        <div style={cardsRow}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.04 }}
              style={glassCard}
            >
              <p style={label}>{s.title}</p>
              <h2 style={{ color: "cyan" }}>{s.value}</h2>
            </motion.div>
          ))}
        </div>

        {/* Chart with loading skeleton */}
        <GlassSection title="Performance Trend">
          {loading ? <Skeleton height={300} /> : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="quiz" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </GlassSection>

        {/* History table with page animation */}
        <AnimatePresence>
          <GlassSection title="Quiz History">
            {loading ? (
              <Skeleton height={200} />
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={th}>Quiz</th>
                    <th style={th}>Score</th>
                    <th style={th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((q, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ backgroundColor: "#334155" }}
                    >
                      <td style={td}>{q.quiz}</td>
                      <td style={td}>{q.score}/20</td>
                      <td style={td}>{q.date}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </GlassSection>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function GlassSection({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{ ...glassCard, marginBottom: 30 }}
    >
      <h2 style={{ marginBottom: 15 }}>{title}</h2>
      {children}
    </motion.div>
  );
}

function Skeleton({ height }) {
  return (
    <div
      style={{
        height,
        borderRadius: 12,
        background: "linear-gradient(90deg,#1e293b,#334155,#1e293b)",
        animation: "pulse 1.4s infinite"
      }}
    />
  );
}

/* ---------- Styles ---------- */

const layout = { display: "flex", minHeight: "100vh", background: "#020617", color: "white", fontFamily: "Arial" };
const sidebar = { width: 250, padding: 25, borderRight: "1px solid #1e293b" };
const navbar = { display: "flex", justifyContent: "space-between", marginBottom: 30 };
const searchBox = { padding: 10, borderRadius: 8, border: "none", width: 250 };
const cardsRow = { display: "flex", gap: 20, marginBottom: 30 };
const navStyle = { marginBottom: 15, cursor: "pointer", color: "#cbd5f5" };
const label = { color: "#94a3b8" };
const glassCard = { background: "rgba(30,41,59,0.6)", padding: 20, borderRadius: 14, backdropFilter: "blur(10px)", boxShadow: "0 0 20px rgba(0,255,255,0.08)" };
const th = { padding: 10, textAlign: "left", color: "#94a3b8" };
const td = { padding: 10 };

const navItems = ["Dashboard", "Analytics", "History", "Profile"];
const stats = [
  { title: "Quizzes Done", value: "42" },
  { title: "Accuracy", value: "84%" },
  { title: "Rank", value: "#5" }
];