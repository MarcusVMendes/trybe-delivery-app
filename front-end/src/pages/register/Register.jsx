import React, { useState } from "react";
import * as yup from "yup";
import register from "../../services/api";
import Container from "../../components/container/Container";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

const NAME_LENGTH = 12;
const PASSWORD_LENGTH = 6;
const formSchema = yup.object().shape({
  name: yup.string().min(NAME_LENGTH).required(),
  email: yup.string().email().required(),
  password: yup.string().min(PASSWORD_LENGTH).required(),
});

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (!values) return;
    setIsSubmitting(true);

    await formSchema.isValid(values);

    try {
      await register(values);
    } catch (err) {
      console.error(err);
    }
    setIsSubmitting(false);
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Input
          label="Nome"
          name="name"
          type="text"
          placeholder="Seu nome"
          testId="common_register__input-name"
          onBlur={() => formSchema.isValid(values)}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="email@site.com"
          testId="common_register__input-email"
        />
        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="********"
          testId="common_register__input-password"
        />
        <Button
          text="CADASTRAR"
          testId="common_register__button-register"
          disabled={!formSchema.isValid(values) | isSubmitting}
        />
      </form>
    </Container>
  );
}

export default Register;

// feito com base no exemplo do site
// https://blog.alexdevero.com/custom-form-validation-react-yup/#validation-with-yup
