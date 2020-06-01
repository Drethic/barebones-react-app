import React from 'react';
import AddInstructions from '../AddInstructions';
import { useInstValue, useInstructions } from '../../../utils/CustomHooks';
import InstructionList from '../InstructionList';

function InstructionsForm(props) {
  const {
    recipeObject,
    setRecipeObject,
  } = props;

  const handleRecipeStateChange = (values) => {
    const updatedInst = values.map((value, index) => (
      { step_no: index + 1, instruction: value.instruction }
    ));
    return setRecipeObject({
      ...recipeObject,
      instructions: [
        ...updatedInst,
      ],
    });
  };

  const {
    instValue,
    changeInput,
    clearInput,
    keyInput,
  } = useInstValue();

  const {
    instructionsList,
    addInstructions,
    removeInstructions,
  } = useInstructions(handleRecipeStateChange);

  const clearInputAndAddIngredient = () => {
    addInstructions(instValue);
    clearInput();
  };

  return (
    <>
      <AddInstructions
        onButtonClick={clearInputAndAddIngredient}
        onInputChange={changeInput}
        onInputKeyPress={(event) => keyInput(event, clearInputAndAddIngredient)}
        values={instValue}
      />
      <InstructionList
        items={instructionsList}
        onItemRemove={(idx) => removeInstructions(idx)}
      />
    </>
  );
}

export default InstructionsForm;
