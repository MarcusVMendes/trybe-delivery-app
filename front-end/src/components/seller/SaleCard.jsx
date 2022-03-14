import React from 'react';
import PropTypes from 'prop-types';
import './SaleCard.css';

const convertDate = (date) => {
  const EIGHT = 8;
  const FIVE = 5;
  const FOUR = 4;

  const day = date.substr(EIGHT, 2);
  const month = date.substr(FIVE, 2);
  const year = date.substr(0, FOUR);

  return `${day}/${month}/${year}`;
};

function SaleCard({ order }) {
  const {
    deliveryNumber,
    status,
    saleDate,
    totalPrice,
    deliveryAddress,
    id,
  } = order;

  return (
    <a href={ `/seller/orders/${id}` }>
      <div className="sale-card">
        <p>
          Pedido
          <span
            data-testid={ `seller_orders__element-order-id-${id}` }
          >
            { deliveryNumber }
          </span>
        </p>

        <p
          data-testid={ `seller_orders__element-delivery-status-${id}` }
          className="sale-status status-pending"
        >
          { status }
        </p>

        <p
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          { convertDate(saleDate) }
        </p>

        <p
          data-testId={ `seller_orders__element-card-price-${id}` }
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

SaleCard.propTypes = {
  order: PropTypes.objectOf(PropTypes.shape({
    deliveryNumber: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
    deliveryAddress: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
};

export default SaleCard;
