# 🗄️ Guia de Banco de Dados — CRUD Design System

Este guia explica como o sistema é totalmente flexível em relação ao banco de dados.

---

## 🎯 Conceito Central

> **"Você troca o banco mudando UMA variável. O código não muda."**

Isso é possível porque:

1. **O backend usa JPA/Hibernate** (Java) ou **TypeORM** (NestJS)
2. Esses ORMs **geram SQL automaticamente** para cada banco
3. Toda a configuração vem de **variáveis de ambiente**
4. Os **drivers de ambos os bancos** já estão instalados

---

## 🔵 Backend Java — Como Trocar o Banco

### Arquivo de configuração: `backend/.env`

```bash
# ═══════════════════════════════════════════════
# OPÇÃO 1: MySQL (padrão — você está usando isso)
# ═══════════════════════════════════════════════
DB_URL=jdbc:mysql://localhost:3306/crud_design_system?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
DB_USERNAME=root
DB_PASSWORD=root

# ═══════════════════════════════════════════════
# OPÇÃO 2: PostgreSQL
# (Descomente estas 3 linhas e comente as 3 acima)
# ═══════════════════════════════════════════════
# DB_URL=jdbc:postgresql://localhost:5432/crud_design_system
# DB_USERNAME=postgres
# DB_PASSWORD=postgres
```

### Preparar o banco antes de subir

**MySQL:**
```sql
-- Abre o MySQL e roda:
CREATE DATABASE crud_design_system;
```

**PostgreSQL:**
```sql
-- Abre o psql e roda:
CREATE DATABASE crud_design_system;
```

### Como o Spring Boot detecta o banco automaticamente?

O `application.yml` usa o valor de `DB_URL` como está.
O Hibernate lê o prefixo da URL (`jdbc:mysql` ou `jdbc:postgresql`)
e seleciona o dialeto SQL correto sozinho.

```
DB_URL=jdbc:mysql://...    → Hibernate usa MySQL8Dialect
DB_URL=jdbc:postgresql://... → Hibernate usa PostgreSQLDialect
```

**Você NÃO precisa configurar o dialeto manualmente.** O Spring Boot 3.x faz isso automaticamente.

---

## 🟡 Backend NestJS — Como Trocar o Banco

### Arquivo de configuração: `backend-nestjs/.env`

```bash
# MySQL (padrão)
DB_URL=mysql://root:root@localhost:3306/crud_design_system

# PostgreSQL (descomente para usar)
# DB_URL=postgresql://postgres:postgres@localhost:5432/crud_design_system
```

O `AppModule` lê a `DB_URL` e detecta o banco pelo prefixo:
```ts
const isMysql = dbUrl.includes('mysql');
return { type: isMysql ? 'mysql' : 'postgres', ... };
```

---

## 📊 Bancos Suportados Atualmente

| Banco | Java (Spring Boot) | NestJS | Driver incluído |
|---|---|---|---|
| MySQL 8.x | ✅ | ✅ | ✅ |
| PostgreSQL 16.x | ✅ | ✅ | ✅ |
| MariaDB | ✅ (via MySQL driver) | ✅ | ✅ MySQL |
| SQL Server | 🔧 Adicionar driver | 🔧 Adicionar driver | ❌ |
| Oracle | 🔧 Adicionar driver | 🔧 Adicionar driver | ❌ |

### Como adicionar suporte a um novo banco (Java)

1. Adicione o driver no `pom.xml`:
```xml
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>mssql-jdbc</artifactId>
    <scope>runtime</scope>
</dependency>
```

2. Mude o `DB_URL` no `.env`:
```bash
DB_URL=jdbc:sqlserver://localhost:1433;databaseName=crud_design_system
DB_USERNAME=sa
DB_PASSWORD=SuaSenha
```

3. ✅ Pronto. O Hibernate cuida do resto.

---

## ❓ Perguntas Frequentes

**P: Preciso criar as tabelas manualmente?**
R: Não! O `ddl-auto: update` no `application.yml` faz isso automaticamente ao subir a aplicação.

**P: E em produção?**
R: Em produção, mude `ddl-auto` para `validate` e use Flyway ou Liquibase para migrations.

**P: Posso usar SQLite para testes locais?**
R: Sim, mas é mais fácil usar H2 (já configurado para testes automáticos).

**P: Os dados são perdidos ao trocar de banco?**
R: Sim! Cada banco é independente. Você precisaria migrar os dados manualmente.
