package com.crudsystem.application.usecases;

import com.crudsystem.shared.pagination.PaginatedResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

/**
 * GenericService — Interface genérica de serviço.
 *
 * Demonstra ISP: define apenas operações de CRUD básicas.
 * Demonstra DIP: os controllers dependem desta interface, não de implementações concretas.
 *
 * @param <T>         Tipo da entidade
 * @param <RequestDTO  DTO de entrada (criação/atualização)
 * @param <ResponseDTO> DTO de saída (leitura)
 */
public interface GenericService<T, RequestDTO, ResponseDTO> {

    ResponseDTO create(RequestDTO dto);

    ResponseDTO findById(UUID id);

    PaginatedResponse<ResponseDTO> findAll(Pageable pageable);

    PaginatedResponse<ResponseDTO> findAll(Specification<T> spec, Pageable pageable);

    ResponseDTO update(UUID id, RequestDTO dto);

    void delete(UUID id);
}
