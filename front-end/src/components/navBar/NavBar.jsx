import React from 'react';
import PropTypes from 'prop-types';

function NavBar({ userName, role, ...links }) {
  const isCustomer = role === 'customer';
  const baseUrl = 'http://localhost:3000/';

  return(
    <header>
      <nav>
        <div>
          <a href={ ...links }>{ ...links }</a>
          {isCustomer && <a href={ ...links }>{ ...links }</a>}
        </div>
        <div>
          <p>{ userName }</p>
          <a href={`${baseUrl}login`}>SAIR</a>
        </div>
      </nav>
    </header>

  );
}

NavBar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  userName: PropTypes.string.isRequired,
};

export default NavBar;
