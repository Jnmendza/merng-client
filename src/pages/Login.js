import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import BG from '../images/bg.svg'
import { ReactComponent as Logo } from '../images/logo.svg'

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

import CssBaseline from '@material-ui/core/CssBaseline';
import { 
  SvgIcon, 
  Button, 
  TextField, 
  FormControlLabel,
  Checkbox, 
  Link, 
  Grid, 
  Box, 
  Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  boxContainer: {
    backgroundImage: `url(${BG})`,
    backgroundPosition: 'center', /* Center the image */
    backgroundRepeat: 'no-repeat', /* Do not repeat the image */
    backgroundSize: 'cover',
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
    width: 156,
    height: 156
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Login(props) {
  const classes = useStyles()
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
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

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Box className={classes.boxContainer} >
      <CssBaseline />
      <Grid container  >
        <Grid item xs={6} style={{ margin: '13rem 0' }}>
          <div className={classes.paper}>
            <SvgIcon className={classes.avatar}>
              <Logo />
            </SvgIcon>
            <form onSubmit={onSubmit} className={classes.form} noValidate>
              <TextField
                margin= 'normal'
                variant="outlined"
                label="Username"
                placeholder="Username.."
                name="username"
                type="text"
                value={values.username}
                error={errors.username ? true : false}
                onChange={onChange}
                autoComplete="email"
                autoFocus
                fullWidth
              />
              <TextField
                margin= 'normal'
                id="outlined-basic"
                variant="outlined"
                label="Password"
                placeholder="Password.."
                name="password"
                type="password"
                value={values.password}
                error={errors.password ? true : false}
                onChange={onChange}
                required
                fullWidth
                
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
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
          <Box mt={8}>
            <Copyright />
          </Box>
        </Grid>             

        <Grid item xs={6}>
        </Grid> 
      </Grid>
    </Box>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;