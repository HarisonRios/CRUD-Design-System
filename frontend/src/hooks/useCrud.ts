import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { PaginationParams } from "@/types/api";
import { GenericCrudService } from "@/services/generic.service";

/**
 * useCrud — Hook genérico de CRUD com TanStack Query.
 *
 * Demonstra reutilização máxima: um único hook provê
 * list, findById, create, update e delete para qualquer entidade.
 *
 * @param service - Instância de GenericCrudService
 * @param queryKey - Chave de cache única para a entidade
 */
export function useCrud<TResponse, TRequest>(
  service: GenericCrudService<TResponse, TRequest>,
  queryKey: string
) {
  const queryClient = useQueryClient();

  const useList = (params?: PaginationParams) =>
    useQuery({
      queryKey: [queryKey, "list", params],
      queryFn: () => service.findAll(params),
    });

  const useById = (id: string, enabled = true) =>
    useQuery({
      queryKey: [queryKey, id],
      queryFn: () => service.findById(id),
      enabled: !!id && enabled,
    });

  const useCreate = () =>
    useMutation({
      mutationFn: (data: TRequest) => service.create(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success("Registro criado com sucesso!");
      },
      onError: () => {
        toast.error("Falha ao criar registro. Tente novamente.");
      },
    });

  const useUpdate = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: TRequest }) =>
        service.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success("Registro atualizado com sucesso!");
      },
      onError: () => {
        toast.error("Falha ao atualizar registro. Tente novamente.");
      },
    });

  const useDelete = () =>
    useMutation({
      mutationFn: (id: string) => service.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success("Registro excluído com sucesso!");
      },
      onError: () => {
        toast.error("Falha ao excluir registro. Tente novamente.");
      },
    });

  return { useList, useById, useCreate, useUpdate, useDelete };
}

// ── Entity-specific hook instances ────────────────────────────────────────

import { categoryService, productService, userService } from "@/services/generic.service";

export const useCategorycrud = () => useCrud(categoryService, "categories");
export const useProductCrud = () => useCrud(productService, "products");
export const useUserCrud = () => useCrud(userService, "users");
