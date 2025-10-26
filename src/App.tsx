// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./modules/login/Login";
import ProtectedRoutes from "./utils/auth/ProtectedRoutes";
import Header from "./header/Header";
import { Toaster } from "sonner";
import Mascotas from "./modules/mascota/mascotas/Mascotas";
import Busqueda from "./modules/mascota/busqueda/Busqueda";

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
            <Route path="/mascotas" element={<Mascotas />} />
            <Route path="/mascotas/busqueda" element={<Busqueda />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
