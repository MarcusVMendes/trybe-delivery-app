import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { sellerLinks } from '../../utils/navBarLinks';
import NavBar from '../../components/navBar/NavBar';
import Button from '../../components/button/Button';
import './SaleDetails.css';
import TableSale from './TableSale';

function SaleDetails() {
  const [sale, setSale] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderById = async () => {
      setLoading(true);
      try {
        const response = await api.getSaleById(user.token, id);
        setSale(response.sale);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderById();
  }, []);

  useEffect(() => {}, []);

  const handleClickPrepareOrder = async () => {
    try {
      const response = await api.updateSaleById(user.token, id, status);
      setSale(response.sale);
    } catch (error) {
      console.log(error.response);
    }
  }

  console.log(sale);

  if (!sale) return <p>Carregando detalhes da venda...</p>;

  return (
    <>
      <NavBar userName={ user.name } role={ user.role } links={ sellerLinks } />
      <div>
        <h1>Detalhe do Pedido</h1>

        <div>
          <header className="details-header">
            <div>
              <p>
                Pedido
                <span
                  data-testid="seller_order_details__element-order-details-label-order-id">
                    { sale.id }
                  </span>
                </p>

              <p
                data-testid="seller_order_details__element-order-details-label-delivery-status">
                  { sale.status }
              </p>
            </div>
            <div>
              <Button
                text="PREPARAR PEDIDO"
                type="button"
                testId="seller_order_details__button-preparing-check"
                isDisabled={
                  sale.status === 'Preparando' || 
                  sale.status === 'Em Trânsito' || 
                  sale.status === 'Entregue'
                }
                action={ () => handleClickPrepareOrder() }
              />
              <Button
                text="SAIU PARA ENTREGA"
                type="button"
                testId="seller_order_details__button-dispatch-check"
                isDisabled={
                  sale.status === 'Pendente' || 
                  sale.status === 'Em Trânsito' || 
                  sale.status === 'Entregue'
                }
                // action={ () => handleClickPrepareOrder() }
              />
            </div>
          </header>

          { loading && <p>Carregando...</p>}
          { !loading && <TableSale products={ sale.products } /> }

          <div>
            <p
              data-testid="seller_order_details__element-order-total-price"
            >
              Total: R$
              { sale.totalPrice.replace('.', ',') }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SaleDetails;
