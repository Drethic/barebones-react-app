import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

//Login Validation
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a Valid email address.')
    .required('You must include an email address.'),
  password: yup.string().required('Please enter your password.'),
});

//Registration Validation
const regiterSchema = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .email('Must be a Valid email address.')
    .required('You must include an email address.'),
  password: yup.string().required('Please enter a password.'),
});

function Login() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  // your form submit function which will invoke after successful validation
  // Login default state
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  //Register default State
  const [registerState, setRegisterState] = useState({
    name: '',
    email: '',
    password: '',
  });
  //Button disabled until all fields meet schema
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  useEffect(() => {
    loginSchema.isValid(loginState).then(valid => {
      setLoginButtonDisabled(!valid);
    });
  }, [loginState]);

  return (
    //container for login element
    <div className='loginContainer'>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
      ></form>
      <div className='LoginFieldEmail'>
        {/* email/UN text field */}
        <TextField
          error={errors.email}
          id='email'
          label='email'
          variant='outlined'
          helperText={errors.email}
          ref={register({ required: true, maxLength: 10 })}
        />
        {errors.email}
        <div className='LoginFieldEmail'>
          {/* Password text field */}
          <TextField id='outlined-basic' label='password' variant='outlined' />
        </div>
      </div>
      <div className='LoginButtons'>
        {/* Login Button */}
        <Button variant='contained' color='primary'>
          Login
        </Button>
        {/* Registration Button */}
        <Button variant='contained' color='primary'>
          Register
        </Button>
      </div>
    </div>
  );
}

export default Login;
