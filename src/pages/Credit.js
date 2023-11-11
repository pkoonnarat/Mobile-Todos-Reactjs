import React from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
function MainPage() {
    let nav = useNavigate();
    const handlebutton = (event) => {
        nav('/')
      };
    return (<div>
        <Container component="main" maxWidth="xs" style={{backgroundColor:'white',opacity:0.8,borderRadius:"25px",}}>
        <Box
          sx={{
            marginTop: 10,
            paddingTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5">
            Credit
          </Typography>
          <br/>
        6334444723 Phromtep Koonnarat<br/>
        6334436723 ปริชญา ศิรินันท์อนุกูล<br/>
        6334431523 นัฐนันท์ จันทร์วิไล

          <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handlebutton}
              sx={{ mt: 3, mb: 2 }}
            >
              Logout
            </Button>

        </Box>
        </Container>
    </div>);
}

export default MainPage;