import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Gerenciamento de Guincho
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/clientes">
            Clientes
          </Button>
          <Button color="inherit" component={RouterLink} to="/veiculos">
            Veículos
          </Button>
          <Button color="inherit" component={RouterLink} to="/servicos">
            Serviços
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 