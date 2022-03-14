import React from 'react';
import PropTypes from 'prop-types';
import './SaleCard.css';

function SaleCard(props) {
  const {
    deliveryNumber,
    status,
    saleDate,
    totalPrice,
    deliveryAddress,
    id
  } = props.order;

  return (
    <a
      href={ `/seller/orders/${id}` }
      data-testid={ `seller_orders__element-order-id-${id}` }
    >

      <div className="sale-card">
        <p>
          Pedido
          <span>{ deliveryNumber }</span>
        </p>    

        <p
          data-testid={ `seller_orders__delivery-status-${id}` }
          className="sale-status status-pending"
        >
          { status }
        </p>

        <p
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          { saleDate }
        </p>

        <p
          data-testId={ `seller_orders__element-card-address-${id}` }
        >
          { `R$ ${totalPrice}` }
        </p>

        <span
          data-testid={ `seller_orders__element-card-address-${id}` }
        >
          { deliveryAddress }
        </span>
      </div>
    </a>
  );
}

SaleCard.defaultProps = {
  deliveryAddress: '',
};

SaleCard.propTypes = {
  deliveryNumber: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  deliveryAddress: PropTypes.string,
  id: PropTypes.number.isRequired,
};

export default SaleCard;
