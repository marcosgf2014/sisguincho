import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import ServicoForm from '../components/ServicoForm';
import ServicoList from '../components/ServicoList';
import { Servico } from '../types/Servico';
import { Veiculo } from '../types/Veiculo';

const ServicosPage: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [selectedServico, setSelectedServico] = useState<Servico | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchServicos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/servicos');
      setServicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const fetchVeiculos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/veiculos');
      setVeiculos(response.data);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
    }
  };

  useEffect(() => {
    fetchServicos();
    fetchVeiculos();
  }, []);

  const handleSubmit = async (servico: Servico) => {
    try {
      if (servico.id) {
        await axios.put(`http://localhost:5000/api/servicos/${servico.id}`, servico);
      } else {
        await axios.post('http://localhost:5000/api/servicos', servico);
      }
      fetchServicos();
      setShowForm(false);
      setSelectedServico(undefined);
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    }
  };

  const handleEdit = (servico: Servico) => {
    setSelectedServico(servico);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await axios.delete(`http://localhost:5000/api/servicos/${id}`);
        fetchServicos();
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
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
            Novo Serviço
          </Button>
          <ServicoList
            servicos={servicos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
          />
        </>
      ) : (
        <ServicoForm
          servico={selectedServico}
          veiculos={veiculos}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedServico(undefined);
          }}
        />
      )}
    </Box>
  );
};

export default ServicosPage; 