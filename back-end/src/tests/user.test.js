const frisby = require('frisby');
const { expect } = require('chai');

const {
  BAD_REQUEST,
  NOT_FOUND,
  NOT_FOUND_MSG,
  BAD_REQUEST_MSG,
  OK,
  CONFLICT,
  CREATED
} = require('../api/utils/dictionary');

const URL = 'http://localhost:3001';
const USER_LOGIN_ROUTE = '/user/login';
const USER_REGISTER_ROUTE = '/user/register';

describe('POST /user/login', () => {
  describe('Quando os campos EMAIL / SENHA não são enviados', () => {
    it('Será validado que não é possível fazer o login sem campo EMAIL', async () => {
      await frisby
        .post(`${URL}${USER_LOGIN_ROUTE}`, {
          password: '123',
        })
        .expect('status', BAD_REQUEST)
        .then((responseLogin) => {
          const { body } = responseLogin;
          const result = JSON.parse(body);
          expect(result.message).to.contains('email', 'required');
        })
    });

    it('Será validado que não é possível fazer o login sem um e-mail no formato "email@dominio.com"', async () => {
      await frisby
        .post(`${URL}${USER_LOGIN_ROUTE}`, {
          email: 'nao sou um email válido',
          password: 'aquelaQueNaoDeveSerDigitada',
        })
        .expect('status', BAD_REQUEST)
        .then((responseLogin) => {
          const { body } = responseLogin;
          const result = JSON.parse(body);

          expect(result.message).to.contain('must be a valid email');
        })
    });

    it('Será validado que não é possível fazer o login sem campo SENHA', async () => {
      await frisby
        .post(`${URL}${USER_LOGIN_ROUTE}`, {
          email: 'mulhermaravilha@dccomics.com',
        })
        .expect('status', BAD_REQUEST)
        .then((responseLogin) => {
          const { body } = responseLogin;
          const result = JSON.parse(body);

          expect(result.message).to.contains('password', 'required');
        })
    });
  });

  describe('Quando as credenciais de LOGIN são enviadas', () => {
    it('Para usuário não cadastrado, será validado se apresenta uma mensagem informativa', async () => {
      await frisby
        .post(`${URL}${USER_LOGIN_ROUTE}`, {
          email: 'feiticeiraescarlate@marvel.com',
          password: 'girlpower',
        })
        .expect('status', NOT_FOUND)
        .then((responseLogin) => {
          const { body } = responseLogin;
          const result = JSON.parse(body);

          expect(result.message).to.been.equal(NOT_FOUND_MSG)
        })
    });

    it('Para usuário cadastrado e senha incorreta, será validado se retorna uma mensagem de erro', async () => {
      await frisby
        .post(`${URL}${USER_LOGIN_ROUTE}`, {
          email: 'zebirita@email.com',
          password: 'senha incorreta',
        })
        .expect('status', BAD_REQUEST)
        .then((responseLogin) => {
          const { body } = responseLogin;
          const result = JSON.parse(body);

          expect(result.message).to.been.eq(BAD_REQUEST_MSG);
        })
    });

    it('Para email e senha corretos, será validado se o endpoint é capaz de retornar um token aleatório', async () => {
      await frisby
        .post(`${URL}${USER_LOGIN_ROUTE}`, {
          email: 'zebirita@email.com',
          password: '$#zebirita#$',
        })
        .expect('status', OK)
        .then((responseLogin) => {
          const { body } = responseLogin;
          const result = JSON.parse(body);

          expect(result.token).to.exist;
        })
    });
  });
});

describe('POST /user/register', () => {
  describe('Quando os campos obrigatórios não são enviados', () => {
    it('Será validado que não é possível fazer o registro sem o campo NAME', async () => {
      await frisby
        .post(`${URL}${USER_REGISTER_ROUTE}`, {
          email: 'email@dominio.com',
          password: 'umaSenha',
        })
        .expect('status', BAD_REQUEST)
        .then((responseRegister) => {
          const { body } = responseRegister;
          const result = JSON.parse(body);

          expect(result.message).to.be.eq('"name" is required');
        })
    });

    it('Será validado que não é possível fazer o registro sem o campo EMAIL', async () => {
      await frisby
        .post(`${URL}${USER_REGISTER_ROUTE}`, {
          name: 'um nome',
          password: 'uma senha',
        })
        .expect('status', BAD_REQUEST)
        .then((responseRegister) => {
          const { body } = responseRegister;
          const result = JSON.parse(body);

          expect(result.message).to.be.eq('"email" is required');
        })
    });

    it('Será validado que não é possível registrar um email fora do formato "email@dominio.com"', async () => {
      await frisby
        .post(`${URL}${USER_REGISTER_ROUTE}`, {
          email: "não sou um email válido",
          name: 'um nome',
          password: 'uma senha',
        })
        .expect('status', BAD_REQUEST)
        .then((responseRegister) => {
          const { body } = responseRegister;
          const result = JSON.parse(body);

          expect(result.message).to.be.eq('"email" must be a valid email');
        })
    });

    it('Será validado que não é possível fazer o registro sem o campo PASSWORD', async () => {
      await frisby
      .post(`${URL}${USER_REGISTER_ROUTE}`, {
        email: "email@dominio.com",
        name: 'um nome',
      })
      .expect('status', BAD_REQUEST)
      .then((responseRegister) => {
        const { body } = responseRegister;
        const result = JSON.parse(body);

        expect(result.message).to.be.eq('"password" is required');
      })
    });

  });

  describe('Quando os campos obrigatórios são enviados corretamente', () => {
    it('Será validado que não é possível cadastrar um mesmo usuário', async () => {
      await frisby
      .post(`${URL}${USER_REGISTER_ROUTE}`, {
        email: 'zebirita@email.com',
        name: 'Cliente Zé Birita',
        password: '$#zebirita#$'
      })
      .expect('status', CONFLICT)
      .then((responseRegister) => {
        const { body } = responseRegister;
        const result = JSON.parse(body);

        expect(result.message).to.be.eq('User already registered');
      })
    });

    // ESSE TESTE REGISTRA NA TABELA delivery-app-dev E VAI FALHAR SE FOR RODADO UMA SEGUNDA VEZ
    it('Será validado que ao registrar um usuário com sucesso é retornada uma mensagem informativa', async () => {
      await frisby
      .post(`${URL}${USER_REGISTER_ROUTE}`, {
        email: 'wonder_woman@dccomics.com',
        name: 'Mulher Maravilha',
        password: 'YaraFlor',
      })
      .expect('status', CREATED)
      .then((responseRegister) => {
        const { body } = responseRegister;
        const result = JSON.parse(body);
        expect(result.message).to.be.eq('User created successfully');
      })
    });
  });

});
