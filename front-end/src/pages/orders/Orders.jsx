import React from 'react';
import './Orders.css';
import NavBar from '../../components/navBar/NavBar';
import OrderCard from '../../components/orderCard/OrderCard';

function Orders() {
  const { name, role } = JSON.parse(localStorage.getItem('user'));
  const links = [
    {
      name: 'PRODUTOS',
      url: 'http://localhost:3000/customer/products',
    },
    {
      name: 'MEUS PEDIDOS',
      url: 'http://localhost:3000/customer/orders',
    },
  ];
  const orders = [
    {
      id: 1,
      orderNumber: '001',
      status: 'PENDENTE',
      date: '01/01/2022',
      price: '23,80',
    },
    {
      id: 2,
      orderNumber: '002',
      status: 'PREPARANDO',
      date: '02/01/2022',
      price: '14,20',
    },
    {
      id: 3,
      orderNumber: '003',
      status: 'ENTREGUE',
      date: '03/01/2022',
      price: '28,46',
    },
  ];

  return (
    <>
      <NavBar
        userName={ name }
        role={ role }
        links={ links }
      />
      <div className="orders-container">
        {
          orders.map(({ orderNumber, status, date, price, id }) => (
            <OrderCard
              key={ orderNumber }
              orderNumber={ orderNumber }
              status={ status }
              date={ date }
              price={ price }
              id={ id }
            />
          ))
        }
      </div>
    </>
  );
}

export default Orders;
