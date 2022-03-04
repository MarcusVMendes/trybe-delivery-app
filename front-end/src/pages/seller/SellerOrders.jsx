import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import api from '../../services/api';
import NavBar from '../../components/navBar/NavBar';
import Container from '../../components/container/Container';
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
]

function SellerOrders() {
  // const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const links = [
    {
      name: 'PEDIDOS',
      url: 'http://localhost:3000/seller/orders',
    },
    {
      name: 'MEUS PEDIDOS',
      url: 'http://localhost:3000/customer/orders',
    },
  ];

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await api.getOrders();
  //       setOrders(response);
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  // if (!orders) return <p>Carregando...</p>;

  return (
    <>
      <NavBar userName={user.name} links={links} />
      <Container>
        {ordersMock.map((order) => (<OrderCard key={ order.id } order={ order } />))}
      </Container>
    </>
  );
}

export default SellerOrders;
