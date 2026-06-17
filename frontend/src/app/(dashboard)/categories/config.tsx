import type { CrudConfig } from "@/types/crud-config";
import type { Category, CategoryRequest } from "@/types/entities";

export const categoryConfig: CrudConfig<Category, CategoryRequest> = {
  entity: "categories",
  title: "Categorias",
  description: "Gerencie as categorias de produtos",

  columns: [
    { key: "name", label: "Nome", sortable: true },
    { key: "description", label: "Descrição" },
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
          {value ? "Ativa" : "Inativa"}
        </span>
      ),
    },
    { key: "createdAt", label: "Criada em", sortable: true },
  ],

  fields: [
    { name: "name", label: "Nome", type: "text", required: true, placeholder: "Nome da categoria" },
    { name: "description", label: "Descrição", type: "textarea", placeholder: "Descrição da categoria", rows: 3 },
  ],

  toFormValues: (category) => ({
    name: category.name,
    description: category.description,
  }),
};
