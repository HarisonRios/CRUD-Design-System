"use client";

import { Package, Tag, Users, TrendingUp, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useProductCrud, useCategorycrud, useUserCrud } from "@/hooks/useCrud";

export default function DashboardPage() {
  const { useList: useProducts } = useProductCrud();
  const { useList: useCategories } = useCategorycrud();
  const { useList: useUsers } = useUserCrud();

  const { data: products } = useProducts({ page: 0, size: 1 });
  const { data: categories } = useCategories({ page: 0, size: 1 });
  const { data: users } = useUsers({ page: 0, size: 1 });

  const stats = [
    { label: "Total de Produtos", value: products?.totalElements ?? "—", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10", href: "/products" },
    { label: "Categorias", value: categories?.totalElements ?? "—", icon: Tag, color: "text-purple-500", bg: "bg-purple-500/10", href: "/categories" },
    { label: "Usuários", value: users?.totalElements ?? "—", icon: Users, color: "text-green-500", bg: "bg-green-500/10", href: "/users" },
    { label: "Atividade", value: "Ao Vivo", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10", href: "#" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Bem-vindo ao CRUD Design System
        </h1>
        <p className="mt-2 text-muted-foreground">
          Um framework full-stack reutilizável — crie CRUDs completos com o mínimo de código.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Framework Highlight */}
      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Layers className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Como o Framework Funciona</h2>
            <p className="text-sm text-muted-foreground">Arquitetura Orientada a Configuração</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FrameworkCard
            step="01"
            title="Definir Config"
            description="Crie um objeto CrudConfig com colunas, campos e o nome da entidade."
            code={`const config = {\n  entity: "products",\n  columns: [...],\n  fields: [...]\n}`}
          />
          <FrameworkCard
            step="02"
            title="Usar o CrudPage"
            description="Passe a configuração para o componente CrudPage. Só isso."
            code={`<CrudPage\n  config={config}\n  service={service}\n  queryKey="products"\n/>`}
          />
          <FrameworkCard
            step="03"
            title="CRUD Completo Pronto"
            description="Lista, Cria, Edita, Exclui, Pagina, Filtra, Exporta — tudo funcionando."
            code={`// ✓ DataTable com ordenação\n// ✓ Modais de Criar/Editar\n// ✓ Confirmação de exclusão\n// ✓ Exportação CSV`}
          />
        </div>
      </div>
    </div>
  );
}

function FrameworkCard({ step, title, description, code }: {
  step: string; title: string; description: string; code: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-5 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-primary bg-primary/10 rounded-md px-2 py-0.5">
          {step}
        </span>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <pre className="rounded-lg bg-muted p-3 text-xs text-muted-foreground overflow-x-auto font-mono">
        {code}
      </pre>
    </div>
  );
}
