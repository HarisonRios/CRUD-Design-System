/**
 * types/crud-config.ts — Tipos de configuração do CRUD Design System.
 *
 * Define a arquitetura orientada a metadados.
 * Uma página CRUD inteira é gerada a partir de um objeto de configuração.
 */

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "select"
  | "textarea"
  | "date"
  | "boolean";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[]; // Para type="select"
  min?: number;
  max?: number;
  rows?: number; // Para type="textarea"
}

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface CrudConfig<TResponse = Record<string, unknown>, TRequest = Record<string, unknown>> {
  /** Endpoint da API (ex: "products") */
  entity: string;
  /** Título exibido na página */
  title: string;
  /** Subtítulo/descrição */
  description?: string;
  /** Colunas da tabela */
  columns: TableColumn<TResponse>[];
  /** Campos do formulário de criação/edição */
  fields: FormField[];
  /** Função para transformar TResponse em valores iniciais do formulário */
  toFormValues?: (item: TResponse) => TRequest;
}
