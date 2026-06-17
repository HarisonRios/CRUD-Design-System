# ➕ Como Adicionar Novas Entidades

Este guia demonstra o poder do **CRUD Design System**. Ele ensina como adicionar um CRUD completo de ponta a ponta para uma nova entidade em **menos de 15 minutos**.

---

## 🔵 Backend (5 passos simples)

O processo no backend Java exige apenas a criação do modelo e a herança das classes genéricas. Todo o fluxo REST (GET, POST, PUT, DELETE) e lógica de paginação vêm embutidos.

### Passo 1: A Entidade
Sua classe deve herdar de `BaseEntity`. Ao fazer isso, você ganha automaticamente os campos `id` (UUID), `createdAt`, `updatedAt`, `createdBy`, `updatedBy` e `active` (para soft delete).
```java
@Entity
@Table(name = "suppliers")
public class Supplier extends BaseEntity {
    private String name;
    private String cnpj;
}
```

### Passo 2: O DTO (Data Transfer Object)
Crie um container com classes estáticas internas para Request (entrada) e Response (saída).
```java
public class SupplierDTO {
    public static class Request { /* campos obrigatórios */ }
    public static class Response { /* campos para exibição */ }
}
```

### Passo 3: O Repository
Apenas estenda `GenericRepository`. Você herda instantaneamente todos os métodos CRUD e query methods que ignoram itens deletados logicamente (`active = false`).
```java
@Repository
public interface SupplierRepository extends GenericRepository<Supplier> {}
```

### Passo 4: O Service
Estenda `AbstractGenericService`. O compilador pedirá para você implementar apenas 4 métodos simples de mapeamento e regras de negócio.
```java
@Service
public class SupplierService extends AbstractGenericService<Supplier, SupplierDTO.Request, SupplierDTO.Response> {
    // Implemente: toEntity(), toResponseDTO(), updateEntity(), getEntityName()
}
```

### Passo 5: O Controller
Estenda `AbstractGenericController` e defina a rota. Pronto. A API está 100% no ar.
```java
@RestController
@RequestMapping("/api/v1/suppliers")
public class SupplierController extends AbstractGenericController<Supplier, SupplierDTO.Request, SupplierDTO.Response> {
    public SupplierController(SupplierService service) { super(service); }
}
```

---

## 🟢 Frontend (2 passos simples)

No frontend, você **não** desenha a tela. Você declara como os dados funcionam, e o motor visual constrói a tela inteira sozinho.

### Passo 1: A Configuração
Crie um arquivo declarando quais colunas a tabela terá e quais campos o formulário precisa para criação/edição.
```tsx
// config.tsx
export const supplierConfig: CrudConfig<Supplier, SupplierRequest> = {
  entity: "suppliers",
  title: "Fornecedores",
  columns: [
    { key: "name", label: "Nome", sortable: true },
    { key: "cnpj", label: "CNPJ" },
  ],
  fields: [
    { name: "name", label: "Nome", type: "text", required: true },
    { name: "cnpj", label: "CNPJ", type: "text", required: true },
  ],
};
```

### Passo 2: A Página
Chame o componente principal `CrudPage` injetando a sua configuração.
```tsx
// page.tsx
export default function SuppliersPage() {
  return (
    <CrudPage 
      config={supplierConfig} 
      service={supplierService} 
      queryKey="suppliers" 
    />
  );
}
```

---

## 🎉 O que você ganha automaticamente?

O resultado dessa meia dúzia de classes e arquivos é um **sistema enterprise completo**:

| Funcionalidade Pronta | Onde atua? |
|---|---|
| Tabela com suporte nativo a paginação | Frontend |
| Paginação real e otimizada (via limite/offset) | Backend |
| Ordenação reversível clicando nas colunas | Frontend & Backend |
| Input de Busca e Filtragem | Frontend & Backend |
| Modal de criação com validação dinâmica (`zod`) | Frontend |
| Modal de edição (pré-preenchendo dados existentes) | Frontend |
| Fluxo de Soft Delete seguro (exclusão lógica) | Frontend (Alerta) & Backend |
| Auditoria automática (`createdBy`, `updatedAt`) | Backend |
| Botão "Exportar CSV" de todos os dados da tabela | Frontend |
| Loading skeletons dinâmicos e Empty States visuais | Frontend |
| Notificações Toast (Sucesso/Erro) | Frontend |

> 📉 Sem este framework, implementar isso tudo **do zero para cada tela** custaria horas de boilerplate e deixaria brechas para inconsistências de UI. Com o **CRUD Design System**, leva 15 minutos com padronização visual e de código impecável.
