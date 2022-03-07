import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import OrderStatus from '../orderStatus/OrderStatus';

function Table() {
  const id = window.location.pathname.replace('/customer/orders/', '');
  const user = JSON.parse(localStorage.getItem('user'));
  const [order, setOrder] = useState([]);
  const tableHeaderTestIdPrefix = 'customer_order_details__element-order-details-label';
  const tableTestIdPrefix = 'customer_order_details__element-order';

  useEffect(() => {
    const { token } = user;
    const fetchSale = async () => {
      const { sale } = await api.getSaleById(token, id);
      setOrder([sale]);
    };

    fetchSale();
  }, [id, user]);

  if (order.length === 0) return <p>Carregando...</p>;

  const { id: orderId, seller: { name }, saleDate, status } = order[0];

  return (
    <>
      Detalhe do Pedido
      <span
        data-testid={ `${tableHeaderTestIdPrefix}-order-id` }
      >
        { `Pedido ${orderId}` }
      </span>
      <span
        data-testid={ `${tableHeaderTestIdPrefix}-seller-name` }
      >
        { `P. Vend: ${name}` }
      </span>
      <span
        data-testid={ `${tableHeaderTestIdPrefix}-order-date` }
      >
        { saleDate }
      </span>
      <OrderStatus
        status={ status }
        id={ orderId }
      />
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
      >
        MARCAR COMO ENTREGUE
      </button>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
        { order.map((ord, index) => (
          <tr key={ ord.id }>
            <td
              data-testid={ `${tableTestIdPrefix}-table-item-number-${index}` }
            >
              { index + 1 }
            </td>
            <td
              data-testid={ `${tableTestIdPrefix}-table-name-${index}` }
            >
              { ord.products[index].name }
            </td>
            <td
              data-testid={ `${tableTestIdPrefix}-table-quantity-${index}` }
            >
              { ord.products[index].saleProduct }
            </td>
            <td
              data-testid={ `${tableTestIdPrefix}-table-sub-total-${index}` }
            >
              { ord.products[index].price }
            </td>
            <td
              data-testid={ `${tableTestIdPrefix}-total-price-${index}` }
            >
              { ord.products[index].totalPrice }
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default Table;
