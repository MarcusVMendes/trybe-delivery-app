const frisby = require('frisby');
const { expect } = require('chai');

const URL = 'http://localhost:3001';
const ROUTE_SALE = '/sale';
const ROUTE_LOGIN = '/user/login';
const SALE_MOCK = {
	totalPrice: 1540.99,
	deliveryAddress: 'R. Lunnar',
	deliveryNumber: '895',
	status: 'Pendente',
	sellerId: 2,
	products: [
    { productId: 8, quantity: 2 },
    { productId: 5, quantity: 25 },
    { productId: 1, quantity: 12 },
  ],
};
const SALE_ID = 3;
const LOGIN_MOCK = {
	email: 'zebirita@email.com',
	password: '$#zebirita#$',
};

const {
  UNAUTHORIZED,
  UNAUTHORIZED_TOKEN,
  UNAUTHORIZED_TOKEN_INVALID,
  CREATED,
  BAD_REQUEST,
  OK,
} = require('../api/utils/dictionary');

describe('POST /sale', () => {
  describe('Valida que não é possível criar uma venda sem estar autenticado', () => {
    it('Será validado que não é permitido criar uma venda sem um token', async () => {
      await frisby
        .post(`${URL}${ROUTE_LOGIN}`, LOGIN_MOCK)
        .then(() =>
          frisby
            .post(`${URL}${ROUTE_SALE}`, SALE_MOCK)
            .expect('status', UNAUTHORIZED)
            .then((responseCreate) => {
              const { json } = responseCreate;
              expect(json.message).to.be.eq(UNAUTHORIZED_TOKEN);
            })
        )
    });

    it('Será validado que não é permitido criar uma venda com token expirado ou inválido', async () => {
      await frisby
        .post(`${URL}${ROUTE_LOGIN}`, LOGIN_MOCK)
        .then(() => 
          frisby
            .setup({
              request: {
                headers: {
                  Authorization: 19021987,
                  'Content-Type': 'application/json',
                },
              },
            })
            .post(`${URL}${ROUTE_SALE}`, SALE_MOCK)
            .expect('status', UNAUTHORIZED)
            .then((responseCreate) => {
              const { json } = responseCreate;
              expect(json.message).to.be.eq(UNAUTHORIZED_TOKEN_INVALID);
            })
        )
    });

  });

  describe('Valida se todos os campos obrigatórios são enviados corretamente ao tentar criar uma nova venda', () => {
    it('Será validado que não é possível criar uma venda sem o campo totalPrice', async () => {
      await frisby
        .post(`${URL}${ROUTE_LOGIN}`, LOGIN_MOCK)
        .then((responseLogin) => {
          const { json } = responseLogin;
          return frisby
            .setup({
              request: {
                headers: {
                  Authorization: json.token,
                  'Content-type': 'application/json',
                },
              },
            })
            .post(`${URL}${ROUTE_SALE}`, {
              deliveryAddress: 'R. Lunnar',
              deliveryNumber: '895',
              status: 'Pendente',
              sellerId: 2,
              products: [
                { productId: 8, quantity: 2 },
                { productId: 5, quantity: 25 },
                { productId: 1, quantity: 12 },
              ],
            })
            .expect('status', BAD_REQUEST)
            .then((responseCreate) => {
              const { json } = responseCreate;
              expect(json.message).to.be.eql('"totalPrice" is required');
            })
        })
    });

    it('Será validado que não é possível criar uma venda sem o campo deliveryAddress', async () => {
      await frisby
      .post(`${URL}${ROUTE_LOGIN}`, LOGIN_MOCK)
      .then((responseLogin) => {
        const { json } = responseLogin;
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: json.token,
                'Content-type': 'application/json',
              },
            },
          })
          .post(`${URL}${ROUTE_SALE}`, {
            totalPrice: 156.23,
            deliveryNumber: '895',
            status: 'Pendente',
            sellerId: 2,
            products: [
              { productId: 8, quantity: 2 },
              { productId: 5, quantity: 25 },
              { productId: 1, quantity: 12 },
            ],
          })
          .expect('status', BAD_REQUEST)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).to.be.eql('"deliveryAddress" is required');
          })
      })
    });

    it('Será validado que não é possível criar uma venda sem o campo deliveryNumber', async () => {
      await frisby
      .post(`${URL}${ROUTE_LOGIN}`, LOGIN_MOCK)
      .then((responseLogin) => {
        const { json } = responseLogin;
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: json.token,
                'Content-type': 'application/json',
              },
            },
          })
          .post(`${URL}${ROUTE_SALE}`, {
            totalPrice: 156.23,
            deliveryAddress: 'R. Lunnar',
            status: 'Pendente',
            sellerId: 2,
            products: [
              { productId: 8, quantity: 2 },
              { productId: 5, quantity: 25 },
              { productId: 1, quantity: 12 },
            ],
          })
          .expect('status', BAD_REQUEST)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).to.be.eql('"deliveryNumber" is required');
          })
      })
    });
    
    it('Será validado que não é possível criar uma venda sem o campo status', async () => {
      await frisby
      .post(`${URL}${ROUTE_LOGIN}`, LOGIN_MOCK)
      .then((responseLogin) => {
        const { json } = responseLogin;
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: json.token,
                'Content-type': 'application/json',
              },
            },
          })
          .post(`${URL}${ROUTE_SALE}`, {
            totalPrice: 156.23,
            deliveryAddress: 'R. Lunnar',
            deliveryNumber: '895',
            sellerId: 2,
            products: [
              { productId: 8, quantity: 2 },
              { productId: 5, quantity: 25 },
              { productId: 1, quantity: 12 },
            ],
          })
          .expect('status', BAD_REQUEST)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).to.be.eql('"status" is required');
          })
      })
    });

    it('Será validado que não é possível criar uma venda sem o campo products', async () => {
      await frisby
      .post(`${URL}${ROUTE_LOGIN}`, LOGIN_MOCK)
      .then((responseLogin) => {
        const { json } = responseLogin;
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: json.token,
                'Content-type': 'application/json',
              },
            },
          })
          .post(`${URL}${ROUTE_SALE}`, {
            totalPrice: 123.30,
            deliveryAddress: 'R. Lunnar',
            deliveryNumber: '895',
            status: 'Pendente',
            sellerId: 2,
          })
          .expect('status', BAD_REQUEST)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).to.be.eql('"products" is required');
          })
      })
    });

    it('Será validado que não é possível criar uma venda sem o campo sellerId', async () => {
      await frisby
      .post(`${URL}${ROUTE_LOGIN}`, LOGIN_MOCK)
      .then((responseLogin) => {
        const { json } = responseLogin;
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: json.token,
                'Content-type': 'application/json',
              },
            },
          })
          .post(`${URL}${ROUTE_SALE}`, {
            totalPrice: 123.90,
            deliveryAddress: 'R. Lunnar',
            deliveryNumber: '895',
            status: 'Pendente',
            products: [
              { productId: 8, quantity: 2 },
              { productId: 5, quantity: 25 },
              { productId: 1, quantity: 12 },
            ],
          })
          .expect('status', BAD_REQUEST)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).to.be.eql('"sellerId" is required');
          })
      })
    });
  });

  describe('Valida se é possível criar uma venda com sucesso quando todos os campos são enviados corretamente', () => {
    it('Será validado que a venda foi criada com sucesso', async () => {
      // verificar se os atributos aparecem no retorno e se o status da requisição é CREATED
      await frisby
      .post(`${URL}${ROUTE_LOGIN}`, LOGIN_MOCK)
      .then((responseLogin) => {
        const { json } = responseLogin;
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: json.token,
                'Content-type': 'application/json',
              },
            },
          })
          .post(`${URL}${ROUTE_SALE}`, SALE_MOCK)
          .expect('status', CREATED)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json).to.have.all.keys('id', 'saleDate', 'totalPrice', 'deliveryAddress', 
            'deliveryNumber', 'sellerId', 'status', 'userId');
          })
      })
    });
  });
});

describe('GET /sale', () => {
  describe('Valida se todas as vendas são listadas', () => {
    it('Será validado que, ao estar autenticado e acessar a rota, todas as vendas são listadas', async () => {
      await frisby
      .post(`${URL}${ROUTE_LOGIN}`, LOGIN_MOCK)
      .then((responseLogin) => {
        const { json } = responseLogin;
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: json.token,
                'Content-type': 'application/json',
              },
            },
          })
          .get(`${URL}${ROUTE_SALE}`)
          .expect('status', OK)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.sales).to.be.an('array').that.is.not.empty;
          })
      })
    });
  })
});

describe('GET /sale/:id', () => {
  describe('Valida se uma venda é listada através do seu ID', () => {
    it('Será validado que, ao estar autenticado e acessar a rota com ID da venda, ela é listada', async () => {
      await frisby
      .post(`${URL}${ROUTE_LOGIN}`, LOGIN_MOCK)
      .then((responseLogin) => {
        const { json } = responseLogin;
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: json.token,
                'Content-type': 'application/json',
              },
            },
          })
          .get(`${URL}${ROUTE_SALE}/${SALE_ID}`)
          .expect('status', OK)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json).to.be.an('object').that.is.not.empty;
            expect(json.sale.id).to.be.an('number');
            expect(json.sale.id).to.be.eq(SALE_ID);
          })
      })
    });
  });
});