# 🟡 Backend NestJS — CRUD Design System

Backend **NestJS** que implementa a **mesma arquitetura** do backend Java (Spring Boot).

> **Status atual:** Esqueleto base criado. As entidades (User, Product, Category) e o módulo JWT estão prontos para implementação. Quando finalizado, o frontend troca para este backend com **uma linha no `.env.local`**.

---

## 💡 Por que NestJS além do Java?

O objetivo deste projeto é demonstrar que a **arquitetura** vale mais que a linguagem.

Os princípios são os mesmos:
- Clean Architecture (Domain → Application → Infrastructure)
- SOLID (mesmo `AbstractGenericService` com Template Method)
- Mesmo contrato de API (mesma estrutura JSON)
- Mesmo suporte a MySQL e PostgreSQL

Ao concluir este backend, você pode mostrar:
> *"Implementei a mesma plataforma em Java e Node.js — o frontend não mudou nada."*

---

## 🔀 Troca de Backend (Frontend)

Para usar este backend, basta editar o `.env.local` do **frontend**:

```bash
# frontend/.env.local

# Antes (Java)
NEXT_PUBLIC_BACKEND_TYPE=java

# Depois (NestJS)
NEXT_PUBLIC_BACKEND_TYPE=nestjs
NEXT_PUBLIC_NESTJS_API_URL=http://localhost:3001
```

O frontend chama os **mesmos endpoints** (`/api/v1/products`, `/api/v1/auth/login`, etc.)
e recebe o **mesmo JSON** — porque ambos os backends seguem o mesmo contrato.

---

## 🗄️ Banco de Dados — Totalmente Flexível

Mesmo padrão do backend Java: **troca o banco mudando o `DB_URL`**.

```bash
# backend-nestjs/.env

# MySQL (padrão)
DB_URL=mysql://root:root@localhost:3306/crud_design_system

# PostgreSQL (descomente para usar)
# DB_URL=postgresql://postgres:postgres@localhost:5432/crud_design_system
```

O `AppModule` detecta automaticamente o banco pelo `DB_URL`:
- URL começa com `mysql://` → usa driver MySQL
- URL começa com `postgresql://` → usa driver PostgreSQL

---

## 📦 Stack

| Tecnologia | Equivalente Java | Para quê |
|---|---|---|
| NestJS | Spring Boot | Framework da aplicação |
| TypeORM | Spring Data JPA | ORM / Persistência |
| mysql2 + pg | MySQL/PostgreSQL driver | Drivers de banco |
| @nestjs/jwt | JJWT | Tokens JWT |
| @nestjs/passport | Spring Security | Autenticação |
| class-validator | Bean Validation | Validação de dados |
| @nestjs/swagger | SpringDoc OpenAPI | Documentação |

---

## 📁 Estrutura de Pastas (espelho do Java)

```
src/

├── 📂 domain/                        ← Regras de negócio (mesmo do Java)
│   └── entities/
│       └── base.entity.ts            ← Equivalente ao BaseEntity.java
│                                       (UUID, audit, soft delete)
│
├── 📂 application/                   ← Casos de uso
│   └── generic.service.ts            ← Equivalente ao AbstractGenericService.java
│                                       (Template Method — CRUD herdado)
│
├── 📂 infrastructure/                ← Frameworks e HTTP
│   └── generic.controller.ts         ← Equivalente ao AbstractGenericController.java
│                                       (Endpoints herdados — mesmo JSON)
│
├── app.module.ts                     ← Módulo raiz (TypeORM + Config)
└── main.ts                           ← Entry point (porta 3001)
```

---

## 🔄 Comparativo Java ↔ NestJS

| Conceito | Java (Spring Boot) | NestJS |
|---|---|---|
| Entidade base | `BaseEntity.java` | `base.entity.ts` |
| ORM | Spring Data JPA | TypeORM |
| Service genérico | `AbstractGenericService.java` | `generic.service.ts` |
| Controller genérico | `AbstractGenericController.java` | `generic.controller.ts` |
| Config de segurança | `SecurityConfig.java` | `AuthModule` + Guards |
| Variáveis de ambiente | `application.yml` + `.env` | `.env` |
| Validação | Bean Validation (`@NotBlank`) | class-validator (`@IsNotEmpty`) |
| Documentação | SpringDoc Swagger | @nestjs/swagger |
| Porta padrão | 8080 | 3001 |

---

## 🚀 Como Rodar (quando implementado)

```bash
# 1. Entre na pasta
cd backend-nestjs

# 2. Instale as dependências
npm install

# 3. Configure o ambiente
copy .env.example .env
# Edite o .env com as suas credenciais

# 4. Crie o banco (MySQL)
# CREATE DATABASE crud_design_system;

# 5. Rode em desenvolvimento
npm run start:dev
```

URLs disponíveis:
- API: `http://localhost:3001/api/v1`
- Swagger: `http://localhost:3001/swagger-ui`

---

## ✅ Status de Implementação

### Base (concluído)
- [x] `BaseEntity` com UUID, auditoria e soft delete
- [x] `AbstractGenericService` com Template Method
- [x] `AbstractGenericController` com CRUD herdado
- [x] `AppModule` com TypeORM flexível (MySQL/PostgreSQL)
- [x] Contrato de API idêntico ao Java (`ApiResponse<T>`, `PaginatedResponse<T>`)

### Próximos passos
- [ ] `AuthModule` (JWT + Guards)
- [ ] `UsersModule` (User entity + service + controller)
- [ ] `ProductsModule`
- [ ] `CategoriesModule`
- [ ] Testes unitários (Jest)
- [ ] Validação global com class-validator
- [ ] Exception filters (equivalente ao `GlobalExceptionHandler.java`)
