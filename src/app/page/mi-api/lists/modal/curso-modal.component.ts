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
        contenido: this.curso.contenido.join('\n'),
        instructores: this.curso.instructores.join('\n'),
        estudiantes: this.curso.estudiantes
          .map(est => `${est.nombre}, ${est.email}, ${est.completado}, ${est.calificacion || ''}`)
          .join('\n'),
        certificados: this.curso.certificados
          .map(cert => `${cert.estudianteEmail}, ${cert.codigoCertificado}, ${cert.urlCertificado}`)
          .join('\n'),
        imagenes: this.curso.imagenes?.join('\n') || ''
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
        _id: this.curso?._id ,
        contenido: formValue.contenido.split('\n').filter((item: string) => item.trim()),
        instructores: formValue.instructores.split('\n').filter((item: string) => item.trim()),
        estudiantes: formValue.estudiantes.split('\n').map((linea: string) => {
          const [nombre, email, completado, calificacion] = linea.split(',').map((item: string) => item.trim());
          return {
            nombre,
            email,
            fechaInscripcion: new Date(),
            completado: completado === 'true',
            calificacion: calificacion ? parseFloat(calificacion) : null
          };
        }),
        certificados: formValue.certificados.split('\n').map((linea: string) => {
          const [estudianteEmail, codigoCertificado, urlCertificado] = linea.split(',').map((item: string) => item.trim());
          return {
            estudianteEmail,
            codigoCertificado,
            urlCertificado
          };
        }),
        imagenes: formValue.imagenes.split('\n').filter((item: string) => item.trim())
      };
  
      console.log('Datos enviados al servidor:', curso);
  
      this.save.emit(curso);
    } else {
      console.error('El formulario no es válido:', this.form.value);
    }
  }
  
  

  onCancel(): void {
    this.cancel.emit();
  }
}
