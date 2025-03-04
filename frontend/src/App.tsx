import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  AppBar,
} from '@mui/material';
// @ts-ignore
import ClientesPage from './pages/ClientesPage';
// @ts-ignore
import VeiculosPage from './pages/VeiculosPage';
// @ts-ignore
import ServicosPage from './pages/ServicosPage';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Typography variant="h4" component="h1" sx={{ p: 2, textAlign: 'center' }}>
          Sistema de Gerenciamento de Guincho
        </Typography>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          centered
          textColor="inherit"
          indicatorColor="secondary"
          aria-label="Navegação principal"
        >
          <Tab label="Clientes" {...a11yProps(0)} />
          <Tab label="Veículos" {...a11yProps(1)} />
          <Tab label="Serviços" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Container>
        <TabPanel value={currentTab} index={0}>
          <ClientesPage />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <VeiculosPage />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <ServicosPage />
        </TabPanel>
      </Container>
    </Box>
  );
};

export default App;
