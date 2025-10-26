import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { Mascota } from "../../../../type/mascotas.type";
import { tableCellStyle, tableColumnStyle } from "../../../../utils/classNames";

interface Props {
  mascotas: Mascota[];
}

const TablaMacotas = ({ mascotas }: Props) => {
  return (
    <section className="w-full relative  overflow-auto ">
      <Table
        aria-label="Example table with client side pagination"
        classNames={{
          wrapper: " h-[calc(100vh-200px)] h-full p-0   shadow-none",
        }}
      >
        <TableHeader>
          <TableColumn className={tableColumnStyle}>ID</TableColumn>
          <TableColumn className={tableColumnStyle}>IMAGEN</TableColumn>
          <TableColumn className={tableColumnStyle}>
            NOMBRE DE MASCOTA
          </TableColumn>
          <TableColumn className={tableColumnStyle}>APELLIDOS</TableColumn>
          <TableColumn className={tableColumnStyle}>SEXO</TableColumn>
          <TableColumn className={tableColumnStyle}>MICROCHIP</TableColumn>
          <TableColumn className={tableColumnStyle}>
            FECHA NACIMIENTO
          </TableColumn>
          <TableColumn className={tableColumnStyle}>REGISTRADO EN </TableColumn>
          <TableColumn className={tableColumnStyle}>TAMAÑO</TableColumn>
          <TableColumn className={tableColumnStyle}>COLOR</TableColumn>
          <TableColumn className={tableColumnStyle}>CALIFICACIÓN</TableColumn>
          <TableColumn className={tableColumnStyle}>RAZA</TableColumn>
          <TableColumn className={tableColumnStyle}>BIOGRAFIA</TableColumn>
          <TableColumn className={tableColumnStyle}>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody items={mascotas}>
          {(mascota) => (
            <TableRow key={mascota.id}>
              <TableCell className={tableCellStyle}>{mascota.id}</TableCell>
              <TableCell className={tableCellStyle}>{mascota.imagen}</TableCell>
              <TableCell className={tableCellStyle}>{mascota.nombre}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.apellido}
              </TableCell>
              <TableCell className={tableCellStyle}>{mascota.sexo}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.cod_microchip}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.fecha_nacimiento}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.tipo_reg}
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
              <TableCell className={tableCellStyle}>{mascota.id}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default TablaMacotas;
