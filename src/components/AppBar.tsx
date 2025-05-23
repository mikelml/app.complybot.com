import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { IoMenuOutline } from 'react-icons/io5'
import { signOut } from 'next-auth/react';

const ButtonAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <IoMenuOutline />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ComplyBot
          </Typography>
          <Button color="inherit"onClick={() => signOut()}>logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar;