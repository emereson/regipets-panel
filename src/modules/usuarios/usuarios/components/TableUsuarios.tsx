import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { User } from "../../../../type/user";
import { tableCellStyle, tableColumnStyle } from "../../../../utils/classNames";
import Loading from "../../../../hooks/Loading";

interface Props {
  usuarios: User[];
  isLoading: boolean;
  setPage: (e: number) => void;
  page: number;
  pages: number;
}

const TableUsuarios = ({
  usuarios,
  isLoading,
  page,
  setPage,
  pages,
}: Props) => {
  return (
    <section className="w-full relative flex flex-col gap-4 overflow-hidden">
      {" "}
      {isLoading && <Loading />}
      <Table
        aria-label="Example table with client side pagination"
        classNames={{
          base: " h-full overflow-auto  rounded-xl",
          table: "min-h-[50px]",
          wrapper: "p-0",
        }}
        isHeaderSticky
        isStriped
      >
        <TableHeader>
          <TableColumn className={`${tableColumnStyle} max-w-8`}>
            FOTO
          </TableColumn>
          <TableColumn className={tableColumnStyle}>
            NOMBRE Y APELLIDOS
          </TableColumn>
          <TableColumn className={tableColumnStyle}>EMAIL</TableColumn>
          <TableColumn className={tableColumnStyle}>CELULAR</TableColumn>
          <TableColumn className={tableColumnStyle}>SEXO</TableColumn>
          <TableColumn className={tableColumnStyle}>
            FECHA NACIMIENTO
          </TableColumn>
          <TableColumn className={tableColumnStyle}>ROL</TableColumn>
          <TableColumn className={tableColumnStyle}>ESTADO</TableColumn>
          <TableColumn className={tableColumnStyle}>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody items={usuarios}>
          {(usuario) => (
            <TableRow key={usuario.id}>
              <TableCell className={`${tableCellStyle}  max-w-8`}>
                <img
                  className="w-full object-cover rounded-full"
                  src={usuario.foto || "/logo.webp"}
                  alt="foto del usuario"
                />
              </TableCell>
              <TableCell className={tableCellStyle}>
                {usuario.nombre} {usuario.apellido}
              </TableCell>
              <TableCell className={tableCellStyle}>{usuario.email}</TableCell>
              <TableCell className={tableCellStyle}>
                {usuario.celular}
              </TableCell>
              <TableCell className={tableCellStyle}>{usuario.sexo}</TableCell>
              <TableCell className={tableCellStyle}>
                {usuario.fecha_nacimiento}
              </TableCell>
              <TableCell className={tableCellStyle}>{usuario.rol}</TableCell>
              <TableCell className={tableCellStyle}>{usuario.estado}</TableCell>
              <TableCell className={tableCellStyle}>{usuario.id}</TableCell>
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

export default TableUsuarios;
