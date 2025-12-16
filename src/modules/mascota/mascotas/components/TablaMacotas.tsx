import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import type { Mascota } from "../../../../type/mascotas.type";
import { tableCellStyle, tableColumnStyle } from "../../../../utils/classNames";
import ModalEditMascota from "./CrudMacotas/ModalEditMascota";
import { useState } from "react";
import type { User } from "../../../../type/user";
import ModalEliminarMascota from "./CrudMacotas/ModalEliminarMascota";
import { FaAddressCard, FaEdit, FaTrash } from "react-icons/fa";
import ModalDniMascota from "./CrudMacotas/ModalDniMascota";
import { BsCardList } from "react-icons/bs";
import CertificadoRegistro from "./CrudMacotas/CertificadoRegistro";
import { PiCertificateFill } from "react-icons/pi";
import CertificadoResponsable from "./CrudMacotas/CertificadoResponsable";

interface DataFiltersUser {
  search: string | null;
}
interface Props {
  mascotas: Mascota[];
  findMascotas: () => void;
  usuarios: User[];
  dataFilters: DataFiltersUser;
  setDataFilters: (e: DataFiltersUser) => void;
  findUsuarios: () => void;
}

const TablaMacotas = ({
  mascotas,
  findMascotas,
  usuarios,
  dataFilters,
  setDataFilters,
  findUsuarios,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectMascota, setselectMascota] = useState<Mascota | null>(null);
  const [selectModal, setSelectModal] = useState("");

  const handleEditarMascota = (mascota: Mascota) => {
    setselectMascota(mascota);
    setSelectModal("editar_mascota");
    onOpen();
  };

  const handleEliminarMascota = (mascota: Mascota) => {
    setselectMascota(mascota);
    setSelectModal("eliminar_macota");
    onOpen();
  };

  const handleDniMascota = (mascota: Mascota) => {
    setselectMascota(mascota);
    setSelectModal("dni_macota");
    onOpen();
  };
  const handleCertificadoRegistro = (mascota: Mascota) => {
    setselectMascota(mascota);
    setSelectModal("certificado_registo");
    onOpen();
  };

  const handleCertificadoResponsable = (mascota: Mascota) => {
    setselectMascota(mascota);
    setSelectModal("certificado_responsable");
    onOpen();
  };
  return (
    <section className="w-full relative flex flex-col gap-4 overflow-hidden">
      <Table
        aria-label="Example table with client side pagination"
        classNames={{
          base: " h-full overflow-auto  rounded-xl",
          table: "min-h-[50px]",
          wrapper: "p-0",
        }}
      >
        <TableHeader>
          <TableColumn className={tableColumnStyle}>DNI</TableColumn>
          <TableColumn className={tableColumnStyle}>IMAGEN</TableColumn>
          <TableColumn className={tableColumnStyle}>
            NOMBRE DE <br /> MASCOTA
          </TableColumn>
          <TableColumn className={tableColumnStyle}>CORREO</TableColumn>
          <TableColumn className={tableColumnStyle}>SEXO</TableColumn>
          <TableColumn className={tableColumnStyle}>MICROCHIP</TableColumn>
          <TableColumn className={tableColumnStyle}>
            FECHA <br /> NACIMIENTO
          </TableColumn>

          <TableColumn className={tableColumnStyle}>TAMAÑO</TableColumn>
          <TableColumn className={tableColumnStyle}>COLOR</TableColumn>
          <TableColumn className={tableColumnStyle}>CALIFICACIÓN</TableColumn>
          <TableColumn className={tableColumnStyle}>RAZA</TableColumn>
          <TableColumn className={`${tableColumnStyle} min-w-[180px]`}>
            BIOGRAFIA
          </TableColumn>
          <TableColumn className={tableColumnStyle}>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody items={mascotas}>
          {(mascota) => (
            <TableRow key={mascota.id}>
              <TableCell className={tableCellStyle}>{mascota.dni}</TableCell>
              <TableCell className={`${tableCellStyle}  max-w-14`}>
                <img
                  className="w-12 h-12  "
                  src={
                    `${import.meta.env.VITE_URL_IMAGE}/${mascota.imagen}` ||
                    "/logo.webp"
                  }
                  alt="foto del usuario"
                />
              </TableCell>
              <TableCell className={tableCellStyle}>{mascota.nombre}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.usuario.email}
              </TableCell>
              <TableCell className={tableCellStyle}>{mascota.sexo}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.cod_microchip}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.fecha_nacimiento}
              </TableCell>

              <TableCell className={tableCellStyle}>{mascota.tamano}</TableCell>
              <TableCell className={tableCellStyle}>{mascota.color}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.calificacion}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.mascota_raza_id}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.biografia}
              </TableCell>
              <TableCell className={tableCellStyle}>
                <div className="flex items-center gap-2">
                  <Tooltip
                    content="Editar"
                    showArrow={true}
                    size="sm"
                    color="primary"
                  >
                    <FaEdit
                      className="text-xl text-blue-600 cursor-pointer"
                      onClick={() => handleEditarMascota(mascota)}
                    />
                  </Tooltip>
                  <Tooltip
                    content="Eliminar"
                    showArrow={true}
                    size="sm"
                    color="danger"
                  >
                    <FaTrash
                      className="text-lg text-red-600 cursor-pointer"
                      onClick={() => handleEliminarMascota(mascota)}
                    />
                  </Tooltip>
                  <Tooltip
                    content="Ver Dni"
                    showArrow={true}
                    size="sm"
                    color="danger"
                  >
                    <FaAddressCard
                      className="text-xl text-orange-600 cursor-pointer"
                      onClick={() => handleDniMascota(mascota)}
                    />
                  </Tooltip>
                  <Tooltip
                    content="Certificado de Registro"
                    showArrow={true}
                    size="sm"
                    color="danger"
                  >
                    <BsCardList
                      className="text-xl text-red-600 cursor-pointer"
                      onClick={() => handleCertificadoRegistro(mascota)}
                    />
                  </Tooltip>
                  <Tooltip
                    content="Certificado Responsable"
                    showArrow={true}
                    size="sm"
                    color="danger"
                  >
                    <PiCertificateFill
                      className="text-xl text-red-600 cursor-pointer"
                      onClick={() => handleCertificadoResponsable(mascota)}
                    />
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectMascota && selectModal === "editar_mascota" && (
        <ModalEditMascota
          mascota={selectMascota}
          findMascotas={findMascotas}
          usuarios={usuarios}
          dataFilters={dataFilters}
          setDataFilters={setDataFilters}
          findUsuarios={findUsuarios}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
      {selectMascota && selectModal === "eliminar_macota" && (
        <ModalEliminarMascota
          mascota={selectMascota}
          findMascotas={findMascotas}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
      {selectMascota && selectModal === "dni_macota" && (
        <ModalDniMascota
          key={selectMascota.id}
          mascota={selectMascota}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
      {selectMascota && selectModal === "certificado_registo" && (
        <CertificadoRegistro
          key={selectMascota.id}
          mascota={selectMascota}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
      {selectMascota && selectModal === "certificado_responsable" && (
        <CertificadoResponsable
          key={selectMascota.id}
          mascota={selectMascota}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </section>
  );
};

export default TablaMacotas;
