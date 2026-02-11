import React from "react";
import "./history.css";

function History() {
  const quizData = [
    { quiz: "React Basics", score: 18, date: "Feb 10" },
    { quiz: "DBMS Quiz", score: 12, date: "Feb 8" },
    { quiz: "Algorithms", score: 9, date: "Feb 6" }
  ];

  return (
    <div className="history-container">
      <h1>Quiz Attempt History</h1>

      <table>
        <thead>
          <tr>
            <th>Quiz Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {quizData.map((q, i) => (
            <tr key={i}>
              <td>{q.quiz}</td>
              <td>{q.score}/20</td>
              <td>{q.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
