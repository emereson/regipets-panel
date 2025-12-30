import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import type { Referido } from "../../../../type/referidos.type";
import { tableCellStyle, tableColumnStyle } from "../../../../utils/classNames";

interface Props {
  selectReferido: Referido;
  isOpen: boolean;
  onOpenChange: () => void;
}

const ModalProductos = ({ selectReferido, isOpen, onOpenChange }: Props) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
      <ModalContent>
        <ModalHeader className="font-semibold text-lg">
          Productos del pedido
        </ModalHeader>

        <ModalBody className="max-h-[80vh] overflow-y-auto">
          <Table
            isHeaderSticky
            isStriped
            classNames={{
              base: " h-full   rounded-xl",
              table: "min-h-[50px]",
              wrapper: "p-2",
            }}
          >
            <TableHeader>
              <TableColumn className={tableColumnStyle}>N°</TableColumn>
              <TableColumn className={tableColumnStyle}>PRODUCTO</TableColumn>
              <TableColumn className={tableColumnStyle}>CATEGORÍA</TableColumn>
              <TableColumn className={tableColumnStyle}>UNIDADES</TableColumn>
              <TableColumn className={tableColumnStyle}>
                PRECIO UNITARIO
              </TableColumn>
              <TableColumn className={tableColumnStyle}>TOTAL</TableColumn>
            </TableHeader>

            <TableBody>
              {selectReferido?.pedido?.productos?.length ? (
                selectReferido.pedido.productos.map((producto, index) => (
                  <TableRow key={`${producto.id}-${index}`}>
                    <TableCell className={tableCellStyle}>
                      {index + 1}
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      {producto.nombre}
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      {producto.categoria}
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      {producto.quantity}
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      S/.{" "}
                      {producto.precio.toLocaleString("es-PE", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      S/.{" "}
                      {(producto.quantity * producto.precio).toLocaleString(
                        "es-PE",
                        { minimumFractionDigits: 2 }
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No hay productos
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ModalBody>
        <div className="flex justify-end gap-3 px-6 py-2">
          <Button color="danger" size="sm" onPress={onOpenChange}>
            Cerrar
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ModalProductos;
