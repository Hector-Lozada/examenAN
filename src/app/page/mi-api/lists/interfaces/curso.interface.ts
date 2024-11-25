export interface Curso {
  _id: string;
  titulo: string;
  descripcion: string;
  duracionHoras: number;
  contenido: string[];
  precio: number;
  imagenes: string[];
  fechaInicio: Date;
  fechaFin: Date;
  instructores: string[];
  estudiantes: string[];
  certificados: string[];
}