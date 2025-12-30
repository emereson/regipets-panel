import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import config from "../../../utils/auth/getToken";
import { Divider } from "@heroui/react";
import { FaUser } from "react-icons/fa";
import TableReferidos from "./components/TableReferidos";
import type { Referido } from "../../../type/referidos.type";
import FiltroReferidos from "./components/FitroReferidos";
import SkeletonTable from "../../../hooks/SkeletonTable";

interface Props {
  rol: string;
  idUser: string;
}

const Referidos = ({ rol, idUser }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [referidos, setReferidos] = useState<Referido[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [selectUsuario, setSelectUsuario] = useState<string | null>(null);

  const findReferidos = useCallback(async () => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams();
      if (rol === "Admin" && selectUsuario) {
        params.append("user_id", selectUsuario);
      }

      const url = `${
        import.meta.env.VITE_URL_API
      }/referido?${params.toString()}`;

      const { data } = await axios.get(url, config);

      setReferidos(data.referidos || []);
      setPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error al obtener referidos:", error);
      setReferidos([]);
    } finally {
      setIsLoading(false);
    }
  }, [rol, selectUsuario]);

  useEffect(() => {
    if (rol === "Admin" && !selectUsuario) return;
    findReferidos();
  }, [findReferidos]);

  const renderTable = () => {
    if (isLoading) {
      return (
        <SkeletonTable
          columns={
            rol === "Admin"
              ? [
                  "CLIENTE",
                  "UBICACIÓN",
                  "PRODUCTOS",
                  "SUB TOTAL",
                  "COSTO DE ENVIO",
                  "TOTAL",
                  "N° OPERACIÓN",
                ]
              : ["CLIENTE", "UBICACIÓN", "TOTAL", "PRODUCTOS"]
          }
          rows={rol === "Admin" ? 5 : 10}
        />
      );
    }

    return (
      <TableReferidos
        referidos={referidos}
        setPage={setPage}
        page={page}
        pages={pages}
        findReferidos={findReferidos}
        rol={rol}
        selectUsuario={selectUsuario}
        idUser={idUser}
      />
    );
  };

  return (
    <main className="w-full h-screen p-3 overflow-hidden">
      <section className="w-full h-full p-4 pb-0 bg-white flex flex-col gap-4 rounded-xl shadow-[0px_0_10px_rgba(255,255,255)]">
        <header className="flex items-end gap-2 font-semibold text-lg text-neutral-700">
          <FaUser className="text-xl text-orange-500" />
          <h1 className="leading-4">Referidos</h1>
        </header>

        <Divider className="bg-orange-100 h-0.5" />

        {rol === "Admin" && (
          <FiltroReferidos
            selectUsuario={selectUsuario}
            setSelectUsuario={setSelectUsuario}
          />
        )}

        {rol === "Admin" && !selectUsuario ? (
          <p className="text-sm text-neutral-500">
            Selecciona un usuario para ver sus referidos
          </p>
        ) : (
          renderTable()
        )}
      </section>
    </main>
  );
};

export default Referidos;
