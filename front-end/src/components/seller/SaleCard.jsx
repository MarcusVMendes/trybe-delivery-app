import React from 'react';
import PropTypes from 'prop-types';
import './SaleCard.css';

function SaleCard(props) {
  const  {
    deliveryNumber,
    status,
    saleDate,
    totalPrice,
    deliveryAddress,
    id
  } = props.order;

  return (
    <a href={ `localhost:3000/seller/orders/${id}` }>
      <div className="sale-card">
        <p>Pedido</p>

        <span
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          { deliveryNumber }
        </span>

        <p
          data-testid={ `seller_orders__delivery-status-${id}` }
        >
          { status }
        </p>

        <p
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          { saleDate }
        </p>

        <p
          data-testId={`seller_orders__element-card-address-${id}`}
        >
          { `R$ ${totalPrice}` }
        </p>

        <span
          data-testid={`seller_orders__element-card-address-${id}`}
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
