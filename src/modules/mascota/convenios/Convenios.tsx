import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../utils/auth/getToken";
import { BiSolidStore } from "react-icons/bi";
import { Divider } from "@heroui/react";
import type { Convenio } from "../../../type/convenios.type";
import ModalAddConvenio from "./components/crudRazas/ModalAddConvenio";
import TablaConvenios from "./components/TablaConvenios";
import SkeletonTable from "../../../hooks/SkeletonTable";
import FiltroConvenio from "./components/FiltroMacotas";

const Convenios = () => {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectCategoria, setSelectCategoria] = useState("Todos");

  const findConvenios = async () => {
    setLoading(true);
    const url = `${
      import.meta.env.VITE_URL_API
    }/convenios?categoria=${selectCategoria}`;

    axios
      .get(url, config)
      .then((res) => {
        setConvenios(res.data.convenios);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    findConvenios();
  }, []);

  return (
    <main className="w-full h-screen p-4  overflow-hidden ">
      <section className="w-full h-full p-4 bg-white flex flex-col gap-4">
        <article className="w-full  flex items-start justify-between ">
          <div className="flex items-end gap-2  font-semibold text-lg  text-neutral-700">
            <BiSolidStore className="text-2xl text-orange-500" />
            <h1 className="leading-4">Covenios</h1>
          </div>
          <ModalAddConvenio findConvenios={findConvenios} />
        </article>
        <FiltroConvenio
          selectCategoria={selectCategoria}
          setSelectCategoria={setSelectCategoria}
          findConvenios={findConvenios}
        />
        <Divider className="bg-orange-100 h-0.5" />
        {loading ? (
          <SkeletonTable
            columns={["Nro", "Especie", "Título", "Descripción", "Acciones"]}
            rows={5}
          />
        ) : (
          <TablaConvenios convenios={convenios} findConvenios={findConvenios} />
        )}
      </section>
    </main>
  );
};

export default Convenios;
