import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { postLogin } from '../Redux/authReducer/action'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import {Backdrop} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const auth=JSON.parse(localStorage.getItem('rentaride'))
  const auth1=useSelector((store)=>{return store.authReducer})
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(postLogin({email,password}))
  }
  if(auth==true){
    navigate('/') 
  }
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
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
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e)=>{setemail(e.target.value)}}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e)=>{setpassword(e.target.value)}}
            autoComplete="current-password"
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
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {auth1.isError==true?<Alert severity="error">Wrong credentials, please try again with correct credentials</Alert>:""}
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default Login