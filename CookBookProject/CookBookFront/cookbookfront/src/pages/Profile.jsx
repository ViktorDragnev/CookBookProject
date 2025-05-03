import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import SubmitRecipe from './AddNewRecipeForm';

const Profile = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    const loggedUser = sessionStorage.getItem("loggedInUser");
    console.log("Fetching recipes for user:", loggedUser);

    if (!loggedUser) {
      console.error("No user found!");
      setLoading(false);
      return;
    }

    const fetchUserRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/user/${loggedUser}`);
        console.log("API Response:", response.data);
    
        setUserRecipes(Array.isArray(response.data.dishes) ? response.data.dishes : []);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, []);

  const categoryMapping = {
    "MAIN_COURSE": "Main Courses",
    "SALAD": "Salads",
    "APPETIZER": "Starters",
    "DESSERT": "Desserts"
  };

  const handleDelete = async (recipeName) => {
    const token = sessionStorage.getItem("authToken");
  
    if (!token) {
      console.error("No authentication token found!");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8090/api/dishes/${recipeName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log(`Deleted recipe: ${recipeName}`);
  
      setUserRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.name !== recipeName));
    } catch (error) {
      console.error("Error deleting recipe:", error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (recipeName) => {
    navigate(`/edit-recipe/${recipeName}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{maxWidth: "800px", margin: "0 auto", padding: "24px", color: "black", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <h1 style={{ textAlign: "center" }}>My Recipes</h1>
      {userRecipes.length === 0 ? (
        <p>No recipes found. Start adding some!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {userRecipes.map((recipe) => (
            <li key={recipe.name} style={{ 
              padding: "12px", 
              borderBottom: "1px solid #ddd", 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              ":hover": { backgroundColor: "#f9f9f9" }
            }}>
              <div>
                <strong>{recipe.name}</strong> - {categoryMapping[recipe.dishType] || recipe.dishType}<br />
                <a href={`/recipe/${recipe.name}`} style={{ color: "#c28c5c" }}>View Recipe</a>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleEdit(recipe.name)}
                  style={{
                    backgroundColor: "#c28c5c",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    ":hover": {
                      backgroundColor: "#b07d4b"
                    }
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(recipe.name)} 
                  style={{ 
                    backgroundColor: "#e74c3c",
                    color: "white", 
                    padding: "6px 12px", 
                    border: "none", 
                    borderRadius: "4px", 
                    cursor: "pointer",
                    transition: "all 0.2s",
                    ":hover": {
                      backgroundColor: "#c0392b"
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: "flex", justifyContent: "center" }} >
      <BackButton />
      </div>
    </div>
  );
};

export default Profile;