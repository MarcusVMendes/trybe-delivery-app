import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import NavBar from '../../components/navBar/NavBar';
import OrderCard from '../../components/orderCard/OrderCard';

const ordersMock = [
  {
    id: 1,
    orderNumber: 1,
    status: 'Pendente',
    date: '03/03/2022',
    price: 10,
    address: 'Rua tal, numero 1'
  },
  {
    id: 2,
    orderNumber: 2,
    status: 'Pendente',
    date: '03/03/2022',
    price: 10,
    address: 'Rua tal, numero 1'
  }
];

const links = [
  {
    name: 'PEDIDOS',
    url: 'http://localhost:3000/seller/orders',
  },
];

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.getOrders(user.token);
        setOrders(response);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders)

  if (!orders) return <p>Carregando vendas...</p>;

  return (
    <>
      <NavBar userName={user.name} role={user.role} links={links} />
      <div>
        {ordersMock.map((order) => (<OrderCard key={ order.id } order={ order } />))}
      </div>
    </>
  );
}

export default SellerOrders;
