# API_LOGIN_GOOGLE

API de autenticação via Google OAuth 2.0 com Node.js e Express.  
Salva os dados do usuário no banco de dados MySQL na tabela `clientes`.

---

## ✅ Funcionalidades

- Login com conta Google
- Cadastro automático do usuário no banco
- API pronta para integração com front-end

---

## 🧰 Tecnologias

- Node.js
- Express
- Passport + passport-google-oauth20
- MySQL
- dotenv
- cookie-session

---

## 📁 Estrutura

API_LOGIN_GOOGLE/
├── config/
│ └── db.js # Conexão com MySQL
├── routes/
│ └── auth.js # Rotas de login e callback
├── server.js # Inicializa o servidor
├── .env # Variáveis de ambiente
├── package.json
└── README.md

yaml
Copiar
Editar

---

## ⚙️ Configuração

### 1. Clonar repositório

```bash
git clone https://github.com/Kauapietro031nl/API_LOGIN_GOOGLE.git
cd API_LOGIN_GOOGLE
2. Instalar dependências
bash
Copiar
Editar
npm install
3. Criar o banco e a tabela
sql
Copiar
Editar
CREATE DATABASE nome_do_banco;

USE nome_do_banco;

CREATE TABLE clientes (
  id CHAR(36) NOT NULL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(100),
  google_id VARCHAR(100),
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);
4. Criar o arquivo .env
Crie um arquivo .env na raiz do projeto com os seguintes dados:

env
Copiar
Editar
PORT=3000

# Google OAuth
GOOGLE_CLIENT_ID=SEU_CLIENT_ID
GOOGLE_CLIENT_SECRET=SEU_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Sessão
SESSION_SECRET=sua_chave_secreta

# Banco de dados
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
▶️ Executar o projeto
bash
Copiar
Editar
node server.js
Acesse no navegador:

bash
Copiar
Editar
http://localhost:3000/auth/google
🔁 Como funciona
O usuário acessa a rota /auth/google.

É redirecionado para fazer login no Google.

O Google redireciona de volta para /auth/google/callback.

A API captura os dados do usuário, salva no banco e cria a sessão.

O usuário é redirecionado para /profile.

📌 Observações
Campo senha fica vazio no login via Google (pode ser usado para login manual no futuro).

Campo google_id salva o ID fornecido pelo Google.

A chave primária id é um UUID manual (char(36)) — você pode usar a lib uuid para gerar.

🔒 Licença
Este projeto não possui licença definida.
Sinta-se à vontade para usar, modificar e adaptar conforme necessário.
