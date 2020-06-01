import React from 'react';
import RecipeCard from './Card';

const Cards = (props) => {
  const {
    recipes,
  } = props;
  return (
    <div className="cardContainer">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.recipe_id}
          recipeData={recipe}
        />
      ))}
    </div>
  );
};

export default Cards;
