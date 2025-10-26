import axios from "axios";
import config from "../../../utils/auth/getToken";
import { useEffect, useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import FiltroMacotas from "./components/FiltroMacotas";
import { Divider } from "@heroui/react";
import type { Mascota } from "../../../type/mascotas.type";
import TablaMacotas from "./components/TablaMacotas";

const Mascotas = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [dniNombre, setDniNombre] = useState("");

  const findMascotas = async () => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/mascota?dniNombre=${dniNombre}`;

    axios
      .get(url, config)
      .then((res) => setMascotas(res.data.mascotas))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    findMascotas();
  }, []);

  return (
    <main className="w-full h-screen p-4  overflow-hidden">
      <section className="w-full h-full p-4 bg-white flex flex-col gap-4 rounded-xl    shadow-[0px_0_10px_rgba(255,255,255)]">
        <div className="flex items-end gap-2  font-semibold text-lg  text-neutral-700">
          <MdOutlinePets className="text-2xl text-orange-500" />
          <h1 className="leading-4">Busqueda de Mascotas</h1>
        </div>
        <Divider className="bg-orange-100 h-0.5" />
        <FiltroMacotas
          setDniNombre={setDniNombre}
          dniNombre={dniNombre}
          findMascotas={findMascotas}
        />
        <TablaMacotas mascotas={mascotas} />
      </section>
    </main>
  );
};

export default Mascotas;
