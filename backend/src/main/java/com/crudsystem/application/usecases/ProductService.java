package com.crudsystem.application.usecases;

import com.crudsystem.application.dto.CategoryDTO;
import com.crudsystem.application.dto.ProductDTO;
import com.crudsystem.domain.entities.Category;
import com.crudsystem.domain.entities.Product;
import com.crudsystem.domain.repositories.CategoryRepository;
import com.crudsystem.domain.repositories.ProductRepository;
import com.crudsystem.shared.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * ProductService — Serviço de Product.
 */
@Service
public class ProductService extends AbstractGenericService<Product, ProductDTO.Request, ProductDTO.Response> {

    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        super(productRepository);
        this.categoryRepository = categoryRepository;
    }

    @Override
    protected Product toEntity(ProductDTO.Request dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findByIdAndActiveTrue(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", dto.getCategoryId()));
            product.setCategory(category);
        }
        return product;
    }

    @Override
    protected ProductDTO.Response toResponseDTO(Product product) {
        ProductDTO.Response response = new ProductDTO.Response();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setActive(product.getActive());
        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());

        if (product.getCategory() != null) {
            CategoryDTO.Response categoryResponse = new CategoryDTO.Response();
            categoryResponse.setId(product.getCategory().getId());
            categoryResponse.setName(product.getCategory().getName());
            response.setCategory(categoryResponse);
        }
        return response;
    }

    @Override
    protected void updateEntity(Product product, ProductDTO.Request dto) {
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findByIdAndActiveTrue(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", dto.getCategoryId()));
            product.setCategory(category);
        }
    }

    @Override
    protected String getEntityName() {
        return "Product";
    }
}
