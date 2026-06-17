package com.crudsystem.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * CategoryDTO — DTOs de categoria.
 */
public class CategoryDTO {

    @Data
    public static class Request {
        @NotBlank(message = "Name is required")
        private String name;

        private String description;
    }

    @Data
    public static class Response {
        private UUID id;
        private String name;
        private String description;
        private Boolean active;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
