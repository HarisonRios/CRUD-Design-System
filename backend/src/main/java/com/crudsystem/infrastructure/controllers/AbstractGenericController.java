package com.crudsystem.infrastructure.controllers;

import com.crudsystem.application.usecases.GenericService;
import com.crudsystem.shared.pagination.PaginatedResponse;
import com.crudsystem.shared.responses.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * AbstractGenericController — Controller base com CRUD completo.
 *
 * Demonstra DRY (Don't Repeat Yourself): todos os endpoints CRUD
 * são definidos aqui uma única vez.
 *
 * Demonstra OCP: novos controllers estendem sem modificar esta classe.
 *
 * @param <T>          Entidade de domínio
 * @param <RequestDTO>  DTO de entrada
 * @param <ResponseDTO> DTO de saída
 */
@RequiredArgsConstructor
public abstract class AbstractGenericController<T, RequestDTO, ResponseDTO> {

    protected final GenericService<T, RequestDTO, ResponseDTO> service;

    @Operation(summary = "List all resources with pagination")
    @GetMapping
    public ResponseEntity<ApiResponse<PaginatedResponse<ResponseDTO>>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        PaginatedResponse<ResponseDTO> result = service.findAll(pageable);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @Operation(summary = "Find resource by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ResponseDTO>> findById(@PathVariable UUID id) {
        ResponseDTO result = service.findById(id);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @Operation(summary = "Create a new resource")
    @PostMapping
    public ResponseEntity<ApiResponse<ResponseDTO>> create(@Valid @RequestBody RequestDTO dto) {
        ResponseDTO result = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created successfully", result));
    }

    @Operation(summary = "Update an existing resource")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ResponseDTO>> update(
            @PathVariable UUID id,
            @Valid @RequestBody RequestDTO dto) {
        ResponseDTO result = service.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Updated successfully", result));
    }

    @Operation(summary = "Delete a resource (soft delete)")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted successfully", null));
    }
}
