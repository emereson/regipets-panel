import axios from "axios";
import config from "../../../utils/auth/getToken";
import { useEffect, useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import FiltroMacotas from "./components/FiltroMacotas";
import { Divider } from "@heroui/react";
import type { Mascota } from "../../../type/mascotas.type";
import TablaMacotas from "./components/TablaMacotas";
import type { User } from "../../../type/user";
import Loading from "../../../hooks/Loading";

interface DataFilters {
  dniNombre: string | null;
  correo: string | null;
}

interface DataFiltersUser {
  search: string | null;
}
const Mascotas = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFiltersMascotas, setDataFiltersMascotas] = useState<DataFilters>({
    dniNombre: null,
    correo: null,
  });
  const [dataFilters, setDataFilters] = useState<DataFiltersUser>({
    search: null,
  });

  const findMascotas = async () => {
    const params = new URLSearchParams();
    if (dataFiltersMascotas.dniNombre)
      params.append("dniNombre", dataFiltersMascotas.dniNombre);
    if (dataFiltersMascotas.correo)
      params.append("correo", dataFiltersMascotas.correo);

    const url = `${import.meta.env.VITE_URL_API}/mascota`;

    const urlWithParams = params.toString()
      ? `${url}?${params.toString()}`
      : url;

    await axios
      .get(urlWithParams, config)
      .then((res) => setMascotas(res.data.mascotas));
  };

  const findUsuarios = async () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (dataFilters.search) params.append("search", dataFilters.search);

    const url = `${import.meta.env.VITE_URL_API}/user`;

    const urlWithParams = params.toString()
      ? `${url}?${params.toString()}`
      : url;
    await axios
      .get(urlWithParams, config)
      .then((res) => {
        setUsuarios(res.data.users);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    findMascotas();
    findUsuarios();
  }, []);

  return (
    <main className="w-full h-screen p-4  overflow-hidden">
      {isLoading && <Loading />}
      <section className="w-full h-full p-4 bg-white flex flex-col gap-4 rounded-xl    shadow-[0px_0_10px_rgba(255,255,255)]">
        <div className="flex items-end gap-2  font-semibold text-lg  text-neutral-700">
          <MdOutlinePets className="text-2xl text-orange-500" />
          <h1 className="leading-4">Mascotas</h1>
        </div>
        <Divider className="bg-orange-100 h-0.5" />
        <FiltroMacotas
          findMascotas={findMascotas}
          usuarios={usuarios}
          dataFilters={dataFilters}
          setDataFilters={setDataFilters}
          dataFiltersMascotas={dataFiltersMascotas}
          setDataFiltersMascotas={setDataFiltersMascotas}
          findUsuarios={findUsuarios}
        />
        <TablaMacotas
          mascotas={mascotas}
          findMascotas={findMascotas}
          usuarios={usuarios}
          dataFilters={dataFilters}
          setDataFilters={setDataFilters}
          findUsuarios={findUsuarios}
        />
      </section>
    </main>
  );
};

export default Mascotas;
