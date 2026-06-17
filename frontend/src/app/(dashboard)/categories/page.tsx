import type { Metadata } from "next";
import { CrudPage } from "@/components/crud/CrudPage";
import { categoryService } from "@/services/generic.service";
import { categoryConfig } from "./config";

export const metadata: Metadata = { title: "Categories" };

export default function CategoriesPage() {
  return <CrudPage config={categoryConfig} service={categoryService} queryKey="categories" />;
}
