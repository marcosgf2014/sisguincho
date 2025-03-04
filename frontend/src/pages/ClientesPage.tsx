import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import ClienteForm from '../components/ClienteForm';
import ClienteList from '../components/ClienteList';
import { Cliente } from '../types/Cliente';

const ClientesPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSubmit = async (cliente: Cliente) => {
    try {
      if (cliente.id) {
        await axios.put(`http://localhost:5000/api/clientes/${cliente.id}`, cliente);
      } else {
        await axios.post('http://localhost:5000/api/clientes', cliente);
      }
      fetchClientes();
      setShowForm(false);
      setSelectedCliente(undefined);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await axios.delete(`http://localhost:5000/api/clientes/${id}`);
        fetchClientes();
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    }
  };

  return (
    <Box>
      {!showForm ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(true)}
            sx={{ mb: 3 }}
          >
            Novo Cliente
          </Button>
          <ClienteList
            clientes={clientes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
          />
        </>
      ) : (
        <ClienteForm
          cliente={selectedCliente}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedCliente(undefined);
          }}
        />
      )}
    </Box>
  );
};

export default ClientesPage; 