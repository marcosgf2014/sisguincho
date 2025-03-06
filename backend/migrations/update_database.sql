-- Atualizar a tabela de serviços
ALTER TABLE servicos
DROP COLUMN status,
ADD COLUMN prestador VARCHAR(255) NOT NULL DEFAULT 'Não informado',
ADD COLUMN fotos JSON DEFAULT NULL,
ADD COLUMN checklist JSON NOT NULL;

-- Atualizar os registros existentes com valores padrão para os novos campos
UPDATE servicos
SET checklist = JSON_OBJECT(
  'combustivel', 'Bom',
  'paralama', 'Bom',
  'capo', 'Bom',
  'teto', 'Bom',
  'pneus', 'Bom',
  'macaco', 'Bom',
  'triangulo', 'Bom',
  'extintor', 'Bom',
  'acessorios_internos', 'Bom',
  'outros', 'Bom',
  'observacoes_checklist', ''
)
WHERE checklist IS NULL; 