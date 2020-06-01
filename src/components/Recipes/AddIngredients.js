import React from 'react';
import { TextField, FormControl, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  formControl: {
    display: 'inline-block',
    alignItems: 'center',
  },
}));

function AddIngredients(props) {
  const {
    units,
    ingredients,
    onButtonClick,
    step,
    inputValue,
    onInputChange,
  } = props;
  const classes = useStyles();

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <TextField
          id="quantity"
          label="Quantity"
          type="number"
          variant="outlined"
          value={inputValue[step].quantity}
          onChange={onInputChange(`quantity-${step}`)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          native
          value={inputValue[step].unit_id}
          onChange={onInputChange(`unit_id-${step}`)}
          label="Units"
          variant="outlined"
          inputProps={{
            name: 'units',
            id: 'units-select-outlined',
          }}
        >
          <option aria-label="None" value="">
            Add Unit
          </option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          native
          value={inputValue[step].ingredient_id}
          onChange={onInputChange(`ingredient_id-${step}`)}
          label="ingredient"
          variant="outlined"
          inputProps={{
            name: 'ingredient',
            id: 'ingredient-select-outlined',
          }}
        >
          <option aria-label="None" value="">
            Pick ingredient
          </option>
          Ingredients
          {ingredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <Button
          color="secondary"
          variant="outlined"
          onClick={onButtonClick}
        >
          Add
        </Button>
      </FormControl>
    </>
  );
}

export default AddIngredients;
