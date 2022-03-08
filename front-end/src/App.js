import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import ProductsProvider from './context/ProductsProvider';
import Login from './pages/login/Login';
import Products from './pages/products/Products';
import Register from './pages/register/Register';
import Orders from './pages/orders/Orders';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <ProductsProvider>
          <Route path="/customer/products" component={ Products } />
          <Route exact path="/customer/orders" component={ Orders } />
        </ProductsProvider>
      </Switch>
    </div>
  );
}

export default App;
