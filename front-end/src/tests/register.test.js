import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import Register from '../pages/register/Register';

describe('Testa o componente de página <Register />', () => {
  let NAME_INPUT = '';
  let EMAIL_INPUT = '';
  let PASSWORD_INPUT = '';

  const NAME_VALID_MSG = 'O campo nome deve ter no mínimo 12 caracteres';
  const EMAIL_VALID_MSG = 'Digite um email válido';
  const PASS_VALID_MSG = 'O campo senha deve ter no mínimo 6 caracteres';

  beforeEach(() => {
    renderWithRouter(<Register />);

    NAME_INPUT = screen.getByTestId(/input-name/i);
    EMAIL_INPUT = screen.getByTestId(/input-email/i);
    PASSWORD_INPUT = screen.getByTestId(/input-password/i);
  });

  test('Testa se são apresentados todos os campos para realizar o registro', () => {
    expect(NAME_INPUT).toBeInTheDocument();
    expect(EMAIL_INPUT).toBeInTheDocument();
    expect(PASSWORD_INPUT).toBeInTheDocument();
  });

  test('Testa se no campo NOME aparece a mensagem informativa personalizada', () => {
    userEvent.type(NAME_INPUT, 'leticia');

    const alertName = screen.getByText(NAME_VALID_MSG);
    expect(alertName).toBeInTheDocument();
  });

  test('Testa se no campo EMAIL aparece a mensagem informativa personalizada', () => {

  });
  // test('Testa se no campo SENHA aparece a mensagem informativa personalizada', () => {});
  // test('', () => {});
});