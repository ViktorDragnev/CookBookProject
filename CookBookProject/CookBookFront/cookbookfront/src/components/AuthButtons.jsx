import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthButtons = () => {
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isSignupHovered, setIsSignupHovered] = useState(false);

  // Base button styles
  const buttonBase = {
    padding: "10px 24px",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    border: "none",
    outline: "none"
  };

  return (
    <div style={{
      display: "flex",
      gap: "12px",
      alignItems: "center"
    }}>
      {/* Login Button */}
      <Link to="/login" style={{ textDecoration: "none" }}>
        <button
          style={{
            ...buttonBase,
            backgroundColor: isLoginHovered ? "rgba(194, 140, 92, 0.1)" : "transparent",
            color: "#c28c5c",
            border: "2px solid #c28c5c",
            transform: isLoginHovered ? "translateY(-2px)" : "none",
            boxShadow: isLoginHovered ? "0 4px 8px rgba(0,0,0,0.15)" : "0 2px 5px rgba(0,0,0,0.1)"
          }}
          onMouseEnter={() => setIsLoginHovered(true)}
          onMouseLeave={() => setIsLoginHovered(false)}
        >
          Login
        </button>
      </Link>

      {/* Signup Button */}
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <button
          style={{
            ...buttonBase,
            backgroundColor: isSignupHovered ? "#b07d4b" : "#c28c5c",
            color: "white",
            transform: isSignupHovered ? "translateY(-2px)" : "none",
            boxShadow: isSignupHovered ? "0 4px 8px rgba(0,0,0,0.15)" : "0 2px 5px rgba(0,0,0,0.1)"
          }}
          onMouseEnter={() => setIsSignupHovered(true)}
          onMouseLeave={() => setIsSignupHovered(false)}
        >
          Sign Up
        </button>
      </Link>
    </div>
  );
};

export default AuthButtons;