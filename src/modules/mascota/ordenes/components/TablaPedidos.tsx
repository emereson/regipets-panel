import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { Pedido } from "../../../../type/pedido.type";
import { tableCellStyle, tableColumnStyle } from "../../../../utils/classNames";

interface Props {
  pedidos: Pedido[];
}

const TablaPedidos = ({ pedidos }: Props) => {
  return (
    <section className="w-full relative">
      <Table
        aria-label="Tabla de pedidos"
        classNames={{
          wrapper: "h-[calc(100vh-200px)] p-0 overflow-auto shadow-none",
        }}
      >
        <TableHeader>
          <TableColumn className={tableColumnStyle}>N°</TableColumn>
          <TableColumn className={tableColumnStyle}>CLIENTE</TableColumn>
          <TableColumn className={tableColumnStyle}>PROVINCIA</TableColumn>
          <TableColumn className={tableColumnStyle}>DISTRITO</TableColumn>
          <TableColumn className={tableColumnStyle}>SUBTOTAL</TableColumn>
          <TableColumn className={tableColumnStyle}>COSTO ENVÍO</TableColumn>
          <TableColumn className={tableColumnStyle}>TOTAL</TableColumn>
          <TableColumn className={tableColumnStyle}>ESTADO</TableColumn>
          <TableColumn className={tableColumnStyle}>N° OPERACIÓN</TableColumn>
          <TableColumn className={tableColumnStyle}>FECHA</TableColumn>
        </TableHeader>

        <TableBody emptyContent="No hay pedidos registrados.">
          {pedidos.map((pedido, index) => (
            <TableRow key={pedido.id}>
              <TableCell className={tableCellStyle}>{index + 1}</TableCell>
              <TableCell className={tableCellStyle}>
                {pedido.cliente.nombre_apellidos}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {pedido.provincia}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {pedido.distrito}
              </TableCell>
              <TableCell className={tableCellStyle}>
                S/. {pedido.sub_total.toFixed(2)}
              </TableCell>
              <TableCell className={tableCellStyle}>
                S/. {pedido.costo_envio.toFixed(2)}
              </TableCell>
              <TableCell className={tableCellStyle}>
                <strong>S/. {pedido.total.toFixed(2)}</strong>
              </TableCell>
              <TableCell className={tableCellStyle}>
                {pedido.status === "pendiente" && (
                  <span className="text-yellow-600 font-medium">Pendiente</span>
                )}
                {pedido.status === "pagada" && (
                  <span className="text-green-600 font-medium">Pagada</span>
                )}
                {pedido.status === "cancelada" && (
                  <span className="text-red-600 font-medium">Cancelada</span>
                )}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {pedido.numero_operacion || "-"}
              </TableCell>
              <TableCell className={tableCellStyle}>
                {new Date(pedido.fecha_pedido).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default TablaPedidos;
