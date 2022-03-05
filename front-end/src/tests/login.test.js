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


});

// describe('conjunto de testes 2', () => {
//   test('', () => {});
//   test('', () => {});
// });
