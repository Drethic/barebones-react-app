import React, { useState } from 'react';

import {
  Button,
  TextField,
  FormHelperText
} from '@material-ui/core';
import * as yup from 'yup';
import { withRouter, useHistory } from 'react-router-dom';
import '../css/AuthPage.css';
import NavTabs from './Navigation/Tabs/NavTabs';

import AxiosWithAuth from '../utils/AxiosWithAuth';

//Form Validation Schema
function Auth(props) {
  const baseSchemaFields = {
    email: yup
      .string()
      .email('Must be a Valid email address.')
      .required('You must include an email address.'),
    password: yup.string().required('Please enter your password.'),
  };

  const loginSchema = yup.object().shape(baseSchemaFields);

  const registerSchema = yup.object().shape({
    ...baseSchemaFields,
    name: yup
      .string()
      .required('You must include your name.')
  });

  let history = useHistory();
  let currentRoute = history.location.pathname.split('/')[1];
  let currentSchema = loginSchema;
  if (currentRoute === 'register') {
    currentSchema = registerSchema;
  }
  //Setting Error State for validation errors.
  const [errorState, setErrorState] = useState({
    email: '',
    name: '',
    password:'',
  });

  //Form Validation check
  const validate = (e) => {
    const value = e.target.value;
    yup
      .reach(currentSchema, e.target.name)
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

  const register = (e) => {
    e.preventDefault();
    console.log(creds);
    AxiosWithAuth()
      .post('auth/register', creds)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        props.history.push('/recipes-home');
      })
      .catch((err) => {
        console.log('Err is: ', err);
      });
  };

  const baseFields = (
    <>
    <TextField
      id='email'
      label='email'
      type='email'
      name='email'
      variant='outlined'
      data-cy='email-input'
      value={creds.email}
      onChange={handleChange}
    />
    {errorState.email.length > 0 ? <FormHelperText>{errorState.email}</FormHelperText> : null}
    <TextField
      id='password'
      label='password'
      type='password'
      name='password'
      variant='outlined'
      data-cy='password-input'
      value={creds.password}
      onChange={handleChange}
    />
    {errorState.password.length > 0 ? <FormHelperText>{errorState.password}</FormHelperText> : null}
    </>
  );

  const registerFields = (
    <>
    <TextField
      id='name'
      label='name'
      type='text'
      name='name'
      variant='outlined'
      data-cy='name-input'
      value={creds.name}
      onChange={handleChange}
    />
    {errorState.name.length > 0 ? <FormHelperText>{errorState.name}</FormHelperText> : null}
    {baseFields}
    </>
  );

  const submitButton = (text, dataCy) => (
    <Button type='submit' variant='contained' color='primary' data-cy={dataCy}>
      {text}
    </Button>
  );

  const loginForm = (
    <form onSubmit={login}>
      <div className='authInput'>
      {baseFields}
      {submitButton('Log in', 'login')}
      </div>
    </form>
  );

  const registerForm = (
    <form onSubmit={register}>
      <div className='authInput'>
        {registerFields}
        {submitButton('Register', 'register')}
      </div>
    </form>
  );

  return (
    <section className='loginContainer'>
      <NavTabs
        tabs={[
          { label: 'Login', link: '/login', panel: loginForm, tabOrder: 0 },
          { label: 'Register', link: '/register', panel: registerForm, tabOrder: 1 },
        ]}
      />
    </section>
  );
}
export default withRouter(Auth);
