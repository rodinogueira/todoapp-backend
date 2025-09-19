# TodoApp - Back-end

Back-end do **TodoApp**, uma aplicação para gerenciamento de tarefas, construída com **NestJS**, **Prisma**, **JWT** e **MySQL**.

---

## 🛠 Tecnologias

- [NestJS](https://nestjs.com/) - Framework Node.js para aplicações escaláveis.
- [Prisma](https://www.prisma.io/) - ORM moderno para banco de dados.
- [MySQL](https://www.mysql.com/) - Banco de dados relacional.
- [JWT](https://jwt.io/) - Autenticação baseada em tokens.
- [Jest](https://jestjs.io/) - Framework de testes.

---

## ⚡ Pré-requisitos

Antes de começar, você precisará ter instalado:

- Node.js ≥ 18  
- npm ou yarn  
- MySQL rodando localmente ou via container Docker  
- Git (opcional, para clonar o repositório)

---

## 📥 Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd todoapp-backend
```

## Instale as dependências:

```bash
npm install
# ou
yarn install
```

## ⚡Configuração do Banco de Dados

1. Crie um banco de dados MySQL chamado todoapp (ou outro nome, desde que seja refletido na variável de ambiente DATABASE_URL):

```sql
CREATE DATABASE todoapp;
```

2. Crie um arquivo .env na raiz do projeto com as variáveis de ambiente:

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/todoapp"
```

## Prisma - Configuração e Migração

1. Gere o cliente Prisma:

```bash
npx prisma generate
```

2. Rode a migração inicial para criar as tabelas:

```bash
npx prisma migrate dev --name init
```

## 🚀 Rodando a Aplicação

1. Inicie o servidor em modo de desenvolvimento:

```bash
npm run start:dev
# ou
yarn start:dev
```

## 🚀 Servidor

O servidor estará rodando em:

```bash
http://localhost:3000
```
---

## 🔑 Rotas e Exemplos de Uso

### Auth

### Registrar Usuário

- **POST** `/auth/register`

**Body JSON:**

```json
{
  "name": "Rodrigo Nogueira",
  "email": "rodrigo@example.com",
  "password": "123456"
}
```
#### Response esperado:

```json
{
  "id": 1,
  "name": "Rodrigo Nogueira",
  "email": "rodrigo@example.com"
}
```

### Login Usuário

- **POST** `/auth/login`

**Body JSON:**

```json
{
  "email": "rodrigo@example.com",
  "password": "123456"
}
```
#### Response esperado:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

> Use o token retornado para acessar as rotas protegidas.
---

#### Tasks (Exigem JWT no header `Authorization: Bearer <TOKEN>`)

### Criar Tarefa

**POST** `/tasks`

**Body JSON:**

```json
{
  "title": "Aprender NestJS",
  "description": "Estudar o framework NestJS com Prisma"
}
```

#### Response esperado:

```json
{
  "id": 1,
  "title": "Aprender NestJS",
  "description": "Estudar o framework NestJS com Prisma",
  "status": "pending",
  "userId": 1,
  "createdAt": "2025-09-19T05:00:00.000Z",
  "updatedAt": "2025-09-19T05:00:00.000Z"
}
```

### Listar Todas as Tarefas

**GET** `/tasks`

#### Response:

```json
[
  {
    "id": 1,
    "title": "Aprender NestJS",
    "description": "Estudar o framework NestJS com Prisma",
    "status": "pending",
    "userId": 1,
    "createdAt": "2025-09-19T05:00:00.000Z",
    "updatedAt": "2025-09-19T05:00:00.000Z"
  }
]
```

### Atualizar Tarefa

**PUT** `/tasks/:id`

**Body JSON:**

```json
{
  "title": "Aprender NestJS Avançado",
  "description": "Estudar também Guards e Pipes",
  "status": "completed"
}
```

#### Response esperado: Tarefa atualizada com novos dados.

### Remover Tarefa

**DELETE** `/tasks/:id`

#### Response esperado:

```json
{
  "message": "Task removed successfully"
}
```

## 🧪 Testes

### Rode os testes com Jest:

```bash
npm run test
# ou
yarn test
```

### Watch mode:

```bash
npm run test:watch
# ou
yarn test:watch
```

## 📚 Estrutura do Projeto

```plaintext
src/
├─ auth/           # Autenticação (JWT, Login, Registro)
├─ tasks/          # CRUD de tarefas
├─ prisma/         # Prisma Client e schema
├─ main.ts         # Entrypoint do NestJS
```
