import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { sellerLinks } from '../../utils/navBarLinks';
import NavBar from '../../components/navBar/NavBar';
import Button from '../../components/button/Button';
import TableSale from './TableSale';
import './SaleDetails.css';

const convertDate = (date) => {
  const EIGHT = 8;
  const FIVE = 5;
  const FOUR = 4;

  const day = date.substr(EIGHT, 2);
  const month = date.substr(FIVE, 2);
  const year = date.substr(0, FOUR);

  return `${day}/${month}/${year}`;
};

const STATUS = {
  PREPARANDO: 'Preparando',
  EM_TRANSITO: 'Em Trânsito',
  ENTREGUE: 'Entregue',
};

function SaleDetails() {
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();
  const sts = () => 'seller_order_details__element-order-details-label-delivery-status';

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

  const handleClickPrepareOrder = async () => {
    try {
      const res = await api.updateSaleById(user.token, id, STATUS.PREPARANDO);
      setSale(res.sale);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleClickDeliveryOrder = async () => {
    try {
      const data = await api.updateSaleById(user.token, id, STATUS.EM_TRANSITO);
      setSale(data.sale);
    } catch (error) {
      console.log(error.response);
    }
  };

  if (!sale) return <p>Carregando detalhes da venda...</p>;

  return (
    <>
      <NavBar userName={ user.name } role={ user.role } links={ sellerLinks } />
      <div>
        <h1>Detalhe do Pedido</h1>

        <div>
          <header className="details-header">
            <p
              data-testid="seller_order_details__element-order-details-label-order-id"
            >
              Pedido
              { ' ' }
              { sale.id }
            </p>
            <p
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              { convertDate(sale.saleDate) }
            </p>
            <p
              data-testid={ sts() }
            >
              { sale.status }
            </p>

            <Button
              text="PREPARAR PEDIDO"
              type="button"
              testId="seller_order_details__button-preparing-check"
              isDisabled={
                sale.status === STATUS.PREPARANDO
                || sale.status === STATUS.EM_TRANSITO
                || sale.status === STATUS.ENTREGUE
              }
              action={ () => handleClickPrepareOrder() }
            />
            <Button
              text="SAIU PARA ENTREGA"
              type="button"
              testId="seller_order_details__button-dispatch-check"
              isDisabled={
                sale.status === 'Pendente'
                || sale.status === STATUS.EM_TRANSITO
                || sale.status === STATUS.ENTREGUE
              }
              action={ () => handleClickDeliveryOrder() }
            />
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
