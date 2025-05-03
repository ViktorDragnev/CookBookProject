import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      onClick={() => navigate('/')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: "10px 20px",
        backgroundColor: isHovered ? "#b07d4b" : "#c28c5c",
        color: "white",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        margin: "0 10px 20px",
        fontSize: "0.95rem",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.3s ease",
        boxShadow: isHovered 
          ? "0 4px 8px rgba(194, 140, 92, 0.4)" 
          : "0 2px 5px rgba(194, 140, 92, 0.3)",
        transform: isHovered ? "translateY(-2px)" : "none"
      }}
    >
      <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        style={{
          transition: "transform 0.3s ease",
          transform: isHovered ? "translateX(-3px)" : "none"
        }}
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to Main Page
    </button>
  );
}

export default BackButton;