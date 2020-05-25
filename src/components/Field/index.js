import React from 'react';
import { TextField } from '@material-ui/core';

const Field = (props) => {
  const {
    name,
    fieldTypes,
    label,
    values,
    errors,
    touched,
    handleChange,
  } = props;

  return (
    <TextField
      name={name}
      helperText={touched[name] ? errors[name] : ''}
      error={touched[name] && Boolean(errors[name])}
      type={fieldTypes[name]}
      label={label}
      value={values[name]}
      onChange={handleChange}
      variant="outlined"
      data-cy={`${name}-input`}
    />
  );
};

export default Field;
