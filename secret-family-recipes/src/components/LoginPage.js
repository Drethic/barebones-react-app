import React, { useState } from 'react';

import { Button, TextField, FormHelperText } from '@material-ui/core';
import * as yup from 'yup';
import './css/LoginPage.css';

import AxiosWithAuth from '../utils/AxiosWithAuth';


//Form Validation Schemna
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a Valid email address.')
    .required('You must include an email address.'),
  password: yup.string().required('Please enter your password.'),
});


function Login(props) {
  //Setting Error State for validation errors.
  const [errorState, setErrorState] = useState({
    email: '',
    password:'',
  });

  //Form Validation check
  const validate = (e) => {
    const value = e.target.value;
    yup
      .reach(loginSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: '',
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const [creds, setCreds] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.persist();
    validate(e);
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    console.log(creds);
    AxiosWithAuth()
      .post('auth/login', creds)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        props.history.push('/recipes-home');
      })
      .catch((err) => {
        console.log('Err is: ', err);
      });
  };
  return (
    <section className='loginContainer'>
      <form onSubmit={login}>
        {/* <label>Name:</label>
        <input
          type='text'
          name='username'
          value={creds.username}
          onChange={handleChange}
        /> */}
        <div className='loginInput'>
          <TextField
            id='email'
            label='email'
            type='email'
            name='email'
            variant='outlined'
            //data-cy added for e2e testing
            data-cy='email-input'
            value={creds.email}
            onChange={handleChange}
          />
          {errorState.email.length > 0 ? <FormHelperText>{errorState.email}</FormHelperText> : null}
          <br />
          <TextField
            id='password'
            label='password'
            type='text'
            name='password'
            variant='outlined'
            //data-cy added for e2e testing
            data-cy='password-input'
            value={creds.password}
            onChange={handleChange}
          />
          {errorState.password.length > 0 ? <FormHelperText>{errorState.password}</FormHelperText> : null}
        <br />
        <Button type='submit' variant='contained' color='primary' data-cy='submit'>
          Log In
        </Button>
        </div>
      </form>
    </section>
  );
}
export default Login;
