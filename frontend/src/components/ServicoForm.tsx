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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Grid,
  Input,
} from '@mui/material';
import { Servico } from '../types/Servico';
import { Veiculo } from '../types/Veiculo';
import { NumericFormat } from 'react-number-format';

interface ServicoFormProps {
  servico?: Servico;
  veiculos: Veiculo[];
  onSubmit: (servico: Servico) => void;
  onCancel: () => void;
}

const TIPOS_SERVICO = [
  'Pane Mecânica',
  'Pane Seca',
  'Pane Elétrica',
  'Batida',
  'Outros'
];

const ESTADOS_ITEM = ['Bom', 'Regular', 'Avariado'];

const ServicoForm: React.FC<ServicoFormProps> = ({
  servico,
  veiculos,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Servico>({
    veiculo_id: veiculos.length > 0 ? veiculos[0].id! : 0,
    data_servico: new Date().toISOString().split('T')[0],
    prestador: '',
    tipo_servico: TIPOS_SERVICO[0],
    origem: '',
    destino: '',
    valor: 0,
    observacoes: '',
    fotos: [],
    checklist: {
      combustivel: 'Bom',
      paralama: 'Bom',
      capo: 'Bom',
      teto: 'Bom',
      pneus: 'Bom',
      macaco: 'Bom',
      triangulo: 'Bom',
      extintor: 'Bom',
      acessorios_internos: 'Bom',
      outros: 'Bom',
      observacoes_checklist: '',
    },
  });

  useEffect(() => {
    if (servico) {
      setFormData(servico);
    } else if (veiculos.length > 0 && formData.veiculo_id === 0) {
      setFormData(prev => ({
        ...prev,
        veiculo_id: veiculos[0].id!
      }));
    }
  }, [servico, veiculos]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'valor' ? Number(value.replace(/[^0-9]/g, '')) / 100 : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'veiculo_id' ? Number(value) : value,
    }));
  };

  const handleChecklistChange = (item: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [item]: e.target.value,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      const fileUrls = fileList.map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        fotos: [...(prev.fotos || []), ...fileUrls],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          {servico ? 'Editar Serviço' : 'Novo Serviço'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
            </Grid>

            <Grid item xs={12} md={6}>
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
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Prestador"
                name="prestador"
                value={formData.prestador}
                onChange={handleTextChange}
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo de Serviço</InputLabel>
                <Select
                  value={formData.tipo_servico}
                  label="Tipo de Serviço"
                  name="tipo_servico"
                  onChange={handleSelectChange}
                  required
                >
                  {TIPOS_SERVICO.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Origem"
                name="origem"
                value={formData.origem}
                onChange={handleTextChange}
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Destino"
                name="destino"
                value={formData.destino}
                onChange={handleTextChange}
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumericFormat
                customInput={TextField}
                value={formData.valor}
                onValueChange={(values) => {
                  setFormData((prev) => ({
                    ...prev,
                    valor: values.floatValue || 0,
                  }));
                }}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale
                fullWidth
                label="Valor"
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <Input
                type="file"
                inputProps={{ multiple: true, accept: 'image/*' }}
                onChange={handleFileChange}
                fullWidth
                margin="dense"
              />
              {formData.fotos && formData.fotos.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {formData.fotos.map((foto, index) => (
                    <img
                      key={index}
                      src={foto}
                      alt={`Foto ${index + 1}`}
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                  ))}
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Checklist do Veículo
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(formData.checklist).map(([key, value]) => {
                  if (key !== 'observacoes_checklist') {
                    return (
                      <Grid item xs={12} sm={6} key={key}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                          </FormLabel>
                          <RadioGroup
                            row
                            name={key}
                            value={value}
                            onChange={handleChecklistChange(key)}
                          >
                            {ESTADOS_ITEM.map((estado) => (
                              <FormControlLabel
                                key={estado}
                                value={estado}
                                control={<Radio />}
                                label={estado}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    );
                  }
                  return null;
                })}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Observações do Checklist"
                name="observacoes_checklist"
                value={formData.checklist.observacoes_checklist}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    checklist: {
                      ...prev.checklist,
                      observacoes_checklist: e.target.value,
                    },
                  }));
                }}
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Observações Gerais"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleTextChange}
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>
          </Grid>

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