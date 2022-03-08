import React from 'react';
import api from '../../services/api';

const links = [
  {
    name: 'PEDIDOS',
    url: 'http://localhost:3000/seller/orders',
  },
];

function OrderDetails({ id, status }) {
  const [order, setOrder] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.getOrderById(user.token, id);
        setOrder(response);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchOrder();
  }, []);

  console.log(orders)

  if (!order) return <p>Carregando detalhes da venda...</p>;

  return (
    <>
      <NavBar userName={user.name} role={user.role} links={links} />
      <div>
        <h1>Detalhe do Pedido</h1>

        <div>
          <header>
            <p>Pedido {order.orderNumber}</p>
          </header>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
