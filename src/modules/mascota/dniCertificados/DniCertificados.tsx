import axios from "axios";
import config from "../../../utils/auth/getToken";
import { useEffect, useState } from "react";
import { Button, Divider, useDisclosure } from "@heroui/react";
import type { Mascota } from "../../../type/mascotas.type";
import Loading from "../../../hooks/Loading";
import { FaUsers } from "react-icons/fa";
import FiltroAprobacion from "../aprobacion/components/FiltroAprobacion";
import TablaDniCertificado from "./components/TablaDniCertificado";
import ModalDniMascotas from "./components/ModalDniMascotas";
import { IoIosPrint } from "react-icons/io";
import CertificadosRegistros from "./components/CertificadosRegistros";
import CertificadosResponsaable from "./components/CertificadosResponsaable";

interface DataFilters {
  dniNombre: string | null;
  correo: string | null;
  rol: string | null;
  estado: string | null;
}

const DniCertificados = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectModal, setSelectModal] = useState("");
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFiltersMascotas, setDataFiltersMascotas] = useState<DataFilters>({
    dniNombre: null,
    correo: null,
    rol: "Cliente RUMP",
    estado: "APROBADO",
  });
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [selectedMascotas, setSelectedMascotas] = useState<Mascota[]>([]);

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
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    findMascotas();
  }, [page]);

  const handleEditarMascota = () => {
    setSelectModal("dni");
    onOpen();
  };

  const handleCertificadoRegistro = () => {
    setSelectModal("certificado_registro");
    onOpen();
  };

  const handleCertificadoRespoonsable = () => {
    setSelectModal("certificado_responsable");
    onOpen();
  };

  return (
    <main className="w-full h-screen p-4  overflow-hidden">
      {isLoading && <Loading />}
      <section className="w-full h-full p-4 bg-white flex flex-col gap-4 rounded-xl    shadow-[0px_0_10px_rgba(255,255,255)]">
        <div className="flex items-end gap-2  font-semibold text-lg  text-neutral-700">
          <FaUsers className="text-2xl text-orange-500" />
          <h1 className="leading-4">DNI Y CERTIFICADOS</h1>
        </div>
        <Divider className="bg-orange-100 h-0.5" />
        <FiltroAprobacion
          findMascotas={findMascotas}
          dataFiltersMascotas={dataFiltersMascotas}
          setDataFiltersMascotas={setDataFiltersMascotas}
          noEstado={true}
        />
        {selectedMascotas.length > 0 && (
          <section className="w-full flex justify-end gap-1 -mt-4 -mb-2">
            <Button
              onPress={handleEditarMascota}
              startContent={<IoIosPrint className="text-lg" />}
              size="sm"
              color="danger"
            >
              DNI
            </Button>
            <Button
              onPress={handleCertificadoRegistro}
              startContent={<IoIosPrint className="text-lg" />}
              size="sm"
              color="danger"
            >
              CERT. REGISTRO
            </Button>
            <Button
              onPress={handleCertificadoRespoonsable}
              startContent={<IoIosPrint className="text-lg" />}
              size="sm"
              color="danger"
            >
              CERT. RESPONSABLE
            </Button>
          </section>
        )}
        <TablaDniCertificado
          mascotas={mascotas}
          setPage={setPage}
          page={page}
          pages={pages}
          selectedMascotas={selectedMascotas}
          setSelectedMascotas={setSelectedMascotas}
        />
      </section>
      {selectModal === "dni" && (
        <ModalDniMascotas
          mascotas={selectedMascotas}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
      {selectModal === "certificado_registro" && (
        <CertificadosRegistros
          mascotas={selectedMascotas}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
      {selectModal === "certificado_responsable" && (
        <CertificadosResponsaable
          mascotas={selectedMascotas}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </main>
  );
};

export default DniCertificados;
