import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../../components/container/Container';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import './Login.css';
import api from '../../services/api';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const PASSWORD_MIN_LENGTH = 6;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = ({ target }) => {
    const { value, type } = target;
    if (type === 'email') setEmail(value);
    if (type === 'password') setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await api.login(email, password);
      localStorage.setItem('user', JSON.stringify(data));
      if (data.role === 'customer') history.push('/customer/products');
    } catch (error) {
      setLoginError(true);

      const TWO_SECONDS = 2000;
      setTimeout(() => {
        setLoginError(false);
      }, TWO_SECONDS);
    }
  };

  const validateLogin = (login, secret) => login && secret.length >= PASSWORD_MIN_LENGTH;

  return (
    <Container>
      <form className="login-form">
        <Input
          label="Login"
          placeholder="email@trybeer.com"
          type="email"
          testId="common_login__input-email"
          handleChange={ handleChange }
          value={ email }
        />
        <Input
          label="Senha"
          placeholder="*********"
          type="password"
          testId="common_login__input-password"
          handleChange={ handleChange }
          value={ password }
        />
        <Button
          text="LOGIN"
          type="submit"
          testId="common_login__button-login"
          isDisabled={ !validateLogin(validEmail, password) }
          action={ handleSubmit }
        />
        <Button
          text="Ainda não tenho conta"
          type="button"
          testId="common_login__button-register"
          action={ () => history.push('/register') }
        />
      </form>
      <div data-testid="common_login__element-invalid-email" hidden={ !loginError }>
        { loginError && <p>Email ou senha incorretos</p> }
      </div>
    </Container>
  );
}

export default Login;
