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
import SaleDetails from './pages/seller/SaleDetails';

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
        <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route path="/seller/orders/:id" component={ SaleDetails } />
        <ProductsProvider>
          <Route path="/customer/products" component={ Products } />
          <Route path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/customer/orders/:id" component={ CustomerOrderDetails } />
        </ProductsProvider>
      </Switch>
    </div>
  );
}

export default App;
