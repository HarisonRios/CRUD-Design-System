# 🔵 Backend — Spring Boot (Java 21)

Este é o backend principal da plataforma **CRUD Design System**.

Construído com **Java 21 + Spring Boot 3.2**, seguindo **Clean Architecture** e princípios **SOLID**.

---

## 📦 Stack Completa

| Tecnologia | Versão | Para quê |
|---|---|---|
| Java | 21 | Linguagem principal |
| Spring Boot | 3.2.5 | Framework da aplicação |
| Spring Data JPA | 3.2.5 | Persistência de dados |
| Spring Security | 3.2.5 | Autenticação e autorização |
| JWT (JJWT) | 0.12.5 | Tokens de autenticação |
| MySQL | 8.x | Banco de dados (padrão atual) |
| PostgreSQL | 16.x | Banco de dados (alternativo) |
| Lombok | 1.18.30 | Redução de boilerplate |
| OpenAPI/Swagger | 2.5.0 | Documentação da API |
| JUnit 5 + Mockito | — | Testes unitários |

---

## 🗄️ Banco de Dados — Totalmente Flexível

> O backend **não está amarrado a nenhum banco específico**.
> Você troca o banco apenas editando o arquivo `.env` — **sem mudar uma linha de código**.

### Como funciona

O Spring Boot detecta o banco automaticamente pelo driver JDBC presente no `DB_URL`.
Ambos os drivers (**MySQL e PostgreSQL**) já estão incluídos no `pom.xml`.

### ▶️ Usando MySQL (você está aqui agora)

```bash
# backend/.env
DB_URL=jdbc:mysql://localhost:3306/crud_design_system?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
DB_USERNAME=root
DB_PASSWORD=root
```

Criar o banco no MySQL:
```sql
CREATE DATABASE crud_design_system;
```

### ▶️ Usando PostgreSQL (quando quiser migrar)

```bash
# backend/.env
DB_URL=jdbc:postgresql://localhost:5432/crud_design_system
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

Criar o banco no PostgreSQL:
```sql
CREATE DATABASE crud_design_system;
```

### ▶️ Usando outro banco no futuro (Oracle, SQL Server...)

1. Adicione o driver JDBC no `pom.xml`
2. Mude o `DB_URL` no `.env`
3. ✅ Pronto — sem mais nada

> **Por que isso é possível?**
> O Spring Data JPA usa Hibernate como ORM, que abstrai o SQL.
> O código Java nunca escreve SQL direto — ele usa interfaces (`JpaRepository`)
> e o Hibernate gera o SQL certo para cada banco automaticamente.

---

## 🚀 Como Rodar

### Pré-requisitos
- Java 21+
- Maven 3.9+
- MySQL 8.x rodando (ou outro banco configurado no `.env`)

### Passo a passo

```bash
# 1. Entre na pasta do backend
cd backend

# 2. Copie o arquivo de variáveis de ambiente
copy .env.example .env

# 3. Edite o .env com suas credenciais do MySQL
# (abra o arquivo .env e ajuste DB_USERNAME e DB_PASSWORD)

# 4. Crie o banco de dados no MySQL
# mysql -u root -p
# CREATE DATABASE crud_design_system;

# 5. Rode a aplicação
mvn spring-boot:run
```

### URLs disponíveis após subir

| URL | O que é |
|---|---|
| `http://localhost:8080/api/v1` | Base da API REST |
| `http://localhost:8080/swagger-ui.html` | Interface Swagger (teste aqui!) |
| `http://localhost:8080/api-docs` | JSON do OpenAPI |

---

## 📁 Estrutura de Pastas

```
src/main/java/com/crudsystem/

├── 📂 domain/                    ← Regras de negócio puras (sem frameworks)
│   ├── entities/
│   │   ├── BaseEntity.java       ← UUID + Auditoria + Soft Delete
│   │   ├── User.java
│   │   ├── Product.java
│   │   └── Category.java
│   └── repositories/
│       ├── GenericRepository.java ← Interface base (todos herdam)
│       ├── UserRepository.java
│       ├── ProductRepository.java
│       └── CategoryRepository.java
│
├── 📂 application/               ← Casos de uso (regras da aplicação)
│   ├── dto/
│   │   ├── UserDTO.java          ← Request + Response separados
│   │   ├── ProductDTO.java
│   │   ├── CategoryDTO.java
│   │   └── AuthDTO.java
│   └── usecases/
│       ├── GenericService.java        ← Interface (DIP)
│       ├── AbstractGenericService.java ← CRUD herdado por todos
│       ├── UserService.java           ← Só regras específicas de User
│       ├── ProductService.java
│       └── CategoryService.java
│
├── 📂 infrastructure/            ← Frameworks, banco, HTTP
│   ├── controllers/
│   │   ├── AbstractGenericController.java ← Endpoints herdados
│   │   ├── AuthController.java            ← Login + Refresh Token
│   │   ├── UserController.java            ← 8 linhas = API completa
│   │   ├── ProductController.java
│   │   └── CategoryController.java
│   └── security/
│       ├── JwtUtil.java
│       ├── JwtAuthenticationFilter.java
│       └── UserDetailsServiceImpl.java
│
├── 📂 shared/                    ← Código compartilhado entre camadas
│   ├── responses/
│   │   └── ApiResponse.java      ← Envelope padrão: { success, data, message }
│   ├── pagination/
│   │   └── PaginatedResponse.java
│   └── exceptions/
│       ├── AppException.java
│       ├── ResourceNotFoundException.java
│       ├── BusinessException.java
│       └── GlobalExceptionHandler.java ← Trata TODOS os erros em um lugar
│
└── 📂 config/
    ├── SecurityConfig.java       ← JWT + CORS + Endpoints públicos
    ├── AuditingConfig.java       ← createdBy/updatedBy automáticos
    └── OpenApiConfig.java        ← Configuração do Swagger
```

---

## 🔑 Autenticação JWT

### Fluxo completo

```
1. POST /api/v1/auth/login
   Body: { "email": "...", "password": "..." }
   Response: { accessToken, refreshToken, user }

2. Use o accessToken no header:
   Authorization: Bearer <accessToken>

3. Quando expirar (24h), renove:
   POST /api/v1/auth/refresh
   Body: { "refreshToken": "..." }
```

---

## 📡 Endpoints da API

Todos os endpoints seguem o padrão:

```json
{
  "success": true,
  "message": "...",
  "data": { ... },
  "timestamp": "2025-01-01T00:00:00"
}
```

### Paginação (todos os listados)

```
GET /api/v1/products?page=0&size=10&sortBy=name&sortDir=asc
```

| Parâmetro | Padrão | Descrição |
|---|---|---|
| `page` | 0 | Número da página (começa em 0) |
| `size` | 10 | Registros por página |
| `sortBy` | createdAt | Campo para ordenar |
| `sortDir` | desc | `asc` ou `desc` |

### Tabela de endpoints

| Método | Endpoint | Autenticação | Descrição |
|---|---|---|---|
| POST | `/auth/login` | ❌ Público | Login |
| POST | `/auth/refresh` | ❌ Público | Renovar token |
| GET | `/users` | ADMIN | Listar usuários |
| POST | `/users` | ADMIN | Criar usuário |
| PUT | `/users/{id}` | ADMIN | Atualizar usuário |
| DELETE | `/users/{id}` | ADMIN | Deletar (soft) |
| GET | `/products` | Qualquer auth | Listar produtos |
| POST | `/products` | ADMIN/MANAGER | Criar produto |
| GET | `/categories` | Qualquer auth | Listar categorias |
| POST | `/categories` | ADMIN/MANAGER | Criar categoria |

---

## ➕ Como Adicionar uma Nova Entidade

**Tempo estimado: ~10 minutos**

### Exemplo: Adicionar `Supplier` (Fornecedor)

**1. Entidade** (`domain/entities/Supplier.java`):
```java
@Entity
@Table(name = "suppliers")
@Getter @Setter @NoArgsConstructor @Builder
public class Supplier extends BaseEntity {
    private String name;
    private String cnpj;
}
```

**2. Repository** (`domain/repositories/SupplierRepository.java`):
```java
@Repository
public interface SupplierRepository extends GenericRepository<Supplier> {}
```

**3. DTO** (`application/dto/SupplierDTO.java`):
```java
public class SupplierDTO {
    @Data public static class Request {
        @NotBlank private String name;
        @NotBlank private String cnpj;
    }
    @Data public static class Response {
        private UUID id;
        private String name;
        private String cnpj;
    }
}
```

**4. Service** (`application/usecases/SupplierService.java`):
```java
@Service
public class SupplierService extends AbstractGenericService<Supplier, SupplierDTO.Request, SupplierDTO.Response> {
    // Apenas implementar: toEntity(), toResponseDTO(), updateEntity(), getEntityName()
}
```

**5. Controller** (`infrastructure/controllers/SupplierController.java`):
```java
@RestController
@RequestMapping("/api/v1/suppliers")
public class SupplierController extends AbstractGenericController<Supplier, SupplierDTO.Request, SupplierDTO.Response> {
    public SupplierController(SupplierService service) { super(service); }
}
```

✅ **Pronto!** CRUD completo com paginação, sorting, soft delete e auditoria.

---

## 🧪 Rodando os Testes

```bash
# Todos os testes (usa H2 em memória — não precisa do MySQL)
mvn test

# Testes com relatório de coverage
mvn test jacoco:report
```

---

## 🔧 Variáveis de Ambiente (`.env`)

| Variável | Padrão | Descrição |
|---|---|---|
| `DB_URL` | `jdbc:mysql://...` | URL do banco (troque para mudar o banco) |
| `DB_USERNAME` | `root` | Usuário do banco |
| `DB_PASSWORD` | `root` | Senha do banco |
| `JWT_SECRET` | (hash padrão) | Chave secreta do JWT |
| `JWT_EXPIRATION` | `86400000` | Validade do token (ms) = 24h |
| `JWT_REFRESH_EXPIRATION` | `604800000` | Validade do refresh token = 7 dias |
| `SERVER_PORT` | `8080` | Porta do servidor |
