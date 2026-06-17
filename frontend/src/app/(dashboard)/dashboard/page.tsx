import type { Metadata } from "next";
import { Package, Tag, Users, TrendingUp, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

const stats = [
  { label: "Total Products", value: "—", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10", href: "/products" },
  { label: "Categories", value: "—", icon: Tag, color: "text-purple-500", bg: "bg-purple-500/10", href: "/categories" },
  { label: "Users", value: "—", icon: Users, color: "text-green-500", bg: "bg-green-500/10", href: "/users" },
  { label: "Activity", value: "Live", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10", href: "#" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome to CRUD Design System
        </h1>
        <p className="mt-2 text-muted-foreground">
          A reusable full-stack framework — build complete CRUDs with minimal code.
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
            <h2 className="text-lg font-bold text-foreground">How the Framework Works</h2>
            <p className="text-sm text-muted-foreground">Configuration-Driven Architecture</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FrameworkCard
            step="01"
            title="Define Config"
            description="Create a CrudConfig object with columns, fields, and entity name."
            code={`const config = {\n  entity: "products",\n  columns: [...],\n  fields: [...]\n}`}
          />
          <FrameworkCard
            step="02"
            title="Use CrudPage"
            description="Pass the config to the CrudPage component. That's it."
            code={`<CrudPage\n  config={config}\n  service={service}\n  queryKey="products"\n/>`}
          />
          <FrameworkCard
            step="03"
            title="Full CRUD Ready"
            description="List, Create, Edit, Delete, Paginate, Filter, Export — all working."
            code={`// ✓ DataTable with sorting\n// ✓ Create/Edit modals\n// ✓ Soft delete confirm\n// ✓ CSV export`}
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
