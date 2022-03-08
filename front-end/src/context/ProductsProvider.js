import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductsContext from './ProductsContext';

function ProductsProvider({ children }) {
  const [cart, setCart] = useState([]);
  const cartTotal = cart
    .reduce((acc, { subTotal }) => acc + parseFloat(subTotal), 0)
    .toFixed(2)
    .toString()
    .replace('.', ',');

  const contextValue = {
    cart,
    setCart,
    cartTotal,
  };

  return (
    <ProductsContext.Provider value={ contextValue }>
      { children }
    </ProductsContext.Provider>
  );
}

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductsProvider;
