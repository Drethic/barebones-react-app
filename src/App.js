import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import './App.css';

import PrivateRoute from './components/Navigation/PrivateRoute';
// import Header from './components/Header';
import Home from './components/Home';
function App() {
  return (
    <Router>
      <div className='App'>
        <div className='nav-container'>
          {/* <Header /> */}
        </div>
        <div className='routes'>
          <Switch>
            <Route path='/login' component={Auth} />
            <Route path='/register' component={Auth} />
            <Route exact path='/' component={Auth} />
            <PrivateRoute path='/recipes-home' component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
