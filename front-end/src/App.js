import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import ProductsProvider from './context/ProductsProvider';
import Login from './pages/login/Login';
import Products from './pages/products/Products';
import Register from './pages/register/Register';
import Checkout from './pages/checkout/Checkout';
import orderDetails from './components/orderDetails/orderDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/orders/:id" component={ orderDetails } />
        <ProductsProvider>
          <Route path="/customer/products" component={ Products } />
          <Route path="/customer/checkout" component={ Checkout } />
        </ProductsProvider>
      </Switch>
    </div>
  );
}

export default App;
