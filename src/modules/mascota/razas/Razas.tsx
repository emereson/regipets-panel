import { useEffect, useState } from "react";
import type { Especie } from "../../../type/mascotas.type";
import axios from "axios";
import config from "../../../utils/auth/getToken";
import { GiSniffingDog } from "react-icons/gi";
import { Divider } from "@heroui/react";
import TablaEspecies from "./components/TablaEspecies";

const Razas = () => {
  const [especies, setEspecies] = useState<Especie[]>([]);

  const findMascotas = async () => {
    const url = `${import.meta.env.VITE_URL_API}/especie`;

    axios
      .get(url, config)
      .then((res) => setEspecies(res.data.especies))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    findMascotas();
  }, []);
  return (
    <main className="w-full h-screen p-4  overflow-hidden">
      <section className="w-full h-full p-4 bg-white flex flex-col gap-4 rounded-xl    shadow-[0px_0_10px_rgba(255,255,255)]">
        <div className="flex items-end gap-2  font-semibold text-lg  text-neutral-700">
          <GiSniffingDog className="text-2xl text-orange-500" />
          <h1 className="leading-4">Especies y Razas</h1>
        </div>
        <Divider className="bg-orange-100 h-0.5" />

        <TablaEspecies especies={especies} findMascotas={findMascotas} />
      </section>
    </main>
  );
};

export default Razas;
