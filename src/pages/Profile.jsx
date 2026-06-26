import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/login");
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    getUserData();
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  if (!user) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading profile...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "10px" }}>Dashboard</h1>
      <p style={{ marginBottom: "20px" }}>Welcome back!</p>
      
      <div style={infoBoxStyle}>
        <p style={{ fontSize: "14px", color: "#aaa" }}>Logged in as:</p>
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>{user.email}</p>
      </div>

      <div style={buttonGroupStyle}>
        <button onClick={() => navigate("/quiz")} style={buttonStyle}>Start Career Discovery</button>
        <button onClick={() => navigate("/simulation")} style={buttonStyle}>Career Trial</button>
        <button onClick={() => navigate("/chat")} style={buttonStyle}>AI Career Chat</button>
        <button onClick={() => navigate("/roadmap")} style={buttonStyle}>My Roadmap</button>
        
        <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: "#ef4444", marginTop: "15px" }}>Logout</button>
      </div>
    </div>
  );
}

// Styles
const containerStyle = { padding: "40px", maxWidth: "500px", margin: "50px auto", textAlign: "center", backgroundColor: "#1a1a1a", borderRadius: "20px", color: "white" };
const infoBoxStyle = { margin: "20px 0", padding: "20px", border: "1px solid #444", borderRadius: "10px" };
const buttonGroupStyle = { display: "flex", flexDirection: "column", gap: "10px" };
const buttonStyle = {
  padding: "12px",
  backgroundColor: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background 0.3s"
};

export default Profile;