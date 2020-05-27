import React, { useState, useEffect } from 'react';
import RecipeCard from './Card';

function Cards(props) {
  const {
    recipes,
  } = props;

  const [content, setContent] = useState((<h2>No recipes found, please add a recipe</h2>));

  useEffect(() => {
    if (recipes.length > 0) {
      setContent((
        <>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipe_id}
              recipeData={recipe}
            />
          ))}
        </>
      ));
    } else {
      setContent((<h2>No recipes found, please add a recipe</h2>));
    }
  }, [recipes]);

  return (
    <div>
      {content}
    </div>
  );
}

export default Cards;
