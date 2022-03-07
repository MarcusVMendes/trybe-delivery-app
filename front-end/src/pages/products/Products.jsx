import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Products.css';
import api from '../../services/api';
import ProductsContext from '../../context/ProductsContext';
import NavBar from '../../components/navBar/NavBar';
import ProductCard from '../../components/productCard/ProductCard';

function Products() {
  const history = useHistory();
  const { cartTotal } = useContext(ProductsContext);
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const links = [
    {
      name: 'PRODUTOS',
      url: 'http://localhost:3000/customer/products',
    },
    {
      name: 'MEUS PEDIDOS',
      url: 'http://localhost:3000/customer/orders',
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts();
        setProducts(response);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) return <p>Carregando produtos...</p>;

  return (
    <>
      <NavBar
        userName={ user.name }
        role={ user.role }
        links={ links }
      />
      <div className="card-container">
        {
          products.map(({ id, name, price, url_image: url }) => (
            <ProductCard
              key={ id }
              productPrice={ price.replace('.', ',') }
              imageUrl={ url }
              productName={ name }
              id={ id }
            />
          ))
        }
      </div>
      <button
        className="products-cart-button"
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ cartTotal === '0,00' }
      >
        Ver carrinho: R$
        <span data-testid="customer_products__checkout-bottom-value">
          { cartTotal }
        </span>
      </button>
    </>
  );
}

export default Products;
