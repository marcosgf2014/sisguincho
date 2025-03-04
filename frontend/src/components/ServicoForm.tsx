import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { Servico } from '../types/Servico';
import { Veiculo } from '../types/Veiculo';

interface ServicoFormProps {
  servico?: Servico;
  veiculos: Veiculo[];
  onSubmit: (servico: Servico) => void;
  onCancel: () => void;
}

const ServicoForm: React.FC<ServicoFormProps> = ({
  servico,
  veiculos,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Servico>({
    veiculo_id: 0,
    data_servico: new Date().toISOString().split('T')[0],
    tipo_servico: '',
    origem: '',
    destino: '',
    valor: 0,
    status: 'pendente',
    observacoes: '',
    fotos: [],
  });

  useEffect(() => {
    if (servico) {
      setFormData(servico);
    }
  }, [servico]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'valor' ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'veiculo_id' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          {servico ? 'Editar Serviço' : 'Novo Serviço'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Veículo</InputLabel>
            <Select
              value={String(formData.veiculo_id)}
              label="Veículo"
              name="veiculo_id"
              onChange={handleSelectChange}
              required
            >
              {veiculos.map((veiculo) => (
                <MenuItem key={veiculo.id} value={String(veiculo.id)}>
                  {veiculo.placa} - {veiculo.marca} {veiculo.modelo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Data do Serviço"
            name="data_servico"
            type="date"
            value={formData.data_servico}
            onChange={handleTextChange}
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Tipo de Serviço"
            name="tipo_servico"
            value={formData.tipo_servico}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Origem"
            name="origem"
            value={formData.origem}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Destino"
            name="destino"
            value={formData.destino}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Valor"
            name="valor"
            type="number"
            value={formData.valor}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              name="status"
              onChange={handleSelectChange}
              required
            >
              <MenuItem value="pendente">Pendente</MenuItem>
              <MenuItem value="em_andamento">Em Andamento</MenuItem>
              <MenuItem value="concluido">Concluído</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Observações"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleTextChange}
            multiline
            rows={3}
            margin="normal"
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {servico ? 'Atualizar' : 'Cadastrar'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ServicoForm; 