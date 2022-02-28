import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../components/container/Container';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const NAME_LENGTH = 12;
const PASSWORD_LENGTH = 6;
const CONFLICT_ERROR = 409;
const TIME = 3000;

function Register() {
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    userError: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();

  const nameValidation = (nameValue) => {
    setErrors((curr) => ({
      ...curr, // para não sobrescrever os outros estados
      nameError: nameValue.length < NAME_LENGTH, // retorna um boolean
    }));
  };

  const emailValidation = (emailValue) => {
    setErrors((curr) => ({
      ...curr,
      emailError: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue),
    }));
  };

  const passwordValidation = (passwordValue) => {
    setErrors((curr) => ({
      ...curr,
      passwordError: passwordValue.length < PASSWORD_LENGTH,
    }));
  };

  const isNameValid = (event) => {
    nameValidation(event.target.value);
  };

  const isEmailValid = (event) => {
    emailValidation(event.target.value);
  };

  const isPasswordValid = (event) => {
    passwordValidation(event.target.value);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'name') setNameField(value);
    if (name === 'email') setEmailField(value);
    if (name === 'password') setPasswordField(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await api.register(nameField, emailField, passwordField, (role = 'customer'));

      history.push('/customer/products');
    } catch (err) {
      console.error(err);
      if (err.status === CONFLICT_ERROR) {
        setErrors((curr) => ({
          ...curr,
          userError: true,
        }));

        setTimeout(() => {
          history.push('/login');
        }, TIME);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <Container>
      <div
        data-testid="common_register__element-invalid_register"
        hidden={ !errors }
      >
        { errors.userError
          && <p>Email já registrado. Você será redirecionado para o login.</p> }
      </div>
      <form onSubmit={ handleSubmit }>
        <Input
          label="Nome"
          name="name"
          type="text"
          placeholder="Seu nome"
          testId="common_register__input-name"
          handleChange={ handleChange }
          onBlur={ isNameValid }
        />
        <div
          data-testid="common_register__element-invalid_register"
          hidden={ !errors }
        >
          { errors.nameError && <p>O campo nome deve ter no mínimo 12 caracteres</p> }
        </div>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="email@site.com"
          testId="common_register__input-email"
          handleChange={ handleChange }
          onBlur={ isEmailValid }
        />
        <div
          data-testid="common_register__element-invalid_register"
          hidden={ !errors }
        >
          { errors.emailError && <p>Digite um email válido</p> }
        </div>
        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="********"
          testId="common_register__input-password"
          handleChange={ handleChange }
          onBlur={ isPasswordValid }
        />
        <div
          data-testid="common_register__element-invalid_register"
          hidden={ !errors }
        >
          { errors.passwordError && (
            <p>O campo senha deve ter no mínimo 6 caracteres</p>
          ) }
        </div>
        <Button
          text="CADASTRAR"
          type="submit"
          testId="common_register__button-register"
          isDisabled={ !nameField || !emailField || !passwordField || isSubmitting }
        />
      </form>
    </Container>
  );
}

export default Register;
