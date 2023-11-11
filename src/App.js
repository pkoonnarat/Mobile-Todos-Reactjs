
import './index.css';
import Main from './pages/Main';
import LoginPage from './pages/LoginPage';

import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import Credit from './pages/Credit';
import { Routes, Route } from 'react-router-dom'
import { useCallback } from 'react';
import config from './config';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { AuthProvider } from './components/AuthContext';
import SideBar from './components/SideBar';
function App() {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadSlim(engine);
  }, []);
  
  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);
  
  
  return(
    <AuthProvider>
    <div id='outer-container'>
      <SideBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
      <div id='page-wrap'>
        <Particles id="tsparticles" options={config.particles} init={particlesInit} loaded={particlesLoaded} />
        
        <SnackbarProvider maxSnack={3}>
          <Routes>
            <Route exact path="/" element={<LoginPage/>}/>
            <Route path="/signin" element={<LoginPage/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/credit" element={<Credit/>}/>

         </Routes>
         </SnackbarProvider>
      </div>
    </div>
    </AuthProvider>
    );
  }
  export default App;
  