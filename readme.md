# Ben 10 API - Entrega Contínua (AT2)

API RESTful desenvolvida em Node.js, Express, TypeScript e PostgreSQL (Sequelize) para gerenciamento de catálogo de aliens do universo **Ben 10**, configurada com esteira completa de CI/CD (GitHub Actions + Docker + Render).

## Link da API em Produção (Render)

- **URL Base da API:** `https://atv2-iec-qh59.onrender.com` 
- **Health Check:** `https://atv2-iec-qh59.onrender.com/api/health`
- **Documentação Swagger:** `https://atv2-iec-qh59.onrender.com/api-docs`

---

## Tecnologias Utilizadas

- **Backend:** Node.js 24, TypeScript, Express 5
- **Banco de Dados:** PostgreSQL com Sequelize ORM (suporte a `DB_SSL`)
- **Documentação:** Swagger / OpenAPI
- **Gerenciador de Pacotes:** pnpm (`12.8.1`)
- **Contêineres:** Docker (multi-stage build com Alpine) e Docker Compose
- **Qualidade & CI/CD:** ESLint, Prettier, Husky e GitHub Actions

---

## Como Executar Localmente

### 1. Pré-requisitos
- Node.js 24+ e `pnpm` instalados (ou Docker / Docker Compose)
- Instância PostgreSQL rodando localmente ou na nuvem (Supabase/Render)

### 2. Configuração das Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ben10
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_SSL=false
PORT=3000
```

### 3. Execução via pnpm (Desenvolvimento)
```bash
pnpm install
pnpm dev
```

### 4. Execução via Docker Compose
```bash
docker compose up -d
```

---

## Esteira de CI/CD (GitHub Actions + Render)

A cada `push` na branch `main`, o workflow `.github/workflows/deploy.yml` executa:
1. **CI (Integração Contínua):** Instalação limpa via `pnpm install --frozen-lockfile`, verificação de lint (`pnpm lint`), checagem de tipos (`pnpm type-check`) e build (`pnpm build`).
2. **Validação de Contêiner:** Build da imagem Docker (`docker build`).
3. **CD (Implantação Contínua):** Disparo de requisição `POST` via `curl` para a secret `RENDER_DEPLOY_HOOK_URL`, validando o retorno HTTP `200` ou `201`.

---

## Endpoints Disponíveis

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Verifica integridade e uptime da API |
| `GET` | `/api-docs` | Interface interativa do Swagger |
| `GET` | `/aliens` | Lista todos os aliens cadastrados |
| `GET` | `/aliens/:id` | Busca um alien específico pelo ID |
| `POST` | `/aliens` | Cadastra um novo alien |
| `PUT` | `/aliens/:id` | Atualiza os dados de um alien |
| `DELETE` | `/aliens/:id` | Remove um alien pelo ID |
