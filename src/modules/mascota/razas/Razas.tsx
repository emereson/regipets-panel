import { useEffect, useState } from "react";
import type { Especie, Raza } from "../../../type/mascotas.type";
import axios from "axios";
import config from "../../../utils/auth/getToken";
import { GiSniffingDog } from "react-icons/gi";
import { Divider } from "@heroui/react";
import TablaEspecies from "./components/TablaEspecies";
import TablaRazas from "./components/TablaRazas";

const Razas = () => {
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [razas, setRazas] = useState<Raza[]>([]);
  const [selectEspecie, setSelectEspecie] = useState<string | null>(null);
  const [loadingRaza, setLoadingRaza] = useState<boolean>(true);

  const findMascotas = async () => {
    const url = `${import.meta.env.VITE_URL_API}/especie`;

    axios.get(url, config).then((res) => {
      setEspecies(res.data.especies);
      setSelectEspecie(res.data.especies[0].id.toString());
    });
  };

  const findRazas = async () => {
    if (!selectEspecie) return;
    setLoadingRaza(true);
    try {
      const url = `${
        import.meta.env.VITE_URL_API
      }/raza/especie/${selectEspecie}`;
      const res = await axios.get(url, config);

      setRazas(res.data.razas || []);
    } catch (err) {
      console.error("Error al obtener razas:", err);
    } finally {
      setLoadingRaza(false);
    }
  };

  useEffect(() => {
    findMascotas();
    findRazas();
  }, []);

  useEffect(() => {
    findRazas();
  }, [selectEspecie]);

  return (
    <main className="w-full h-screen p-4  overflow-hidden ">
      <section className="w-full h-full p-4 bg-white flex flex-col gap-4 rounded-xl    shadow-[0px_0_10px_rgba(255,255,255)] overflow-x-hidden overflow-y-auto">
        <div className="flex items-end gap-2  font-semibold text-lg  text-neutral-700">
          <GiSniffingDog className="text-2xl text-orange-500" />
          <h1 className="leading-4">Especies y Razas</h1>
        </div>
        <Divider className="bg-orange-100 h-0.5" />
        <div className="w-full  flex gap-10 ">
          <TablaEspecies especies={especies} findMascotas={findMascotas} />

          <TablaRazas
            especies={especies}
            findRazas={findRazas}
            razas={razas}
            selectEspecie={selectEspecie}
            setSelectEspecie={setSelectEspecie}
            loadingRaza={loadingRaza}
          />
        </div>
      </section>
    </main>
  );
};

export default Razas;
