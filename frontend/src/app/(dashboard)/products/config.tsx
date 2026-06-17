import type { CrudConfig } from "@/types/crud-config";
import type { Product, ProductRequest } from "@/types/entities";
import { formatCurrency } from "@/lib/utils";

/**
 * productConfig — Configuração do CRUD de Produtos.
 *
 * Esta é a essência do CRUD Design System:
 * um CRUD completo definido em ~50 linhas de configuração.
 *
 * O CrudPage componente usa estes metadados para gerar automaticamente:
 * - Tabela com todas as colunas abaixo
 * - Formulário de criação/edição com todos os campos abaixo
 * - Paginação, ordenação, filtros, modais, exportação CSV
 */
export const productConfig: CrudConfig<Product, ProductRequest> = {
  entity: "products",
  title: "Produtos",
  description: "Gerencie o catálogo de produtos",

  columns: [
    { key: "name", label: "Nome", sortable: true },
    {
      key: "price",
      label: "Preço",
      sortable: true,
      render: (value) => formatCurrency(Number(value)),
    },
    {
      key: "stock",
      label: "Estoque",
      sortable: true,
      render: (value) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            Number(value) > 10
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : Number(value) > 0
              ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          {String(value)} unid
        </span>
      ),
    },
    {
      key: "category",
      label: "Categoria",
      render: (value) => {
        const cat = value as { name: string } | null;
        return cat?.name ?? "—";
      },
    },
    {
      key: "active",
      label: "Status",
      render: (value) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            value
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          {value ? "Ativo" : "Inativo"}
        </span>
      ),
    },
    { key: "createdAt", label: "Criado em", sortable: true },
  ],

  fields: [
    { name: "name", label: "Nome", type: "text", required: true, placeholder: "Nome do produto" },
    { name: "description", label: "Descrição", type: "textarea", placeholder: "Descrição do produto", rows: 3 },
    { name: "price", label: "Preço (R$)", type: "number", required: true, placeholder: "0.00", min: 0 },
    { name: "stock", label: "Estoque", type: "number", required: true, placeholder: "0", min: 0 },
    { name: "categoryId", label: "ID da Categoria", type: "text", placeholder: "UUID da Categoria (opcional)" },
  ],

  toFormValues: (product) => ({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    categoryId: product.category?.id,
  }),
};
