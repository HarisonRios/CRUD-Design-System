import { Repository, FindOptionsWhere } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from '../domain/entities/base.entity';

/**
 * Resposta paginada — espelha o PaginatedResponse.java do Spring Boot.
 * Mesma estrutura de JSON que o frontend já conhece.
 */
export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

/**
 * AbstractGenericService — Espelha o AbstractGenericService.java do Spring Boot.
 *
 * Mesma ideia: subclasses implementam apenas toEntity() e toResponseDTO().
 * O CRUD completo é herdado automaticamente.
 *
 * @param TEntity    Entidade TypeORM
 * @param TRequest   DTO de entrada
 * @param TResponse  DTO de saída
 */
export abstract class AbstractGenericService<
  TEntity extends BaseEntity,
  TRequest,
  TResponse,
> {
  constructor(protected readonly repository: Repository<TEntity>) {}

  /** Implementado pela subclasse */
  protected abstract toEntity(dto: TRequest): TEntity;
  protected abstract toResponseDTO(entity: TEntity): TResponse;
  protected abstract updateEntity(entity: TEntity, dto: TRequest): void;
  protected abstract getEntityName(): string;

  async create(dto: TRequest): Promise<TResponse> {
    const entity = this.toEntity(dto);
    const saved = await this.repository.save(entity);
    return this.toResponseDTO(saved);
  }

  async findById(id: string): Promise<TResponse> {
    const entity = await this.repository.findOne({
      where: { id, active: true } as any as FindOptionsWhere<TEntity>,
    });
    if (!entity) {
      throw new NotFoundException(`${this.getEntityName()} with id '${id}' not found`);
    }
    return this.toResponseDTO(entity);
  }

  async findAll(page = 0, size = 10): Promise<PaginatedResponse<TResponse>> {
    const [items, total] = await this.repository.findAndCount({
      where: { active: true } as any as FindOptionsWhere<TEntity>,
      skip: page * size,
      take: size,
      order: { createdAt: 'DESC' } as never,
    });

    const totalPages = Math.ceil(total / size);
    return {
      content: items.map((item) => this.toResponseDTO(item)),
      page,
      size,
      totalElements: total,
      totalPages,
      first: page === 0,
      last: page >= totalPages - 1,
      empty: items.length === 0,
    };
  }

  async update(id: string, dto: TRequest): Promise<TResponse> {
    const entity = await this.repository.findOne({
      where: { id, active: true } as any as FindOptionsWhere<TEntity>,
    });
    if (!entity) {
      throw new NotFoundException(`${this.getEntityName()} with id '${id}' not found`);
    }
    this.updateEntity(entity, dto);
    const updated = await this.repository.save(entity);
    return this.toResponseDTO(updated);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id, active: true } as any as FindOptionsWhere<TEntity>,
    });
    if (!entity) {
      throw new NotFoundException(`${this.getEntityName()} with id '${id}' not found`);
    }
    entity.deactivate(); // Soft delete — mesmo do Java
    await this.repository.save(entity);
  }
}
