import axios from "axios";
import { ACTIVE_API_BASE_URL, ACTIVE_BACKEND } from "@/lib/backend-config";

/**
 * api.ts — Axios instance configurada com interceptors.
 *
 * O backend ativo é resolvido automaticamente via backend-config.ts.
 * Para trocar de backend, altere apenas NEXT_PUBLIC_BACKEND_TYPE no .env.local:
 *
 *   NEXT_PUBLIC_BACKEND_TYPE=java    → http://localhost:8080/api/v1
 *   NEXT_PUBLIC_BACKEND_TYPE=nestjs  → http://localhost:3001/api/v1
 */

// Log de qual backend está ativo (apenas em desenvolvimento)
if (process.env.NODE_ENV === "development") {
  console.info(`[API] Active backend: ${ACTIVE_BACKEND.displayName} → ${ACTIVE_API_BASE_URL}`);
}

export const api = axios.create({
  baseURL: ACTIVE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// ── Request Interceptor: Inject JWT Token ─────────────────────────────────
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("@crud:token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: Handle 401 → Refresh Token ─────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== "undefined") {
        const refreshToken = localStorage.getItem("@crud:refresh");

        if (refreshToken) {
          try {
            const { data } = await axios.post(`${ACTIVE_API_BASE_URL}/auth/refresh`, {
              refreshToken,
            });
            const newToken = data.data.accessToken;
            localStorage.setItem("@crud:token", newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch {
            localStorage.removeItem("@crud:token");
            localStorage.removeItem("@crud:refresh");
            window.location.href = "/login";
          }
        }
      }
    }

    return Promise.reject(error);
  }
);
