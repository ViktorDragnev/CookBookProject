import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons = () => (
  <div style={{
    display: "flex",
    gap: "10px"
  }}>
    <Link 
      to="/signup"
      style={{
        textDecoration: "none"
      }}
    >
      <button
        style={{
          padding: "8px 16px",
          backgroundColor: "#c28c5c",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Signup
      </button>
    </Link>

    <Link 
      to="/login"
      style={{
        textDecoration: "none"
      }}
    >
      <button
        style={{
          padding: "8px 16px",
          backgroundColor: "#c28c5c",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </Link>
  </div>
);

export default AuthButtons;
