// src/hooks/useUserRole.ts

import type { Role } from "./auth/roles";

export const useUserRole = (): Role | null => {
  const data = localStorage.getItem("userData");
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    return parsed.rol as Role;
  } catch {
    return null;
  }
};
