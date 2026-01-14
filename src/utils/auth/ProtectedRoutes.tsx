// src/utils/auth/ProtectedRoutes.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { hasPermissionForRoute } from "../permissions";
import type { Role } from "./roles";

interface UserData {
  id: number;
  rol: Role;
}

const ProtectedRoutes = () => {
  const location = useLocation();
  const userData: UserData | null = JSON.parse(
    localStorage.getItem("userData") || "null"
  );

  if (!userData) {
    return <Navigate to="/log-in" replace />;
  }

  const allowed = hasPermissionForRoute(userData.rol, location.pathname);

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
