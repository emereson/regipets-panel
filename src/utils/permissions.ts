// src/utils/auth/permissions.ts
import type { Role } from "./auth/roles";
import { ROUTE_PERMISSIONS } from "./rolesPermisos";

export const hasPermissionForRoute = (
  userRole: Role,
  routePath: string
): boolean => {
  const publicRoutes = ["/log-in"];
  if (publicRoutes.includes(routePath)) return true;

  const routeKey = Object.keys(ROUTE_PERMISSIONS).find((route) => {
    const regex = new RegExp("^" + route.replace(/:[^/]+/g, "[^/]+") + "$");
    return regex.test(routePath);
  });

  if (!routeKey) return false;

  return ROUTE_PERMISSIONS[routeKey].includes(userRole);
};
