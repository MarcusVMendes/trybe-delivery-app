import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

function Input({ label, name, type, placeholder, testId, handleChange }) {
  return (
    <div className="input-container">
      <label className="input-label" htmlFor={ `${label}-input` }>
        {label}
      </label>
      <input
        id={ `${label}-input` }
        name={ name }
        className="input"
        type={ type }
        placeholder={ placeholder }
        required
        data-testid={ testId }
        onChange={ handleChange }
        autoComplete="off"
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  name: '',
};

export default Input;
