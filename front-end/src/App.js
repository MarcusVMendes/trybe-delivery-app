import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Checkout from './pages/checkout/Checkout';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />

        <Route exact path="/">
          <Redirect to="/checkout" />
        </Route>
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    </div>
  );
}

export default App;
