import React from 'react';
import { Link, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';

function Header() {
  return (
    <div className='nav-bar'>
      <AppBar position='static' color='secondary'>
        <Link to='/login'>Login</Link>
        {/* <Link to='/recipe-home'>Recipes</Link> */}
      </AppBar>
    </div>
  );
}
export default Header;
