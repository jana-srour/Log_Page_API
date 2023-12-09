import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { Link as RouterLink } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/signin">
        LogSample
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const email = data.get('email');
    const newPassword = data.get('newpassword');
    const confirmNewPassword = data.get('confirmnewpassword');
    
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match.");
      return;
    }

    changePassword(email, newPassword);
  };

  const changePassword = async (email, newPassword) => {
    try {
      const response = await fetch('http://localhost:5000/Login/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Password change successful:', data);
        showSnackbar('success', 'Password changed successfully!');
      } else {
        const errorData = await response.json();
        console.error('Password change failed:', errorData.message);
        showSnackbar('error', 'Password change failed.');
      }
    } catch (error) {
      console.error('An error occurred during password change:', error);
      showSnackbar('error', 'An error occurred during password change.');
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
        <Box
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
    <Paper
        elevation={3}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            border: '2px solid #e0e0e0',
            background: '#ffffff',
            width: '35%',
            margin: 'auto',
            marginTop: '75px',
        }}
    >
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
          <Avatar sx={{ m: 1, bgcolor: '#3254a8' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                required
                fullWidth
                name="newpassword"
                label="New Password"
                type="password"
                id="newpassword"
                autoComplete="new-password"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                required
                fullWidth
                name="confirmnewpassword"
                label="Confirm New Password"
                type="password"
                id="confirmnewpassword"
                autoComplete="new-password"
                />
            </Grid>
            <Grid item xs={6}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Change Password
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                component={RouterLink} to="/signin"
                >
                Sign In
                </Button>
            </Grid>
            </Grid>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleSnackbarClose}
                severity={snackbarSeverity}
                >
                {snackbarMessage}
                </MuiAlert>
            </Snackbar>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      </Paper>
      </Box>
    </ThemeProvider>
  );
}