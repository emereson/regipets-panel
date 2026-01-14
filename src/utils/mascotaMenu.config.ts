// src/config/menu/mascotaMenu.config.ts

import { ROLES } from "./auth/roles";

export interface MascotaMenuItem {
  label: string;
  path: string;
  roles: string[];
}

export const MASCOTA_MENU: MascotaMenuItem[] = [
  {
    label: "Mascotas",
    path: "/mascotas",
    roles: [ROLES.ADMIN, ROLES.CLIENTE_RUMP],
  },
  {
    label: "Ordenes",
    path: "/mascotas/ordenes",
    roles: [ROLES.ADMIN],
  },
  {
    label: "Busqueda",
    path: "/mascotas/busqueda",
    roles: [ROLES.ADMIN],
  },
  {
    label: "Aprobacion de registros",
    path: "/mascotas/aprobacion-registros",
    roles: [ROLES.ADMIN],
  },
  {
    label: "Raza",
    path: "/mascotas/raza",
    roles: [ROLES.ADMIN],
  },
  {
    label: "Convenios",
    path: "/mascotas/convenios",
    roles: [ROLES.ADMIN],
  },
  {
    label: "Dni y Certificados",
    path: "/mascotas/certificados-dni",
    roles: [ROLES.ADMIN],
  },
];
