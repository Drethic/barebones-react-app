import React from 'react';
import * as yup from 'yup';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import AuthForm from './Form';
import '../../css/AuthPage.css';
import NavTabs from '../Navigation/Tabs/NavTabs';
// import AxiosWithAuth from '../../utils/AxiosWithAuth';

// function AuthPage(props) {
function AuthPage() {
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
      .required('You must include your name.'),
  });

  const auth = (values, action) => {
    console.log({ values, action });
    // AxiosWithAuth()
    //   .post(`auth/${action}`, creds)
    //   .then((res) => {
    //     localStorage.setItem('token', res.data.token);
    //     props.history.push('/recipes-home');
    //   })
    //   .catch((err) => {
    //     console.log('Err is: ', err);
    //   });
  };

  const baseFields = {
    email: '',
    password: '',
  };

  const baseFieldTypes = {
    email: 'email',
    password: 'password',
  };

  const loginForm = (
    <Formik
      initialValues={baseFields}
      validationSchema={loginSchema}
      onSubmit={(values) => auth(values, 'login')}
      // onSubmit={login}
    >
      {(loginProps) => (
        <AuthForm
          action="login"
          buttonLabel="Login"
          fieldTypes={baseFieldTypes}
          {...loginProps}
        />
      )}
    </Formik>
  );

  const registerForm = (
    <Formik
      initialValues={{ name: '', ...baseFields }}
      validationSchema={registerSchema}
      onSubmit={(values) => auth(values, 'register')}
      // onSubmit={register}
    >
      {(regProps) => (
        <AuthForm
          action="register"
          buttonLabel="Register"
          fieldTypes={{ name: 'text', ...baseFieldTypes }}
          {...regProps}
        />
      )}
    </Formik>
  );

  return (
    <section className="loginContainer">
      <NavTabs
        tabs={[
          {
            label: 'Login',
            link: '/login',
            panel: loginForm,
            tabOrder: 0,
          },
          {
            label: 'Register',
            link: '/register',
            panel: registerForm,
            tabOrder: 1,
          },
        ]}
      />
    </section>
  );
}

export default withRouter(AuthPage);
