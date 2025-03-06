import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClientesPage from './pages/ClientesPage';
import VeiculosPage from './pages/VeiculosPage';
import ServicosPage from './pages/ServicosPage';
import './styles/print.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/veiculos" element={<VeiculosPage />} />
            <Route path="/servicos" element={<ServicosPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
