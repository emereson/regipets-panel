import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { Mascota } from "../../../../type/mascotas.type";
import { tableCellStyle, tableColumnStyle } from "../../../../utils/classNames";
import Loading from "../../../../hooks/Loading";
import { formatDate } from "../../../../utils/formatDate";

interface Props {
  mascotas: Mascota[];
  isLoading: boolean;
  setPage: (e: number) => void;
  page: number;
  pages: number;
}

const TablaMacotas = ({ mascotas, isLoading, page, setPage, pages }: Props) => {
  return (
    <section className="w-full relative flex flex-col gap-4 overflow-hidden">
      {isLoading && <Loading />}
      <Table
        aria-label="Example table with client side pagination"
        classNames={{
          base: " h-full overflow-auto ",
          table: "min-h-[50px] ",
          wrapper: "p-0",
        }}
        isHeaderSticky
        isStriped
        radius="sm"
      >
        <TableHeader>
          <TableColumn className={tableColumnStyle}>IMAGEN</TableColumn>
          <TableColumn className={tableColumnStyle}>DNI MASCOTA</TableColumn>
          <TableColumn className={tableColumnStyle}>
            NOMBRE DE MASCOTA
          </TableColumn>
          <TableColumn className={tableColumnStyle}>
            NOMBRE DEL DUEÑO
          </TableColumn>
          <TableColumn className={tableColumnStyle}>SEXO</TableColumn>
          <TableColumn className={tableColumnStyle}>MICROCHIP</TableColumn>
          <TableColumn className={tableColumnStyle}>
            FECHA NACIMIENTO
          </TableColumn>
          <TableColumn className={tableColumnStyle}>
            FECHA REGISTRADO
          </TableColumn>
          <TableColumn className={tableColumnStyle}>REGISTRADO EN </TableColumn>
          <TableColumn className={tableColumnStyle}>TAMAÑO</TableColumn>
          <TableColumn className={tableColumnStyle}>COLOR</TableColumn>
          <TableColumn className={tableColumnStyle}>CALIFICACIÓN</TableColumn>
          <TableColumn className={tableColumnStyle}>RAZA</TableColumn>
          <TableColumn className={tableColumnStyle}>UBICACIÓN</TableColumn>
          <TableColumn className={tableColumnStyle}>BIOGRAFIA</TableColumn>
          <TableColumn className={tableColumnStyle}>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody items={mascotas}>
          {(mascota) => (
            <TableRow key={mascota.id}>
              <TableCell className={tableCellStyle}>{mascota.imagen}</TableCell>
              <TableCell className={tableCellStyle}>{mascota.dni}</TableCell>
              <TableCell className={tableCellStyle}>{mascota.nombre}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.usuario.nombre} {mascota.usuario.apellido}
              </TableCell>
              <TableCell className={tableCellStyle}>{mascota.sexo}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.cod_microchip}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {formatDate(mascota.fecha_nacimiento)}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {formatDate(mascota.created_at)}
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
                {mascota?.raza?.title_es}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.departamento?.departamento} -{" "}
                {mascota.provincia?.provincia} - {mascota.distrito?.distrito}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.biografia}
              </TableCell>
              <TableCell className={tableCellStyle}>{mascota.id}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="min-h-7 flex w-full justify-center ">
        <Pagination
          className="p-0"
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
          size="sm"
        />
      </div>
    </section>
  );
};

export default TablaMacotas;
