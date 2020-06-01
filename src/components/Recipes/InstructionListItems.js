import React from 'react';

import {
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

const InstructionListItems = (props) => {
  const {
    onButtonClick,
    divider,
    data,
  } = props;
  return (
    <ListItem divider={divider}>
      <ListItemText primary={`Step: ${data.step_no}`} />
      <ListItemText primary={data.instruction} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Instruction" onClick={onButtonClick}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default InstructionListItems;
