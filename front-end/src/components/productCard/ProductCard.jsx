import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';
import Button from '../button/Button';

function Card({ productPrice, imageUrl, productName, id }) {
  return(
    <div className="card">
      <span data-test-id={ `customer_products__element-card-price-${id}` }>{ productPrice }</span>
      <img
        src={ imageUrl }
        alt={ productName }
        data-test-id={ `customer_products__img-card-bg-image-${id}` } 
      />
      <span data-test-id={ `customer_products__element-card-title-${id}` }>{ productName }</span>
      <Button testId={ `customer_products__button-card-rm-item-${id}` } text="-" />
      <Input testId={ `customer_products__input-card-quantity-${id}` } type="number" placeholder="0" />
      <Button testId={ `customer_products__button-card-add-item-${id}` } text="+" />
    </div>
  );
}

Card.propTypes = {
  productPrice: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default Card;
