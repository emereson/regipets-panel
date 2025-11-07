import axios from "axios";
import config from "../../../utils/auth/getToken";
import { useEffect, useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import FiltroMacotas from "./components/FiltroMacotas";
import { Divider } from "@heroui/react";
import TablaMacotas from "./components/TablaPedidos";
import type { Pedido } from "../../../type/pedido.type";

const Ordenes = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const findMascotas = async () => {
    const url = `${import.meta.env.VITE_URL_API}/pedido`;

    axios
      .get(url, config)
      .then((res) => setPedidos(res.data.pedidos))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    findMascotas();
  }, []);

  console.log(pedidos);

  return (
    <main className="w-full h-screen p-4  overflow-hidden">
      <section className="w-full h-full p-4 bg-white flex flex-col gap-4 rounded-xl    shadow-[0px_0_10px_rgba(255,255,255)]">
        <div className="flex items-end gap-2  font-semibold text-lg  text-neutral-700">
          <MdOutlinePets className="text-2xl text-orange-500" />
          <h1 className="leading-4">Ordenes</h1>
        </div>
        <Divider className="bg-orange-100 h-0.5" />

        <TablaMacotas pedidos={pedidos} />
      </section>
    </main>
  );
};

export default Ordenes;
