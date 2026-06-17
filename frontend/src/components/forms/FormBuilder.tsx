"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { FormField } from "@/types/crud-config";
import { cn } from "@/lib/utils";

interface FormBuilderProps {
  fields: FormField[];
  onSubmit: (data: Record<string, unknown>) => void;
  defaultValues?: Record<string, unknown>;
  isLoading?: boolean;
}

/**
 * FormBuilder — Gera formulários dinamicamente a partir de um array de campos.
 *
 * Demonstra Configuration-Driven Architecture:
 * O formulário é construído em tempo de execução a partir de metadados,
 * sem necessidade de escrever componentes de formulário repetitivos.
 */
export function FormBuilder({
  fields,
  onSubmit,
  defaultValues = {},
  isLoading = false,
}: FormBuilderProps) {
  // Constrói schema Zod dinamicamente a partir dos campos
  const schema = buildSchema(fields);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-1.5">
          <label
            htmlFor={field.name}
            className="text-sm font-medium text-foreground"
          >
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              {...register(field.name)}
              placeholder={field.placeholder}
              rows={field.rows ?? 3}
              className={cn(
                "w-full rounded-lg border bg-background px-3 py-2 text-sm",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "transition-colors resize-none",
                errors[field.name]
                  ? "border-destructive focus:ring-destructive/30"
                  : "border-input"
              )}
            />
          ) : field.type === "select" ? (
            <select
              id={field.name}
              {...register(field.name)}
              className={cn(
                "w-full rounded-lg border bg-background px-3 py-2 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "transition-colors cursor-pointer",
                errors[field.name]
                  ? "border-destructive focus:ring-destructive/30"
                  : "border-input"
              )}
            >
              <option value="">Select an option...</option>
              {field.options?.map((opt) => (
                <option key={String(opt.value)} value={String(opt.value)}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              type={field.type}
              {...register(field.name, {
                valueAsNumber: field.type === "number",
              })}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              className={cn(
                "w-full rounded-lg border bg-background px-3 py-2 text-sm",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "transition-colors",
                errors[field.name]
                  ? "border-destructive focus:ring-destructive/30"
                  : "border-input"
              )}
            />
          )}

          {errors[field.name] && (
            <p className="text-xs text-destructive animate-fade-in">
              {errors[field.name]?.message as string}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold",
          "text-primary-foreground transition-all duration-200",
          "hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "active:scale-[0.98]"
        )}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Saving...
          </span>
        ) : (
          "Save"
        )}
      </button>
    </form>
  );
}

/**
 * Constrói um schema Zod dinamicamente baseado nos campos definidos.
 */
function buildSchema(fields: FormField[]): z.ZodObject<z.ZodRawShape> {
  const shape: z.ZodRawShape = {};

  for (const field of fields) {
    let validator: z.ZodTypeAny;

    if (field.type === "number") {
      validator = z.coerce.number({
        required_error: `${field.label} is required`,
        invalid_type_error: `${field.label} must be a number`,
      });
      if (field.min !== undefined) {
        validator = (validator as z.ZodNumber).min(field.min, {
          message: `${field.label} must be at least ${field.min}`,
        });
      }
      if (!field.required) validator = validator.optional();
    } else if (field.type === "email") {
      validator = z.string().email(`${field.label} must be a valid email`);
      if (!field.required) validator = validator.optional();
    } else {
      validator = z.string();
      if (field.required) {
        validator = (validator as z.ZodString).min(1, {
          message: `${field.label} is required`,
        });
      } else {
        validator = validator.optional();
      }
    }

    shape[field.name] = validator;
  }

  return z.object(shape);
}
