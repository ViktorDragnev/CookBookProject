import React, { useState } from 'react';

const MenuButton = ({ activeCategory, setActiveCategory, categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Button to Toggle Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "8px 16px",
          backgroundColor: "#c28c5c",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px"
        }}
      >
        <span>Menu</span>
        <span 
          style={{ 
            transform: isOpen ? "rotate(180deg)" : "none", 
            transition: "transform 0.3s" 
          }}
        >
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: "0",
          backgroundColor: "white",
          borderRadius: "4px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          zIndex: 1000,
          minWidth: "200px",
          textAlign: "center"
        }}>
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setIsOpen(false);
              }}
              style={{
                padding: "12px 16px",
                backgroundColor: activeCategory === category.id ? "#c28c5c" : "transparent",
                color: "#333",
                cursor: "pointer",
                borderBottom: "1px solid #f0f0f0"
              }}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
