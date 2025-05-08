import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecipesList = ({ recipes }) => {
  const [recipeImages, setRecipeImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = recipes.map(async (recipe) => {
        try {
          const response = await axios.get(
            `http://localhost:8090/api/dishes/${recipe.name}/image`,
            { responseType: 'blob' }
          );
          const imageUrl = URL.createObjectURL(response.data);
          return { name: recipe.name, url: imageUrl };
        } catch (error) {
          console.error(`Error fetching image for ${recipe.name}:`, error);
          return { name: recipe.name, url: null };
        }
      });

      const images = await Promise.all(imagePromises);
      const imageMap = images.reduce((acc, img) => {
        acc[img.name] = img.url;
        return acc;
      }, {});
      
      setRecipeImages(imageMap);
    };

    fetchImages();

    return () => {
      Object.values(recipeImages).forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [recipes]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px'
    }}>
      {recipes.map((recipe) => (
        <Link 
          to={`/recipe/${recipe.name}`} 
          key={recipe.name}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{
            backgroundColor: 'white',
            color: "black",
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            ':hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            {recipeImages[recipe.name] && (
              <div style={{
                width: '100%',
                height: '200px',
                marginBottom: '15px',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <img 
                  src={recipeImages[recipe.name]}
                  alt={recipe.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
            <h3 style={{ margin: '10px 0' }}>{recipe.name}</h3>
            <p style={{ 
              margin: '8px 0',
              fontSize: '0.9rem',
              color: '#666'
            }}>{recipe.description}</p>
            <p style={{
              margin: '8px 0',
              fontSize: '0.9rem',
              color: '#888'
            }}>{recipe.prepTime}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipesList;