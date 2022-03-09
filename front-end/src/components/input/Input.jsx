import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

function Input({ label, name, type, placeholder, testId, handleChange, value }) {
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
        min="0"
        placeholder={ placeholder }
        required
        data-testid={ testId }
        onChange={ handleChange }
        autoComplete="off"
        value={ value }
      />
    </div>
  );
}

Input.defaultProps = {
  value: '',
  name: '',
  placeholder: '',
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Input;
