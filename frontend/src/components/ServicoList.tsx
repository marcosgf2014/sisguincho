import React, { useState } from 'react';
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
  Dialog,
  DialogContent,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import { Servico } from '../types/Servico';
import { Veiculo } from '../types/Veiculo';
import ServicoReport from './ServicoReport';

interface ServicoListProps {
  servicos: Servico[];
  veiculos: Veiculo[];
  onEdit: (servico: Servico) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ServicoList: React.FC<ServicoListProps> = ({
  servicos,
  veiculos,
  onEdit,
  onDelete,
  searchTerm,
  onSearchChange,
}) => {
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [reportOpen, setReportOpen] = useState(false);

  const filteredServicos = servicos.filter((servico) =>
    servico.tipo_servico.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.origem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.destino.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = (servico: Servico) => {
    setSelectedServico(servico);
    setReportOpen(true);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const getVeiculo = (veiculo_id: number) => {
    return veiculos.find(v => v.id === veiculo_id);
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
              <TableCell>Prestador</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Origem</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServicos.map((servico) => (
              <TableRow key={servico.id}>
                <TableCell>{new Date(servico.data_servico).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{servico.prestador}</TableCell>
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
                  <IconButton onClick={() => onEdit(servico)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(servico.id!)} color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handlePrint(servico)} color="primary">
                    <PrintIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {selectedServico && (
            <>
              <ServicoReport
                servico={selectedServico}
                veiculo={getVeiculo(selectedServico.veiculo_id)!}
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => setReportOpen(false)} color="secondary">
                  Fechar
                </Button>
                <Button onClick={handlePrintReport} variant="contained" color="primary">
                  Imprimir
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ServicoList; 