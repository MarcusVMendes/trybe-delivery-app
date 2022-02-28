import React from 'react';
import PropTypes from 'prop-types';

function Button({ text, type, testId, isDisabled, action }) {
  return (
    <button
      type={ type === 'button' ? 'button' : 'submit' }
      data-testid={ testId }
      disabled={ isDisabled }
      onClick={ action }
    >
      { text }
    </button>
  );
}

Button.defaultProps = {
  isDisabled: false,
  action: () => undefined,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  action: PropTypes.func,
};

export default Button;
