import React from 'react';
import PropTypes from 'prop-types';

function Button({ text, testId }) {
  return (
    <button type="button" data-testid={ testId }>
      { text }
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default Button;
