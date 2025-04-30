import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileButton = ({ username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      {/* Modern Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "8px 12px 8px 8px",
          backgroundColor: isOpen ? "#f0e6d8" : "transparent",
          color: "#5a3921",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.2s ease",
          fontWeight: "500",
          ":hover": {
            backgroundColor: "#f0e6d8"
          }
        }}
      >
        {/* User Avatar Circle */}
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "#c28c5c",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "600"
        }}>
          {username.charAt(0).toUpperCase()}
        </div>
        
        {/* Username */}
        <span style={{ fontSize: "0.95rem" }}>{username}</span>
        
        {/* Chevron Icon */}
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.3s"
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: "0",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 5000,
          minWidth: "180px",
          overflow: "hidden",
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div
            onClick={handleProfileClick}
            style={{
              padding: "12px 16px",
              color: "#333",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "background-color 0.2s",
              ":hover": {
                backgroundColor: "#f5f5f5"
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a3921" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Profile</span>
          </div>
          
          <div
            onClick={handleLogoutClick}
            style={{
              padding: "12px 16px",
              color: "#d32f2f",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "background-color 0.2s",
              ":hover": {
                backgroundColor: "#ffebee"
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d32f2f" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Log Out</span>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProfileButton;