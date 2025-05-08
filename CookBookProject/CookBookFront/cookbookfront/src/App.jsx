import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipesList from "./components/RecipesList";
import RecipeDetail from "./components/RecipeDetail";
import SearchByIngredients from "./components/SearchByIngredients";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubmitRecipe from "./pages/AddNewRecipeForm";
import SearchResults from "./components/SearchResults";
import AccountSettingsPage from "./pages/AccountSettingPage";
import RatingButton from "./components/RatingButton";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const endpoint =
        activeCategory === "ALL"
          ? "http://localhost:8090/api/dishes"
          : `http://localhost:8090/api/dishes/type/${activeCategory}`;

      const response = await axios.get(endpoint);
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [activeCategory]);

  return (
    <Router>
      <div
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          backgroundColor: "#fdf6e3", // Light background color for the entire app
          minHeight: "100vh", // Ensures full vertical coverage of the viewport
          minWidth: "100vw", // Ensures full horizontal coverage of the viewport
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
          overflow: "hidden", // Prevents content from spilling outside the viewport
          paddingTop: "90px",
        }}
      >
        {/* Navigation Bar */}
        <Navbar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Main Content */}
        <main
          style={{
            flex: 1, // Makes the main content take up remaining vertical space
            width: "100%", // Full horizontal width
            padding: "20px",
            boxSizing: "border-box", // Includes padding in the width calculation
          }}
        >
          <div
            style={{
              maxWidth: "1200px", // Constrain content width for better readability
              margin: "0 auto", // Center the main content horizontally
              width: "100%",
            }}
          >
            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  isLoading ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "black",
                      }}
                    >
                      Loading recipes...
                    </div>
                  ) : recipes.length > 0 ? (
                    <RecipesList recipes={recipes} />
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      <p style={{ color: "black" }}>No recipes found</p>
                    </div>
                  )
                }
              />
              <Route
                path="/addRecipe"
                element={<SubmitRecipe onRecipeAdded={fetchRecipes} />}
              />

              {/* Recipe Detail Page */}
              <Route path="/recipe/:name" element={<RecipeDetail />} />

              {/* Edit Recipe Page */}
              <Route
                path="/edit-recipe/:recipeName"
                element={<SubmitRecipe />}
              />

              {/* Search by Ingredients Page */}
              <Route
                path="/search-by-ingredients"
                element={<SearchByIngredients />}
              />

              {/* Login Page */}
              <Route path="/login" element={<Login />} />

              {/* Signup Page */}
              <Route path="/signup" element={<Signup />} />

              {/* Profile Page */}
              <Route path="/accountRecipes" element={<Profile />} />

              {/* Search Results Page */}
              <Route path="/search-results" element={<SearchResults />} />

              {/* Account Settings Page */}
              <Route
                path="/accountSettings"
                element={<AccountSettingsPage />}
              />
            </Routes>
          </div>
        </main>
        <RatingButton />
      </div>
    </Router>
  );
};

export default App;
