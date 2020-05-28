import axios from 'axios';

const AxiosWithAuth = () => (
  axios.create({
    // baseURL: 'https://webunit4-secret-family-recipes.herokuapp.com/api/',
    baseURL: 'http://localhost:9090/api/',
    // This is how cookies are made
    // FIXED!
    withCredentials: true,
  })
);

export default AxiosWithAuth;
