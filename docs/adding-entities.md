# Adding New Entities Guide

This guide shows how to add a complete CRUD for a new entity in under 15 minutes.

## Backend Steps (5 files)

### Step 1: Entity
Extend `BaseEntity` — you get id, createdAt, updatedAt, createdBy, updatedBy, and active for free.

### Step 2: DTO
Create Request (input) and Response (output) static inner classes.

### Step 3: Repository
Extend `GenericRepository<YourEntity>` — you get all CRUD + pagination methods.

### Step 4: Service
Extend `AbstractGenericService` — implement only `toEntity()`, `toResponseDTO()`, `updateEntity()`, `getEntityName()`.

### Step 5: Controller
Extend `AbstractGenericController` — add only `@RequestMapping` and `@RestController`. Full API inherited.

## Frontend Steps (2 files)

### Step 1: Config
Define `CrudConfig` with columns for the table and fields for the form.

### Step 2: Page
Pass the config to `<CrudPage>`. Complete UI generated automatically.

## What You Get Automatically

| Feature | Backend | Frontend |
|---|---|---|
| List with pagination | ✅ | ✅ |
| Sort by any column | ✅ | ✅ |
| Filter/Search | ✅ | ✅ |
| Create record | ✅ | ✅ Modal |
| Edit record | ✅ | ✅ Modal |
| Soft Delete | ✅ | ✅ Confirm dialog |
| Audit trail | ✅ | ✅ Display |
| CSV Export | — | ✅ |
| Empty state | — | ✅ |
| Loading skeleton | — | ✅ |
| Toast notifications | — | ✅ |
