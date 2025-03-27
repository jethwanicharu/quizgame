import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";

const quizzes = [
  {
    title: "Quiz 1",
    questions: [
      { question: "What is 2+2?", options: ["3", "4", "5", "6"], answer: 1 },
      { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
      { question: "What is 5*3?", options: ["15", "20", "25", "30"], answer: 0 },
      { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
      { question: "What is the square root of 16?", options: ["2", "4", "6", "8"], answer: 1 }
    ]
  },
  {
    title: "Quiz 2",
    questions: [
      { question: "What is 10/2?", options: ["2", "4", "5", "6"], answer: 2 },
      { question: "What is the color of the sky?", options: ["Green", "Blue", "Red", "Yellow"], answer: 1 },
      { question: "What is 7+3?", options: ["8", "9", "10", "11"], answer: 2 },
      { question: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: 1 },
      { question: "Which is the largest ocean?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: 1 }
    ]
  }
];

function Home() {
  return (
    <div className="home">
      <h1>Choose a Quiz</h1>
      {quizzes.map((quiz, index) => (
        <Link key={index} to={`/quiz/${index}`} className="quiz-link">{quiz.title}</Link>
      ))}
    </div>
  );
}

function Quiz({ quizIndex }) {
  const navigate = useNavigate();
  const quiz = quizzes[quizIndex];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerCheck = () => {
    if (selectedOption === quiz.questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  return showResult ? (
    <div className="result">
      <h2>Quiz Completed!</h2>
      <p>Correct Answers: {score}</p>
      <p>Incorrect Answers: {quiz.questions.length - score}</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  ) : (
    <div className="quiz">
      <h2>{quiz.questions[currentQuestion].question}</h2>
      <ul>
        {quiz.questions[currentQuestion].options.map((option, index) => (
          <li
            key={index}
            className={selectedOption === index ? "selected" : ""}
            onClick={() => setSelectedOption(index)}
          >
            {option}
          </li>
        ))}
      </ul>
      <button disabled={selectedOption === null} onClick={handleAnswerCheck}>Check Your Answer</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:quizIndex" element={<QuizWrapper />} />
      </Routes>
    </Router>
  );
}

function QuizWrapper() {
  const quizIndex = parseInt(window.location.pathname.split("/").pop());
  return <Quiz quizIndex={quizIndex} />;
}

export default App;
