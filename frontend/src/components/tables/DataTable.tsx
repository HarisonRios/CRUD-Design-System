"use client";

import { useState } from "react";
import type { TableColumn } from "@/types/crud-config";
import type { PaginatedResponse } from "@/types/api";
import { cn, formatDate } from "@/lib/utils";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";

interface DataTableProps<T extends { id: string }> {
  columns: TableColumn<T>[];
  data?: PaginatedResponse<T>;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  onSortChange?: (sortBy: string, sortDir: "asc" | "desc") => void;
  onSearchChange?: (search: string) => void;
  actions?: (row: T) => React.ReactNode;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  searchValue?: string;
}

/**
 * DataTable — Tabela genérica com paginação, ordenação e busca.
 *
 * Demonstra o padrão de componente orientado a dados:
 * recebe apenas configuração + dados, não conhece a entidade.
 */
export function DataTable<T extends { id: string }>({
  columns,
  data,
  isLoading,
  onPageChange,
  onSortChange,
  onSearchChange,
  actions,
  sortBy,
  sortDir,
  searchValue = "",
}: DataTableProps<T>) {
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    onSearchChange?.(value);
  };

  const handleSort = (key: string) => {
    if (sortBy === key) {
      onSortChange?.(key, sortDir === "asc" ? "desc" : "asc");
    } else {
      onSortChange?.(key, "asc");
    }
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) return <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />;
    return sortDir === "asc"
      ? <ChevronUp className="h-3.5 w-3.5 text-primary" />
      : <ChevronDown className="h-3.5 w-3.5 text-primary" />;
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      {onSearchChange && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            value={localSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className={cn(
              "w-full rounded-lg border border-input bg-background",
              "pl-10 pr-4 py-2 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "placeholder:text-muted-foreground transition-colors"
            )}
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    style={{ width: col.width }}
                    className={cn(
                      "px-4 py-3 text-left font-semibold text-muted-foreground",
                      col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors"
                    )}
                    onClick={() => col.sortable && handleSort(String(col.key))}
                  >
                    <div className="flex items-center gap-1.5">
                      {col.label}
                      {col.sortable && <SortIcon column={String(col.key)} />}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground w-24">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Skeleton loading rows
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    {columns.map((col) => (
                      <td key={String(col.key)} className="px-4 py-3">
                        <div className="h-4 rounded-md bg-muted shimmer" />
                      </td>
                    ))}
                    {actions && <td className="px-4 py-3"><div className="h-4 w-16 ml-auto rounded-md bg-muted shimmer" /></td>}
                  </tr>
                ))
              ) : data?.empty || !data?.content.length ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-4 py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Search className="h-10 w-10 opacity-30" />
                      <p className="font-medium">Nenhum registro encontrado</p>
                      <p className="text-xs">Tente ajustar sua busca ou crie um novo registro.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.content.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors animate-fade-in"
                  >
                    {columns.map((col) => {
                      const value = (row as Record<string, unknown>)[String(col.key)];
                      return (
                        <td key={String(col.key)} className="px-4 py-3 text-foreground">
                          {col.render
                            ? col.render(value, row)
                            : typeof value === "string" && value.includes("T") && value.includes(":")
                            ? formatDate(value)
                            : String(value ?? "—")}
                        </td>
                      );
                    })}
                    {actions && (
                      <td className="px-4 py-3 text-right">{actions(row)}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Mostrando {data.page * data.size + 1}–
            {Math.min((data.page + 1) * data.size, data.totalElements)} de{" "}
            {data.totalElements} registros
          </span>
          <div className="flex items-center gap-1">
            <PaginationButton
              onClick={() => onPageChange?.(0)}
              disabled={data.first}
              title="Primeira"
            >
              <ChevronsLeft className="h-4 w-4" />
            </PaginationButton>
            <PaginationButton
              onClick={() => onPageChange?.(data.page - 1)}
              disabled={data.first}
              title="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationButton>
            <span className="px-3 py-1.5 text-sm font-medium">
              {data.page + 1} / {data.totalPages}
            </span>
            <PaginationButton
              onClick={() => onPageChange?.(data.page + 1)}
              disabled={data.last}
              title="Próxima"
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationButton>
            <PaginationButton
              onClick={() => onPageChange?.(data.totalPages - 1)}
              disabled={data.last}
              title="Última"
            >
              <ChevronsRight className="h-4 w-4" />
            </PaginationButton>
          </div>
        </div>
      )}
    </div>
  );
}

function PaginationButton({
  children,
  onClick,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  title: string;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg p-1.5 transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "disabled:opacity-30 disabled:cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}
