export interface Servico {
  id?: number;
  veiculo_id: number;
  data_servico: string;
  tipo_servico: string;
  origem: string;
  destino: string;
  valor: number;
  status: 'pendente' | 'em_andamento' | 'concluido';
  observacoes?: string;
  fotos?: string[];
} 