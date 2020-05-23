import React, { useState } from 'react';

import AxiosWithAuth from '../utils/AxiosWithAuth';

function Login(props) {
  const [creds, setCreds] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };
  const login = e => {
    e.preventDefault();
    console.log(creds);
    AxiosWithAuth()
      .post('auth/login', creds)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        props.history.push('/recipes-home');
      })
      .catch(err => {
        console.log('Err is: ', err);
      });
  };
  return (
    <section className='loginForm'>
      <form onSubmit={login}>
        {/* <label>Name:</label>
        <input
          type='text'
          name='username'
          value={creds.username}
          onChange={handleChange}
        /> */}
        <label>Email:</label>
        <input
          type='email'
          name='email'
          value={creds.email}
          onChange={handleChange}
        />
        <br />
        <label>Password: </label>
        <input
          type='password'
          name='password'
          value={creds.password}
          onChange={handleChange}
        />
        <br />
        <button type='submit'>Log In</button>
      </form>
    </section>
  );
}
export default Login;
