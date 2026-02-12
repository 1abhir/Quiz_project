import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function App() {

  const analyticsData = [
    { name: "Week1", score: 60 },
    { name: "Week2", score: 72 },
    { name: "Week3", score: 68 },
    { name: "Week4", score: 82 },
    { name: "Week5", score: 90 }
  ];

  const history = [
    { img:"https://cdn-icons-png.flaticon.com/512/1126/1126012.png", questions: 20, attempted: 18, progress: "90%", remarks: "Excellent" },
    { img:"https://cdn-icons-png.flaticon.com/512/4248/4248443.png", questions: 20, attempted: 12, progress: "60%", remarks: "Good" },
    { img:"https://cdn-icons-png.flaticon.com/512/2103/2103633.png", questions: 20, attempted: 9, progress: "45%", remarks: "Improve" }
  ];

  const glass = {
    background: "rgba(255,255,255,0.18)",
    backdropFilter: "blur(18px)",
    borderRadius: "22px",
    padding: "20px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
    color: "#111"
  };

  const thStyle = {
    padding: "14px",
    textAlign: "center",
    fontWeight: 600
  };

  const tdStyle = {
    padding: "14px",
    textAlign: "center",
    verticalAlign: "middle"
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "Segoe UI",
      background: "linear-gradient(135deg,#f8fafc,#e2e8f0)",
      color: "#111"
    }}>

      {/* Sidebar */}
      <aside style={{ width: "80px", background: "rgba(255,255,255,0.35)", padding: "20px", display:"flex", flexDirection:"column", gap:"25px", alignItems:"center", backdropFilter:"blur(10px)" }}>
        <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" width="26" style={{opacity:0.7}} />
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png" width="26" style={{opacity:0.7}} />
        <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" width="26" style={{opacity:0.7}} />
      </aside>

      <div style={{ flex:1, padding:"30px" }}>

        {/* HERO */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:"20px", marginBottom:"30px" }}>

          <div style={{ ...glass, display:"flex", alignItems:"center", gap:"25px" }}>
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" style={{ width:"140px", opacity:0.85 }} />
            <div>
              <h1 style={{ fontSize:"28px", marginBottom:"5px" }}>Abhishek L D</h1>
              <p style={{fontWeight:500}}>Quiz Analytics Dashboard • Data Science & Full‑Stack Enthusiast</p>
            </div>
          </div>

          <div style={glass}>
            <h3>Performance Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#111" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"20px", marginBottom:"30px" }}>
          <div style={glass}><h3>Total Quizzes</h3><h1>42</h1></div>
          <div style={glass}><h3>Accuracy</h3><h1>84%</h1></div>
          <div style={glass}><h3>Best Score</h3><h1>96%</h1></div>
          <div style={glass}><h3>Rank</h3><h1>#5</h1></div>
        </div>

        {/* HISTORY */}
        <div style={glass}>
          <h2>Quiz History</h2>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Subject</th>
                <th style={thStyle}>Questions</th>
                <th style={thStyle}>Attempted</th>
                <th style={thStyle}>Progress</th>
                <th style={thStyle}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h,i)=> (
                <tr key={i} style={{ borderTop:"1px solid rgba(0,0,0,0.15)" }}>
                  <td style={tdStyle}>
                    <img src={h.img} width="42" style={{display:"block",margin:"auto"}} />
                  </td>
                  <td style={tdStyle}>{h.questions}</td>
                  <td style={tdStyle}>{h.attempted}</td>
                  <td style={tdStyle}>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                      <div style={{background:'#e5e7eb',borderRadius:'10px',height:'10px',width:'80%'}}>
                        <div style={{width:h.progress,height:'10px',borderRadius:'10px',background:'linear-gradient(90deg,#111,#666)'}} />
                      </div>
                      <small>{h.progress}</small>
                    </div>
                  </td>
                  <td style={tdStyle}>{h.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
