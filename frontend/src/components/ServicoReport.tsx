import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import { Servico } from '../types/Servico';
import { Veiculo } from '../types/Veiculo';

interface ServicoReportProps {
  servico: Servico;
  veiculo: Veiculo;
}

const ServicoReport: React.FC<ServicoReportProps> = ({ servico, veiculo }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <Paper sx={{ p: 4, margin: 'auto', maxWidth: '210mm' }} elevation={0}>
      <Typography variant="h4" align="center" gutterBottom>
        Relatório de Serviço
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Data do Serviço</Typography>
          <Typography variant="body1" gutterBottom>{formatDate(servico.data_servico)}</Typography>

          <Typography variant="subtitle2">Prestador</Typography>
          <Typography variant="body1" gutterBottom>{servico.prestador}</Typography>

          <Typography variant="subtitle2">Tipo de Serviço</Typography>
          <Typography variant="body1" gutterBottom>{servico.tipo_servico}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Origem</Typography>
          <Typography variant="body1" gutterBottom>{servico.origem}</Typography>

          <Typography variant="subtitle2">Destino</Typography>
          <Typography variant="body1" gutterBottom>{servico.destino}</Typography>

          <Typography variant="subtitle2">Valor</Typography>
          <Typography variant="body1" gutterBottom>{formatCurrency(servico.valor)}</Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Dados do Veículo
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Placa</Typography>
          <Typography variant="body1" gutterBottom>{veiculo.placa}</Typography>

          <Typography variant="subtitle2">Marca/Modelo</Typography>
          <Typography variant="body1" gutterBottom>{veiculo.marca} {veiculo.modelo}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Ano</Typography>
          <Typography variant="body1" gutterBottom>{veiculo.ano}</Typography>

          <Typography variant="subtitle2">Cor</Typography>
          <Typography variant="body1" gutterBottom>{veiculo.cor}</Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Checklist do Veículo
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(servico.checklist).map(([key, value]) => {
              if (key !== 'observacoes_checklist') {
                return (
                  <TableRow key={key}>
                    <TableCell>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                );
              }
              return null;
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {servico.checklist.observacoes_checklist && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Observações do Checklist
          </Typography>
          <Typography variant="body1" paragraph>
            {servico.checklist.observacoes_checklist}
          </Typography>
        </>
      )}

      {servico.observacoes && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Observações Gerais
          </Typography>
          <Typography variant="body1" paragraph>
            {servico.observacoes}
          </Typography>
        </>
      )}

      {servico.fotos && servico.fotos.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Fotos
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
            {servico.fotos.map((foto, index) => (
              <img
                key={index}
                src={foto}
                alt={`Foto ${index + 1}`}
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            ))}
          </Box>
        </>
      )}

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={6}>
          <Box sx={{ borderTop: '1px solid black', mt: 8, pt: 1 }}>
            <Typography align="center">Assinatura do Prestador</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ borderTop: '1px solid black', mt: 8, pt: 1 }}>
            <Typography align="center">Assinatura do Cliente</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ServicoReport; 