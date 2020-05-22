import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/LoginPage';
import './App.css';
import PrivateRoute from './components/PriviteRoute';

// import PrivateRoute from './components/PriviteRoute';
import Header from './components/Header';
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
            {/* <PrivateRoute path='/recipe-home' component={} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
