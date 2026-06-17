package com.crudsystem.infrastructure.controllers;

import com.crudsystem.application.dto.ProductDTO;
import com.crudsystem.application.usecases.ProductService;
import com.crudsystem.domain.entities.Product;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ProductController — Controller de produto com CRUD completo herdado.
 */
@Tag(name = "Products", description = "Product management endpoints")
@RestController
@RequestMapping("/api/v1/products")
@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
public class ProductController extends AbstractGenericController<Product, ProductDTO.Request, ProductDTO.Response> {

    public ProductController(ProductService productService) {
        super(productService);
    }
}
