import React from 'react';
import { List, Paper } from '@material-ui/core';

import InstructionListItems from './InstructionListItems';

const InstructionList = (props) => {
  const {
    items,
    onItemRemove,
  } = props;
  return (
    <>
      {items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: 'scroll' }}>
            {items.map((inst, idx) => (
              <InstructionListItems
                // No other valid key is available, disabling eslint error for using index
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                data={{ ...inst, step_no: idx + 1 }}
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

export default InstructionList;
