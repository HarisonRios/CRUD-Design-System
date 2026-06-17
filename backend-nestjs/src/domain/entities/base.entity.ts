import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

/**
 * BaseEntity — Entidade base do NestJS (espelha o BaseEntity.java do Spring Boot).
 *
 * Mesmos campos:
 * - id (UUID)
 * - createdAt, updatedAt (auditoria automática via TypeORM)
 * - createdBy, updatedBy (auditoria de usuário)
 * - active (soft delete)
 *
 * Para adicionar uma entidade: basta estender esta classe.
 * Mesmo princípio OCP demonstrado no Java.
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;

  @Column({ name: 'active', default: true })
  active: boolean;

  /** Soft delete — mesmo comportamento do Java */
  deactivate(): void {
    this.active = false;
  }

  activate(): void {
    this.active = true;
  }
}
