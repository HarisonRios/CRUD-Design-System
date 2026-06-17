import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AbstractGenericService, PaginatedResponse } from '../application/generic.service';
import { BaseEntity } from '../domain/entities/base.entity';

/**
 * Resposta padrão da API — espelha o ApiResponse.java do Spring Boot.
 * O frontend recebe exatamente o mesmo formato JSON.
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
}

function ok<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, message, data, timestamp: new Date().toISOString() };
}

/**
 * AbstractGenericController — Espelha o AbstractGenericController.java do Spring Boot.
 *
 * Mesmos endpoints, mesmo formato de resposta, mesma paginação.
 * O frontend não percebe se está falando com Java ou NestJS.
 */
export abstract class AbstractGenericController<
  TEntity extends BaseEntity,
  TRequest,
  TResponse,
> {
  constructor(
    protected readonly service: AbstractGenericService<TEntity, TRequest, TResponse>,
  ) {}

  @Get()
  async findAll(
    @Query('page') page = 0,
    @Query('size') size = 10,
  ): Promise<ApiResponse<PaginatedResponse<TResponse>>> {
    const result = await this.service.findAll(Number(page), Number(size));
    return ok(result);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ApiResponse<TResponse>> {
    const result = await this.service.findById(id);
    return ok(result);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: TRequest): Promise<ApiResponse<TResponse>> {
    const result = await this.service.create(dto);
    return ok(result, 'Created successfully');
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: TRequest,
  ): Promise<ApiResponse<TResponse>> {
    const result = await this.service.update(id, dto);
    return ok(result, 'Updated successfully');
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.service.delete(id);
    return ok(null, 'Deleted successfully');
  }
}
