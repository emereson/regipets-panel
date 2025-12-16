import type { Departamento, Distrito, Provincia } from "./ubigeo.type";
import type { User } from "./user";

export interface Mascota {
  id: number;
  dni: string;
  imagen: string;
  nombre: string;
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
  especie_id: number;
  raza: Raza;
  usuario: User;
  departamento_id: string | number;
  provincia_id: string | number;
  distrito_id: string | number;
  departamento: Departamento;
  provincia: Provincia;
  distrito: Distrito;
  usuario_registrado_id: string | number;
  creador: User;
  estado_verificacion: string;
  direccion: string;
  tipo_mascota: string;
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
