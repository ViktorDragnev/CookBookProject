import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import MenuButton from "./MenuButton";
import SearchButton from "./SearchButton";
import AuthButtons from "./AuthButtons";
import PostButton from "./PostButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";

const Navbar = ({ activeCategory, setActiveCategory }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedUser(storedUser);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const response = await axios.get(
        `http://localhost:8090/api/dishes/searchByName/${searchTerm}`
      );
      sessionStorage.setItem("searchResults", JSON.stringify(response.data));
      navigate("/search-results");
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("loggedInUser");
    window.location.reload();

    if (
      window.location.pathname === "/accountRecipes" ||
      window.location.pathname === "/accountSettings" ||
      window.location.pathname === "/addRecipe"
    ) {
      window.location.href = "/";
    } else {
      window.location.reload();
    }
  };

  const categories = [
    { id: "ALL", name: "All Recipes" },
    { id: "MAIN_COURSE", name: "Main Courses" },
    { id: "SALAD", name: "Salads" },
    { id: "APPETIZER", name: "Starters" },
    { id: "DESSERT", name: "Desserts" },
  ];

  return (
    <nav
      style={{
        width: "100%",
        backgroundColor: "white",
        padding: "15px 20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        boxSizing: "border-box"
      }}
    >
      <Logo />

      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          gap: "10px",
          flex: "0 1 250px",
          maxWidth: "250px"
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes..."
          style={{
            flex: "1",
            color: "black",
            backgroundColor: "white",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "0.9rem"
          }}
        />
        <button
          type="submit"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "-10px",
            marginRight: "40px"
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c28c5c"
            strokeWidth="2"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
  
      <div style={{ position: "relative", marginRight: "10px" }}>
        <MenuButton
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />
      </div>
  
      <SearchButton />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          flex: "1"
        }}
      >
      </div>

      <div style={{ position: "relative" }}>
        {loggedUser ? (
          <ProfileButton username={loggedUser} onLogout={handleLogout} />
        ) : (
          <AuthButtons />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
