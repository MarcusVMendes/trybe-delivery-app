import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';
import NavBar from '../../components/navBar/NavBar';

import './checkout.css';

function Checkout() {
  const history = useHistory();

  const links = [
    { name: 'Produtos', url: 'http://localhost:3000/products' },
    { name: 'Meus pedidos', url: 'http://localhost:3000/meus-pedidos' },
  ];
  const obj = [
    {
      item: 1,
      name: 'bebida',
    },
    {
      item: 2,
      name: 'comida',
    },
  ];

  const removeItem = (data) => {
    const filterData = obj.filter(({ item }) => data.item !== item);
    return filterData;
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
                  // onClick={() => obj.filter(({ item }) => data.item !== item).map((oi) => console.log(oi))}
                  onClick={ () => removeItem(data) }
                >
                  Remover
                </button>
              </td>
            </tr>
          )) }
        </table>
      </div>
    </div>
  );
}

export default Checkout;
