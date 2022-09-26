import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { setShowLogin } from '../redux/reducers/userInfoSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Login } from './Login';
import { letterSpacing } from '@mui/system';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.userInfo.showLogin)
  const handleLoginOpen = () => {
    dispatch(setShowLogin())
  } 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <img alt='logo' src='../assets/logo-jester.png' />
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, marginLeft: '15px' }}
          ></Typography>
          <Button color='inherit'>Tutorial</Button>
          <Button color='inherit' onClick = { handleLoginOpen }>Login</Button>
          <Login open={open}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
