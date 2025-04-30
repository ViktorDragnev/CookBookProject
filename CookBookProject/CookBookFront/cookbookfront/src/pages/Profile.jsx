import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton"; 

const Profile = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

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
  

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px", color: "black", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <h1>My Recipes</h1>
      {userRecipes.length === 0 ? (
        <p>No recipes found. Start adding some!</p>
      ) : (
        <ul>
          {userRecipes.map((recipe) => (
            <li key={recipe.name} style={{ padding: "12px", borderBottom: "1px solid #ddd", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{recipe.name}</strong> - {categoryMapping[recipe.dishType] || recipe.dishType}<br />
                <a href={`/recipe/${recipe.name}`} style={{ color: "#c28c5c" }}>View Recipe</a>
              </div>
              <button 
                onClick={() => handleDelete(recipe.name)} 
                style={{ backgroundColor: "red", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                X
              </button>
            </li>
          ))}
        </ul>
      )}
      <BackButton />
    </div>
  );
};

export default Profile;
