import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { sellerLinks } from '../../utils/navBarLinks';
import NavBar from '../../components/navBar/NavBar';
import SaleCard from '../../components/seller/SaleCard';

function SellerOrders() {
  const [sales, setSales] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.getSales(user.token);
        setSales(response.sales);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchOrders();
  }, []);

  if (!sales) return <p>Carregando vendas...</p>;

  return (
    <>
      <NavBar userName={ user.name } role={ user.role } links={ sellerLinks } />
      <div>
        {sales.map((order) => (
          <SaleCard
            key={ order.id }
            order={ order }
            role={ user.role }
          />))}
      </div>
    </>
  );
}

export default SellerOrders;
