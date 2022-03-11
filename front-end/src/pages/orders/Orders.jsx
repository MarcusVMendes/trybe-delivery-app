import React, { useState, useEffect } from 'react';
import './Orders.css';
import api from '../../services/api';
import { customerLinks } from '../../utils/navBarLinks';
import NavBar from '../../components/navBar/NavBar';
import OrderCard from '../../components/orderCard/OrderCard';

function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const { token, name } = user;
    const fetchSales = async () => {
      try {
        const { sales } = await api.getSales(token);
        const userOrders = sales.filter((sale) => sale.user.name === name);

        setOrders(userOrders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSales();
  }, [user]);

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

  return (
    <>
      <NavBar
        userName={ user.name }
        role={ user.role }
        links={ customerLinks }
      />
      { orders.length === 0 && <p>Você ainda não fez um pedido</p> }
      <div className="orders-container">
        {
          orders.map(({ id, status, saleDate, totalPrice }) => (
            <OrderCard
              key={ id }
              orderNumber={ id }
              status={ status }
              date={ convertDate(saleDate) }
              price={ totalPrice }
              id={ id }
            />
          ))
        }
      </div>
    </>
  );
}

export default Orders;
