package com.crudsystem.infrastructure.controllers;

import com.crudsystem.application.dto.AuthDTO;
import com.crudsystem.application.dto.UserDTO;
import com.crudsystem.domain.repositories.UserRepository;
import com.crudsystem.infrastructure.security.JwtUtil;
import com.crudsystem.shared.exceptions.ResourceNotFoundException;
import com.crudsystem.shared.responses.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController — Endpoints de autenticação.
 * Gerencia Login e Refresh Token.
 */
@Tag(name = "Authentication", description = "Login and token management")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;

    @Operation(summary = "Authenticate user and return JWT tokens")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDTO.TokenResponse>> login(
            @Valid @RequestBody AuthDTO.LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String accessToken = jwtUtil.generateToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        var user = userRepository.findByEmailAndActiveTrue(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", request.getEmail()));

        UserDTO.Response userResponse = new UserDTO.Response();
        userResponse.setId(user.getId());
        userResponse.setName(user.getName());
        userResponse.setEmail(user.getEmail());
        userResponse.setRole(user.getRole());

        AuthDTO.TokenResponse tokenResponse = new AuthDTO.TokenResponse();
        tokenResponse.setAccessToken(accessToken);
        tokenResponse.setRefreshToken(refreshToken);
        tokenResponse.setExpiresIn(jwtUtil.getJwtExpiration());
        tokenResponse.setUser(userResponse);

        return ResponseEntity.ok(ApiResponse.success("Login successful", tokenResponse));
    }

    @Operation(summary = "Refresh access token using refresh token")
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthDTO.TokenResponse>> refresh(
            @Valid @RequestBody AuthDTO.RefreshRequest request) {

        String username = jwtUtil.extractUsername(request.getRefreshToken());
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (!jwtUtil.isTokenValid(request.getRefreshToken(), userDetails)) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid refresh token"));
        }

        String newAccessToken = jwtUtil.generateToken(userDetails);

        AuthDTO.TokenResponse tokenResponse = new AuthDTO.TokenResponse();
        tokenResponse.setAccessToken(newAccessToken);
        tokenResponse.setRefreshToken(request.getRefreshToken());
        tokenResponse.setExpiresIn(jwtUtil.getJwtExpiration());

        return ResponseEntity.ok(ApiResponse.success("Token refreshed", tokenResponse));
    }
}
