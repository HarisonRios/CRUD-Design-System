package com.crudsystem.application.usecases;

import com.crudsystem.application.dto.CategoryDTO;
import com.crudsystem.domain.entities.Category;
import com.crudsystem.domain.repositories.CategoryRepository;
import com.crudsystem.shared.exceptions.ResourceNotFoundException;
import com.crudsystem.shared.pagination.PaginatedResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * CategoryServiceTest — Testes unitários do CategoryService.
 * Demonstra uso de Mockito para isolamento de dependências.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("CategoryService Unit Tests")
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    private Category category;
    private CategoryDTO.Request requestDTO;

    @BeforeEach
    void setUp() {
        category = Category.builder()
                .name("Electronics")
                .description("Electronic products")
                .build();

        requestDTO = new CategoryDTO.Request();
        requestDTO.setName("Electronics");
        requestDTO.setDescription("Electronic products");
    }

    @Test
    @DisplayName("Should create category successfully")
    void shouldCreateCategorySuccessfully() {
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        CategoryDTO.Response response = categoryService.create(requestDTO);

        assertThat(response).isNotNull();
        assertThat(response.getName()).isEqualTo("Electronics");
        assertThat(response.getDescription()).isEqualTo("Electronic products");
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    @DisplayName("Should find category by ID when it exists")
    void shouldFindCategoryByIdWhenExists() {
        UUID id = UUID.randomUUID();
        when(categoryRepository.findByIdAndActiveTrue(id)).thenReturn(Optional.of(category));

        CategoryDTO.Response response = categoryService.findById(id);

        assertThat(response).isNotNull();
        assertThat(response.getName()).isEqualTo("Electronics");
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when category not found")
    void shouldThrowExceptionWhenCategoryNotFound() {
        UUID id = UUID.randomUUID();
        when(categoryRepository.findByIdAndActiveTrue(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> categoryService.findById(id))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Category");
    }

    @Test
    @DisplayName("Should return paginated list of categories")
    void shouldReturnPaginatedCategories() {
        Pageable pageable = PageRequest.of(0, 10);
        when(categoryRepository.findAllByActiveTrue(pageable))
                .thenReturn(new PageImpl<>(List.of(category)));

        PaginatedResponse<CategoryDTO.Response> result = categoryService.findAll(pageable);

        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getTotalElements()).isEqualTo(1);
    }

    @Test
    @DisplayName("Should soft delete category")
    void shouldSoftDeleteCategory() {
        UUID id = UUID.randomUUID();
        when(categoryRepository.findByIdAndActiveTrue(id)).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        categoryService.delete(id);

        assertThat(category.getActive()).isFalse();
        verify(categoryRepository, times(1)).save(category);
    }
}
