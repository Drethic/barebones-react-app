import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/LoginPage';
import './App.css';

import PrivateRoute from './components/PriviteRoute';
import Header from './components/Header';
import Home from './components/Home';
function App() {
  return (
    <Router>
      <div className='App'>
        <div className='nav-container'>
          <Header />
        </div>
        <div className='routes'>
          <Switch>
            <Route path='/login' component={Login} />
            <Route exact path='/' component={Login} />
            <PrivateRoute path='/recipes-home' component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
