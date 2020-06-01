import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Header from './components/Navigation/Header';
import logoSmall from './img/SmallColorLogo.png';
import './App.css';
import getUserFromToken from './utils';

import PrivateRoute from './components/Navigation/PrivateRoute';
import Home from './components/Home';
import AddRecipeStepper from './components/Recipes/AddRecipe';

function App() {
  // const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const token = localStorage.getItem('token');
  const [isAuth, setAuth] = useState(token !== '' ? token : null);
  const [user, setUser] = useState(getUserFromToken(token));

  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav-container">
          <Header isAuth={isAuth} setAuth={setAuth} user={user} setUser={setUser} />
          <img src={logoSmall} alt="Logo" />
        </div>
        <div className="routes">
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/login`} component={() => <AuthPage setAuth={setAuth} setUser={setUser} isAuth={isAuth} />} />
            <Route path={`${process.env.PUBLIC_URL}/register`} component={() => <AuthPage setAuth={setAuth} setUser={setUser} isAuth={isAuth} />} />
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={() => <AuthPage setAuth={setAuth} setUser={setUser} isAuth={isAuth} />} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/recipes-home`} component={() => <Home user={user} />} isAuth={isAuth} />
            <PrivateRoute exact path={`${process.env.PUBLIC_URL}/add-recipe`} component={() => <AddRecipeStepper user={user} />} isAuth={isAuth} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
