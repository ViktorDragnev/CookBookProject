import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from './BackButton';

const RecipeDetail = () => {
    const { name } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const decodedName = decodeURIComponent(name);
        const response = await axios.get(`http://localhost:8090/api/dishes/${decodedName}`);
        setRecipe(response.data);
        const imageResponse = await axios.get(`http://localhost:8090/api/dishes/${decodedName}/image`, {
            responseType: 'blob'
          });
        const imageBlob = imageResponse.data;
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [name]);

  if (loading) return <div>Loading...</div>;

  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      color: "black",
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
    }}>
    
      {imageSrc && (
        <img 
          src={imageSrc}
          alt={recipe.name}
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px" }}
        />
      )}
      <h1>{recipe.name}</h1>
      <p><strong>Creator:</strong> {recipe.user.username || 'N/A'}</p>
      <p><strong>Description:</strong> {recipe.description || 'N/A'}</p>
      <p><strong>Prep Time:</strong> {recipe.prepTime || 'N/A'}</p>
      <p><strong>Category:</strong> {recipe.dishType || 'N/A'}</p>
      <div>
            <h2>Ingredients</h2>
                <ul>
                    {recipe.ingredientList.map((ingredient, index) => (
                        <li key={index}>{ingredient.name}</li>
                    ))}
                </ul>

                <h2>Steps</h2>
                    <ol>
                        {recipe.steps.map((stepObj, index) => (
                            <li key={index}>{stepObj.step}</li>
                        ))}
                    </ol>
      </div>
      <BackButton/>
    </div>
  );
};

export default RecipeDetail;
