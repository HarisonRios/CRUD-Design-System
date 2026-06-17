package com.crudsystem.domain.entities;

import jakarta.persistence.*;
import lombok.*;

/**
 * User — Entidade de usuário do sistema.
 * Demonstra LSP (Liskov Substitution): pode ser usada onde BaseEntity é esperada.
 * Demonstra SRP (Single Responsibility): responsável apenas por representar um usuário.
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "email", nullable = false, unique = true, length = 200)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    public enum Role {
        ADMIN,
        MANAGER,
        USER
    }
}
