import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import MenuButton from './MenuButton';
import SearchButton from './SearchButton';
import AuthButtons from './AuthButtons';
import PostButton from './PostButton';

const Navbar = ({ activeCategory, setActiveCategory }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('loggedInUser');
    window.location.reload();

    if (window.location.pathname === '/profile' || window.location.pathname === '/addRecipe') {
      window.location.href = '/';
    } else {
      window.location.reload();
    }
  };

  const categories = [
    { id: "ALL", name: "All Recipes" },
    { id: "MAIN_COURSE", name: "Main Courses" },
    { id: "SALAD", name: "Salads" },
    { id: "APPETIZER", name: "Starters" },
    { id: "DESSERT", name: "Desserts" }
  ];

  return (
    <nav style={{
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
    }}>
      <Logo />

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        flex: "1"
      }}>
        <MenuButton 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          categories={categories} 
        />
        <SearchButton />
        <PostButton />
      </div>

      <div style={{ position: "relative" }}>
        {loggedUser ? (
          <>
            {/* Username Button */}
            <div 
              onClick={() => setIsOpen(!isOpen)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#c28c5c",
                color: "white",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {loggedUser}
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: "0",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                zIndex: 5000,
                minWidth: "160px",
                textAlign: "left",
                marginTop: "8px" // Added some spacing from the button
              }}>
                <div
                  onClick={() => window.location.href = '/profile'}
                  style={{
                    padding: "12px 16px",
                    color: "#333",
                    cursor: "pointer",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span>👤</span> Profile
                </div>
                <div
                  onClick={handleLogout}
                  style={{
                    padding: "12px 16px",
                    color: "#d32f2f",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span>🚪</span> Log Out
                </div>
              </div>
            )}
          </>
        ) : (
          <AuthButtons />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
