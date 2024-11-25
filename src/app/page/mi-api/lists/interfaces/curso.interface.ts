export type Estudiante = {
  nombre: string;
  email: string;
  fechaInscripcion: Date;
  completado: boolean;
  calificacion: number | null;
};

export type Certificado = {
  estudianteEmail: string;
  codigoCertificado: string;
  fechaEmision: Date;
  urlCertificado: string;
};

export type CursoTrading = {
  _id: string;  // El _id es opcional al crear el objeto, pero debe estar presente después de guardarlo en la base de datos
  titulo: string;
  descripcion: string;
  duracionHoras: number;
  contenido: string[];
  precio: number;
  imagenes?: string[];  // Las imágenes son opcionales
  fechaInicio: Date;
  fechaFin: Date;
  instructores: string[];
  estudiantes: Estudiante[];  // Lista de estudiantes inscritos
  certificados: Certificado[];  // Información sobre los certificados generados
};
