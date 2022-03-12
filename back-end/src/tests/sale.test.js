const frisby = require('frisby');
const { expect } = require('chai');

describe('POST /sale', () => {
  describe('Valida que não é possível criar uma venda sem estar autenticado', () => {
    it('Será validado que não é permitido criar uma venda com token expirado ou inválido', async () => {});
    it('Será validado que não é permitido criar uma venda sem um token', async () => {});
  });

  describe('Valida se todos os campos obrigatórios são enviados corretamente ao tentar criar uma nova venda', () => {
    it('Será validado que não é possível criar um venda sem o campo totalPrice', async () => {});
    it('Será validado que não é possível criar um venda sem o campo deliveryAddress', async () => {});
    it('Será validado que não é possível criar um venda sem o campo deliveryNumber', async () => {});
    it('Será validado que não é possível criar um venda sem o campo status', async () => {});
    it('Será validado que não é possível criar um venda sem o campo products', async () => {});
    it('Será validado que não é possível criar um venda sem o campo sellerId', async () => {});
  });

  describe('Valida se é possível criar uma venda com sucesso quando todos os campos são enviados corretamente', () => {
    it('Será validado que a venda foi criada com sucesso', async () => {
      // verificar se os atributos aparecem no retorno e se o status da requisição é CREATED
    });
  });
});

describe('GET /sale', () => {
  describe('Valida se todas as vendas são listadas', () => {
    it('Será validado que, ao estar autenticado e acessar a rota, todas as vendas são listadas', async () => {});
  })
});

describe('GET /sale/:id', () => {
  describe('Valida se uma venda é listada através do seu ID', () => {
    it('Será validado que, ao estar autenticado e acessar a rota com ID da venda, ela é listada', async () => {});
  });
});