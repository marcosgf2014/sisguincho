import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Bem-vindo ao Sistema de Gerenciamento de Guincho
        </Typography>
        <Typography variant="body1" paragraph>
          Este sistema permite gerenciar:
        </Typography>
        <Typography component="ul" sx={{ pl: 4 }}>
          <li>Cadastro de clientes</li>
          <li>Registro de veículos</li>
          <li>Controle de serviços de guincho</li>
          <li>Geração de relatórios</li>
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Utilize o menu superior para navegar entre as diferentes seções do sistema.
        </Typography>
      </Paper>
    </Box>
  );
};

export default HomePage; 