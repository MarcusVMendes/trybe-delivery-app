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

const getSales = async (token) => {
  const { data } = await axios.get(`${baseUrl}/sale`, {
    headers: {
      authorization: token,
    },
  });

  return data;
};

const getSaleById = async (token, id) => {
  const { data } = await axios.get(`${baseUrl}/sale/${id}`, {
    headers: {
      authorization: token,
    },
  });

  return data;
};

export default {
  login,
  getProducts,
  register,
  getSales,
  getSaleById,
};
