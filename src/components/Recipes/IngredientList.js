import React from 'react';
import { List, Paper } from '@material-ui/core';

import IngredientListItem from './IngredientListItem';

const IngredientList = (props) => {
  const {
    items,
    units,
    ingredients,
    onItemRemove,
  } = props;
  return (
    <>
      {items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: 'scroll' }}>
            {items.map((ing, idx) => (
              <IngredientListItem
                key={Object.keys(ing)[0]}
                units={units}
                ingredients={ingredients}
                step={Object.keys(ing)[0]}
                data={ing[Object.keys(ing)[0]]}
                divider={idx !== items.length - 1}
                onButtonClick={() => onItemRemove(idx)}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};

export default IngredientList;
