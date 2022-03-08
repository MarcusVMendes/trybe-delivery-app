import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';
import NavBar from '../../components/navBar/NavBar';
import Input from '../../components/input/Input';
import ProductsContext from '../../context/ProductsContext';
import api from '../../services/api';

function Checkout() {
  const { cart, setCart, cartTotal } = useContext(ProductsContext);
  const [adress, setAdress] = useState('');
  const [number, setNumber] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const removeItem = (data) => {
    const filterData = cart.filter(({ productId }) => data.productId !== productId);
    setCart(filterData);

    return filterData;
  };

  const finalizeOrder = async (...infoSale) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      const [
        totalPrice, deliveryAddress, deliveryNumber, status, products, sellerId,
      ] = infoSale;
      const { dataValues } = await api.insertSale(
        token, totalPrice, deliveryAddress, deliveryNumber, status, products, sellerId,
      );
      console.log(dataValues);
      history.push(`/customer/orders/${dataValues.id}`);
      return dataValues;
    } catch (error) {
      console.log(error.response);
    }
  };

  const totalPrice = cartTotal.replace(',', '.');

  const links = [
    { name: 'Produtos', url: 'http://localhost:3000/products' },
    { name: 'Meus pedidos', url: 'http://localhost:3000/customer/orders' },
  ];

  const form = () => (
    <form>
      <label htmlFor="vendedor">
        P. Vendedora Responsável
        <select
          data-testid="customer_checkout__select-seller"
          name="vendedor"
          id="vendedor"
        >
          <option value="fernanda">Fernanda</option>
          <option value="maria">Maria</option>
        </select>
      </label>
      <Input
        label="Endereço"
        testId="customer_checkout__input-address"
        name="endereco"
        type="text"
        handleChange={ ({ target }) => setAdress(target.value) }
        value={ adress }
      />
      <Input
        label="Número"
        testId="customer_checkout__input-addressNumber"
        name="numero"
        type="text"
        handleChange={ ({ target }) => setNumber(target.value) }
        value={ number }
      />
    </form>
  );

  return (
    <div>
      <div>
        <NavBar
          userName={ user.name }
          role={ user.role }
          links={ links }
        >
          <Button
            type="button"
            text="Sair"
            isDisabled={ false }
            action={ () => history.push('/login') }
          />
        </NavBar>
        <table className="table">
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
            <th>Remover item</th>
          </tr>
          { cart.map((data, index) => (
            <tr key={ data.productId }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {data.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                {data.quantity}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {(data.subTotal / data.quantity).toFixed(2).replace('.', ',')}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {(data.subTotal).replace('.', ',')}
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                  onClick={ () => removeItem(data) }
                >
                  Remover
                </button>
              </td>
            </tr>
          )) }
        </table>
        <div data-testid="customer_checkout__element-order-total-price">
          {totalPrice.replace('.', ',')}
        </div>
        <div>
          <h2>Detalhes e Endereço para Entrega</h2>
          <div>
            { form() }
            <Button
              text="FINALIZAR PEDIDO"
              testId="customer_checkout__button-submit-order"
              type="button"
              isDisabled={ false }
              action={
                () => finalizeOrder(totalPrice, adress, number, 'pendente', cart, 2)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
