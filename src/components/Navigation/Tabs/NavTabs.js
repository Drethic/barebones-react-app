import React, { useState } from 'react';
import {
  makeStyles,
  AppBar,
  Tabs
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LinkTab from './LinkTab';
import TabPanel from './TabPanel';

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function NavTabs(props) {
  let history = useHistory();
  const classes = useStyles();
  let tabOrder = 0;
  const findTab = props.tabs.find(o => o.link === history.location.pathname);
  if (findTab) {
    tabOrder = findTab.tabOrder;
  }
  const [value, setValue] = useState(tabOrder);

  const handleCallToRouter = (event, newValue) => {
    history.push(event.target.innerText.toLowerCase());
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleCallToRouter}
          aria-label={`${props.name} tabs`}
        >
          {props.tabs.map((tab, index) => (
            <LinkTab key={index} label={tab.label} href={tab.link} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      {props.tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={tab.tabOrder}>
          {tab.panel}
        </TabPanel>
      ))}
    </div>
  );
}

export default NavTabs;
