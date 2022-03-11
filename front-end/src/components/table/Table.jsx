import React, { useState, useEffect } from 'react';
import api from '../../services/api';

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
  }, [user, id]);

  const convertDate = (date) => {
    // se alguém tiver uma sugestão de função pra convertar data que está em formato ISO
    // vai ser muito bem vindo... só consegui pensar nisso rs
    const EIGHT = 8;
    const FIVE = 5;
    const FOUR = 4;

    const day = date.substr(EIGHT, 2);
    const month = date.substr(FIVE, 2);
    const year = date.substr(0, FOUR);

    return `${day}/${month}/${year}`;
  };

  const checkStatus = (status) => status !== 'Em Trânsito';

  if (order.length === 0) return <p>Carregando...</p>;

  const { id: orderId, seller: { name }, saleDate, status, products } = order[0];

  return (
    <section>
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
        { convertDate(saleDate) }
      </span>
      <p
        data-testid={ `${tableHeaderTestIdPrefix}-delivery-status` }
      >
        { status }
      </p>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled={ checkStatus(status) }
      >
        MARCAR COMO ENTREGUE
      </button>
      <table>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
          { products.map((prod, index) => (
            <tr key={ prod.id }>
              <td
                data-testid={ `${tableTestIdPrefix}-table-item-number-${index}` }
              >
                { index + 1 }
              </td>
              <td
                data-testid={ `${tableTestIdPrefix}-table-name-${index}` }
              >
                { prod.name }
              </td>
              <td
                data-testid={ `${tableTestIdPrefix}-table-quantity-${index}` }
              >
                { prod.SaleProduct.quantity }
              </td>
              <td
                data-testid={ `${tableTestIdPrefix}-table-sub-total-${index}` }
              >
                { prod.price }
              </td>
              <td
                data-testid={ `${tableTestIdPrefix}-total-price-${index}` }
              >
                { (prod.SaleProduct.quantity * prod.price).toFixed(2).replace('.', ',') }
              </td>
            </tr>
          ))}
          <p data-testid={ `${tableTestIdPrefix}-total-price` }>
            { order[0].totalPrice.replace('.', ',') }
          </p>
        </tbody>
      </table>
    </section>
  );
}

export default Table;
