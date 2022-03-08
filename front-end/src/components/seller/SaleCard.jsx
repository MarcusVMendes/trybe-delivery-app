import React from 'react';
import './OrderCard.css';
import PropTypes from 'prop-types';
import OrderStatus from '../orderStatus/OrderStatus';
import './SaleCard.css';

function SaleCard(props) {
  const  { orderNumber, status, date, price, address, id } = props.order;
  return (
    <a href={ `localhost:3000/seller/orders/${id}` }>
      <div className="order-card">
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
        <p>{ `R$ ${price}` }</p>
        <span>{ address }</span>
      </div>
    </a>
  );
}

SaleCard.defaultProps = {
  address: '',
};

SaleCard.propTypes = {
  orderNumber: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  address: PropTypes.string,
  id: PropTypes.number.isRequired,
};

export default SaleCard;
