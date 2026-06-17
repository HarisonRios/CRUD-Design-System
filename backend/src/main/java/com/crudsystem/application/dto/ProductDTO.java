package com.crudsystem.application.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * ProductDTO — DTOs de produto.
 */
public class ProductDTO {

    @Data
    public static class Request {
        @NotBlank(message = "Name is required")
        private String name;

        private String description;

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
        private BigDecimal price;

        @NotNull(message = "Stock is required")
        @Min(value = 0, message = "Stock cannot be negative")
        private Integer stock;

        private UUID categoryId;
    }

    @Data
    public static class Response {
        private UUID id;
        private String name;
        private String description;
        private BigDecimal price;
        private Integer stock;
        private CategoryDTO.Response category;
        private Boolean active;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
