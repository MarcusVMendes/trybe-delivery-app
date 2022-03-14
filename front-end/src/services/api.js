import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const login = async (email, password) => {
  const body = { email, password };
  const { data } = await axios.post(`${baseUrl}/user/login`, body);

  return data;
};

const register = async (name, email, password, role = 'customer') => {
  const body = { name, email, password, role };
  const data = await axios.post(`${baseUrl}/user/register`, body);

  return data;
};

const adminRegister = async (...params) => {
  const [name, email, password, role = 'customer', token] = params;
  const body = { name, email, password, role };
  const headers = { 'Content-Type': 'application/json', authorization: token };
  const data = await axios.post(`${baseUrl}/admin/register`, body, { headers });

  return data;
};

const getAllNonAdminUsers = async (token) => {
  const headers = { authorization: token };
  const { data } = await axios.get(`${baseUrl}/admin`, { headers });

  return data;
};

const getProducts = async () => {
  const { data } = await axios.get(`${baseUrl}/products`);
  const { products } = data;

  return products;
};

const insertSale = async (token, ...infoSale) => {
  const [
    totalPrice, deliveryAddress, deliveryNumber, status, products, sellerId,
  ] = infoSale;
  const { data } = await axios.post(`${baseUrl}/sale`, {
    totalPrice, deliveryAddress, deliveryNumber, status, products, sellerId,
  }, {
    headers: {
      authorization: token,
    },
  });

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

const getUserByEmail = async (email) => {
  const user = await axios.get(`${baseUrl}/user/${email}`);

  return user;
};

const getSaleById = async (token, id) => {
  const { data } = await axios.get(`${baseUrl}/sale/${id}`, {
    headers: {
      authorization: token,
    },
  });

  return data;
};

const updateSaleById = async (token, id) => {
  const { data } = await axios.put(`${baseUrl}/sale/${id}`, {
    headers: {
      authorization: token,
    },
  });

  return data;
};

export default {
  login,
  register,
  adminRegister,
  getAllNonAdminUsers,
  getUserByEmail,
  getProducts,
  insertSale,
  getSales,
  getSaleById,
  updateSaleById,
};
