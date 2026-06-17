import type { CrudConfig } from "@/types/crud-config";
import type { Category, CategoryRequest } from "@/types/entities";

export const categoryConfig: CrudConfig<Category, CategoryRequest> = {
  entity: "categories",
  title: "Categories",
  description: "Manage product categories",

  columns: [
    { key: "name", label: "Name", sortable: true },
    { key: "description", label: "Description" },
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
    { name: "name", label: "Name", type: "text", required: true, placeholder: "Category name" },
    { name: "description", label: "Description", type: "textarea", placeholder: "Category description", rows: 3 },
  ],

  toFormValues: (category) => ({
    name: category.name,
    description: category.description,
  }),
};
