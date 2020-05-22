import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/LoginPage';
import './App.css';

// import PrivateRoute from './components/PriviteRoute';
function App() {
  return (
    <Router>
      <div className='App'>
        <div className='nav'>
          <Link to='/login'>Login</Link>
        </div>
        <div className='routes'>
          <Switch>
            <Route path='/login' component={Login} />
            <Route exact path='/' component={Login} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
