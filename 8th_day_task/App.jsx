// ===== PREMIUM QUIZ ANALYTICS DASHBOARD (HOME + HISTORY + PROFILE + ADMIN + ROLE ACCESS) =====
// Install dependencies:
// npm install recharts framer-motion axios

import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

const glass = {
  background: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(20px)",
  borderRadius: 22,
  padding: 25,
  boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
};

export default function App() {
  const [section, setSection] = useState("home");
  const [role] = useState("admin"); // change to 'user' to test restriction
  const [analyticsData, setAnalyticsData] = useState([]);
  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/analytics")
      .then(r => setAnalyticsData(r.data))
      .catch(() => setAnalyticsData([
        { name:"Week1", score:60 },
        { name:"Week2", score:75 },
        { name:"Week3", score:82 },
        { name:"Week4", score:92 }
      ]));

    axios.get("http://localhost:5000/history")
      .then(r => setHistory(r.data))
      .catch(() => setHistory([
        { quiz:"React", score:88, date:"12 Feb" },
        { quiz:"Python", score:74, date:"10 Feb" }
      ]));

    axios.get("http://localhost:5000/users")
      .then(r => setUsers(r.data))
      .catch(() => setUsers([
        { name:"Abhishek", role:"admin" },
        { name:"John", role:"user" }
      ]));
  }, []);

  const quizzes = [
    { title:"React Quiz", questions:25, img:"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600" },
    { title:"Python Quiz", questions:20, img:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600" },
    { title:"SQL Quiz", questions:30, img:"https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600" }
  ];

  const avgScore = history.length
    ? Math.round(history.reduce((a,b)=>a+b.score,0)/history.length)
    : 0;

  return (
    <div style={{background:"linear-gradient(120deg,#f8fafc,#eef2ff,#f1f5f9)",minHeight:"100vh",padding:30,fontFamily:"Segoe UI",color:"#000"}}>

      {/* NAVBAR */}
      <div style={{...glass,display:"flex",justifyContent:"space-between",marginBottom:30}}>
        <h2>Quiz Dashboard</h2>
        <div style={{display:"flex",gap:20,cursor:"pointer"}}>
          <span onClick={()=>setSection("home")}>Home</span>
          <span onClick={()=>setSection("history")}>History</span>
          <span onClick={()=>setSection("profile")}>Profile</span>
          {role === "admin" && <span onClick={()=>setSection("admin")} style={{fontWeight:600}}>Admin</span>}
          <span style={{color:"red",fontWeight:600}}>Logout</span>
        </div>
      </div>

      {/* HOME */}
      {section === "home" && (
        <>
          <h2>Available Quizzes</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:25}}>
            {quizzes.map((q,i)=>(
              <motion.div key={i} whileHover={{scale:1.05}} style={{...glass,padding:0}}>
                <img src={q.img} style={{width:"100%",height:160,objectFit:"cover",borderRadius:"22px 22px 0 0"}} />
                <div style={{padding:20}}>
                  <h3>{q.title}</h3>
                  <p>{q.questions} Questions</p>
                  <button style={{padding:"10px 18px",borderRadius:10,border:"none",background:"#6366f1",color:"white"}}>Start Quiz</button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* HISTORY */}
      {section === "history" && (
        <div style={glass}>
          <h2>Quiz Analytics</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={analyticsData}>
              <CartesianGrid />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="score" stroke="#6366f1" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>

          <table style={{width:"100%",marginTop:20,color:"#000"}}>
            <thead>
              <tr><th>Quiz</th><th>Score</th><th>Date</th></tr>
            </thead>
            <tbody>
              {history.map((h,i)=>(
                <tr key={i}><td>{h.quiz}</td><td>{h.score}%</td><td>{h.date}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PROFILE */}
      {section === "profile" && (
        <>
          <h2>Profile Analytics</h2>
          <div style={{...glass,display:"flex",alignItems:"center",gap:20,marginBottom:25}}>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" width="80" style={{borderRadius:"50%"}} />
            <div><h3>Abhishek L D</h3><p>Quiz Performance Dashboard</p></div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20}}>
            <div style={glass}><h3>Total Quizzes</h3><h1>{history.length}</h1></div>
            <div style={glass}><h3>Average Score</h3><h1>{avgScore}%</h1></div>
            <div style={glass}><h3>Best Score</h3><h1>{Math.max(...history.map(h=>h.score),0)}%</h1></div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginTop:25}}>
            <div style={glass}>
              <h3>Skill Radar</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={[{skill:"React",A:80},{skill:"SQL",A:70},{skill:"Python",A:75}]}> 
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <Radar dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div style={glass}>
              <h3>Completion Donut</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={[{name:"Completed",value:80},{name:"Remaining",value:20}]} dataKey="value" innerRadius={60} outerRadius={90}>
                    <Cell fill="#6366f1" />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* ADMIN STUDENT MANAGEMENT */}
      {section === "admin" && role === "admin" && (
        <div style={glass}>
          <h2>Admin Dashboard</h2>
          <p>Student analytics and quiz subject management overview.</p>

          {/* Admin KPI */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20,marginTop:20}}>
            <div style={glass}><h3>Total Students</h3><h1>{users.length}</h1></div>
            <div style={glass}><h3>Total Subjects</h3><h1>{quizzes.length}</h1></div>
            <div style={glass}><h3>Total Attempts</h3><h1>{history.length}</h1></div>
          </div>

          {/* Students Table */}
          <h3 style={{marginTop:30}}>Student Details</h3>
          <table style={{width:"100%",borderCollapse:"collapse",color:"#000"}}>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Attempts</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u,i)=>(
                <tr key={i}>
                  <td>{u.name}</td>
                  <td>{u.email || "student@mail.com"}</td>
                  <td>{quizzes[i % quizzes.length].title}</td>
                  <td>{u.avg || "80%"}</td>
                  <td>{u.quizzes || 5}</td>
                  <td>{u.status || "Active"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Subjects Created */}
          <h3 style={{marginTop:30}}>Quiz Subjects Created</h3>
          <table style={{width:"100%",color:"#000"}}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>No. Questions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((q,i)=>(
                <tr key={i}>
                  <td>{q.title}</td>
                  <td>{q.questions}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Analytics Chart */}
          <div style={{marginTop:30}}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analyticsData}>
                <CartesianGrid />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="score" stroke="#6366f1" strokeWidth={3}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

    </div>
  );
}
