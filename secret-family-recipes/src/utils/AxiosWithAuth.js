import axios from 'axios';

const AxiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: 'https://webunit4-secret-family-recipes.herokuapp.com/api/',
    headers: {
      Authorization: token,
    },
  });
};

export default AxiosWithAuth;
