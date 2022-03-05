import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../pages/login/Login';
import renderWithRouter from './utils/renderWithRouter';

describe('1. Testa o componente <Login /> ', () => {
  const passwordTestID = 'common_login__input-password';
  const buttonRegisterID = 'common_login__button-register';
  const loginInvalidTestID = 'common_login__element-invalid-email';

  beforeEach(() => {
    renderWithRouter(<Login />);
  });

  test('Testa se a página contém os campos para realizar o login', () => {
    const emailInput = screen.getByPlaceholderText('email@trybeer.com');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId(passwordTestID);
    expect(passwordInput).toBeInTheDocument();

    const buttomLogin = screen.getByRole('button', { name: 'LOGIN' });
    expect(buttomLogin).toBeInTheDocument();
  });

  test('Testa se existe o botão de cadastro', () => {
    const buttomRegister = screen.getByTestId(buttonRegisterID);
    expect(buttomRegister).toBeInTheDocument();
  });
  
  test('Testa se o botão de logar está desabilitado antes de informar as credenciais', () => {
    const buttomLogin = screen.getByRole('button', { name: 'LOGIN' });
    expect(buttomLogin.disabled).toBe(true);
  });

  test('Testa se é informado quando um login é inválido', () => {
    const loginInvalid = screen.getByTestId(loginInvalidTestID);
    expect(loginInvalid.hidden).toBe(true);

    // captura o input
    const emailInput = screen.getByLabelText(/login/i);
    const passInput = screen.getByLabelText(/senha/i);
    // escreve
    userEvent.type(emailInput, 'email@mail.com');
    userEvent.type(passInput, '123456');
    // verifica
    const buttomLogin = screen.getByRole('button', { name: /login/i });
    userEvent.click(buttomLogin);

    const alertMessage = screen.getByText(/Email ou senha incorretos/i)
    expect(alertMessage.textContent).toBe('Email ou senha incorretos');

  });


});

// describe('conjunto de testes 2', () => {
//   test('', () => {});
//   test('', () => {});
// });
