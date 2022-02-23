import React from 'react';
import PropTypes from 'prop-types';

function Button({ text, testId, isDisabled }) {
  return (
    <button type="button" data-testid={ testId } disabled={ isDisabled }>
      { text }
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default Button;
