# 🔀 Guia de Troca de Backend — CRUD Design System

Este guia explica como alternar entre os backends **Java (Spring Boot)** e **NestJS** sem alterar nenhuma linha do frontend.

---

## 🎯 Conceito Central

> **"O frontend não sabe qual backend está rodando. Ele só sabe fazer requisições para `/api/v1/...`"**

Ambos os backends:
- Expõem os mesmos endpoints (`/api/v1/products`, `/api/v1/auth/login`, etc.)
- Retornam o mesmo formato JSON
- Usam o mesmo mecanismo de autenticação JWT

---

## ⚡ Como Trocar (1 linha)

Edite o arquivo `frontend/.env.local`:

```bash
# Usando Spring Boot (Java) — porta 8080
NEXT_PUBLIC_BACKEND_TYPE=java
NEXT_PUBLIC_JAVA_API_URL=http://localhost:8080

# ─── OU ───

# Usando NestJS — porta 3001
NEXT_PUBLIC_BACKEND_TYPE=nestjs
NEXT_PUBLIC_NESTJS_API_URL=http://localhost:3001
```

Reinicie o frontend:
```bash
npm run dev
```

✅ Pronto. O frontend automaticamente aponta para o novo backend.

---

## 🔧 Como Funciona Tecnicamente

O arquivo [`frontend/src/lib/backend-config.ts`](../frontend/src/lib/backend-config.ts) é o ponto central:

```ts
const BACKEND_CONFIGS = {
  java: {
    baseUrl: process.env.NEXT_PUBLIC_JAVA_API_URL || "http://localhost:8080",
    apiPrefix: "/api/v1",
  },
  nestjs: {
    baseUrl: process.env.NEXT_PUBLIC_NESTJS_API_URL || "http://localhost:3001",
    apiPrefix: "/api/v1",
  },
};

export const ACTIVE_API_BASE_URL =
  BACKEND_CONFIGS[process.env.NEXT_PUBLIC_BACKEND_TYPE || "java"].baseUrl + "/api/v1";
```

O [`frontend/src/lib/api.ts`](../frontend/src/lib/api.ts) usa `ACTIVE_API_BASE_URL` como base URL do Axios.

---

## 📡 Contrato da API (igual nos dois backends)

Ambos retornam **exatamente este JSON**:

```json
{
  "success": true,
  "message": "...",
  "data": { ... },
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

Resposta paginada:
```json
{
  "success": true,
  "data": {
    "content": [...],
    "page": 0,
    "size": 10,
    "totalElements": 50,
    "totalPages": 5,
    "first": true,
    "last": false,
    "empty": false
  }
}
```

---

## 🗄️ Banco de Dados em cada backend

Ambos os backends suportam MySQL e PostgreSQL:

| | Java | NestJS |
|---|---|---|
| `.env` | `backend/.env` | `backend-nestjs/.env` |
| MySQL | `jdbc:mysql://localhost:3306/db` | `mysql://user:pass@localhost:3306/db` |
| PostgreSQL | `jdbc:postgresql://localhost:5432/db` | `postgresql://user:pass@localhost:5432/db` |

---

## 📊 Comparativo dos Backends

| Aspecto | Java (Spring Boot) | NestJS |
|---|---|---|
| Linguagem | Java 21 | TypeScript |
| Porta | 8080 | 3001 |
| ORM | Spring Data JPA | TypeORM |
| Swagger | `/swagger-ui.html` | `/swagger-ui` |
| Status | ✅ Completo | 🔧 Esqueleto base |
