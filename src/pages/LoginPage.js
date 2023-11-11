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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react'
import axios from 'axios'
import { SnackbarProvider, useSnackbar } from 'notistack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../components/AuthContext';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  let [id,setID] = useState('');
  let [password,setPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  let navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {event.preventDefault();};
  const { login, setName } = useAuth();

  const submitbuttondemo = (event) => {
    event.preventDefault();
    console.log("Snack should appear");
    
    // ฝากมะปราง CALL API ตรงนี้ TO AUTHENTICATE AND GET USER SALT to var {token} 
    // ใช้ค่า ID:Password จาก var id, password
    // call แนว ๆ ใช้ AXIOS แบบ ฟังก์ชั่นข้างล่าง หรือยังไงแล้วแต่พี่สะดวก
    // axios.post(....).then((response) => {ในนี้ก็เช็คว่า ล๊อคอินผ่าน success แล้วก็ใช้โค้ดข้างล่าง set ค่าเพื่อให้หน้าอื่น ๆ ใช้ได้}
    // ตัวอย่างหน้าตาค่าที่น่าจะได้คือ
    var success = true; // ตัวอย่าง
    var token = '12345678'; //จิง ๆ ก็คือ salt หรือ user id อะไรก็ได้ที่เป็น primary key ของ user แค่ให้รู้ว่าหน้า table เวลา query ต้องเอาจากไหน
    var error_message = 'Invalid ID or Password'; //ตัวอย่าง ไม่่ต้องมีก็ได้ เผื่อจะโชว์ error message แบบอื่น ๆ ด้วย แต่ตั้งไว้แบบนี้แค่นั้นก็พอแล้วแหละ

    if (success){
      login(token); //  TOKEN ใส่ฟังก์ชั่นนี้ เป็น Context Provider มันจะส่งไปหน้า Main ให้
      setName(id);
      enqueueSnackbar('Login Success', { variant: 'success' });
      navigate('/main');
    }
    else{
      enqueueSnackbar(`Login Failed: ${error_message}`, { variant: 'error' });
    }

  }

  // const submitbutton = () => {
  //   axios.post(
  //     'http://localhost:5000/tokens',
  //     {id: id, password:password},
  //     {header: {
  //         /*Authorization:'Bearer'+token*/},timeout:10*1000}
  //     ).then((response) => {
  //       /* SAVE RESPONSE TO COOKIE FIRST */
  //       navigate('/main');
  //     }).catch((error) => {
  //       if (error.code === 'ECONNABORTED') {
  //         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  //         <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
  //             timeout
  //         </Alert>
  //         </Snackbar>

  //       } else {
  //         let errMesg = error.response.status + ' ' + error.response.statusText;
  //         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  //         <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>{errMesg}
  //         </Alert>
  //         </Snackbar>
  //     }
  // })
  // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" style={{backgroundColor:'white',opacity:0.8,borderRadius:"25px"}}>
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
          <Box component="not-form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>{setID(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={(e)=>{setPassword(e.target.value)}}
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit-1"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(event)=>{submitbuttondemo(event)}}>
              Sign In
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


