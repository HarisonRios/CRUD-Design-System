import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormBuilder } from "@/components/forms/FormBuilder";
import type { FormField } from "@/types/crud-config";

/**
 * FormBuilder.test.tsx — Testes do componente FormBuilder.
 * Demonstra testes de componentes React com Vitest + Testing Library.
 */
describe("FormBuilder", () => {
  const fields: FormField[] = [
    { name: "name", label: "Name", type: "text", required: true, placeholder: "Product name" },
    { name: "price", label: "Price", type: "number", required: true, min: 0 },
    { name: "description", label: "Description", type: "textarea" },
  ];

  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders all fields correctly", () => {
    render(<FormBuilder fields={fields} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it("shows required indicator for required fields", () => {
    render(<FormBuilder fields={fields} onSubmit={mockOnSubmit} />);
    const labels = screen.getAllByText("*");
    expect(labels.length).toBe(2); // name and price are required
  });

  it("shows validation error when required field is empty", async () => {
    const user = userEvent.setup();
    render(<FormBuilder fields={fields} onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole("button", { name: /save/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with form data when valid", async () => {
    const user = userEvent.setup();
    render(<FormBuilder fields={fields} onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/name/i), "Laptop");
    await user.type(screen.getByLabelText(/price/i), "999");

    const submitButton = screen.getByRole("button", { name: /save/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ name: "Laptop", price: 999 })
      );
    });
  });

  it("populates fields with defaultValues", () => {
    render(
      <FormBuilder
        fields={fields}
        onSubmit={mockOnSubmit}
        defaultValues={{ name: "Existing Product", price: 49.99 }}
      />
    );

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    expect(nameInput.value).toBe("Existing Product");
  });

  it("shows loading state when isLoading is true", () => {
    render(<FormBuilder fields={fields} onSubmit={mockOnSubmit} isLoading />);
    expect(screen.getByText(/saving.../i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
