import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';

function Header() {
  return (
    <div className='nav-bar'>
      <AppBar position='static' color='secondary'>
        <Link to='/login'>Login</Link>
        <Link to='/recipes-home'>All Recipes</Link>
      </AppBar>
    </div>
  );
}
export default Header;
