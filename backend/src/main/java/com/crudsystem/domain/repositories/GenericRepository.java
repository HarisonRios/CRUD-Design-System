package com.crudsystem.domain.repositories;

import com.crudsystem.domain.entities.BaseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;
import java.util.UUID;

/**
 * GenericRepository — Interface base para todos os repositórios.
 *
 * Demonstra ISP (Interface Segregation): define apenas operações comuns.
 * Demonstra DIP (Dependency Inversion): os serviços dependem desta abstração,
 * não de implementações concretas.
 *
 * @param <T> Tipo da entidade que estende BaseEntity
 */
@NoRepositoryBean
public interface GenericRepository<T extends BaseEntity> extends JpaRepository<T, UUID>,
        JpaSpecificationExecutor<T> {

    /**
     * Busca apenas registros ativos com paginação.
     */
    Page<T> findAllByActiveTrue(Pageable pageable);

    /**
     * Busca um registro ativo pelo ID.
     */
    Optional<T> findByIdAndActiveTrue(UUID id);
}
