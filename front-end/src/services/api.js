import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const login = async (email, password) => {
  const body = { email, password };
  const { data } = await axios.post(`${baseUrl}/user/login`, body);

  return data;
};

const register = async (name, email, password, role) => {
  const body = { name, email, password, role };
  const data = await axios.post(`${baseUrl}/register`, body);
  const response = await data.json();

  return response;
};

export default {
  login,
  register,
};
