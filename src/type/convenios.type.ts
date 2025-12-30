import type { Departamento, Distrito, Provincia } from "./ubigeo.type";

export interface Convenio {
  id: number;
  nombre_convenio: string;
  direccion: string;
  telefono: string;
  punto_autorizado: boolean;
  departamento_id: string | number;
  provincia_id: string | number;
  distrito_id: string | number;
  departamento: Departamento;
  provincia: Provincia;
  distrito: Distrito;
  categoria_convenio: string;
  beneficio_convenio: string;
  logo_convenio: string;
}
