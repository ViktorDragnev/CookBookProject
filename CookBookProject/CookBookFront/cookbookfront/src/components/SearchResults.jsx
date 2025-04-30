import React, { useEffect, useState } from 'react';
import RecipesList from './RecipesList';
import BackButton from './BackButton';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedResults = sessionStorage.getItem('searchResults');
      console.log('Retrieved from session:', storedResults);
      
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        console.log('Parsed results:', parsedResults);
        
        const resultsArray = Array.isArray(parsedResults) ? parsedResults : [parsedResults];
        setSearchResults(resultsArray);
      }
    } catch (error) {
      console.error('Error processing search results:', error);
    } finally {
      setLoading(false);
      sessionStorage.removeItem('searchResults');
    }
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        minHeight: "calc(100vh - 90px)",
        color: "black" 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "20px"
      }}>
        <BackButton />
      </div>
      
      <h2 style={{ 
        color: "black", 
        marginBottom: "20px",
        textAlign: "center"
      }}>
        Search Results
      </h2>
      
      {searchResults && searchResults.length > 0 ? (
        <>
          <p style={{ 
            color: "black", 
            marginBottom: "20px",
            textAlign: "center"
          }}>
            Found {searchResults.length} recipe(s)
          </p>
          <div style={{ width: "100%" }}>
            <RecipesList recipes={searchResults} />
          </div>
        </>
      ) : (
        <p style={{ 
          color: "black",
          textAlign: "center" 
        }}>
          No recipes found.
        </p>
      )}
    </div>
  );
};

export default SearchResults;