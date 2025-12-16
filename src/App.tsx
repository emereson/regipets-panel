// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./modules/login/Login";
import ProtectedRoutes from "./utils/auth/ProtectedRoutes";
import Header from "./header/Header";
import { Toaster } from "sonner";
import Mascotas from "./modules/mascota/mascotas/Mascotas";
import Busqueda from "./modules/mascota/busqueda/Busqueda";
import Razas from "./modules/mascota/razas/Razas";
import Ordenes from "./modules/mascota/ordenes/Ordenes";
import Usuarios from "./modules/usuarios/usuarios/Usuarios";
import Aprobacion from "./modules/mascota/aprobacion/Aprobacion";
import Convenios from "./modules/mascota/convenios/Convenios";

const useUserData = () => {
  const userDataJSON = localStorage.getItem("userData");
  const userData = userDataJSON ? JSON.parse(userDataJSON) : null;
  return userData;
};

function App() {
  const userData = useUserData();

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors />
      <div className=" w-screen flex bg-neutral-100">
        {userData && <Header />}
        <Routes>
          <Route path="/log-in" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            {/* mascotas */}
            <Route path="/" element={<Mascotas />} />
            <Route path="/mascotas" element={<Mascotas />} />
            <Route path="/mascotas/ordenes" element={<Ordenes />} />
            <Route path="/mascotas/busqueda" element={<Busqueda />} />
            <Route path="/mascotas/raza" element={<Razas />} />
            <Route path="/mascotas/convenios" element={<Convenios />} />

            <Route
              path="/mascotas/aprobacion-registros"
              element={<Aprobacion />}
            />

            {/* usuarios */}
            <Route path="/usuarios" element={<Usuarios />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
