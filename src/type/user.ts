export interface Login {
  password: string;
  correo: string;
}

export interface User {
  id: number;
  activo: string;
  nombre: string;
  apellido: string;
  avatar_facebook: string;
  celular: string;
  email: string;
  estado: string;
  fecha_nacimiento: string;
  foto: string;
  sexo: string;
  telefono: string;
  token_activacion: string;
  rol: string;
}
