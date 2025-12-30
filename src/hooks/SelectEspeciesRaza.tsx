import { useEffect, useState } from "react";
import type { Especie, Raza } from "../type/mascotas.type";
import axios from "axios";
import config from "../utils/auth/getToken";

const useSelectEspeciesRaza = () => {
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [selectEspecie, setSelectEspecie] = useState<string | null>();
  const [razas, setRazas] = useState<Raza[]>([]);
  const [selectRaza, setSelectRaza] = useState<React.Key | null>();
  const [loadingRaza, setLoadingRaza] = useState<boolean>(false);

  const findEspecies = async () => {
    try {
      const url = `${import.meta.env.VITE_URL_API}/especie`;
      const res = await axios.get(url, config);

      setEspecies(res.data.especies || []);
    } catch (err) {
      console.error("Error al obtener especies:", err);
    }
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
    findEspecies();
  }, []);

  useEffect(() => {
    findRazas();
  }, [selectEspecie]);

  return {
    especies,
    selectEspecie,
    setSelectEspecie,
    razas,
    setSelectRaza,
    selectRaza,
    loadingRaza,
  };
};

export default useSelectEspeciesRaza;
