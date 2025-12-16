import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { tableCellStyle, tableColumnStyle } from "../../../../utils/classNames";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";

import type { Convenio } from "../../../../type/convenios.type";
import ModalUpdateConvenio from "./crudRazas/ModalUpdateConvenio";
import ModalDeleteConvenio from "./crudRazas/ModalDeleteConvenio";

interface Props {
  convenios: Convenio[];
  findConvenios: () => void;
}

const TablaConvenios = ({ convenios, findConvenios }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectConvenio, setSelectConvenio] = useState<Convenio | null>(null);
  const [modal, setModal] = useState<"update" | "delete" | "">("");

  const handleEdit = (convenio: Convenio) => {
    setModal("update");
    setSelectConvenio(convenio);
    onOpen();
  };

  const handleDelete = (convenio: Convenio) => {
    setModal("delete");
    setSelectConvenio(convenio);
    onOpen();
  };

  return (
    <section className="w-full relative flex flex-col gap-2 overflow-hidden">
      <Table
        aria-label="Tabla de convenios"
        classNames={{
          base: "max-h-[600px] overflow-auto rounded-xl",
          table: "min-h-[50px]",
          wrapper: "p-0",
        }}
        isHeaderSticky
        isStriped
        radius="sm"
      >
        <TableHeader>
          <TableColumn className={tableColumnStyle}>Nro</TableColumn>
          <TableColumn className={tableColumnStyle}>NOMBRE</TableColumn>
          <TableColumn className={tableColumnStyle}>TELÉFONO</TableColumn>
          <TableColumn className={tableColumnStyle}>DIRECCIÓN</TableColumn>
          <TableColumn className={tableColumnStyle}>
            PUNTO AUTORIZADO
          </TableColumn>
          <TableColumn className={tableColumnStyle}>UBICACIÓN</TableColumn>
          <TableColumn className={tableColumnStyle}>ACCIONES</TableColumn>
        </TableHeader>

        <TableBody
          emptyContent="No hay convenios registrados"
          loadingContent={<Spinner label="Cargando convenios..." />}
        >
          {convenios.map((convenio, index) => (
            <TableRow key={convenio.id}>
              <TableCell className={tableCellStyle}>{index + 1}</TableCell>

              <TableCell className={tableCellStyle}>
                {convenio.nombre_convenio}
              </TableCell>

              <TableCell className={tableCellStyle}>
                {convenio.telefono}
              </TableCell>

              <TableCell className={tableCellStyle}>
                {convenio.direccion}
              </TableCell>

              <TableCell className={tableCellStyle}>
                {convenio.punto_autorizado ? "Sí" : "No"}
              </TableCell>

              <TableCell className={tableCellStyle}>
                {convenio.departamento.departamento ?? "-"} -{" "}
                {convenio.provincia.provincia ?? "-"} -{" "}
                {convenio.distrito.distrito ?? "-"}
              </TableCell>

              <TableCell className={tableCellStyle}>
                <div className="flex gap-1 justify-center">
                  <MdEdit
                    className="text-xl text-blue-700 cursor-pointer"
                    onClick={() => handleEdit(convenio)}
                  />
                  <MdDelete
                    className="text-xl text-red-600 cursor-pointer"
                    onClick={() => handleDelete(convenio)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {modal === "update" && selectConvenio && (
        <ModalUpdateConvenio
          key={selectConvenio.id}
          findConvenios={findConvenios}
          selectConvenio={selectConvenio}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
      )}

      {modal === "delete" && selectConvenio && (
        <ModalDeleteConvenio
          key={selectConvenio.id}
          findConvenios={findConvenios}
          selectConvenio={selectConvenio}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
      )}
    </section>
  );
};

export default TablaConvenios;
