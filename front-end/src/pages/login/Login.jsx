import React, { useState, useEffect } from 'react';
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
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [user, setUser] = useState('');
  const PASSWORD_MIN_LENGTH = 6;
  const validEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);

  const handleChange = ({ target }) => {
    const { value, type } = target;
    if (type === 'email') setEmail(value);
    if (type === 'password') setPassword(value);
  };

  const handleSubmit = async () => {
    try {
      const data = await api.login(email, password);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      if (user.role === 'customer') history.push('/customer/products');
    } catch (error) {
      setLoginError(true);

      const THREE_SECONDS = 3000;
      setTimeout(() => {
        setLoginError(false);
      }, THREE_SECONDS);
    }
  };

  useEffect(() => {
    if (validEmail && password.length >= PASSWORD_MIN_LENGTH) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password, validEmail]);

  return (
    <Container>
      <form className="login-form">
        <Input
          label="Login"
          placeholder="email@trybeer.com"
          type="email"
          testId="common_login__input-email"
          handleChange={ handleChange }
        />
        <Input
          label="Senha"
          placeholder="*********"
          type="password"
          testId="common_login__input-password"
          handleChange={ handleChange }
        />
        <Button
          text="LOGIN"
          testId="common_login__button-login"
          isDisabled={ buttonDisabled }
          action={ handleSubmit }
        />
        <Button
          text="Ainda não tenho conta"
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