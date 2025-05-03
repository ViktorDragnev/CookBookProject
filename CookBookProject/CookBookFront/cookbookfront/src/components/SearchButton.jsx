import React from 'react';
import { Link } from 'react-router-dom';

const SearchButton = () => {
  const styles = {
    link: {
      textDecoration: "none",
      display: "inline-block",
      transition: "transform 0.2s ease"
    },
    button: {
      padding: "10px 24px",
      backgroundColor: "#c28c5c",
      color: "white",
      border: "none",
      borderRadius: "25px",
      cursor: "pointer",
      fontSize: "0.95rem",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      boxShadow: "0 2px 8px rgba(194, 140, 92, 0.3)",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden"
    },
    highlight: {
      position: "absolute",
      background: "rgba(255,255,255,0.2)",
      width: "100%",
      height: "40px",
      left: "0",
      top: "-40px",
      transition: "all 0.3s ease"
    }
  };

  return (
    <>
      {/* Embedded CSS for hover effects */}
      <style>
        {`
          .search-button-link:hover {
            transform: translateY(-2px);
          }
          .search-button:hover {
            background: #b07d4b;
            box-shadow: 0 4px 12px rgba(194, 140, 92, 0.4);
          }
          .search-button:hover svg {
            transform: scale(1.1);
          }
          .search-button:hover .button-highlight {
            top: 0;
          }
        `}
      </style>

      <Link 
        to="/search-by-ingredients"
        style={styles.link}
        className="search-button-link"
      >
        <button
          style={styles.button}
          className="search-button"
        >
          Advanced Search
          <span 
            style={styles.highlight}
            className="button-highlight"
          ></span>
        </button>
      </Link>
    </>
  );
};

export default SearchButton;