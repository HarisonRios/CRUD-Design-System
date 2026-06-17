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
  title: "Products",
  description: "Manage your product catalog",

  columns: [
    { key: "name", label: "Name", sortable: true },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (value) => formatCurrency(Number(value)),
    },
    {
      key: "stock",
      label: "Stock",
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
          {String(value)} units
        </span>
      ),
    },
    {
      key: "category",
      label: "Category",
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
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    { key: "createdAt", label: "Created At", sortable: true },
  ],

  fields: [
    { name: "name", label: "Name", type: "text", required: true, placeholder: "Product name" },
    { name: "description", label: "Description", type: "textarea", placeholder: "Product description", rows: 3 },
    { name: "price", label: "Price (R$)", type: "number", required: true, placeholder: "0.00", min: 0 },
    { name: "stock", label: "Stock", type: "number", required: true, placeholder: "0", min: 0 },
    { name: "categoryId", label: "Category ID", type: "text", placeholder: "Category UUID (optional)" },
  ],

  toFormValues: (product) => ({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    categoryId: product.category?.id,
  }),
};
