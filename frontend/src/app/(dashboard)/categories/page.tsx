"use client";

import { CrudPage } from "@/components/crud/CrudPage";
import { categoryService } from "@/services/generic.service";
import { categoryConfig } from "./config";

export default function CategoriesPage() {
  return <CrudPage config={categoryConfig} service={categoryService} queryKey="categories" />;
}
