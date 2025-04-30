import React from 'react';
import { Link } from 'react-router-dom';

const SearchButton = () => (
  <Link 
    to="/search-by-ingredients"
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
      Advanced Search
    </button>
  </Link>
);

export default SearchButton;
