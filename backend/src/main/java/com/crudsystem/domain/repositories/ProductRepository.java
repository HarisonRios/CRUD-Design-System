package com.crudsystem.domain.repositories;

import com.crudsystem.domain.entities.Product;
import org.springframework.stereotype.Repository;

/**
 * ProductRepository — Repositório específico de Product.
 */
@Repository
public interface ProductRepository extends GenericRepository<Product> {
}
