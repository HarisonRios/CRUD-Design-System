/**
 * backend-config.ts — Configuração central de backends.
 *
 * Este arquivo controla QUAL backend o frontend usa.
 * Basta mudar NEXT_PUBLIC_BACKEND_TYPE no .env.local:
 *
 *   NEXT_PUBLIC_BACKEND_TYPE=java      → Spring Boot
 *   NEXT_PUBLIC_BACKEND_TYPE=nestjs    → NestJS (futuro)
 *
 * O frontend não precisa saber qual backend está ativo —
 * ele sempre chama o mesmo contrato de API (mesmo endpoints,
 * mesma estrutura de response).
 */

export type BackendType = "java" | "nestjs";

interface BackendConfig {
  type: BackendType;
  baseUrl: string;
  /** Prefixo dos endpoints, ex: "/api/v1" */
  apiPrefix: string;
  /** Nome amigável para display */
  displayName: string;
  /** Porta padrão para referência */
  defaultPort: number;
}

/** Mapa de configurações por tipo de backend */
const BACKEND_CONFIGS: Record<BackendType, BackendConfig> = {
  java: {
    type: "java",
    baseUrl: process.env.NEXT_PUBLIC_JAVA_API_URL || "http://localhost:8080",
    apiPrefix: "/api/v1",
    displayName: "Spring Boot (Java)",
    defaultPort: 8080,
  },
  nestjs: {
    type: "nestjs",
    baseUrl: process.env.NEXT_PUBLIC_NESTJS_API_URL || "http://localhost:3001",
    apiPrefix: "/api/v1",
    displayName: "NestJS",
    defaultPort: 3001,
  },
};

/**
 * Retorna a configuração do backend ativo baseada na variável de ambiente.
 */
export function getActiveBackend(): BackendConfig {
  const type = (process.env.NEXT_PUBLIC_BACKEND_TYPE as BackendType) || "java";

  const config = BACKEND_CONFIGS[type];
  if (!config) {
    console.warn(
      `[backend-config] Unknown backend type: "${type}". Falling back to "java".`
    );
    return BACKEND_CONFIGS.java;
  }

  return config;
}

/**
 * URL base completa da API ativa (baseUrl + apiPrefix).
 * Exemplo: "http://localhost:8080/api/v1"
 */
export const ACTIVE_API_BASE_URL = (() => {
  const backend = getActiveBackend();
  return `${backend.baseUrl}${backend.apiPrefix}`;
})();

export const ACTIVE_BACKEND = getActiveBackend();
