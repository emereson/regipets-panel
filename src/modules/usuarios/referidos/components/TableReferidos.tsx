import {
  Button,
  Pagination,
  Snippet,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { tableCellStyle, tableColumnStyle } from "../../../../utils/classNames";

import type { Referido } from "../../../../type/referidos.type";
import { formatDate } from "../../../../utils/formatDate";
import { useState } from "react";
import ModalProductos from "./ModalProductos";
import ModalUpdateReferido from "./ModalUpdateReferido";

interface Props {
  referidos: Referido[];
  setPage: (e: number) => void;
  page: number;
  pages: number;
  findReferidos: () => void;
  rol: string;
  selectUsuario?: string | null;
  idUser: string | null;
}

const TableReferidos = ({
  referidos,
  page,
  setPage,
  pages,
  rol,
  findReferidos,
  selectUsuario,
  idUser,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectModal, setSelectModal] = useState("");
  const [selectReferido, setSelectReferido] = useState<Referido | null>();

  const handleVerProductos = (referido: Referido) => {
    setSelectModal("productos");
    onOpen();
    setSelectReferido(referido);
  };

  const handleUpdate = (referido: Referido) => {
    setSelectModal("update");
    onOpen();
    setSelectReferido(referido);
  };
  return (
    <section className=" w-full relative flex flex-col items-end  gap-4 ">
      <Snippet
        className="absolute -top-11    w-fit flex py-2 px-2"
        color="primary"
        size="sm"
        symbol="Link referido: "
        variant="shadow"
        hideCopyButton
      >
        {`https://regipets.com?code=${selectUsuario || idUser}`}
      </Snippet>

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
          <>
            <TableColumn className={`${tableColumnStyle} max-w-14`}>
              N°
            </TableColumn>
            <TableColumn className={tableColumnStyle}>CLIENTE</TableColumn>
            <TableColumn className={tableColumnStyle}>UBICACIÓN</TableColumn>
            <TableColumn className={tableColumnStyle}>SUB TOTAL</TableColumn>
            <TableColumn className={tableColumnStyle}>
              COSTO DE ENVIO
            </TableColumn>
            <TableColumn className={tableColumnStyle}>TOTAL</TableColumn>
            <TableColumn className={tableColumnStyle}>N° OPERACIÓN</TableColumn>
            <TableColumn className={tableColumnStyle}>FECHA PEDIDO</TableColumn>
            <TableColumn className={tableColumnStyle}>PRODUCTOS</TableColumn>
            <TableColumn className={tableColumnStyle}>
              ESTADO PEDIDO
            </TableColumn>
            <TableColumn className={tableColumnStyle}>
              ESTADO REFERIDO
            </TableColumn>
            {rol === "Admin" && (
              <TableColumn className={tableColumnStyle}>ACCIONES </TableColumn>
            )}
          </>
        </TableHeader>
        <TableBody>
          {rol === "Admin"
            ? referidos.map((referido, index) => (
                <TableRow key={referido.id}>
                  <TableCell className={tableCellStyle}>{index + 1}</TableCell>

                  <TableCell className={tableCellStyle}>
                    {referido.pedido.cliente.nombre_apellidos}
                  </TableCell>

                  <TableCell className={`${tableCellStyle} text-[10px]`}>
                    {referido.pedido.departamento} - {referido.pedido.provincia}{" "}
                    - {referido.pedido.distrito}
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    S/. {referido.pedido.sub_total.toFixed(2)}
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    S/. {referido.pedido.costo_envio.toFixed(2)}
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    <strong>S/. {referido.pedido.total.toFixed(2)}</strong>
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    {referido.pedido.numero_operacion || "-"}
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    {formatDate(referido.pedido.fecha_pedido)}
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    <Button
                      className="scale-90"
                      color="warning"
                      size="sm"
                      onPress={() => handleVerProductos(referido)}
                    >
                      Ver Productos
                    </Button>
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    {referido.pedido.status}
                  </TableCell>
                  <TableCell className={`${tableCellStyle} `}>
                    <p
                      className={`${
                        referido.estado === "pendiente"
                          ? "text-amber-500"
                          : "text-green-700"
                      } text-[14px]`}
                    >
                      {referido.estado}
                    </p>
                  </TableCell>
                  <TableCell className={tableCellStyle}>
                    <Button
                      className="scale-90"
                      color="primary"
                      size="sm"
                      onPress={() => handleUpdate(referido)}
                    >
                      Editar Estado
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : referidos.map((referido, index) => (
                <TableRow key={referido.id}>
                  <TableCell className={tableCellStyle}>{index + 1}</TableCell>

                  <TableCell className={tableCellStyle}>
                    {referido.pedido.cliente.nombre_apellidos}
                  </TableCell>

                  <TableCell className={`${tableCellStyle} text-[10px]`}>
                    {referido.pedido.departamento} - {referido.pedido.provincia}{" "}
                    - {referido.pedido.distrito}
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    S/. {referido.pedido.sub_total.toFixed(2)}
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    S/. {referido.pedido.costo_envio.toFixed(2)}
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    <strong>S/. {referido.pedido.total.toFixed(2)}</strong>
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    {referido.pedido.numero_operacion || "-"}
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    {formatDate(referido.pedido.fecha_pedido)}
                  </TableCell>

                  <TableCell className={tableCellStyle}>
                    <Button
                      className="scale-90"
                      color="warning"
                      size="sm"
                      onPress={() => handleVerProductos(referido)}
                    >
                      Ver Productos
                    </Button>
                  </TableCell>

                  <TableCell className={`${tableCellStyle} `}>
                    {referido.pedido.status}
                  </TableCell>

                  <TableCell className={`${tableCellStyle} `}>
                    <p
                      className={`${
                        referido.estado === "pendiente"
                          ? "text-amber-500"
                          : "text-green-700"
                      } text-[14px]`}
                    >
                      {referido.estado}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
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
      {selectReferido && selectModal === "productos" && (
        <ModalProductos
          key={selectReferido.id}
          selectReferido={selectReferido}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
      {selectReferido && selectModal === "update" && (
        <ModalUpdateReferido
          key={selectReferido.id}
          selectReferido={selectReferido}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          findReferidos={findReferidos}
        />
      )}
    </section>
  );
};

export default TableReferidos;
