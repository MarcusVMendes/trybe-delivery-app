import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const login = async (email, password) => {
  const body = { email, password };
  const { data } = await axios.post(`${baseUrl}/user/login`, body);

  return data;
};

export default {
  login,
};
