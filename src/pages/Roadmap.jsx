import { useNavigate } from "react-router-dom";

export default function Roadmap() {
  const navigate = useNavigate();
  // Retrieve the recommendation we saved during the quiz/results phase
  const recommendation = localStorage.getItem("careerRecommendation");

  // A helper to render the cards if the recommendation exists
  const renderRoadmap = () => {
    if (!recommendation) return <p className="text-gray-400">No roadmap found. Please take the quiz again.</p>;

    return recommendation.split("###").filter(Boolean).map((section, idx) => (
      <div key={idx} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 mb-6 hover:border-indigo-500 transition-all">
        <div className="text-indigo-400 text-xl font-bold mb-3">
          {section.split("\n")[0]}
        </div>
        <div className="text-gray-300 leading-relaxed">
          {section.split("\n").slice(1).join("\n")}
        </div>
      </div>
    ));
  };

  return (
    <div className="p-10 max-w-3xl mx-auto text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Your Career Roadmap</h1>
      
      <div className="space-y-4">
        {renderRoadmap()}
      </div>

      <div className="mt-10 flex gap-4">
        <button 
          onClick={() => navigate("/profile")} 
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
        >
          Back to Dashboard
        </button>
        <button 
          onClick={() => navigate("/simulation")} 
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold transition"
        >
          Enter Simulation Lab →
        </button>
      </div>
    </div>
  );
}