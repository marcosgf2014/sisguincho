export interface Veiculo {
  id?: number;
  cliente_id: number;
  placa: string;
  marca: string;
  modelo: string;
  ano: string;
  cor: string;
  chassi: string;
  observacoes?: string;
} 