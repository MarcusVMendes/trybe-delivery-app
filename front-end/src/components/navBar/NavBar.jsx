import React from 'react';
import './NavBar.css';
import PropTypes from 'prop-types';

function NavBar({ userName, role, links }) {
  const isCustomer = role === 'customer';
  const baseUrl = 'http://localhost:3000/';
  const orders = 'customer_products__element-navbar-link-orders';
  // const orderLink = <a href={ links[1].url } data-testid={ orders }>{ links[1].name }</a>;

  return (
    <header>
      <nav>
        <div>
          <a
            href={ links[0].url }
            data-testid="customer_products__element-navbar-link-products"
          >
            { links[0].name }
          </a>
          {isCustomer && <a href={ links[1].url } data-testid={ orders }>{ links[1].name }</a>}
        </div>
        <div>
          <p data-testid="customer_products__element-navbar-user-full-name">
            { userName }
          </p>
          <a
            href={ `${baseUrl}login` }
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </a>
        </div>
      </nav>
    </header>
  );
}

NavBar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  role: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default NavBar;
