import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCareerPath() {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      const savedData = localStorage.getItem("quizResults");
      const quizAnswers = savedData ? JSON.parse(savedData) : { interest: "Technology", style: "Technical" };

      // We explicitly ask for formatting with "###" so we can split it later
      const prompt = `Act as an expert career counselor. Industry: ${quizAnswers.interest}. Style: ${quizAnswers.style}. 
      Suggest 3 modern job titles. For each, use this format:
      ### Job Title
      **Why it fits:** Your explanation here.
      
      Keep it professional and concise.`;

      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }]
          })
        });

        const data = await response.json();
        
        if (!response.ok) {
          setAiResponse(`Error: ${data.error?.message || "Something went wrong"}`);
        } else {
          const result = data.choices[0].message.content;
          setAiResponse(result);
          localStorage.setItem("careerRecommendation", result);
        }
      } catch (error) {
        setAiResponse("Failed to connect. Check your internet or API key.");
      } finally {
        setLoading(false);
      }
    }
    fetchCareerPath();
  }, []);

  // Helper to split the AI text into neat cards
  const renderCards = () => {
    return aiResponse.split("###").filter(Boolean).map((section, idx) => (
      <div key={idx} className="bg-[#222] p-6 rounded-xl border border-indigo-500/30 mb-4 hover:border-indigo-500 transition-all">
        <div className="text-white text-xl font-bold mb-2 text-indigo-300">
          {section.split("\n")[0]}
        </div>
        <div className="text-gray-300">
          {section.split("\n").slice(1).join("\n")}
        </div>
      </div>
    ));
  };

  return (
    <div className="p-10 max-w-3xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-8">Your Personalized Roadmap</h1>
      
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-indigo-300">Analyzing your career trajectory...</p>
          </div>
        ) : (
          renderCards()
        )}
      </div>

      {!loading && (
        <div className="mt-10 flex justify-center">
          <button 
            onClick={() => navigate("/simulation")} 
            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all"
          >
            Enter Simulation Lab →
          </button>
        </div>
      )}
    </div>
  );
}