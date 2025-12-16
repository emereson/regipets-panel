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
import { formatDate } from "../../../../utils/formatDate";

interface Props {
  mascotas: Mascota[];
  setPage: (e: number) => void;
  page: number;
  pages: number;
  selectedIds?: number[];
  setSelectedIds?: (ids: number[]) => void;
}

const TablaAprobacion = ({
  mascotas,
  page,
  setPage,
  pages,
  selectedIds = [],
  setSelectedIds = () => {},
}: Props) => {
  const handleSelectionChange = (keys: any) => {
    const ids = Array.from(keys).map((key) => Number(key));
    setSelectedIds(ids);
  };

  return (
    <section className="w-full relative flex flex-col gap-4 overflow-hidden">
      <Table
        aria-label="Tabla de mascotas pendientes"
        selectionMode="multiple"
        selectedKeys={new Set(selectedIds.map(String))}
        onSelectionChange={handleSelectionChange}
        classNames={{
          base: "h-full overflow-auto rounded-xl",
          table: "min-h-[50px]",
          wrapper: "p-0",
        }}
      >
        <TableHeader>
          <TableColumn className={tableColumnStyle}>IMAGEN</TableColumn>
          <TableColumn className={tableColumnStyle}>
            NOMBRE DE <br /> MASCOTA
          </TableColumn>
          <TableColumn className={tableColumnStyle}>CORREO</TableColumn>
          <TableColumn className={tableColumnStyle}>
            CORREO DEL CREADOR
          </TableColumn>
          <TableColumn className={tableColumnStyle}>SEXO</TableColumn>
          <TableColumn className={tableColumnStyle}>MICROCHIP</TableColumn>
          <TableColumn className={tableColumnStyle}>
            FECHA <br /> NACIMIENTO
          </TableColumn>
          <TableColumn className={tableColumnStyle}>TAMAÑO</TableColumn>
          <TableColumn className={tableColumnStyle}>COLOR</TableColumn>
          <TableColumn className={tableColumnStyle}>RAZA</TableColumn>
          <TableColumn className={tableColumnStyle}>ESTADO</TableColumn>
        </TableHeader>

        <TableBody items={mascotas}>
          {(mascota) => (
            <TableRow key={mascota.id}>
              <TableCell className={`${tableCellStyle} max-w-14`}>
                <img
                  className="w-12 h-12"
                  src={
                    `${import.meta.env.VITE_URL_IMAGE}/${mascota.imagen}` ||
                    "/logo.webp"
                  }
                  alt="foto del usuario"
                />
              </TableCell>

              <TableCell className={tableCellStyle}>{mascota.nombre}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota?.usuario?.email || "-"}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {mascota?.creador?.email || "-"}
              </TableCell>
              <TableCell className={tableCellStyle}>{mascota.sexo}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.cod_microchip}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {formatDate(mascota.fecha_nacimiento)}
              </TableCell>
              <TableCell className={tableCellStyle}>{mascota.tamano}</TableCell>
              <TableCell className={tableCellStyle}>{mascota.color}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota?.raza?.title_es || "-"}
              </TableCell>
              <TableCell
                className={`${tableCellStyle} ${
                  mascota.estado_verificacion === "APROBADO"
                    ? "text-green-600"
                    : mascota.estado_verificacion === "DENEGADO"
                    ? "text-red-600"
                    : "text-amber-600"
                }`}
              >
                {mascota.estado_verificacion}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="min-h-7 flex w-full justify-center">
        <Pagination
          className="p-0"
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
          size="sm"
        />
      </div>
    </section>
  );
};

export default TablaAprobacion;
