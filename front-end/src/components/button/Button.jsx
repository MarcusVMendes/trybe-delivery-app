import React from 'react';
import PropTypes from 'prop-types';

function Button({ text, testId, isDisabled, action }) {
  return (
    <button
      type="button"
      data-testid={ testId }
      disabled={ isDisabled }
      onClick={ action }
    >
      { text }
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
};

export default Button;
