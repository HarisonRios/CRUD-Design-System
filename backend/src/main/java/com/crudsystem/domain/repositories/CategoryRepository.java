package com.crudsystem.domain.repositories;

import com.crudsystem.domain.entities.Category;
import org.springframework.stereotype.Repository;

/**
 * CategoryRepository — Repositório específico de Category.
 */
@Repository
public interface CategoryRepository extends GenericRepository<Category> {
}
