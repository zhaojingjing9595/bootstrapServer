 import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8000'
});

export const login = async (username, password) => {
      const { data } = await api.post('/user/login', { username, password });
      return data
};

export const signUp = async (username, password) => {
    const { data } = await api.post('/user/signup', { username, password });
    return data;
};

export const ConnectToServer = async (connectionRequestObj) => {
    const { data } = await api.post('/server-connect', connectionRequestObj);
    return data;
};

export const getConnectionDetail = async (licenseKey) => {
    const { data } = await api.get(`/server-connect/${licenseKey}`);
    return data;
};