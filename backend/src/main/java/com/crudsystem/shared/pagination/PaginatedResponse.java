package com.crudsystem.shared.pagination;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * PaginatedResponse — Wrapper de resposta paginada.
 * Encapsula os metadados de paginação do Spring Data para o cliente.
 *
 * @param <T> Tipo dos itens na página
 */
@Getter
@Builder
public class PaginatedResponse<T> {

    private final List<T> content;
    private final int page;
    private final int size;
    private final long totalElements;
    private final int totalPages;
    private final boolean first;
    private final boolean last;
    private final boolean empty;

    /**
     * Factory method para converter Page do Spring Data em PaginatedResponse.
     */
    public static <T> PaginatedResponse<T> of(Page<T> page) {
        return PaginatedResponse.<T>builder()
                .content(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .empty(page.isEmpty())
                .build();
    }
}
