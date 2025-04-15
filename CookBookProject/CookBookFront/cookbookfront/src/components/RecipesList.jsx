import { Link } from 'react-router-dom';

const RecipesList = ({ recipes }) => {
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
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <p>{recipe.prepTime}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipesList;