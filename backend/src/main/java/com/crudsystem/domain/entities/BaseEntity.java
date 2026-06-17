package com.crudsystem.domain.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * BaseEntity — Entidade base seguindo o princípio de Open/Closed (OCP do SOLID).
 * Todas as entidades da aplicação herdam desta classe, ganhando automaticamente:
 * - ID universal (UUID)
 * - Auditoria automática (createdAt, updatedAt, createdBy, updatedBy)
 * - Soft Delete (campo active)
 *
 * Para adicionar uma nova entidade, basta estender esta classe — sem modificar código existente.
 */
@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy;

    @LastModifiedBy
    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "active", nullable = false)
    private Boolean active = true;

    /**
     * Soft delete — marca o registro como inativo sem excluí-lo fisicamente.
     */
    public void deactivate() {
        this.active = false;
    }

    public void activate() {
        this.active = true;
    }
}
