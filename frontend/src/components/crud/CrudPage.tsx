"use client";

import { useState } from "react";
import type { CrudConfig } from "@/types/crud-config";
import type { PaginationParams } from "@/types/api";
import { GenericCrudService } from "@/services/generic.service";
import { useCrud } from "@/hooks/useCrud";
import { DataTable } from "@/components/tables/DataTable";
import { FormBuilder } from "@/components/forms/FormBuilder";
import { cn, exportToCSV } from "@/lib/utils";
import { Plus, Download, Edit2, Trash2, X } from "lucide-react";

interface CrudPageProps<TResponse extends { id: string }, TRequest> {
  config: CrudConfig<TResponse, TRequest>;
  service: GenericCrudService<TResponse, TRequest>;
  queryKey: string;
}

/**
 * CrudPage — Componente principal do CRUD Design System.
 *
 * Recebe apenas um objeto de configuração e gera automaticamente:
 * - Tabela com paginação, ordenação e busca
 * - Modal de criação
 * - Modal de edição
 * - Confirmação de exclusão
 * - Exportação CSV
 * - Loading states e Empty states
 *
 * Esta é a peça central do framework — um CRUD completo em ~10 linhas de código.
 */
export function CrudPage<TResponse extends { id: string }, TRequest>({
  config,
  service,
  queryKey,
}: CrudPageProps<TResponse, TRequest>) {
  const [params, setParams] = useState<PaginationParams>({
    page: 0,
    size: 10,
    sortBy: "createdAt",
    sortDir: "desc",
  });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<TResponse | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { useList, useCreate, useUpdate, useDelete } = useCrud(service, queryKey);
  const { data, isLoading } = useList(params);
  const createMutation = useCreate();
  const updateMutation = useUpdate();
  const deleteMutation = useDelete();

  const handleCreate = async (formData: Record<string, unknown>) => {
    await createMutation.mutateAsync(formData as TRequest);
    setIsCreateOpen(false);
  };

  const handleUpdate = async (formData: Record<string, unknown>) => {
    if (!editItem) return;
    await updateMutation.mutateAsync({ id: editItem.id, data: formData as TRequest });
    setEditItem(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  const handleExportCSV = () => {
    if (data?.content) exportToCSV(data.content as Record<string, unknown>[], config.entity);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {config.title}
          </h1>
          {config.description && (
            <p className="mt-1 text-sm text-muted-foreground">{config.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            id={`${queryKey}-export-btn`}
            onClick={handleExportCSV}
            className={cn(
              "flex items-center gap-2 rounded-lg border border-border px-3 py-2",
              "text-sm font-medium text-foreground",
              "hover:bg-accent transition-colors"
            )}
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </button>
          <button
            id={`${queryKey}-create-btn`}
            onClick={() => setIsCreateOpen(true)}
            className={cn(
              "flex items-center gap-2 rounded-lg bg-primary px-4 py-2",
              "text-sm font-semibold text-primary-foreground",
              "hover:bg-primary/90 transition-colors active:scale-[0.98]"
            )}
          >
            <Plus className="h-4 w-4" />
            Novo
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      {data && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {data.totalElements} total
          </span>
          <span>•</span>
          <span>Página {data.page + 1} de {data.totalPages}</span>
        </div>
      )}

      {/* DataTable */}
      <DataTable
        columns={config.columns}
        data={data}
        isLoading={isLoading}
        sortBy={params.sortBy}
        sortDir={params.sortDir}
        searchValue={params.search}
        onPageChange={(page) => setParams((p) => ({ ...p, page }))}
        onSortChange={(sortBy, sortDir) => setParams((p) => ({ ...p, sortBy, sortDir, page: 0 }))}
        onSearchChange={(search) => setParams((p) => ({ ...p, search, page: 0 }))}
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button
              id={`${queryKey}-edit-${row.id}`}
              onClick={() => setEditItem(row)}
              className="rounded-lg p-1.5 hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              title="Edit"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              id={`${queryKey}-delete-${row.id}`}
              onClick={() => setDeleteId(row.id)}
              className="rounded-lg p-1.5 hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      />

      {/* Create Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title={`Criar`}
      >
        <FormBuilder
          fields={config.fields}
          onSubmit={handleCreate}
          isLoading={createMutation.isPending}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title={`Editar`}
      >
        {editItem && (
          <FormBuilder
            fields={config.fields}
            onSubmit={handleUpdate}
            defaultValues={
              config.toFormValues
                ? (config.toFormValues(editItem) as Record<string, unknown>)
                : (editItem as Record<string, unknown>)
            }
            isLoading={updateMutation.isPending}
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Confirmar Exclusão"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita
            (soft delete — o registro será marcado como inativo).
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setDeleteId(null)}
              className={cn(
                "flex-1 rounded-lg border border-border px-4 py-2",
                "text-sm font-medium hover:bg-accent transition-colors"
              )}
            >
              Cancelar
            </button>
            <button
              id={`${queryKey}-confirm-delete-btn`}
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className={cn(
                "flex-1 rounded-lg bg-destructive px-4 py-2",
                "text-sm font-semibold text-destructive-foreground",
                "hover:bg-destructive/90 transition-colors",
                "disabled:opacity-60"
              )}
            >
              {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ── Modal Component ──────────────────────────────────────────────────────

function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      {/* Dialog */}
      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-2xl",
          "bg-card border border-border shadow-2xl",
          "p-6 animate-fade-in mx-4"
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-accent transition-colors text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
