package com.crudsystem.shared.exceptions;

import org.springframework.http.HttpStatus;

/**
 * AppException — Exceção base da aplicação.
 * Permite encapsular status HTTP e mensagem de forma limpa.
 */
public class AppException extends RuntimeException {

    private final HttpStatus status;

    public AppException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
