export interface Servico {
  id?: number;
  veiculo_id: number;
  data_servico: string;
  prestador: string;
  tipo_servico: string;
  origem: string;
  destino: string;
  valor: number;
  observacoes?: string;
  fotos?: string[];
  checklist: {
    combustivel: string;
    paralama: string;
    capo: string;
    teto: string;
    pneus: string;
    macaco: string;
    triangulo: string;
    extintor: string;
    acessorios_internos: string;
    outros: string;
    observacoes_checklist?: string;
  };
} 