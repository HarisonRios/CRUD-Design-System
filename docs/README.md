# 📚 Documentação — CRUD Design System

Bem-vindo à documentação técnica da plataforma.

---

## 📖 Índice

| Arquivo | Conteúdo |
|---|---|
| [adding-entities.md](./adding-entities.md) | Como adicionar novas entidades ao framework |
| [architecture.md](./architecture.md) | Visão detalhada da Clean Architecture |
| [solid-principles.md](./solid-principles.md) | SOLID aplicado com exemplos de código |
| [database-guide.md](./database-guide.md) | Como trocar o banco de dados |
| [backend-switching.md](./backend-switching.md) | Como alternar entre Java e NestJS |

---

## ⚡ TL;DR — O Essencial em 30 Segundos

### Trocar o banco de dados (backend Java)
```bash
# backend/.env

# MySQL
DB_URL=jdbc:mysql://localhost:3306/crud_design_system?useSSL=false&serverTimezone=UTC

# PostgreSQL (quando tiver instalado)
DB_URL=jdbc:postgresql://localhost:5432/crud_design_system
```

### Trocar o backend (frontend)
```bash
# frontend/.env.local
NEXT_PUBLIC_BACKEND_TYPE=java    # Spring Boot (porta 8080)
NEXT_PUBLIC_BACKEND_TYPE=nestjs  # NestJS (porta 3001)
```

### Adicionar um CRUD completo (backend Java)
```
1. Entidade extends BaseEntity
2. Repository extends GenericRepository<T>
3. Service extends AbstractGenericService<T, Req, Res>
4. Controller extends AbstractGenericController<T, Req, Res>
```

### Adicionar uma página CRUD (frontend)
```
1. Criar config.tsx com CrudConfig { entity, columns, fields }
2. Criar page.tsx com <CrudPage config={...} service={...} queryKey="..." />
```
