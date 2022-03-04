import React, { useState, useEffect } from 'react';
import './Orders.css';
import api from '../../services/api';
import { customerLinks } from '../../utils/navBarLinks';
import NavBar from '../../components/navBar/NavBar';
import OrderCard from '../../components/orderCard/OrderCard';

function Orders() {
  const [order, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const orders = [
    {
      id: 1,
      status: 'PENDENTE',
      date: '01/01/2022',
      price: '23,80',
    },
    {
      id: 2,
      status: 'PREPARANDO',
      date: '02/01/2022',
      price: '14,20',
    },
    {
      id: 3,
      status: 'ENTREGUE',
      date: '03/01/2022',
      price: '28,46',
    },
  ];

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.getSales(token);
        const userOrders = response.filter((sale) => sale.id === user.id);

        setOrders(userOrders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSales();
  });

  return (
    <>
      <NavBar
        userName={ user.name }
        role={ user.role }
        links={ customerLinks }
      />
      <div className="orders-container">
        {
          orders.map(({ id, status, date, price }) => (
            <OrderCard
              key={ id }
              orderNumber={ id }
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
