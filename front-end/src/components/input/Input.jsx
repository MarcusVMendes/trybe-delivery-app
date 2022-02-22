import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

function Input({ label, type, placeholder, testId }) {
  return (
    <div className="input-container">
      <label className="input-label">{ label }</label>
      <input
        className="input"
        type={ type }
        placeholder={ placeholder }
        required
        data-test-id={ testId }
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default Input;
