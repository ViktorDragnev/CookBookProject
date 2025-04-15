import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')}
      style={{
        padding: "10px 20px",
          backgroundColor: "#c28c5c",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
          marginLeft: "10px"
      }}
    >
      ← Back to Main Page
    </button>
  );
}

export default BackButton;