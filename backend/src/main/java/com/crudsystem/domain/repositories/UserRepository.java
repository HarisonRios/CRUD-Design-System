package com.crudsystem.domain.repositories;

import com.crudsystem.domain.entities.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * UserRepository — Repositório específico de User.
 * Herda todos os métodos de GenericRepository e pode adicionar consultas específicas.
 */
@Repository
public interface UserRepository extends GenericRepository<User> {

    Optional<User> findByEmailAndActiveTrue(String email);

    boolean existsByEmail(String email);
}
