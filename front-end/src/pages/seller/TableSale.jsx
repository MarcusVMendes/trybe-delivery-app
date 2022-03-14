import React from 'react';
import PropTypes from 'prop-types';

function TableSale({ products }) {
  const item = (id) => `seller_order_details__element-order-table-item-number-${id}`;
  const orderName = (id) => `seller_order_details__element-order-table-name-${id}`;
  const orderQnt = (id) => `seller_order_details__element-order-table-quantity-${id}`;
  const orderPrice = (id) => `seller_order_details__element-order-table-unit-price-${id}`;
  const subTotal = (id) => `seller_order_details__element-order-table-sub-total-${id}`;

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({ id, price, SaleProduct, name }) => (
          <tr key={ id }>
            <td
              data-testid={ item }
            >
              { id }
            </td>
            <td
              data-testid={ orderName }
            >
              { name }
            </td>
            <td
              data-testid={ orderQnt }
            >
              { SaleProduct.quantity }
            </td>
            <td
              data-testid={ orderPrice }
            >
              R$
              { price.replace('.', ',') }
            </td>
            <td
              data-testid={ subTotal }
            >
              R$
              { String(price * SaleProduct.quantity).replace('.', ',') }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableSale.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    SaleProduct: PropTypes.objectOf(PropTypes.shape({ quantity: PropTypes.number })),
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
  })).isRequired,
};

export default TableSale;
