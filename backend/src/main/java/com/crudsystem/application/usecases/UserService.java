package com.crudsystem.application.usecases;

import com.crudsystem.application.dto.UserDTO;
import com.crudsystem.domain.entities.User;
import com.crudsystem.domain.repositories.UserRepository;
import com.crudsystem.shared.exceptions.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * UserService — Serviço específico de User.
 *
 * Demonstra OCP: Reutiliza todo o CRUD do AbstractGenericService.
 * Demonstra SRP: Responsável apenas pelas regras específicas de User.
 *
 * Para criar um CRUD completo de uma nova entidade, basta criar uma
 * classe como esta implementando apenas os métodos de mapeamento.
 */
@Slf4j
@Service
public class UserService extends AbstractGenericService<User, UserDTO.Request, UserDTO.Response> {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        super(userRepository);
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected User toEntity(UserDTO.Request dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("Email '" + dto.getEmail() + "' is already in use");
        }
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(dto.getRole())
                .build();
    }

    @Override
    protected UserDTO.Response toResponseDTO(User user) {
        UserDTO.Response response = new UserDTO.Response();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setActive(user.getActive());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        response.setCreatedBy(user.getCreatedBy());
        return response;
    }

    @Override
    protected void updateEntity(User user, UserDTO.Request dto) {
        // Check email uniqueness only if changed
        if (!user.getEmail().equals(dto.getEmail()) && userRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("Email '" + dto.getEmail() + "' is already in use");
        }
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
    }

    @Override
    protected String getEntityName() {
        return "User";
    }
}
