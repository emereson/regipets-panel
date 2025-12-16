import axios from "axios";
import config from "../../../utils/auth/getToken";
import { useEffect, useState } from "react";
import { Divider } from "@heroui/react";
import type { Mascota } from "../../../type/mascotas.type";
import Loading from "../../../hooks/Loading";
import TablaAprobacion from "./components/TablaAprobacion";
import FiltroAprobacion from "./components/FiltroAprobacion";
import { FaUsers } from "react-icons/fa";

interface DataFilters {
  dniNombre: string | null;
  correo: string | null;
  rol: string | null;
  estado: string | null;
}

const Aprobacion = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFiltersMascotas, setDataFiltersMascotas] = useState<DataFilters>({
    dniNombre: null,
    correo: null,
    rol: "Cliente RUMP",
    estado: "PENDIENTE",
  });
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [selectedMascotaIds, setSelectedMascotaIds] = useState<number[]>([]);

  const findMascotas = async () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (dataFiltersMascotas.dniNombre)
      params.append("dniNombre", dataFiltersMascotas.dniNombre);
    if (dataFiltersMascotas.correo)
      params.append("correo", dataFiltersMascotas.correo);
    if (dataFiltersMascotas.rol) params.append("rol", dataFiltersMascotas.rol);
    if (dataFiltersMascotas.estado)
      params.append("estado", dataFiltersMascotas.estado);
    if (page) params.append("page", page.toString());

    const url = `${import.meta.env.VITE_URL_API}/mascota/pendientes`;

    const urlWithParams = params.toString()
      ? `${url}?${params.toString()}`
      : url;

    await axios
      .get(urlWithParams, config)
      .then((res) => {
        setMascotas(res.data.mascotas);
        setPages(res.data.totalPages || 1);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    findMascotas();
  }, [page]);

  return (
    <main className="w-full h-screen p-4  overflow-hidden">
      {isLoading && <Loading />}
      <section className="w-full h-full p-4 bg-white flex flex-col gap-4 rounded-xl    shadow-[0px_0_10px_rgba(255,255,255)]">
        <div className="flex items-end gap-2  font-semibold text-lg  text-neutral-700">
          <FaUsers className="text-2xl text-orange-500" />
          <h1 className="leading-4">Apobración de Registros</h1>
        </div>
        <Divider className="bg-orange-100 h-0.5" />
        <FiltroAprobacion
          findMascotas={findMascotas}
          dataFiltersMascotas={dataFiltersMascotas}
          setDataFiltersMascotas={setDataFiltersMascotas}
          selectedMascotaIds={selectedMascotaIds}
          setSelectedMascotaIds={setSelectedMascotaIds}
        />
        <TablaAprobacion
          mascotas={mascotas}
          setPage={setPage}
          page={page}
          pages={pages}
          selectedIds={selectedMascotaIds}
          setSelectedIds={setSelectedMascotaIds}
        />
      </section>
    </main>
  );
};

export default Aprobacion;
