package com.crudsystem.infrastructure.controllers;

import com.crudsystem.application.dto.CategoryDTO;
import com.crudsystem.application.usecases.CategoryService;
import com.crudsystem.domain.entities.Category;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * CategoryController — Controller de categoria com CRUD completo herdado.
 */
@Tag(name = "Categories", description = "Category management endpoints")
@RestController
@RequestMapping("/api/v1/categories")
@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
public class CategoryController extends AbstractGenericController<Category, CategoryDTO.Request, CategoryDTO.Response> {

    public CategoryController(CategoryService categoryService) {
        super(categoryService);
    }
}
