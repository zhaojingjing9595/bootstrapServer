 import axios from 'axios';
// const api = axios.create({
//   baseURL: 'http://localhost:8000'
// });

export const login = async (username, password) => {
  try {
      const {data} = await axios.post('/user/login', { username, password });
      return data
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (username, password) => {
  try {
    const { data } = await axios.post('/user/signup', { username, password });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const ConnectToServer = async (connectionRequestObj) => {
  try {
    const { data } = await axios.post('/server-connect', connectionRequestObj);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getConnectionDetail = async (_id) => { 
  try {
    const { data } = await axios.get(`/server-connect/${_id}`);
    console.log(data)
     return data;
  } catch (error) {
    console.log(error);
  }

}