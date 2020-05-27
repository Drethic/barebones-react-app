import React from 'react';
// import React, { useState } from 'react';

function RecipeCard(props) {
  const {
    recipeData,
  } = props;
  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="cardContainer">
      <img src={recipeData.image_link} alt={recipeData.title} />
      <h3>{recipeData.title}</h3>
      <p>{recipeData.description}</p>
      <p>{recipeData.category_name}</p>
    </div>
  );
}

export default RecipeCard;
