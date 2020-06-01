import { useState } from 'react';

const defaultValues = (step) => ({
  [step]: {
    ingredient_id: '',
    unit_id: '',
    quantity: '',
  },
});
export const useInputValue = (initialStep) => {
  const [inputValue, setInputValue] = useState(defaultValues(initialStep));

  return {
    inputValue,
    changeInput: (field) => {
      const parts = field.split('-');
      const fieldName = parts[0];
      const step = parseInt(parts[1], 10);

      return (event) => {
        setInputValue({
          ...inputValue,
          [step]: {
            ...inputValue[step],
            [fieldName]: event.target.value,
          },
        });
      };
    },
    clearInput: (currentStep) => setInputValue(defaultValues(currentStep)),
    keyInput: (event, callback) => {
      if (event.which === 13 || event.keyCode === 13) {
        callback(inputValue);
        return true;
      }

      return false;
    },
  };
};

export const useIngredients = (handleChange, initialValue = []) => {
  const [ingredientsList, setIngredients] = useState(initialValue);

  const stripStep = (data) => data.map((step) => step[Object.keys(step)[0]]);

  return {
    ingredientsList,
    addIngredients: (values) => {
      if (values.name !== '') {
        setIngredients(
          ingredientsList.concat({
            ...values,
          }),
        );
        handleChange(values);
      }
    },
    removeIngredients: (idx, steps, set, removeStep) => {
      const step = parseInt(Object.keys(ingredientsList[idx])[0], 10);
      const newIngredients = ingredientsList.filter((ingredient, index) => idx !== index);
      setIngredients(newIngredients);
      handleChange(stripStep(newIngredients), false);
      removeStep(steps, step, set);
    },
  };
};

export const useInstValue = () => {
  const [instValue, setInstValue] = useState({ instruction: '' });

  return {
    instValue,
    changeInput: (event) => (
      setInstValue({
        instruction: event.target.value,
      })
    ),
    clearInput: () => setInstValue({ instruction: '' }),
    keyInput: (event, callback) => {
      if (event.which === 13 || event.keyCode === 13) {
        callback(instValue);
        return true;
      }

      return false;
    },
  };
};

export const useInstructions = (handleChange, initialValue = []) => {
  const [instructionsList, setInstructions] = useState(initialValue);

  return {
    instructionsList,
    addInstructions: (values) => {
      if (values.name !== '') {
        setInstructions(
          instructionsList.concat({
            ...values,
          }),
        );
        handleChange(
          instructionsList.concat({
            ...values,
          }),
        );
      }
    },
    removeInstructions: (idx) => {
      const newInstructions = instructionsList.filter((instruction, index) => idx !== index);
      setInstructions(newInstructions);
      handleChange(newInstructions);
    },
  };
};
