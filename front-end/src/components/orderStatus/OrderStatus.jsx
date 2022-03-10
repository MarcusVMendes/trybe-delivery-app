import React from 'react';
import PropTypes from 'prop-types';

function OrderStatus({ status, id }) {
  return (
    <div data-testid={ `customer_orders__element-delivery-status-${id}` }>
      <p>
        { status }
      </p>
    </div>
  );
}

OrderStatus.propTypes = {
  status: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default OrderStatus;
