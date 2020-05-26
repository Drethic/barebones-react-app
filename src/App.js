import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Header from './components/Navigation/Header';
import logoSmall from './img/SmallColorLogo.png';
import './App.css';

import PrivateRoute from './components/Navigation/PrivateRoute';
import Home from './components/Home';

function App() {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const parseToken = (token) => {
    const tokenParts = token.split('.');
    if (tokenParts.length < 2) {
      return null;
    }
    try {
      const userData = JSON.parse(atob(tokenParts[1]));
      return userData;
    } catch {
      return null;
    }
  };
  const [isAuth, setAuth] = useState(cookieValue !== '' ? cookieValue : null);
  const [user, setUser] = useState(parseToken(cookieValue));

  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav-container">
          <Header isAuth={isAuth} setAuth={setAuth} user={user} setUser={setUser} />
          <img src={logoSmall} alt="Logo" />
        </div>
        <div className="routes">
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/login`} component={() => <AuthPage setAuth={setAuth} setUser={setUser} />} />
            <Route path={`${process.env.PUBLIC_URL}/register`} component={() => <AuthPage setAuth={setAuth} setUser={setUser} />} />
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={() => <AuthPage setAuth={setAuth} setUser={setUser} />} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/recipes-home`} component={Home} user={user} isAuth={isAuth} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
