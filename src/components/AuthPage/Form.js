import React from 'react';
// import { Button, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Field from '../Field';

const AuthForm = (props) => {
  const {
    values,
    action,
    buttonLabel,
    handleSubmit,
    isValid,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="authInput">
        {Object.keys(values).map((key) => (
          <Field
            key={key}
            label={key}
            name={key}
            {...props}
          />
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
          data-cy={`${action}-input`}
        >
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
