import axios from "axios";
import config from "../../../utils/auth/getToken";
import { useEffect, useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import { Divider } from "@heroui/react";
import type { Mascota } from "../../../type/mascotas.type";
import TablaMacotas from "./components/TablaMacotas";
import FiltroBusqueda from "./components/FiltroBusqueda";
import { getTodayDate } from "../../../utils/getTodayDate";

interface DataFilters {
  dniNombre: string | null;
  nombreDueno: string | null;
  departamento: string | null;
  provincia: string | null;
  distrito: string | null;
  especie: string | null;
  raza: string | null;
  fechaDesde?: string;
  fechaHasta?: string;
}

const Busqueda = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFilters, setDataFilters] = useState<DataFilters>({
    departamento: null,
    provincia: null,
    distrito: null,
    dniNombre: null,
    nombreDueno: null,
    especie: null,
    raza: null,
    fechaDesde: getTodayDate(),
    fechaHasta: getTodayDate(),
  });
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);

  const findMascotas = async () => {
    setIsLoading(true);
    const url = `${import.meta.env.VITE_URL_API}/mascota/admin`;

    try {
      // Construir query params solo con filtros activos
      const params = new URLSearchParams();

      if (dataFilters.departamento)
        params.append("departamento", dataFilters.departamento);
      if (dataFilters.provincia)
        params.append("provincia", dataFilters.provincia);
      if (dataFilters.distrito) params.append("distrito", dataFilters.distrito);
      if (dataFilters.dniNombre)
        params.append("dniNombre", dataFilters.dniNombre);
      if (dataFilters.especie) params.append("especie", dataFilters.especie);
      if (dataFilters.raza) params.append("raza", dataFilters.raza);
      if (dataFilters.fechaDesde)
        params.append("fechaDesde", dataFilters.fechaDesde);
      if (dataFilters.fechaHasta)
        params.append("fechaHasta", dataFilters.fechaHasta);
      if (page) params.append("page", page.toString());

      const urlWithParams = params.toString()
        ? `${url}?${params.toString()}`
        : url;

      const res = await axios.get(urlWithParams, config);
      setMascotas(res.data.mascotas || []);
      setPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error al obtener mascotas:", err);
      setMascotas([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar filtros de forma inmutable
  const updateFilters = (updates: Partial<DataFilters>) => {
    setDataFilters((prev) => ({ ...prev, ...updates }));
  };

  // Cargar mascotas al montar
  useEffect(() => {
    findMascotas();
  }, [page]);

  // Opcional: buscar automáticamente cuando cambian los filtros
  // useEffect(() => {
  //   findMascotas();
  // }, [dataFilters]);

  return (
    <main className="w-full h-screen p-3 overflow-hidden">
      <section className="w-full h-full p-4 bg-white flex flex-col gap-4 rounded-xl shadow-[0px_0_10px_rgba(255,255,255)]">
        <div className="flex items-end gap-2 font-semibold text-lg text-neutral-700">
          <MdOutlinePets className="text-2xl text-orange-500" />
          <h1 className="leading-4">Búsqueda de Mascotas</h1>
        </div>

        <Divider className="bg-orange-100 h-0.5" />

        <FiltroBusqueda
          findMascotas={findMascotas}
          setDataFilters={updateFilters}
          dataFilters={dataFilters}
          isLoading={isLoading}
        />

        <TablaMacotas
          mascotas={mascotas}
          setPage={setPage}
          page={page}
          pages={pages}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
};

export default Busqueda;
