import React from 'react';
import { Link } from 'react-router-dom';

const PostButton = () => {

  return (
    <div style={{
      display: "flex",
      gap: "10px"
    }}>
      <Link 
        to="/addRecipe"
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
          Add Recipe
        </button>
      </Link>
    </div>
  );
};

export default PostButton;
