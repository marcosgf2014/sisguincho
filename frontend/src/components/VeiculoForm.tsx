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
import { Veiculo } from '../types/Veiculo';
import { Cliente } from '../types/Cliente';

interface VeiculoFormProps {
  veiculo?: Veiculo;
  clientes: Cliente[];
  onSubmit: (veiculo: Veiculo) => void;
  onCancel: () => void;
}

const VeiculoForm: React.FC<VeiculoFormProps> = ({
  veiculo,
  clientes,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Veiculo>({
    cliente_id: 0,
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    cor: '',
    chassi: '',
    observacoes: '',
  });

  useEffect(() => {
    if (veiculo) {
      setFormData(veiculo);
    }
  }, [veiculo]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cliente_id' ? Number(value) : value,
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
          {veiculo ? 'Editar Veículo' : 'Novo Veículo'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Cliente</InputLabel>
            <Select
              value={String(formData.cliente_id)}
              label="Cliente"
              name="cliente_id"
              onChange={handleSelectChange}
              required
            >
              {clientes.map((cliente) => (
                <MenuItem key={cliente.id} value={String(cliente.id)}>
                  {cliente.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Placa"
            name="placa"
            value={formData.placa}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Marca"
            name="marca"
            value={formData.marca}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Ano"
            name="ano"
            value={formData.ano}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Cor"
            name="cor"
            value={formData.cor}
            onChange={handleTextChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Chassi"
            name="chassi"
            value={formData.chassi}
            onChange={handleTextChange}
            required
            margin="normal"
          />
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
              {veiculo ? 'Atualizar' : 'Cadastrar'}
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

export default VeiculoForm; 