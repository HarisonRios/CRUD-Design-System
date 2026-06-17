# 🟢 Frontend — Next.js 14 + TypeScript

Este é o frontend da plataforma **CRUD Design System**.

Construído com **Next.js 14 + TypeScript**, implementa um **Design System orientado a configuração** onde um CRUD completo é gerado a partir de um simples objeto de configuração.

---

## 📦 Stack Completa

| Tecnologia | Versão | Para quê |
|---|---|---|
| Next.js | 14.x | Framework React (App Router) |
| TypeScript | 5.5 (strict) | Tipagem estática |
| TailwindCSS | 3.4 | Estilização utility-first |
| TanStack Query | 5.x | Cache e estado do servidor |
| React Hook Form | 7.x | Gerenciamento de formulários |
| Zod | 3.x | Validação de schemas |
| Axios | 1.7 | Cliente HTTP com interceptors |
| Sonner | 1.5 | Toast notifications |
| next-themes | 0.3 | Dark/Light mode |
| Lucide React | 0.400 | Ícones |
| Vitest | 1.6 | Testes unitários |

---

## 🔀 Controle de Backend — Totalmente Flexível

> O frontend **não está amarrado ao backend Java**.
> Troque o backend com **uma variável de ambiente**.

### Como funciona

O arquivo [`src/lib/backend-config.ts`](./src/lib/backend-config.ts) resolve automaticamente
qual backend usar baseado na variável `NEXT_PUBLIC_BACKEND_TYPE`.

```
NEXT_PUBLIC_BACKEND_TYPE=java
       ↓
backend-config.ts lê → NEXT_PUBLIC_JAVA_API_URL
       ↓
api.ts usa → http://localhost:8080/api/v1
```

### ▶️ Usando Spring Boot (Java) — padrão atual

```bash
# .env.local
NEXT_PUBLIC_BACKEND_TYPE=java
NEXT_PUBLIC_JAVA_API_URL=http://localhost:8080
```

### ▶️ Usando NestJS — quando estiver pronto

```bash
# .env.local
NEXT_PUBLIC_BACKEND_TYPE=nestjs
NEXT_PUBLIC_NESTJS_API_URL=http://localhost:3001
```

> Ambos os backends retornam **o mesmo JSON**, então o frontend
> não precisa mudar nada além dessa variável.

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 20+
- npm ou yarn
- Backend rodando (Java ou NestJS)

### Passo a passo

```bash
# 1. Entre na pasta do frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
copy .env.local.example .env.local

# 4. Edite o .env.local (escolha o backend)
# NEXT_PUBLIC_BACKEND_TYPE=java  ← por padrão já está correto

# 5. Rode em modo desenvolvimento
npm run dev
```

Acesse: `http://localhost:3000`

---

## 📁 Estrutura de Pastas

```
src/

├── 📂 app/                          ← Rotas do Next.js (App Router)
│   ├── (dashboard)/                 ← Grupo de rotas do painel
│   │   ├── layout.tsx               ← Sidebar + Topbar + Theme Toggle
│   │   ├── dashboard/page.tsx       ← Página inicial com stats
│   │   ├── products/
│   │   │   ├── page.tsx             ← CRUD completo em 8 linhas!
│   │   │   └── config.tsx           ← Definição das colunas e campos
│   │   └── categories/
│   │       ├── page.tsx
│   │       └── config.tsx
│   ├── layout.tsx                   ← Root layout (fontes, providers, toaster)
│   ├── page.tsx                     ← Redireciona para /dashboard
│   └── globals.css                  ← CSS global + variáveis do tema
│
├── 📂 components/                   ← Componentes reutilizáveis
│   ├── crud/
│   │   └── CrudPage.tsx             ← ⭐ Coração do framework
│   ├── forms/
│   │   └── FormBuilder.tsx          ← Formulário dinâmico
│   └── tables/
│       └── DataTable.tsx            ← Tabela genérica com tudo incluso
│
├── 📂 hooks/
│   └── useCrud.ts                   ← Hook genérico (TanStack Query + toasts)
│
├── 📂 services/
│   └── generic.service.ts           ← GenericCrudService<T, R>
│
├── 📂 types/
│   ├── api.ts                       ← Tipos do contrato da API
│   ├── entities.ts                  ← Tipos das entidades (User, Product...)
│   └── crud-config.ts               ← Tipos do sistema de configuração
│
├── 📂 lib/
│   ├── backend-config.ts            ← 🔀 Controle de qual backend usar
│   ├── api.ts                       ← Axios configurado
│   └── utils.ts                     ← cn(), formatCurrency(), exportCSV()
│
└── 📂 providers/
    └── index.tsx                    ← ThemeProvider + QueryClientProvider
```

---

## ⭐ Como o CRUD Design System Funciona

### 1. Você define uma configuração

```tsx
// src/app/(dashboard)/products/config.tsx

export const productConfig: CrudConfig<Product, ProductRequest> = {
  entity: "products",      // Nome do endpoint da API
  title: "Products",       // Título da página

  columns: [               // Colunas da tabela
    { key: "name", label: "Name", sortable: true },
    { key: "price", label: "Price", render: (v) => formatCurrency(Number(v)) },
    { key: "stock", label: "Stock" },
  ],

  fields: [                // Campos do formulário (criação/edição)
    { name: "name",  label: "Name",  type: "text",   required: true },
    { name: "price", label: "Price", type: "number", required: true, min: 0 },
    { name: "stock", label: "Stock", type: "number", required: true, min: 0 },
  ],
};
```

### 2. Você usa o `CrudPage`

```tsx
// src/app/(dashboard)/products/page.tsx

export default function ProductsPage() {
  return (
    <CrudPage
      config={productConfig}
      service={productService}
      queryKey="products"
    />
  );
}
```

### 3. Você ganha TUDO isso automaticamente:

| Funcionalidade | Incluído? |
|---|---|
| Tabela com todas as colunas | ✅ |
| Paginação (anterior/próxima/primeira/última) | ✅ |
| Ordenação por coluna clicável | ✅ |
| Busca/filtro em tempo real | ✅ |
| Modal de criação com formulário | ✅ |
| Modal de edição pré-preenchido | ✅ |
| Diálogo de confirmação de exclusão | ✅ |
| Exportação CSV | ✅ |
| Loading skeleton | ✅ |
| Empty state | ✅ |
| Toast notifications (sucesso/erro) | ✅ |
| Cache inteligente (React Query) | ✅ |

---

## ➕ Como Adicionar uma Nova Página CRUD

**Tempo estimado: ~5 minutos**

### Exemplo: Adicionar `Suppliers`

**1. Adicione o tipo** (`types/entities.ts`):
```ts
export interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  active: boolean;
  createdAt: string;
}

export interface SupplierRequest {
  name: string;
  cnpj: string;
}
```

**2. Crie o serviço** (`services/generic.service.ts`):
```ts
// Adicione no final do arquivo:
export const supplierService = new GenericCrudService<Supplier, SupplierRequest>("suppliers");
```

**3. Crie a config** (`app/(dashboard)/suppliers/config.tsx`):
```tsx
export const supplierConfig: CrudConfig<Supplier, SupplierRequest> = {
  entity: "suppliers",
  title: "Suppliers",
  columns: [
    { key: "name", label: "Name", sortable: true },
    { key: "cnpj", label: "CNPJ" },
  ],
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "cnpj", label: "CNPJ", type: "text", required: true },
  ],
};
```

**4. Crie a página** (`app/(dashboard)/suppliers/page.tsx`):
```tsx
export default function SuppliersPage() {
  return <CrudPage config={supplierConfig} service={supplierService} queryKey="suppliers" />;
}
```

✅ **Pronto!** Interface completa funcionando.

---

## 🎨 Tema Dark/Light

O tema é controlado via `next-themes`. O botão fica no canto superior direito do layout.

Para acessar o tema no código:
```tsx
import { useTheme } from "next-themes";
const { theme, setTheme } = useTheme();
setTheme("dark");  // ou "light" ou "system"
```

---

## 🧪 Rodando os Testes

```bash
# Todos os testes
npm run test

# Interface visual dos testes
npm run test:ui

# Relatório de cobertura
npm run test:coverage
```

---

## 🔧 Scripts Disponíveis

| Script | O que faz |
|---|---|
| `npm run dev` | Inicia em modo desenvolvimento (localhost:3000) |
| `npm run build` | Gera o build de produção |
| `npm run lint` | Verifica erros de lint |
| `npm run lint:fix` | Corrige erros automaticamente |
| `npm run format` | Formata o código com Prettier |
| `npm run test` | Roda os testes |

---

## 🔧 Variáveis de Ambiente (`.env.local`)

| Variável | Valores | Descrição |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_TYPE` | `java` \| `nestjs` | Qual backend usar |
| `NEXT_PUBLIC_JAVA_API_URL` | `http://localhost:8080` | URL do Spring Boot |
| `NEXT_PUBLIC_NESTJS_API_URL` | `http://localhost:3001` | URL do NestJS |
