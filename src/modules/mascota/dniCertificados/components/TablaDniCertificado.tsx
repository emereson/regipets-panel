import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type Selection,
} from "@heroui/react";
import type { Mascota } from "../../../../type/mascotas.type";
import { tableCellStyle, tableColumnStyle } from "../../../../utils/classNames";
import { formatDate } from "../../../../utils/formatDate";

interface Props {
  mascotas: Mascota[];
  setPage: (e: number) => void;
  page: number;
  pages: number;
  selectedMascotas: Mascota[];
  setSelectedMascotas: (mascotas: Mascota[]) => void;
}

const TablaDniCertificado = ({
  mascotas,
  page,
  setPage,
  pages,
  selectedMascotas,
  setSelectedMascotas,
}: Props) => {
  const selectedKeys = new Set(selectedMascotas.map((m) => m.id.toString()));

  const handleSelectionChange = (keys: Selection) => {
    if (keys === "all") {
      setSelectedMascotas(mascotas);
      return;
    }

    const ids = Array.from(keys).map(Number);
    setSelectedMascotas(mascotas.filter((m) => ids.includes(m.id)));
  };

  return (
    <section className="w-full flex flex-col gap-4 overflow-hidden ">
      <Table
        aria-label="Tabla de mascotas pendientes"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        classNames={{
          base: "h-full overflow-auto rounded-xl",
          table: "min-h-[50px]",
          wrapper: "p-0",
        }}
      >
        <TableHeader>
          <TableColumn className={tableColumnStyle}>IMAGEN</TableColumn>
          <TableColumn className={tableColumnStyle}>MASCOTA</TableColumn>
          <TableColumn className={tableColumnStyle}>EMAIL</TableColumn>
          <TableColumn className={tableColumnStyle}>CREADOR</TableColumn>
          <TableColumn className={tableColumnStyle}>SEXO</TableColumn>
          <TableColumn className={tableColumnStyle}>MICROCHIP</TableColumn>
          <TableColumn className={tableColumnStyle}>NACIMIENTO</TableColumn>
          <TableColumn className={tableColumnStyle}>TAMAÑO</TableColumn>
          <TableColumn className={tableColumnStyle}>COLOR</TableColumn>
          <TableColumn className={tableColumnStyle}>RAZA</TableColumn>
          <TableColumn className={tableColumnStyle}>ESTADO</TableColumn>
        </TableHeader>

        <TableBody items={mascotas}>
          {(mascota) => (
            <TableRow key={mascota.id}>
              <TableCell className={tableCellStyle}>
                <img
                  className="w-12 h-12 object-cover rounded"
                  src={
                    mascota.imagen
                      ? `${import.meta.env.VITE_URL_IMAGE}/${mascota.imagen}`
                      : "/logo.webp"
                  }
                  alt="foto mascota"
                />
              </TableCell>

              <TableCell className={tableCellStyle}>{mascota.nombre}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.usuario?.email || "-"}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.creador?.email || "-"}
              </TableCell>
              <TableCell className={tableCellStyle}>{mascota.sexo}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.cod_microchip || "-"}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {formatDate(mascota.fecha_nacimiento)}
              </TableCell>
              <TableCell className={tableCellStyle}>{mascota.tamano}</TableCell>
              <TableCell className={tableCellStyle}>{mascota.color}</TableCell>
              <TableCell className={tableCellStyle}>
                {mascota.raza?.title_es || "-"}
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

      <Pagination
        isCompact
        showControls
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
        size="sm"
      />
    </section>
  );
};

export default TablaDniCertificado;
