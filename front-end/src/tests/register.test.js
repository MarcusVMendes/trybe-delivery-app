import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import Register from '../pages/register/Register';

describe('Testa o componente de página <Register />', () => {
  let NAME_INPUT = '';
  let EMAIL_INPUT = '';
  let PASSWORD_INPUT = '';

  const ELEMENT_INVALID_ID = 'common_register__element-invalid_register';
  const NAME_VALID_MSG = 'O campo nome deve ter no mínimo 12 caracteres';
  const EMAIL_VALID_MSG = 'Digite um email válido';
  const PASS_VALID_MSG = 'O campo senha deve ter no mínimo 6 caracteres';

  beforeEach(() => {
    renderWithRouter(<Register />);

    NAME_INPUT = screen.getByTestId(/input-name/i);
    EMAIL_INPUT = screen.getByTestId(/input-email/i);
    PASSWORD_INPUT = screen.getByTestId(/input-password/i);
  });

  test('Testa se são apresentados os campos NOME, EMAIL E PASSWORD para realizar o registro', () => {
    expect(NAME_INPUT).toBeInTheDocument();
    expect(EMAIL_INPUT).toBeInTheDocument();
    expect(PASSWORD_INPUT).toBeInTheDocument();
  });

  test('Testa o campo NOME: verifica se aparece uma mensagem informativa ao digitar um nome com a quantidade de caracteres insuficientes', () => {
    const alertMessages = screen.queryAllByTestId(ELEMENT_INVALID_ID);    
    expect(alertMessages.every((message) => message.hidden)).toBe(false);

    userEvent.type(NAME_INPUT, 'leticia');

    const alertName = screen.getByText(NAME_VALID_MSG);
    expect(alertName).toBeInTheDocument();
  });

  test('Testa o campo EMAIL: verifica se aparece uma mensagem informativa ao digitar um e-mail inválido', () => {
    const alertMessages = screen.queryAllByTestId(ELEMENT_INVALID_ID);    
    expect(alertMessages.every((message) => message.hidden)).toBe(false);

    userEvent.type(EMAIL_INPUT, 'email');

    const alertEmail = screen.getByText(EMAIL_VALID_MSG);
    expect(alertEmail).toBeInTheDocument();
  });
  // test('Testa se no campo SENHA aparece a mensagem informativa personalizada', () => {});
  // test('', () => {});
});