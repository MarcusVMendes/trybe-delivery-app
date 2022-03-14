import React from 'react';
import PropTypes from 'prop-types';

function TableSale({ products }) {
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
              data-testid={ `seller_order_details__element-order-table-item-number-${id}` }
            >
              { id }
            </td>
            <td
              data-testid={ `seller_order_details__element-order-table-name-${id}` }
            >
              { name }
            </td>
            <td
              data-testid={ `seller_order_details__element-order-table-quantity-${id}` }
            >
              { SaleProduct.quantity }
            </td>
            <td
              data-testid={ `seller_order_details__element-order-table-unit-price-${id}` }
            >
              R$
              { price.replace('.', ',') }
            </td>
            <td
              data-testid={ `seller_order_details__element-order-table-sub-total-${id}` }
            >
              R$
              { price * SaleProduct.quantity }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableSale.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    SaleProduct: PropTypes.objectOf(PropTypes.shape({ quantity: PropTypes.string, })),
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
  })).isRequired,
};

export default TableSale;
