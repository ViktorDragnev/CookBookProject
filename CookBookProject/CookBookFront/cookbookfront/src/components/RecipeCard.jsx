import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div style={{
      backgroundColor: "white",
      color: "black",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      width: "300px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    }}>
      <h2>{recipe.name}</h2>
      <p>{recipe.description || "No description available"}</p>
      <p>{recipe.prepTime}</p>
      <Link to={`/recipes/${recipe.name}`} style={{
        display: "inline-block",
        marginTop: "10px",
        padding: "8px 16px",
        backgroundColor: "#e67e22",
        color: "white",
        borderRadius: "4px",
        textDecoration: "none"
      }}>
        View Full Recipe
      </Link>
    </div>
  );
};

export default RecipeCard;
