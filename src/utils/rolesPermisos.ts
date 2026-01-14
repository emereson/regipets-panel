// src/utils/auth/routePermissions.ts
import { ROLES, type Role } from "./auth/roles";

export const ROUTE_PERMISSIONS: Record<string, Role[]> = {
  "/": [ROLES.ADMIN],

  // Mascotas
  "/mascotas": [ROLES.ADMIN, ROLES.CLIENTE_RUMP],
  "/mascotas/busqueda": [
    ROLES.ADMIN,
    ROLES.CLIENTE_RUMP,
    ROLES.CLIENTE_PREMIUM,
    ROLES.EMBAJADOR,
    ROLES.ALIADO,
  ],
  "/mascotas/ordenes": [ROLES.ADMIN],
  "/mascotas/raza": [ROLES.ADMIN],
  "/mascotas/convenios": [ROLES.ADMIN, ROLES.EMBAJADOR, ROLES.ALIADO],
  "/mascotas/aprobacion-registros": [ROLES.ADMIN, ROLES.GOBIERNO],
  "/mascotas/certificados-dni": [ROLES.ADMIN, ROLES.GOBIERNO],

  // Usuarios
  "/usuarios": [ROLES.ADMIN],
  "/usuarios/referidos": [ROLES.ADMIN, ROLES.EMBAJADOR, ROLES.ALIADO],
};
