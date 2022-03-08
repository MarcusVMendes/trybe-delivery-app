import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import Register from '../pages/register/Register';

describe('Testa o componente de página <Register />', () => {

  beforeEach(() => {
    renderWithRouter(<Register />);
  });

  test('Testa se são apresentados todos os campos para realizar o registro', () => {
    const nameInput = screen.getByTestId(/input-name/i);
    const emailInput = screen.getByTestId(/input-email/i);
    const passwordInput = screen.getByTestId(/input-password/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });


  // test('', () => {});
});