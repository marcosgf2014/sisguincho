const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./config/database');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Rotas para Clientes
// Listar todos os clientes
app.get('/api/clientes', (req, res) => {
  connection.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Buscar cliente por ID
app.get('/api/clientes/:id', (req, res) => {
  connection.query(
    'SELECT * FROM clientes WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results[0]);
    }
  );
});

// Criar novo cliente
app.post('/api/clientes', (req, res) => {
  const { nome, telefone, endereco, email } = req.body;
  connection.query(
    'INSERT INTO clientes (nome, telefone, endereco, email) VALUES (?, ?, ?, ?)',
    [nome, telefone, endereco, email],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: results.insertId, ...req.body });
    }
  );
});

// Atualizar cliente
app.put('/api/clientes/:id', (req, res) => {
  const { nome, telefone, endereco, email } = req.body;
  connection.query(
    'UPDATE clientes SET nome = ?, telefone = ?, endereco = ?, email = ? WHERE id = ?',
    [nome, telefone, endereco, email, req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

// Excluir cliente
app.delete('/api/clientes/:id', (req, res) => {
  connection.query(
    'DELETE FROM clientes WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Cliente excluído com sucesso' });
    }
  );
});

// Rotas para Veículos
app.get('/api/veiculos', (req, res) => {
  connection.query(
    `SELECT v.*, c.nome as cliente_nome 
     FROM veiculos v 
     JOIN clientes c ON v.cliente_id = c.id`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    }
  );
});

app.get('/api/veiculos/:id', (req, res) => {
  connection.query(
    'SELECT * FROM veiculos WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results[0]);
    }
  );
});

app.post('/api/veiculos', (req, res) => {
  const { cliente_id, placa, marca, modelo, ano, cor, chassi, observacoes } = req.body;
  connection.query(
    'INSERT INTO veiculos (cliente_id, placa, marca, modelo, ano, cor, chassi, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [cliente_id, placa, marca, modelo, ano, cor, chassi, observacoes],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: results.insertId, ...req.body });
    }
  );
});

app.put('/api/veiculos/:id', (req, res) => {
  const { cliente_id, placa, marca, modelo, ano, cor, chassi, observacoes } = req.body;
  connection.query(
    'UPDATE veiculos SET cliente_id = ?, placa = ?, marca = ?, modelo = ?, ano = ?, cor = ?, chassi = ?, observacoes = ? WHERE id = ?',
    [cliente_id, placa, marca, modelo, ano, cor, chassi, observacoes, req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

app.delete('/api/veiculos/:id', (req, res) => {
  connection.query(
    'DELETE FROM veiculos WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Veículo excluído com sucesso' });
    }
  );
});

// Rotas para Serviços
app.get('/api/servicos', (req, res) => {
  connection.query(
    `SELECT s.*, v.placa as veiculo_placa, v.marca as veiculo_marca, v.modelo as veiculo_modelo
     FROM servicos s
     JOIN veiculos v ON s.veiculo_id = v.id`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    }
  );
});

app.get('/api/servicos/:id', (req, res) => {
  connection.query(
    'SELECT * FROM servicos WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results[0]);
    }
  );
});

app.post('/api/servicos', (req, res) => {
  const { veiculo_id, data_servico, tipo_servico, origem, destino, valor, status, observacoes } = req.body;
  connection.query(
    'INSERT INTO servicos (veiculo_id, data_servico, tipo_servico, origem, destino, valor, status, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [veiculo_id, data_servico, tipo_servico, origem, destino, valor, status, observacoes],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: results.insertId, ...req.body });
    }
  );
});

app.put('/api/servicos/:id', (req, res) => {
  const { veiculo_id, data_servico, tipo_servico, origem, destino, valor, status, observacoes } = req.body;
  connection.query(
    'UPDATE servicos SET veiculo_id = ?, data_servico = ?, tipo_servico = ?, origem = ?, destino = ?, valor = ?, status = ?, observacoes = ? WHERE id = ?',
    [veiculo_id, data_servico, tipo_servico, origem, destino, valor, status, observacoes, req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

app.delete('/api/servicos/:id', (req, res) => {
  connection.query(
    'DELETE FROM servicos WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Serviço excluído com sucesso' });
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 