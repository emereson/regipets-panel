import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import type { Especie } from "../../../../type/mascotas.type";
import { tableCellStyle, tableColumnStyle } from "../../../../utils/classNames";
import { MdDelete, MdEdit } from "react-icons/md";
import ModalAddEspecie from "./crudEspecies/ModalAddEspecie";
import { useState } from "react";
import ModalUpdateEspecie from "./crudEspecies/ModalUpdateEspecie";
import ModalDeleteEspecie from "./crudEspecies/ModalDeleteEspecie";

interface Props {
  especies: Especie[];
  findMascotas: () => void;
}

const TablaEspecies = ({ especies, findMascotas }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectEspecie, setSelectEspecie] = useState<Especie | null>(null);
  const [modal, setModal] = useState("");

  const handleEdit = (especie: Especie) => {
    setModal("update");
    onOpen();
    setSelectEspecie(especie);
  };

  const handleDelete = (especie: Especie) => {
    setModal("delete");
    onOpen();
    setSelectEspecie(especie);
  };

  return (
    <section className="w-1/2  relative flex flex-col gap-2">
      <div className="w-full flex justify-between items-end">
        <h2 className="font-bold ">Especies</h2>
        <ModalAddEspecie findMascotas={findMascotas} />
      </div>
      <Table
        aria-label="Tabla de especies"
        classNames={{
          wrapper: "  p-0 overflow-auto ",
        }}
        isStriped
        radius="sm"
      >
        <TableHeader>
          <TableColumn className={tableColumnStyle}>ID</TableColumn>
          <TableColumn className={`${tableColumnStyle} w-48`}>
            TITULO
          </TableColumn>
          <TableColumn className={tableColumnStyle}>ACCIONES</TableColumn>
        </TableHeader>

        <TableBody items={especies}>
          {(especie) => (
            <TableRow key={especie.id}>
              <TableCell className={tableCellStyle}>{especie.id}</TableCell>
              <TableCell className={tableCellStyle}>
                {especie.title_es}
              </TableCell>
              <TableCell className={tableCellStyle}>
                <div className="flex gap-1">
                  <MdEdit
                    className="text-xl text-blue-700 cursor-pointer"
                    onClick={() => handleEdit(especie)}
                  />
                  <MdDelete
                    className="text-xl text-red-600 cursor-pointer"
                    onClick={() => handleDelete(especie)}
                  />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {modal === "update" && selectEspecie && (
        <ModalUpdateEspecie
          key={selectEspecie.id}
          findMascotas={findMascotas}
          selectEspecie={selectEspecie}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
      )}
      {modal === "delete" && selectEspecie && (
        <ModalDeleteEspecie
          key={selectEspecie.id}
          findMascotas={findMascotas}
          selectEspecie={selectEspecie}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
      )}
    </section>
  );
};

export default TablaEspecies;
