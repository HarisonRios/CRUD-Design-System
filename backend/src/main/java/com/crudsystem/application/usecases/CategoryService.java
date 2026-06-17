package com.crudsystem.application.usecases;

import com.crudsystem.application.dto.CategoryDTO;
import com.crudsystem.domain.entities.Category;
import com.crudsystem.domain.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

/**
 * CategoryService — Serviço de Category.
 * Demonstra como adicionar um novo CRUD completo com mínimo código.
 */
@Service
public class CategoryService extends AbstractGenericService<Category, CategoryDTO.Request, CategoryDTO.Response> {

    public CategoryService(CategoryRepository categoryRepository) {
        super(categoryRepository);
    }

    @Override
    protected Category toEntity(CategoryDTO.Request dto) {
        return Category.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .build();
    }

    @Override
    protected CategoryDTO.Response toResponseDTO(Category category) {
        CategoryDTO.Response response = new CategoryDTO.Response();
        response.setId(category.getId());
        response.setName(category.getName());
        response.setDescription(category.getDescription());
        response.setActive(category.getActive());
        response.setCreatedAt(category.getCreatedAt());
        response.setUpdatedAt(category.getUpdatedAt());
        return response;
    }

    @Override
    protected void updateEntity(Category category, CategoryDTO.Request dto) {
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
    }

    @Override
    protected String getEntityName() {
        return "Category";
    }
}
