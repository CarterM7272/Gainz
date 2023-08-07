import Page from "../components/Page";
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
import { Stack } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { Navigate } from "react-router-dom";

import AuthService from "../utils/auth";


const headContent = (
  <>
    <title>Change Me! - Home</title>
    <meta name="description" content="This is the home page of my app." />
  </>
);

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
      <Container component="main" maxWidth="md">
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
          <Typography component="h2" variant="h5">
            Welcome to
          </Typography>
          <Typography color="secondary.main" sx={{ borderBottom: '3px solid black', padding: 1, marginBottom: 1, borderRadius: '10px' }} component="h1" variant="h1">
            Gainz
          </Typography>
          <Typography flexWrap="1" component="h3" variant="body1" sx={{ fontWeight: 'bold', m: 1 }}>
          Introducing Gainz,
          a fitness app designed to streamline your workout experience. Seamlessly navigate through an extensive exercise compendium categorized by muscle groups, ensuring targeted and effective training sessions. Then monitor and optimize your nutritional intake in real-time with the integrated calorie tracker.
          </Typography>
          <Typography sx={{ fontWeight: 'bold', m: 1 }}> Personalization is key – save and access your favored workout routines with ease, tailoring your regimen to fit your unique goals. Our user-friendly interface facilitates swift navigation, making it effortless to discover new exercises, track your calorie intake, and curate a collection of go-to workouts. Find your new fitness routine today with our app, as it empowers you to achieve your aspirations through a fusion of exercise guidance, nutritional insights, and workout customization. Your path to a healthier, stronger you starts here.</Typography>
            <form onSubmit={handleFormSubmit} component="form" noValidate sx={{ mt: 1 }}>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
            {!isAuthenticated && (
                <Link to={"/signUp"}>
                  <Button variant="contained" color={'secondary'}>Sign Up</Button>
                </Link>
              )}
              <Typography>or</Typography>
              {!isAuthenticated && (
                <Link to={"/login"}>
                  <Button variant="contained" >Login</Button>
                </Link>
              )}
            </Stack>
            </form>
          </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {error && <h3>{error.message}</h3>}
  </Page>
  );
}
