import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ interest: "", style: "" });
  const [loading, setLoading] = useState(false);

  // Clear previous results whenever the Quiz component mounts
  useEffect(() => {
    localStorage.removeItem("quizResults");
    localStorage.removeItem("careerRecommendation");
  }, []);

  const questions = [
    {
      q: "What area excites you most?",
      options: ["Technology", "Business", "Public Service", "Creative Arts"],
      key: "interest"
    },
    {
      q: "A critical bug appears before a deadline. What is your move?",
      options: [
        { text: "Fix it immediately, regardless of time.", style: "Technical" },
        { text: "Notify the team and assess the impact.", style: "Leadership" },
        { text: "Find a creative workaround.", style: "Creative" }
      ],
      key: "style"
    }
  ];

  const handleSelect = (key, value, styleValue) => {
    // Save the text for display, and the style for the AI analysis
    const newAnswers = { 
      ...answers, 
      [key]: value,
      // If we have a specific 'style' property, store that, otherwise store the text
      style: styleValue || value 
    };
    
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      finalizeQuiz(newAnswers);
    }
  };

  const finalizeQuiz = (finalAnswers) => {
    setLoading(true);
    localStorage.setItem("quizResults", JSON.stringify(finalAnswers));
    setTimeout(() => navigate("/results"), 1000);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
      <h2 className="text-2xl font-bold">Analyzing your professional profile...</h2>
    </div>
  );

  const currentQ = questions[step];

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-white">{currentQ.q}</h2>
      <div className="grid gap-4">
        {currentQ.options.map((opt, i) => {
          const text = opt.text || opt;
          const style = opt.style || opt;
          return (
            <button 
              key={i} 
              onClick={() => handleSelect(currentQ.key, text, style)} 
              className="p-6 bg-[#1a1a1a] hover:bg-[#4f46e5] text-white rounded-xl border border-gray-700 transition-all text-left"
            >
              {text}
            </button>
          );
        })}
      </div>
      <p className="text-gray-500 mt-8 text-sm">Step {step + 1} of {questions.length}</p>
    </div>
  );
}