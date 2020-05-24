import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import './App.css';

import PrivateRoute from './components/Navigation/PrivateRoute';
// import Header from './components/Header';
import Home from './components/Home';
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='nav-container'>
          {/* <Header /> */}
        </div>
        <div className='routes'>
          <Switch>
            <Route path='/login' component={AuthPage} />
            <Route path='/register' component={AuthPage} />
            <Route exact path='/' component={AuthPage} />
            <PrivateRoute path='/recipes-home' component={Home} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
