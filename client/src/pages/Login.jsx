import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { Navigate } from "react-router-dom";

import Page from "../components/Page";
import AuthService from "../utils/auth";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Make those '}
      <Link color="secondary.main" href="https://mui.com/">
        Gainz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const headContent = (
  <>
    <title>Login</title>
    <meta name="description" content="Login for Project-3 Starter Code." />
  </>
);


export default function Login() {
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);
  const { isAuthenticated } = useSelector(getUser());

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });

      AuthService.login(data.loginUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
  <Page isProtected={false} headContent={headContent}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <form onSubmit={handleFormSubmit} component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                value={formState.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={formState.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color={'secondary'}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {error && <h3>{error.message}</h3>}
  </Page>
  );
}
