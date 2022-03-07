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

  test('Testa se aparece uma mensagem de erro quando um login é inválido', () => {
    const loginInvalid = screen.getByTestId(loginInvalidTestID);
    expect(loginInvalid.hidden).toBe(true);

    const emailInput = screen.getByLabelText(/login/i);
    userEvent.type(emailInput, 'email@mail.com');

    const passInput = screen.getByLabelText(/senha/i);
    userEvent.type(passInput, '123456');

    const buttomLogin = screen.getByRole('button', { name: /login/i });
    userEvent.click(buttomLogin);

    // DISCUTIR COM O TIME O PORQUÊ DO TESTE NÃO CONSEGUIR CAPTURAR ESSE ALERT.
    const alertMessage = screen.getByText(/Email ou senha incorretos/i)
    expect(alertMessage.textContent).toBe('Email ou senha incorretos');
  });
});

// describe('1.1 Testa se é possível realizar o login', () => {
//   test('Testa se ao informar email e senha corretos, se é redirecionado para a página de produtos', () => {
//     const { history } = renderWithRouter(<Login />);
//     // captura o input
//     const emailInput = screen.getByLabelText(/login/i);
//     const passInput = screen.getByLabelText(/senha/i);
//     // escreve
//     userEvent.type(emailInput, 'zebirita@email.com');
//     userEvent.type(passInput, '$#zebirita#$');
//     // clica em login
//     const buttomLogin = screen.getByRole('button', { name: /login/i });
//     userEvent.click(buttomLogin);

//     const { pathname } = history.entries[1];
//     expect(pathname).toMatch('/customer/products');
//     // const loading = screen.getByText(/carregando/i);
//     // expect(loading).toBeInTheDocument();
//   });
// });
