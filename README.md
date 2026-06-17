<div align="center">

# 🏗️ CRUD Design System

**Configuration-Driven Full Stack Framework**

<br/>

<img src="https://skillicons.dev/icons?i=java,spring,ts,react,next,nestjs,postgres,mysql,tailwind" alt="Tech Stack" />

<br/>
<br/>

*Um monorepo focado em Developer Experience (DX), demonstrando como abstrações bem desenhadas podem eliminar boilerplate repetitivo.*

</div>

---

## ⚡ A Filosofia: Configuração > Código

O desenvolvimento tradicional de sistemas internos gera muito código repetitivo: Repositories, Services, Controllers e Formulários que fazem a mesma coisa para dezenas de entidades.

Este projeto propõe uma abordagem orientada a configuração. A ideia central é simples:
**Você define o modelo de dados e a UI. A plataforma cuida do resto.**

> 📉 **Impacto:** De ~500 linhas de código repetitivo por entidade para **apenas ~30 linhas** de configuração, garantindo padronização, auditoria e manutenção simples.

---

## 🧩 Componentes do Sistema

O projeto adota uma arquitetura modular dividida em três pilares, cada um com sua própria documentação profunda:

### 1. 🟢 [O Motor Visual (Next.js)](./frontend)
Um Design System inteligente. Ao invés de desenhar páginas e formulários do zero, você entrega um objeto de configuração (`CrudConfig`). O motor interpreta e gera automaticamente tabelas paginadas, modais de criação/edição, filtros e exportação de dados.
👉 **[Documentação do Frontend](./frontend/README.md)**

### 2. 🔵 [O Core Backend (Java + Spring Boot)](./backend)
O coração da plataforma. Construído sobre os pilares da Clean Architecture, expõe classes abstratas fortemente tipadas. Novas APIs REST nascem prontas em minutos, já trazendo regras de soft delete, paginação e auditoria no banco.
👉 **[Documentação do Backend Java](./backend/README.md)**

### 3. 🟡 [A Prova de Conceito (NestJS)](./backend-nestjs)
Uma demonstração clara de que arquitetura transcende a linguagem. Este módulo espelha toda a engenharia do Java no ecossistema Node.js. O frontend consome qualquer um dos dois de forma transparente, apenas trocando uma chave no `.env`.
👉 **[Documentação do Backend NestJS](./backend-nestjs/README.md)**

---

## 💎 Destaques de Engenharia

O foco deste repositório é a qualidade de software, extensibilidade e sustentabilidade a longo prazo. Algumas das práticas adotadas incluem:

- **Clean Architecture:** Separação estrita de camadas (Domain → Application → Infrastructure), isolando completamente as regras de negócio de frameworks e bibliotecas externas.
- **Princípios SOLID:** Aplicação agressiva de *Open/Closed Principle* e *Dependency Inversion* para permitir que o sistema escale sem a necessidade de modificar o core.
- **Design Patterns:** Uso estrutural de *Template Method* (nos serviços genéricos de CRUD), *Factory* e *Strategy*.
- **Agnosticismo de Infraestrutura:** O sistema suporta alternância entre MySQL e PostgreSQL sem nenhuma alteração de código. O frontend possui resolução dinâmica de backend.

---

## 📚 Guias Técnicos

A documentação da pasta `/docs` explora as decisões técnicas e ensina a estender a plataforma:

- 📖 **[Índice da Documentação](./docs/README.md)**
- ➕ [Como escalar adicionando novas entidades](./docs/adding-entities.md)
- 🗄️ [Mecanismo de flexibilidade do Banco de Dados](./docs/database-guide.md)
- 🔀 [Como alternar dinamicamente entre os backends](./docs/backend-switching.md)

---

<div align="center">
  <br/>
  <sub>Construído com foco em arquitetura escalável e padrões de engenharia.</sub>
</div>
