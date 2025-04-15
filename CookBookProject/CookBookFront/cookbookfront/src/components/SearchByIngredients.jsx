import React, { useState } from "react";
import axios from "axios";
import RecipesList from "./RecipesList";
import BackButton from "./BackButton";

const SearchByIngredients = () => {
  const [ingredients, setIngredients] = useState([""]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredientField = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSearch = async () => {
    const filteredIngredients = ingredients.filter(ing => ing.trim().length > 0);

    if (filteredIngredients.length === 0) return;

    setLoading(true);

    try {
      const params = new URLSearchParams();
      filteredIngredients.forEach((ing) => params.append("ingredients", ing));

      const response = await axios.get(
        `http://localhost:8090/api/dishes/filterByIngredients?${params.toString()}`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>

      <h2 style={{ marginBottom: "16px", color: "black" }}>Search Recipes by Ingredients</h2>

      {/* Render input fields dynamically */}
      {ingredients.map((ingredient, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder={`Ingredient ${index + 1}`}
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "white",
              color: "black"
            }}
          />
          <button
            onClick={() => removeIngredientField(index)}
            style={{
              marginLeft: "10px",
              padding: "10px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Remove
          </button>
        </div>
      ))}

      {/* Add Ingredient Button */}
      <button
        onClick={addIngredientField}
        style={{
          padding: "10px 20px",
          backgroundColor: "#c28c5c",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
          marginRight: "10px"
        }}
      >
        Add Ingredient
      </button>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          backgroundColor: "#c28c5c",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Search
      </button>

      <BackButton />

      {/* Show Loading */}
      {loading && <p style={{ marginTop: "20px", color: "black" }}>Searching...</p>}

      {/* Show Recipes in RecipeList format */}
      {!loading && recipes.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "black" }}>Search Results:</h3>
          <RecipesList recipes={recipes} />
        </div>
      )}

      {/* No results */}
      {!loading && recipes.length === 0 && ingredients.some(ing => ing.trim() !== "") && (
        <p style={{ marginTop: "20px", color: "black" }}>No recipes found.</p>
      )}
    </div>
  );
};

export default SearchByIngredients;
