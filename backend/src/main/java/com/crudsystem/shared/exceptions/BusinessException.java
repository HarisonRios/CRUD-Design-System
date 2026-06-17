package com.crudsystem.shared.exceptions;

import org.springframework.http.HttpStatus;

/**
 * BusinessException — Lançada quando uma regra de negócio é violada (400/422).
 */
public class BusinessException extends AppException {

    public BusinessException(String message) {
        super(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    public BusinessException(String message, HttpStatus status) {
        super(message, status);
    }
}
