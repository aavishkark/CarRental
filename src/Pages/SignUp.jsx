import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function SignUp() {
    const city = [
        'Mumbai',
        'Delhi',
        'Bangalore',
        'Kolkata',
        'Chennai',
        'Hyderabad',
        'Pune',
        'Ahmedabad',
        'Jaipur',
        'Lucknow',
      ];
      const [open, setOpen] = React.useState(false);
      const [success,setsuccess]=useState()
      const navigate=useNavigate()
  const handleClose = () => {
    setOpen(false);
    if(success===true){
         navigate('/login')
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post(`https://charming-deer-sari.cyclic.app/users/register`,{
      email: data.get('email'),
      password: data.get('password'),
      username:data.get('username'),
      pastRides: [],
      city:data.get('city'),
      activeRides: [],
      cart: []
    })
    .then((res)=>{
      setsuccess(true)
      setOpen(true);
    })
    .catch((err)=>{
      setsuccess(false)
      setOpen(true);
    })
  
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginBottom:8,
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item>
              <TextField
          id="outlined-select-currency"
          name="city"
          select
          label="Select City"
          value="Mumbai"
        >
          {city.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
              </Grid>
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      {!success?<Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Wrong Credentials, Please Try Again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Sign Up</Button>
          <Button onClick={handleClose}>Try Again</Button>
        </DialogActions>
      </Dialog>:<Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Registration Successful
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Login</Button>
        </DialogActions>
      </Dialog>}
      </Container>
    </ThemeProvider>
  );
}