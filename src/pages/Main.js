import React from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import MaterialTableComponent from "../components/MaterialTableComponent";
function MainPage() {
    let nav = useNavigate();
    const handlebutton = (event) => {
        nav('/credit')
      };
    return (<div>
        <Container component="main" maxWidth="md" style={{backgroundColor:'white',opacity:0.8,borderRadius:"25px"}}>
        <Box
          sx={{
            marginTop: 8,
            paddingTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5">
            Main Page
          </Typography>
          <br/>
          <MaterialTableComponent/>

        </Box>
        </Container>
        
    </div>);
}

export default MainPage;