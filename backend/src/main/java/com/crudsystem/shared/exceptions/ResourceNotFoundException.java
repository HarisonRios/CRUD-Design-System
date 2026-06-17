package com.crudsystem.shared.exceptions;

import org.springframework.http.HttpStatus;

/**
 * ResourceNotFoundException — Lançada quando um recurso não é encontrado (404).
 */
public class ResourceNotFoundException extends AppException {

    public ResourceNotFoundException(String resourceName, Object identifier) {
        super(String.format("%s with identifier '%s' not found", resourceName, identifier), HttpStatus.NOT_FOUND);
    }
}
