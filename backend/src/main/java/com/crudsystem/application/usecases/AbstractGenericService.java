package com.crudsystem.application.usecases;

import com.crudsystem.domain.entities.BaseEntity;
import com.crudsystem.domain.repositories.GenericRepository;
import com.crudsystem.shared.exceptions.ResourceNotFoundException;
import com.crudsystem.shared.pagination.PaginatedResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * AbstractGenericService — Implementação abstrata do GenericService.
 *
 * Demonstra Template Method Pattern: define o fluxo geral e deixa
 * subclasses implementarem etapas específicas.
 *
 * Demonstra OCP: novas entidades estendem esta classe sem modificá-la.
 * Demonstra LSP: qualquer subclasse pode substituir esta classe.
 *
 * @param <T>          Entidade
 * @param <RequestDTO>  DTO de entrada
 * @param <ResponseDTO> DTO de saída
 */
@Slf4j
@RequiredArgsConstructor
public abstract class AbstractGenericService<T extends BaseEntity, RequestDTO, ResponseDTO>
        implements GenericService<T, RequestDTO, ResponseDTO> {

    protected final GenericRepository<T> repository;

    /**
     * Converte RequestDTO para entidade. Implementado pela subclasse.
     */
    protected abstract T toEntity(RequestDTO dto);

    /**
     * Converte entidade para ResponseDTO. Implementado pela subclasse.
     */
    protected abstract ResponseDTO toResponseDTO(T entity);

    /**
     * Atualiza campos de uma entidade existente com dados do DTO.
     */
    protected abstract void updateEntity(T entity, RequestDTO dto);

    /**
     * Retorna o nome da entidade para mensagens de erro.
     */
    protected abstract String getEntityName();

    @Override
    @Transactional
    public ResponseDTO create(RequestDTO dto) {
        log.debug("Creating new {}", getEntityName());
        T entity = toEntity(dto);
        T saved = repository.save(entity);
        log.info("{} created with id: {}", getEntityName(), saved.getId());
        return toResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseDTO findById(UUID id) {
        log.debug("Finding {} by id: {}", getEntityName(), id);
        T entity = repository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException(getEntityName(), id));
        return toResponseDTO(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<ResponseDTO> findAll(Pageable pageable) {
        log.debug("Listing all {} with pagination", getEntityName());
        Page<ResponseDTO> page = repository.findAllByActiveTrue(pageable)
                .map(this::toResponseDTO);
        return PaginatedResponse.of(page);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<ResponseDTO> findAll(Specification<T> spec, Pageable pageable) {
        log.debug("Listing all {} with filters", getEntityName());
        Page<ResponseDTO> page = repository.findAll(spec, pageable)
                .map(this::toResponseDTO);
        return PaginatedResponse.of(page);
    }

    @Override
    @Transactional
    public ResponseDTO update(UUID id, RequestDTO dto) {
        log.debug("Updating {} with id: {}", getEntityName(), id);
        T entity = repository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException(getEntityName(), id));
        updateEntity(entity, dto);
        T updated = repository.save(entity);
        log.info("{} updated with id: {}", getEntityName(), id);
        return toResponseDTO(updated);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        log.debug("Soft deleting {} with id: {}", getEntityName(), id);
        T entity = repository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException(getEntityName(), id));
        entity.deactivate();
        repository.save(entity);
        log.info("{} soft deleted with id: {}", getEntityName(), id);
    }
}
