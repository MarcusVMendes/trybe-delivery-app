import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const login = async (email, password) => {
  const body = { email, password };
  const { data } = await axios.post(`${baseUrl}/user/login`, body);

  return data;
};

const getProducts = async () => {
  const { data } = await axios.get(`${baseUrl}/products`);
  const { products } = data;

  return products;
};

const register = async (name, email, password, role = 'customer') => {
  const body = { name, email, password, role };
  const data = await axios.post(`${baseUrl}/user/register`, body);

  return data;
};

// const getSellers = async () => {
//   const users = await axios.get(`${baseUrl}/user`)
// };

const insertSale = async (totalPrice, deliveryAddress, deliveryNumber, status, products, sellerId, token) => {
  const infosSale = { totalPrice, deliveryAddress, deliveryNumber, status, products, sellerId };
  const { data } = await axios.post(`${baseUrl}/sale`, infosSale, {
    headers: {
      authorization: token,
    }
  });
  console.log(data);

  return data;
};

export default {
  login,
  getProducts,
  register,
  insertSale,
};
