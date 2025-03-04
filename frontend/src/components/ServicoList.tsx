import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Servico } from '../types/Servico';

interface ServicoListProps {
  servicos: Servico[];
  onEdit: (servico: Servico) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ServicoList: React.FC<ServicoListProps> = ({
  servicos,
  onEdit,
  onDelete,
  searchTerm,
  onSearchChange,
}) => {
  const filteredServicos = servicos.filter((servico) =>
    servico.tipo_servico.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.origem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.destino.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'warning';
      case 'em_andamento':
        return 'info';
      case 'concluido':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'em_andamento':
        return 'Em Andamento';
      case 'concluido':
        return 'Concluído';
      default:
        return status;
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Pesquisar serviços"
        variant="outlined"
        value={searchTerm}
        onChange={onSearchChange}
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Origem</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServicos.map((servico) => (
              <TableRow key={servico.id}>
                <TableCell>{new Date(servico.data_servico).toLocaleDateString()}</TableCell>
                <TableCell>{servico.tipo_servico}</TableCell>
                <TableCell>{servico.origem}</TableCell>
                <TableCell>{servico.destino}</TableCell>
                <TableCell>
                  {servico.valor.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell>
                  <Chip
                    label={formatStatus(servico.status)}
                    color={getStatusColor(servico.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(servico)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => servico.id && onDelete(servico.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServicoList; 