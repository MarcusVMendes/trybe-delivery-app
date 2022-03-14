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
    <a href={ `/seller/orders/${id}` }>
      <div className="sale-card">
        <p>
          Pedido
          <span
            data-testid={ `seller_orders__element-order-id-${id}` }>
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
