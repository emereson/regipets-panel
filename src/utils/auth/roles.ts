// src/utils/auth/roles.ts

export const ROLES = {
  ADMIN: "Admin",
  CLIENTE_RUMP: "Cliente RUMP",
  CLIENTE_PREMIUM: "Cliente Premium",
  EMBAJADOR: "Embajador",
  ALIADO: "Aliado",
  GOBIERNO: "Gobierno",
} as const;

/**
 * Tipo Role inferido automáticamente
 * "Admin" | "Cliente RUMP" | ...
 */
export type Role = (typeof ROLES)[keyof typeof ROLES];
