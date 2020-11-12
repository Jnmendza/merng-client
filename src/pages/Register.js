import React, { useContext, useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  FormControlLabel, 
  Checkbox, 
  Link, 
  Box, 
  Typography,
  SvgIcon,
 } from '@material-ui/core';

import { ReactComponent as Logo } from '../images/logo.svg'

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import BG from '../images/welcome.png'

const useStyles = makeStyles((theme) => ({
  gridItem: {
    backgroundImage: `url(${BG})`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh',
    margin: 'auto'
  },
  boxContainer: {
    width: '100%',
    height: '100vh',
    margin: 'auto'
  },
  paper: {
    width: '50%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    width: 128,
    height: 128
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register(props) {
  const classes = useStyles()
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="container">
      <CssBaseline />
      <Grid container>
      <Grid item xs={5} style={{ margin: '13rem 0' }} >
      <div className={classes.paper}>
      <SvgIcon className={classes.avatar}>
              <Logo />
      </SvgIcon>
      <form onSubmit={onSubmit} noValidate className={classes.form}>
      <TextField
        fullWidth
        margin= 'normal'
        variant="outlined"
        label="Username"
        placeholder="Username.."
        name="username"
        type="text"
        value={values.username}
        error={errors.username ? true : false}
        onChange={onChange}
        />
        <br />
        <TextField
          fullWidth
          margin= 'normal'
          variant="outlined"
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
          />
        <br />
        <TextField
          fullWidth
          margin= 'normal'
          variant="outlined"
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
          />
        <br />
        <TextField
          fullWidth
          margin= 'normal'
          variant="outlined"
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
          />
        <br />
        <Button 
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Register
        </Button>
        <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already have an account? Login Here"}
                  </Link>
                </Grid>
              </Grid>
          </form>
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
            <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
              ))}
              </ul>
              </div>
              )}
              </div>
              </Grid>

                <Grid item xs={7} className={classes.gridItem}>

                </Grid> 

              </Grid>
              </div>
              );
            }
            
            const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;