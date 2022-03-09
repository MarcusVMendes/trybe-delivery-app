import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import NavBar from '../../components/navBar/NavBar';
import SaleCard from '../../components/seller/SaleCard';

const sales = [
  {
  totalPrice: 5.50,
  deliveryAddress: "R. Sollar",
  deliveryNumber: "8",
  status: "Pendente",
  sellerId: 2,
  products: [
      {productId: 10, quantity: 3 },
      {productId: 9, quantity: 3 },
      {productId: 8, quantity: 3 }
    ]
  },
  {
    totalPrice: 5.50,
    deliveryAddress: "R. Sollar",
    deliveryNumber: "8",
    status: "Entregue",
    sellerId: 2,
    products: [
        {productId: 10, quantity: 3 },
        {productId: 9, quantity: 3 },
        {productId: 8, quantity: 3 }
      ]
    }
]

function SellerOrders() {
  // const [orders, setOrders] = useState([]);
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

  // console.log(orders)

  // if (!orders) return <p>Carregando vendas...</p>;

  return (
    <>
      {/* <NavBar userName={user.name} role={user.role} links={links} /> */}
      <div>
        {sales.map((order) => (
            <SaleCard
              key={ order.id }
              order={ order }
              role={user.role} 
            />))}
      </div>
    </>
  );
}

export default SellerOrders;
