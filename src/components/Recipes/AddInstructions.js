import React from 'react';
import { TextField, Button } from '@material-ui/core/';
import '../../css/instructionForm.css';

function AddInstructions(props) {
  const {
    values,
    onInputChange,
    onButtonClick,
  } = props;
  return (
    <>
      <div className="instructionFormInputs">
        <TextField
          id="instructions"
          label="Instruction"
          type="text"
          variant="outlined"
          value={values.instruction}
          onChange={onInputChange}
        />
        <Button
          color="secondary"
          variant="outlined"
          onClick={onButtonClick}
        >
          Add
        </Button>
      </div>
    </>
  );
}

export default AddInstructions;
