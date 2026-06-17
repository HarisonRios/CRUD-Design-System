package com.crudsystem.infrastructure.controllers;

import com.crudsystem.application.dto.UserDTO;
import com.crudsystem.application.usecases.UserService;
import com.crudsystem.domain.entities.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * UserController — Controller de usuário.
 *
 * Todo o CRUD (GET, POST, PUT, DELETE, paginação) é herdado de AbstractGenericController.
 * Este controller apenas define a rota e a segurança.
 *
 * Demonstra o poder da reutilização de código do framework.
 */
@Tag(name = "Users", description = "User management endpoints")
@RestController
@RequestMapping("/api/v1/users")
@PreAuthorize("hasRole('ADMIN')")
public class UserController extends AbstractGenericController<User, UserDTO.Request, UserDTO.Response> {

    public UserController(UserService userService) {
        super(userService);
    }
}
