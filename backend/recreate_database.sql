DROP DATABASE IF EXISTS guincho_db;
CREATE DATABASE guincho_db;
USE guincho_db;

CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  endereco TEXT NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS veiculos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  placa VARCHAR(10) NOT NULL,
  marca VARCHAR(50) NOT NULL,
  modelo VARCHAR(50) NOT NULL,
  ano VARCHAR(4) NOT NULL,
  cor VARCHAR(30) NOT NULL,
  chassi VARCHAR(50) NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS servicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  veiculo_id INT NOT NULL,
  data_servico DATE NOT NULL,
  prestador VARCHAR(255) NOT NULL,
  tipo_servico VARCHAR(100) NOT NULL,
  origem VARCHAR(200) NOT NULL,
  destino VARCHAR(200) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  observacoes TEXT,
  fotos JSON DEFAULT NULL,
  checklist JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE
);

-- Inserir alguns dados de exemplo
INSERT INTO clientes (nome, telefone, endereco, email) VALUES
('João Silva', '(11) 99999-9999', 'Rua A, 123', 'joao@email.com');

INSERT INTO veiculos (cliente_id, placa, marca, modelo, ano, cor, chassi, observacoes) VALUES
(1, 'ABC1234', 'Toyota', 'Corolla', '2020', 'Prata', '12345678901234567', 'Veículo em bom estado'); 