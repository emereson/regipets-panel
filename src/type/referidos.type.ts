import type { Pedido } from "./pedido.type";

export interface Referido {
  id: number;
  user_id: number;
  pedido_id: number;
  estado: string;
  pedido: Pedido;
}
