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

export default {
  login,
  getProducts,
};
