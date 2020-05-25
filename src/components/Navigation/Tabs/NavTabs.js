import React, { useState } from 'react';
import {
  makeStyles,
  AppBar,
  Tabs,
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
  const {
    tabs,
    name,
  } = props;
  const history = useHistory();
  const classes = useStyles();
  let tabOrder = 0;
  const publicUrl = process.env.PUBLIC_URL;
  const findTab = tabs.find((o) => `${publicUrl}${o.link}` === history.location.pathname);
  if (findTab) {
    tabOrder = findTab.tabOrder;
  }
  const [value, setValue] = useState(tabOrder);

  const handleCallToRouter = (event, newValue) => {
    history.push(`${publicUrl}/${event.target.innerText.toLowerCase()}`);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleCallToRouter}
          aria-label={`${name} tabs`}
        >
          {tabs.map((tab) => (
            <LinkTab
              key={tab.tabOrder}
              label={tab.label}
              href={tab.link}
              {...a11yProps(tab.tabOrder)}
            />
          ))}
        </Tabs>
      </AppBar>
      {tabs.map((tab) => (
        <TabPanel key={tab.tabOrder} value={value} index={tab.tabOrder}>
          {tab.panel}
        </TabPanel>
      ))}
    </div>
  );
}

export default NavTabs;
