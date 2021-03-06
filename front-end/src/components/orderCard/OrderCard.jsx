import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import OrderStatus from '../orderStatus/OrderStatus';
import './OrderCard.css';

function OrderCard({ orderNumber, status, date, price, address, id }) {
  const history = useHistory();
  return (
    <button
      type="button"
      className="order-card"
      onClick={ () => history.push(`/customer/orders/${id}`) }
    >
      <p>Pedido</p>
      <span
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        { orderNumber }
      </span>
      <OrderStatus id={ id } status={ status } />
      <p
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { date }
      </p>
      <p
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </p>
      <span>{ address }</span>
    </button>
  );
}

OrderCard.defaultProps = {
  address: '',
};

OrderCard.propTypes = {
  orderNumber: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  address: PropTypes.string,
  id: PropTypes.number.isRequired,
};

export default OrderCard;
