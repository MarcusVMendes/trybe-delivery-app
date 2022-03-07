import React from 'react';
import { Router } from 'react-router';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

function renderWithRouter(componentToRender) {
  const customHistory = createMemoryHistory();

  return {
    ...render(
      <Router history={ customHistory }>
        { componentToRender }
      </Router>,
    ),
    history: customHistory,
  };
}

export default renderWithRouter;
