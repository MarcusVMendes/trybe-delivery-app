import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

function Header(props) {
  const history = useHistory();
  const { category, user } = props;

  const handleSubmit = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <div className="header">
      <div className="category">
        <p>{category}</p>
      </div>

      <div className="right-container">
        <div className="user-name">
          <p>{user}</p>
        </div>

        <button
          type="submit"
          className="leave-button"
          onClick={ handleSubmit }
        >
          Sair
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Header;
