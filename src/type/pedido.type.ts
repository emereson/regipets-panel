export interface Pedido {
  id: number;
  departamento: string;
  provincia: string;
  distrito: string;
  sub_total: number;
  costo_envio: number;
  total: number;
  status: string;
  numero_operacion: string;
  fecha_pedido: string;
  productos: ProductoPedido[];
  cliente: Cliente;
}

export interface ProductoPedido {
  id: number;
  pedido_id: number;
  producto_id: number;
  categoria: string;
  nombre: string;
  precio: number;
  quantity: number;
}

export interface Cliente {
  id: number;
  celular: string;
  departamento: string;
  direccion: string;
  distrito: string;
  dni: string;
  email: string;
  nombre_apellidos: string;
  provincia: string;
  referencia: string;
}
