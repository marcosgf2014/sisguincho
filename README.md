# Sistema de Gerenciamento de Guincho

Este é um sistema web para gerenciamento de uma empresa de guincho, permitindo o cadastro de clientes e futuramente o gerenciamento de veículos e check-lists.

## Requisitos

- Node.js (versão 14 ou superior)
- MySQL (já instalado no sistema)

## Configuração

1. Clone o repositório
2. Configure o banco de dados:
   - Abra o MySQL e execute o script em `backend/database.sql`
   - Atualize as credenciais do banco de dados em `backend/config/database.js`

3. Instale as dependências do backend:
```bash
cd backend
npm install
```

4. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

## Executando a aplicação

1. Inicie o servidor backend:
```bash
cd backend
npm run dev
```

2. Em outro terminal, inicie o frontend:
```bash
cd frontend
npm start
```

3. Acesse a aplicação em `http://localhost:3000`

## Funcionalidades

### Implementadas
- Cadastro de clientes
- Edição de clientes
- Exclusão de clientes
- Pesquisa de clientes

### Próximas etapas
- Cadastro de veículos
- Check-list de veículos
- Upload de fotos
- Geração de relatórios 