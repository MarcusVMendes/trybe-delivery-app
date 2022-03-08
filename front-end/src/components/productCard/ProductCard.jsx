import React, { useContext, useState } from 'react';
import './ProductCard.css';
import PropTypes from 'prop-types';
import ProductsContext from '../../context/ProductsContext';
import Input from '../input/Input';
import Button from '../button/Button';

function ProductCard({ productPrice, imageUrl, productName, id }) {
  const { cart, setCart } = useContext(ProductsContext);
  const [quantity, setQuantity] = useState(0);

  const updateCart = (qtd) => {
    const price = Number(productPrice.replace(',', '.'));
    const item = {
      productId: id,
      name: productName,
      quantity: qtd,
      subTotal: parseFloat(price * qtd).toFixed(2),
    };

    const newCart = cart.filter((prod) => prod.productId !== id);

    setCart([...newCart, item]);
  };

  const increaseQuantity = () => {
    const newQuantity = Number(quantity) + 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
  };

  const decreaseQuantity = () => {
    const newQuantity = Number(quantity) - 1;
    if (newQuantity >= 0) setQuantity(newQuantity);
    updateCart(newQuantity);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setQuantity(value);
    updateCart(value);
  };

  return (
    <div className="card">
      <span data-testid={ `customer_products__element-card-price-${id}` }>
        { productPrice }
      </span>
      <img
        src={ imageUrl }
        alt={ productName }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <span data-testid={ `customer_products__element-card-title-${id}` }>
        { productName }
      </span>
      <div className="card-quantity-container">
        <Button
          testId={ `customer_products__button-card-rm-item-${id}` }
          text="-"
          action={ decreaseQuantity }
        />
        <Input
          label=""
          testId={ `customer_products__input-card-quantity-${id}` }
          type="number"
          placeholder="0"
          handleChange={ (target) => handleChange(target) }
          value={ quantity }
        />
        <Button
          testId={ `customer_products__button-card-add-item-${id}` }
          text="+"
          action={ increaseQuantity }
        />
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  productPrice: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ProductCard;
