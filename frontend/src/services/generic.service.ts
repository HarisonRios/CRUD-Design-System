import { api } from "@/lib/api";
import type { ApiResponse, PaginatedResponse, PaginationParams } from "@/types/api";
import type { AxiosResponse } from "axios";

/**
 * GenericCrudService — Serviço genérico de CRUD.
 *
 * Espelha o GenericService do backend.
 * Demonstra DRY: uma única classe para todos os CRUDs.
 *
 * @param endpoint - O endpoint da API (ex: "products")
 */
export class GenericCrudService<TResponse, TRequest> {
  constructor(private readonly endpoint: string) {}

  async findAll(params?: PaginationParams): Promise<PaginatedResponse<TResponse>> {
    const response: AxiosResponse<ApiResponse<PaginatedResponse<TResponse>>> = await api.get(
      `/${this.endpoint}`,
      { params }
    );
    return response.data.data;
  }

  async findById(id: string): Promise<TResponse> {
    const response: AxiosResponse<ApiResponse<TResponse>> = await api.get(
      `/${this.endpoint}/${id}`
    );
    return response.data.data;
  }

  async create(data: TRequest): Promise<TResponse> {
    const response: AxiosResponse<ApiResponse<TResponse>> = await api.post(
      `/${this.endpoint}`,
      data
    );
    return response.data.data;
  }

  async update(id: string, data: TRequest): Promise<TResponse> {
    const response: AxiosResponse<ApiResponse<TResponse>> = await api.put(
      `/${this.endpoint}/${id}`,
      data
    );
    return response.data.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/${this.endpoint}/${id}`);
  }
}

// ── Entity-specific service instances ────────────────────────────────────

import type { Category, CategoryRequest, Product, ProductRequest, User, UserRequest } from "@/types/entities";

export const categoryService = new GenericCrudService<Category, CategoryRequest>("categories");
export const productService = new GenericCrudService<Product, ProductRequest>("products");
export const userService = new GenericCrudService<User, UserRequest>("users");
