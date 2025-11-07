import type { Departamento, Distrito, Provincia } from "./ubigeo.type";
import type { User } from "./user";

export interface Mascota {
  id: number;
  dni: string;
  imagen: string;
  nombre: string;
  apellido: string;
  sexo: string;
  tamano: string;
  color: string;
  fecha_nacimiento: string;
  biografia: string;
  calificacion: string;
  castrado: string;
  fallecido: string;
  estado: string;
  mascota_raza_id: string;
  usuario_id: string;
  created_at: string;
  updated_at: string;
  cod_microchip: string;
  fecha_inscripcion: string;
  usuario_crea: string;
  usuario_mod: string;
  fecha_muerte: string;
  tipo_reg: string;
  especie: Especie;
  raza: Raza;
  usuario: User;
  departamento: Departamento;
  provincia: Provincia;
  distrito: Distrito;
}

export interface Especie {
  id: number;
  title_en: string;
  title_es: string;
}

export interface Raza {
  id: number;
  especie_id: number;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  especie: Especie;
}
