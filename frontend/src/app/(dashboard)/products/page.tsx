import type { Metadata } from "next";
import { CrudPage } from "@/components/crud/CrudPage";
import { productService } from "@/services/generic.service";
import { productConfig } from "./config";

export const metadata: Metadata = {
  title: "Products",
};

/**
 * ProductsPage — Página de produtos.
 *
 * Demonstra o poder do CRUD Design System:
 * Um CRUD completo (listar, criar, editar, excluir, paginar, filtrar)
 * em apenas 10 linhas de código.
 */
export default function ProductsPage() {
  return (
    <CrudPage
      config={productConfig}
      service={productService}
      queryKey="products"
    />
  );
}
