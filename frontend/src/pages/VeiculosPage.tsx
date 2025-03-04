import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import VeiculoForm from '../components/VeiculoForm';
import VeiculoList from '../components/VeiculoList';
import { Veiculo } from '../types/Veiculo';
import { Cliente } from '../types/Cliente';

const VeiculosPage: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchVeiculos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/veiculos');
      setVeiculos(response.data);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    fetchVeiculos();
    fetchClientes();
  }, []);

  const handleSubmit = async (veiculo: Veiculo) => {
    try {
      if (veiculo.id) {
        await axios.put(`http://localhost:5000/api/veiculos/${veiculo.id}`, veiculo);
      } else {
        await axios.post('http://localhost:5000/api/veiculos', veiculo);
      }
      fetchVeiculos();
      setShowForm(false);
      setSelectedVeiculo(undefined);
    } catch (error) {
      console.error('Erro ao salvar veículo:', error);
    }
  };

  const handleEdit = (veiculo: Veiculo) => {
    setSelectedVeiculo(veiculo);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este veículo?')) {
      try {
        await axios.delete(`http://localhost:5000/api/veiculos/${id}`);
        fetchVeiculos();
      } catch (error) {
        console.error('Erro ao excluir veículo:', error);
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
            Novo Veículo
          </Button>
          <VeiculoList
            veiculos={veiculos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
          />
        </>
      ) : (
        <VeiculoForm
          veiculo={selectedVeiculo}
          clientes={clientes}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedVeiculo(undefined);
          }}
        />
      )}
    </Box>
  );
};

export default VeiculosPage; 