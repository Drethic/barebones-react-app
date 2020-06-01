import React, { useState } from 'react';
import AddIngredients from '../AddIngredients';
import { useInputValue, useIngredients } from '../../../utils/CustomHooks';
import IngredientList from '../IngredientList';

function IngredientForm(props) {
  const {
    units,
    ingredients,
    recipeObject,
    setRecipeObject,
  } = props;

  const handleRecipeStateChange = (values, spread = true) => {
    let newIngredients = [
      ...recipeObject.ingredients,
      values[Object.keys(values)[0]],
    ];
    if (!spread) {
      newIngredients = values;
    }
    return setRecipeObject({
      ...recipeObject,
      ingredients: newIngredients,
    });
  };

  const [ingSteps, setIngSteps] = useState([{ step: 0 }]);

  const getCurrentStep = (steps) => Math.max(...steps.map(({ step }) => step));

  const {
    inputValue,
    changeInput,
    clearInput,
    keyInput,
  } = useInputValue(
    getCurrentStep(ingSteps),
  );
  const {
    ingredientsList,
    addIngredients,
    removeIngredients,
  } = useIngredients(handleRecipeStateChange);

  const getNextStep = (steps) => getCurrentStep(steps) + 1;

  const removeStep = (steps, step, set) => {
    const tempSteps = steps.filter((currStep) => currStep.step !== step);
    set([...tempSteps]);
  };

  const incrementStep = (steps, set) => {
    set([...steps, { step: getNextStep(steps) }]);
  };

  const clearInputAndAddIngredient = () => {
    addIngredients(inputValue);
    clearInput(getNextStep(ingSteps));
    incrementStep(ingSteps, setIngSteps);
  };

  return (
    <>
      <AddIngredients
        onButtonClick={clearInputAndAddIngredient}
        onInputChange={changeInput}
        onInputKeyPress={(event) => keyInput(event, clearInputAndAddIngredient)}
        inputValue={inputValue}
        step={getCurrentStep(ingSteps)}
        units={units}
        ingredients={ingredients}
      />
      <IngredientList
        items={ingredientsList}
        units={units}
        ingredients={ingredients}
        onItemRemove={(idx) => removeIngredients(idx, ingSteps, setIngSteps, removeStep)}
      />
    </>
  );
}

export default IngredientForm;
