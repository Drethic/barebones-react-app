import React from 'react';

import {
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

const IngredientListItem = (props) => {
  const {
    onButtonClick,
    divider,
    data,
    units,
    ingredients,
  } = props;
  const getUnitName = () => {
    const unitNames = units.filter(
      (o) => o.id === parseInt(data.unit_id, 10),
    );
    if (unitNames.length > 0) {
      return unitNames[0].name;
    }
    return 'Unit name not found';
  };
  const getIngredientName = () => {
    const ingredientNames = ingredients.filter(
      (o) => o.id === parseInt(data.ingredient_id, 10),
    );
    if (ingredientNames.length > 0) {
      return ingredientNames[0].name;
    }
    return 'Ingredient Name not found';
  };
  return (
    <ListItem divider={divider}>
      <ListItemText primary={data.quantity} />
      <ListItemText primary={getUnitName()} />
      <ListItemText primary={getIngredientName()} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Ingredient" onClick={onButtonClick}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default IngredientListItem;
