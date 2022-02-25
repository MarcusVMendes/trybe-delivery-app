import React, { useState, useEffect } from 'react';
import './Products.css';
import api from '../../services/api';
import NavBar from '../../components/navBar/NavBar';
import ProductCard from '../../components/productCard/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const links = [
    {
      name: 'PRODUTOS',
      url: 'http://localhost:3000/customer/products',
    },
    {
      name: 'MEUS PEDIDOS',
      url: 'http://localhost:3000/customer/products',
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

  const handleCount = ({ target }) => {
    console.log(target);
  };

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
              action={ handleCount }
            />
          ))
        }
      </div>
    </>
  );
}

export default Products;
