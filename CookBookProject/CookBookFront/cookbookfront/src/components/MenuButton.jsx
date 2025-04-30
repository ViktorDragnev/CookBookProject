import React, { useState, useEffect, useRef } from 'react';

const MenuButton = ({ activeCategory, setActiveCategory, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      {/* Modern Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "8px 16px",
          backgroundColor: isOpen ? "#e8d5bb" : "white", // Light beige when open
          color: "#5a3921", // Dark brown text
          border: "1px solid #e0e0e0",
          borderRadius: "20px", // Pill shape
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          transition: "all 0.2s ease",
          ":hover": {
            backgroundColor: "#f5f5f5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }
        }}
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={{
            marginRight: "4px",
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.3s"
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span style={{ fontWeight: "500" }}>Filter</span>
        {activeCategory !== "ALL" && (
          <span style={{
            backgroundColor: "#c28c5c",
            color: "white",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.7rem",
            marginLeft: "4px"
          }}>
            1
          </span>
        )}
      </button>

      {/* Modern Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: "0",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 1000,
          minWidth: "220px",
          overflow: "hidden",
          animation: "fadeIn 0.2s ease-out"
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setIsOpen(false);
              }}
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: activeCategory === category.id ? "#f8f4ee" : "transparent",
                color: activeCategory === category.id ? "#5a3921" : "#333",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "background-color 0.2s",
                ":hover": {
                  backgroundColor: "#f5f5f5"
                }
              }}
            >
              {activeCategory === category.id && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c28c5c">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Add this to your global CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MenuButton;