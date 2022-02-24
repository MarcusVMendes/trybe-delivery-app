import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const login = async (email, password) => {
  const body = { email, password };
  const data = await axios.post(`${baseUrl}/user`, body);
  const response = await data.json();

  return response;
};

export default {
  login,
};
