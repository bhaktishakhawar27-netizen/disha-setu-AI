import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your career coach. Based on your roadmap, how can I help you grow today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // 1. Added Loading State

  async function sendMessage() {
    if (!input.trim() || loading) return; 
    
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true); // Start loading

    try {
      const roadmap = localStorage.getItem("careerRecommendation") || "User is exploring careers.";
      
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: `You are a career coach. The user's roadmap is: ${roadmap}. Keep answers structured with bullet points.` },
            ...newMessages
          ]
        })
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();
      setMessages([...newMessages, data.choices[0].message]);
    } catch (error) {
      // 2. Added Error Handling
      setMessages([...newMessages, { role: "assistant", content: "⚠️ Sorry, I'm having trouble connecting. Please check your API key or try again later." }]);
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto h-[90vh] flex flex-col">
      <h2 className="text-3xl font-bold text-white mb-6">AI Career Coach</h2>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-4 rounded-xl max-w-[85%] ${m.role === 'user' ? 'bg-indigo-600 ml-auto' : 'bg-gray-800'}`}>
            <p className="text-white whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {loading && (
          <div className="p-4 rounded-xl max-w-[85%] bg-gray-800 text-gray-400 italic">
            Coach is thinking...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input 
          className="flex-1 p-4 bg-[#1a1a1a] rounded-xl border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
          placeholder={loading ? "Waiting for response..." : "Ask about your next career step..."}
          value={input} 
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button 
          onClick={sendMessage} 
          disabled={loading}
          className={`px-6 rounded-xl font-bold ${loading ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-500'}`}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}