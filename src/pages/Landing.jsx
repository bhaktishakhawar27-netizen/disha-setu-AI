// src/pages/Landing.jsx
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="quiz-container">
      <h1 className="text-5xl font-extrabold text-white mb-6">
        The Career You Never Knew Existed Might Be the One You're Meant For.
      </h1>
      <p className="text-xl text-gray-400 mb-10">
        Don't choose a career blindly. Discover it. Experience it. Build it.
      </p>
      <button onClick={() => navigate("/quiz")} className="quiz-btn text-lg px-10 py-4">
        Start My Journey
      </button>
    </div>
  );
}