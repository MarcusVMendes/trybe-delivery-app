import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';
import NavBar from '../../components/navBar/NavBar';
import Input from '../../components/input/Input';
// import ProductsContext from '../../context/ProductsContext';

import './checkout.css';
import api from '../../services/api';

function Checkout() {
  // const { cart, setCart, cartTotal } = useContext(ProductsContext);
  const [adress, setAdress] = useState('');
  const [number, setNumber] = useState('');
  const history = useHistory();

  const links = [
    { name: 'Produtos', url: 'http://localhost:3000/products' },
    { name: 'Meus pedidos', url: 'http://localhost:3000/meus-pedidos' },
  ];

  const obj = [
    {
      item: 1,
      name: 'comida',
    },
    {
      item: 2,
      name: 'bebida',
    },
  ];

  const removeItem = (data) => {
    // const filterData = cart.filter(({ item }) => data.item !== item);
    // setCart(filterData);
    const filterData = obj.filter(({ item }) => data.item !== item);
    return filterData;
  };

  const finalizeOrder = async (infosSale) => {
    try {
      const { adress, number } = infosSale;
      const data = await api.insertSale(adress, number);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <NavBar
          userName="cliente"
          role="customer"
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
            {/* <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th> */}
            <th>Remover item</th>
          </tr>
          { obj.map((data) => (
            <tr key={ data.item }>
              <td>{data.item}</td>
              <td>{data.name}</td>
              <td>
                <button
                  type="button"
                  onClick={ () => removeItem(data) }
                >
                  Remover
                </button>
              </td>
            </tr>
          )) }
        </table>
        <div>Total: R$ 120,00</div>
        <div>
          <h2>Detalhes e Endereço para Entrega</h2>
          <div>
            <form>
              <label htmlFor="vendedor">
                P. Vendedora Responsável
                <select name="vendedor" id="vendedor">
                  <option value="fernanda">Fernanda</option>
                  <option value="egika">Égika</option>
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
              onClick={ finalizeOrder }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
