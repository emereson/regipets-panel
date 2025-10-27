import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  tableCellStyle,
  tableColumnStyle,
} from "../../../../../utils/classNames";
import type { Especie } from "../../../../../type/mascotas.type";

interface Props {
  especies: Especie[];
}
const TablaEspecies = ({ especies }: Props) => {
  return (
    <section className="w-fit relative flex flex-col gap-2">
      <div className="w-full flex justify-between items-end">
        <h2 className="font-bold ">Especies</h2>
        <Button size="sm" color="primary" startContent={<FaPlus />}>
          ESPECIE
        </Button>
      </div>
      <Table
        aria-label="Tabla de especies"
        classNames={{
          wrapper: "  p-0 overflow-auto ",
        }}
      >
        {/* ✅ Solo un TableHeader */}
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
                  <MdEdit className="text-lg text-blue-700 cursor-pointer" />
                  <MdDelete className="text-lg text-red-600 cursor-pointer" />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default TablaEspecies;
