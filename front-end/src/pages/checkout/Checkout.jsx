import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';
import NavBar from '../../components/navBar/NavBar';
import Input from '../../components/input/Input';
import ProductsContext from '../../context/ProductsContext';
import api from '../../services/api';

function checkout2() {
  const { cart, setCart, cartTotal } = useContext(ProductsContext);
  console.log(cart);
  const [adress, setAdress] = useState('');
  const [number, setNumber] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const removeItem = (data) => {
    const filterData = cart.filter(({ productId }) => data.productId !== productId);
    setCart(filterData);

    return filterData;
  };

  const finalizeOrder = async (totalPrice, deliveryAddress, deliveryNumber, status, products, sellerId) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      const data = await api.insertSale(totalPrice, deliveryAddress, deliveryNumber, status, products, sellerId, token);

      return data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const totalCart = parseFloat(cartTotal).toFixed(2);

  const links = [
    { name: 'Produtos', url: 'http://localhost:3000/products' },
    { name: 'Meus pedidos', url: 'http://localhost:3000/customer/orders' },
  ];

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
              <td data-testid={`customer_checkout__element-order-table-item-number-${index}`}>{index + 1}</td>
              <td data-testd={`customer_checkout__element-order-table-name-${index}`}>{data.name}</td>
              <td data-testd={`customer_checkout__element-order-table-quantity-${index}`}>{data.quantity}</td>
              <td data-testd={`customer_checkout__element-order-table-unit-price-${index}`}>{data.subTotal / data.quantity}</td>
              <td data-testd={`customer_checkout__element-order-table-sub-total-${index}`}>{data.subTotal}</td>
              <td>
                <button
                  type="button"
                  data-testd={`customer_checkout__element-order-table-remove-${index}`}
                  onClick={ () => removeItem(data) }
                >
                  Remover
                </button>
              </td>
            </tr>
          )) }
        </table>
        <div data-testd={`customer_checkout__element-order-total-price`}>
          {`Total: R$ ${totalCart}`}
        </div>
        <div>
          <h2>Detalhes e Endereço para Entrega</h2>
          <div>
            <form>
              <label htmlFor="vendedor">
                P. Vendedora Responsável
                <select name="vendedor" id="vendedor">
                  <option value="fernanda">Fernanda</option>
                  <option value="maria">Maria</option>
                </select>
              </label>
              <Input
                label="Endereço"
                name="endereco"
                type="text"
                handleChange={ ({ target }) => setAdress(target.value) }
                value={ adress }
              />
              <Input
                label="Número"
                name="numero"
                type="text"
                handleChange={ ({ target }) => setNumber(target.value) }
                value={ number }
              />
            </form>
            <Button
              text="FINALIZAR PEDIDO"
              type="button"
              isDisabled={ false }
              // Ao final do pedido (ao clicar no 'Botão de finalização do pedido'), a tela de checkout deve
              // disparar uma requisição pra API, inserindo a venda e retornando o id da mesma, para utilização no
              // redirecionamento.
              action={ () => finalizeOrder(totalCart, adress, number, 'pendente', cart, 2) }
              // action={ () => console.log('deu certo') }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkout2;
