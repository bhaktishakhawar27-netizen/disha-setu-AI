import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Simulation() {
  const navigate = useNavigate();
  const [careerTitle, setCareerTitle] = useState("Loading Simulation...");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Get the first job title suggested by the AI
    const savedRec = localStorage.getItem("careerRecommendation");
    if (savedRec) {
      // Takes the first line of the AI response as the title
      const title = savedRec.split('\n')[0].replace(/###/g, "").trim();
      setCareerTitle(title);
    }
  }, []);

  return (
    <div className="p-10 max-w-lg mx-auto bg-[#1a1a1a] rounded-3xl shadow-2xl border border-gray-700 text-white">
      {!finished ? (
        <>
          <h2 className="text-3xl font-bold mb-2 text-indigo-400">{careerTitle} Trial</h2>
          <p className="mb-6 text-gray-400 italic">Test your skills in this professional scenario.</p>
          
          <div className="bg-gray-900 p-6 rounded-xl mb-6 border-l-4 border-indigo-500">
            <p className="font-semibold text-lg">Scenario:</p>
            <p className="mt-2 text-gray-300">
              You are working as a {careerTitle}. A high-priority system error occurs 
              right before a client presentation. How do you respond?
            </p>
          </div>

          <div className="grid gap-3">
            <button 
              onClick={() => {setScore(10); setFinished(true)}} 
              className="p-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition font-bold"
            >
              Analyze the logs and hot-patch the error.
            </button>
            <button 
              onClick={() => {setScore(0); setFinished(true)}} 
              className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
            >
              Restart the whole server immediately.
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-3xl font-bold mb-4">Simulation Complete</h2>
          <p className="text-5xl my-6 text-indigo-400">{score}/10</p>
          <p className="text-lg mb-8">
            {score === 10 
              ? "Excellent! Your approach matches a professional in this field." 
              : "Interesting choice! This role requires specific technical protocols."}
          </p>
          <button 
            onClick={() => navigate("/roadmap")} 
            className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}