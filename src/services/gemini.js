export async function getCareerAnalysis() {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY; 
  const userProfile = JSON.parse(localStorage.getItem("quizResults") || "{}");

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { 
            role: "user", 
            content: `Create a career roadmap for someone interested in: ${userProfile.interest}. Provide response in this format: ### Top 3 Career Paths, ### The 'First Move', ### Hidden Opportunity.` 
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("API Error:", error);
    return "Error generating roadmap. Please check your internet connection.";
  }
}