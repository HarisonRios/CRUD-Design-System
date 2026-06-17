package com.crudsystem.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * OpenApiConfig — Configuração do Swagger/OpenAPI 3.
 */
@Configuration
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT Authentication",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("CRUD Design System API")
                        .description("""
                                ## Reusable CRUD Platform
                                
                                A scalable, enterprise-grade full-stack framework for rapid system development.
                                
                                ### Key Features
                                - Generic CRUD operations with full pagination, sorting and filtering
                                - JWT Authentication with Roles & Permissions
                                - Soft Delete with Auditing
                                - Clean Architecture with SOLID principles
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("CRUD Design System")
                                .url("https://github.com/yourusername/crud-design-system"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT"))
                );
    }
}
