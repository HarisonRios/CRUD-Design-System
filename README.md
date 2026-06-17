<div align="center">

<h1>🏗️ CRUD Design System</h1>

<p><strong>Uma Plataforma Full-Stack Reutilizável para Desenvolvimento Rápido de Sistemas</strong></p>

<p>
  <img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=java" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.2-green?style=for-the-badge&logo=spring" />
  <img src="https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs" />
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript" />
</p>

<p>
  <em>Um monorepo enterprise-grade demonstrando Clean Architecture, SOLID, <br>
  e um framework CRUD Orientado a Configuração que elimina código repetitivo.</em>
</p>

</div>

---

## 🎯 A Visão: Escreva Configurações, Não Código

Em projetos reais, desenvolvedores gastam até **70% do tempo** escrevendo código CRUD repetitivo (Repositories, Services, Controllers, Formulários, Tabelas). 

Este projeto resolve isso implementando um **framework interno reutilizável**. A ideia central é:
Você define **uma** configuração, e a plataforma gera um CRUD completo de ponta a ponta.

**Sem o framework:** ~500 linhas por entidade.  
**Com o framework:** ~30 linhas por entidade.

---

## 🚀 O que este repositório contém?

O projeto está dividido em três partes principais. Cada pasta tem sua própria documentação detalhada ensinando como rodar e explicando o código:

### 1. 🟢 [Frontend (Next.js 14)](./frontend)
Um Design System "Configuration-Driven". Você passa um objeto com as colunas e campos, e ele gera tabelas com paginação, filtros, modais de criação/edição e exportação CSV. Totalmente independente do backend utilizado.
👉 **[Ver documentação de como rodar o Frontend](./frontend/README.md)**

### 2. 🔵 [Backend Principal (Java + Spring Boot)](./backend)
A implementação robusta usando **Clean Architecture** e princípios **SOLID**. Graças à abstração via generics, novas APIs REST completas (com soft delete, auditoria e paginação) são criadas em minutos.
👉 **[Ver documentação de como rodar o Backend Java](./backend/README.md)**

### 3. 🟡 [Backend Alternativo (NestJS)](./backend-nestjs)
Uma prova de que *arquitetura vale mais que linguagem*. Este backend espelha exatamente a mesma estrutura do Java, provando que o frontend pode consumir qualquer um dos dois alterando apenas uma variável de ambiente (`.env`).
👉 **[Ver documentação sobre o Backend NestJS](./backend-nestjs/README.md)**

---

## 📚 Guias Adicionais

Para tutoriais passo a passo sobre arquitetura e como estender o projeto, consulte a pasta `/docs`:

- 📖 **[Índice da Documentação](./docs/README.md)**
- ➕ [Como adicionar novas entidades em 10 minutos](./docs/adding-entities.md)
- 🗄️ [Guia de flexibilidade do Banco de Dados (MySQL / PostgreSQL)](./docs/database-guide.md)
- 🔀 [Como alternar facilmente entre o backend Java e NestJS](./docs/backend-switching.md)

---

## 🎤 Para Recrutadores & Entrevistadores

Este projeto não é "apenas mais um CRUD". Ele foi desenhado para demonstrar proficiência em engenharia de software avançada:

- **Arquitetura de Software:** Clean Architecture com separação rigorosa de camadas (Domain → Application → Infrastructure).
- **Domínio de SOLID:** Uso extensivo de *Open/Closed Principle* e *Dependency Inversion* no design dos serviços genéricos.
- **Design Patterns:** Template Method, Factory e Strategy aplicados em casos de uso reais.
- **Flexibilidade:** Sistema agnóstico a banco de dados (MySQL ou PostgreSQL sem alterar código) e multi-backend (Java ou Node) configurável via `.env`.
- **Produtividade (DX):** Foco em criar abstrações que aceleram exponencialmente o trabalho do time no dia a dia.

---

<div align="center">
  <p>Feito com ❤️ para demonstrar padrões de engenharia de software de alto nível.</p>
</div>
