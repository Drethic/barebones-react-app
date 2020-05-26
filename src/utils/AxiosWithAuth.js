import axios from 'axios';

const AxiosWithAuth = () => (
  axios.create({
    // baseURL: 'https://webunit4-secret-family-recipes.herokuapp.com/api/',
    baseURL: 'http://localhost:9090/api/',
    withCredentials: true,
  })
);

export default AxiosWithAuth;
