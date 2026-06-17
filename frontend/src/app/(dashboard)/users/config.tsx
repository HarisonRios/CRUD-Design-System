import type { CrudConfig } from "@/types/crud-config";
import type { User, UserRequest } from "@/types/entities";

export const userConfig: CrudConfig<User, UserRequest> = {
  entity: "users",
  title: "Usuários",
  description: "Gerencie os usuários do sistema",

  columns: [
    { key: "name", label: "Nome", sortable: true },
    { key: "email", label: "E-mail", sortable: true },
    { 
      key: "role", 
      label: "Perfil",
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
          {String(value)}
        </span>
      ),
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
    { name: "name", label: "Nome", type: "text", required: true, placeholder: "Nome do usuário" },
    { name: "email", label: "E-mail", type: "email", required: true, placeholder: "usuario@exemplo.com" },
    { name: "password", label: "Senha", type: "password", required: true, placeholder: "Senha forte" },
    { 
      name: "role", 
      label: "Perfil", 
      type: "select", 
      required: true,
      options: [
        { label: "Administrador", value: "ADMIN" },
        { label: "Gerente", value: "MANAGER" },
        { label: "Usuário", value: "USER" },
      ],
    },
  ],

  toFormValues: (user) => ({
    name: user.name,
    email: user.email,
    password: "", 
    role: user.role,
  }),
};
