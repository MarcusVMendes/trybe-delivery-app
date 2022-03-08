import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import Register from '../pages/register/Register';

describe('Testa o componente de página <Register />', () => {
  let nameInput = '';
  let emailInput = '';
  let passwordInput = '';

  beforeEach(() => {
    renderWithRouter(<Register />);

    nameInput = screen.getByTestId(/input-name/i);
    emailInput = screen.getByTestId(/input-email/i);
    passwordInput = screen.getByTestId(/input-password/i);
  });

  test('Testa se são apresentados todos os campos para realizar o registro', () => {
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('Testa se no campo NOME aparece a mensagem informativa personalizada', () => {
    // const nameInput = screen.getByLabelText(/nome/i);
    userEvent.type(nameInput, 'leticia');

    const alertName = screen.getByText("O campo nome deve ter no mínimo 12 caracteres");
    expect(alertName).toBeInTheDocument();
  });

  // test('Testa se no campo EMAIL aparece a mensagem informativa personalizada', () => {});
  // test('Testa se no campo SENHA aparece a mensagem informativa personalizada', () => {});
  // test('', () => {});
});