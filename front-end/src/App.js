import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Products from './pages/products/Products';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/customer/products" component={ Products } />
      </Switch>
    </div>
  );
}

export default App;
