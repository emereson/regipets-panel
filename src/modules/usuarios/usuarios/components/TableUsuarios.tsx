import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import type { User } from "../../../../type/user";
import { tableCellStyle, tableColumnStyle } from "../../../../utils/classNames";
import Loading from "../../../../hooks/Loading";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import ModalEditUsuario from "./CrudUsuario/ModalEditUsuario";
import { MdDelete } from "react-icons/md";
import ModalDeleteUsuario from "./CrudUsuario/ModalDeleteUsuario";

interface Props {
  usuarios: User[];
  isLoading: boolean;
  setPage: (e: number) => void;
  page: number;
  pages: number;
  findUsuarios: () => void;
}

const TableUsuarios = ({
  usuarios,
  isLoading,
  page,
  setPage,
  pages,
  findUsuarios,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectUsuario, setSelectUsuario] = useState<User | null>(null);
  const [selectModal, setSelectModal] = useState("");

  const handleEditarUsuario = (usuario: User) => {
    setSelectUsuario(usuario);
    setSelectModal("editar");
    onOpen();
  };

  const handleDeleteUsuario = (usuario: User) => {
    setSelectUsuario(usuario);
    setSelectModal("eliminar");
    onOpen();
  };

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
          <TableColumn className={`${tableColumnStyle} max-w-14`}>
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
              <TableCell className={`${tableCellStyle}  max-w-14`}>
                <img
                  className="w-12 h-12  "
                  src={
                    `${import.meta.env.VITE_URL_IMAGE}/${usuario.foto}` ||
                    "/logo.webp"
                  }
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
                      onClick={() => handleEditarUsuario(usuario)}
                    />
                  </Tooltip>
                  <Tooltip
                    content="Eliminar"
                    showArrow={true}
                    size="sm"
                    color="primary"
                  >
                    <MdDelete
                      className="text-2xl text-red-600 cursor-pointer"
                      onClick={() => handleDeleteUsuario(usuario)}
                    />
                  </Tooltip>
                </div>
              </TableCell>
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
      {selectUsuario && selectModal === "editar" && (
        <ModalEditUsuario
          key={selectUsuario.id}
          usuario={selectUsuario}
          findUsuarios={findUsuarios}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
      {selectUsuario && selectModal === "eliminar" && (
        <ModalDeleteUsuario
          key={selectUsuario.id}
          usuario={selectUsuario}
          findUsuarios={findUsuarios}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </section>
  );
};

export default TableUsuarios;
