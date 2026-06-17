package com.crudsystem.application.dto;

import com.crudsystem.domain.entities.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * UserDTO — DTOs do usuário seguindo o princípio SRP.
 * Separa a representação da API da entidade de domínio.
 */
public class UserDTO {

    /**
     * DTO de requisição para criação/atualização de usuário.
     */
    @Data
    public static class Request {
        @NotBlank(message = "Name is required")
        private String name;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        @NotNull(message = "Role is required")
        private User.Role role;
    }

    /**
     * DTO de resposta (sem dados sensíveis como senha).
     */
    @Data
    public static class Response {
        private UUID id;
        private String name;
        private String email;
        private User.Role role;
        private Boolean active;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private String createdBy;
    }
}
