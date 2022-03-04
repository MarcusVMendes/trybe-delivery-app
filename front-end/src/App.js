import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import ProductsProvider from './context/ProductsProvider';
import Login from './pages/login/Login';
import Products from './pages/products/Products';
import Register from './pages/register/Register';
import Checkout from './pages/checkout/Checkout';
import Admin from './pages/admin/Admin';
import Orders from './pages/orders/Orders';
import CustomerOrderDetails from './pages/details/CustomerOrderDetails';
import SellerOrders from './pages/seller/SellerOrders';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/admin/manage" component={ Admin } />

        <ProductsProvider>
          <Route path="/customer/products" component={ Products } />
          <Route path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/customer/orders/:id" component={ CustomerOrderDetails } />
        </ProductsProvider>
        <Route path="/seller/orders" component={ SellerOrders } />
      </Switch>
    </div>
  );
}

export default App;
