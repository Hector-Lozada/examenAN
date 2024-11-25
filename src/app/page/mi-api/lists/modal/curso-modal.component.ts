import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoTrading } from '../interfaces/curso.interface';  // Asegúrate de que la interfaz esté importada correctamente

@Component({
  selector: 'app-curso-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './curso-modal.component.html',
  styleUrls: ['./curso-modal.component.css']
})
export class CursoModalComponent implements OnInit {
  @Input() curso: CursoTrading | null = null;
  @Output() save = new EventEmitter<CursoTrading>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracionHoras: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      contenido: ['', Validators.required],  // Asegurando que el contenido sea requerido.
      instructores: ['', Validators.required], // Asegurando que los instructores sean requeridos.
      estudiantes: ['', Validators.required],  // Ahora los estudiantes son una cadena de texto
      certificados: ['', Validators.required],  // Los certificados también serán una cadena de texto
      imagenes: ['']  // Campo de imágenes vacío por defecto.
    });
  }

  ngOnInit(): void {
    if (this.curso) {
      this.form.patchValue({
        ...this.curso,
        fechaInicio: this.formatDate(new Date(this.curso.fechaInicio)),
        fechaFin: this.formatDate(new Date(this.curso.fechaFin)),
        contenido: this.curso.contenido.join('\n'), // Asegúrate de que se muestra como texto (uno por línea)
        instructores: this.curso.instructores.join('\n'), // Lo mismo para instructores
        estudiantes: this.curso.estudiantes.map(est => `${est.nombre}, ${est.email}, ${est.completado}, ${est.completado}}`).join('\n'), // Solo los nombres de estudiantes
        certificados: this.curso.certificados
          .map(cert => `${cert.estudianteEmail}, ${cert.urlCertificado}, ${cert.codigoCertificado}`).join('\n'), // Correo, URL y código
        imagenes: this.curso.imagenes?.join('\n') || '' // Une las imágenes en una sola cadena para mostrar
      });
    }
  }  

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const curso: CursoTrading = {
        ...formValue,
        _id: this.curso?._id || '', // Asignamos el _id si está disponible
        contenido: formValue.contenido.split('\n').filter((item: string) => item.trim()),
        instructores: formValue.instructores.split('\n').filter((item: string) => item.trim()),
        estudiantes: formValue.estudiantes.split('\n').map((nombre: string) => ({
          nombre,
          email: '', // Asigna un valor si es necesario
          fechaInscripcion: new Date(),
          completado: false,
          calificacion: null
        })),
        certificados: formValue.certificados.split('\n').map((certificado: string) => {
          const [estudianteEmail, urlCertificado, codigoCertificado] = certificado.split(',').map((item: string) => item.trim());
          return {
            estudianteEmail,
            codigoCertificado,
            urlCertificado
          };
        }),
        imagenes: formValue.imagenes.split('\n').filter((item: string) => item.trim())
      };
      this.save.emit(curso);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
