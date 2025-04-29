import React from 'react';
import Logo from './Logo';
import MenuButton from './MenuButton';
import SearchButton from './SearchButton';
import AuthButtons from './AuthButtons';
import PostButton from './PostButton';

const Navbar = ({ activeCategory, setActiveCategory }) => {
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

      <AuthButtons />
</nav>
  );
};

export default Navbar;
