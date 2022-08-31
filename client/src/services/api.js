import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8080'
});

export const login = async (username, password) => {
  try {
      const { data } = await api.post('/user/login', { username, password });
      console.log(data);
      return data
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (username, password) => {
  try {
    const { data } = await api.post('/user/signup', { username, password });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
