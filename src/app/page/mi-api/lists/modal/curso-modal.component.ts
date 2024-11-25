import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Curso } from '../interfaces/curso.interface';

@Component({
  selector: 'app-curso-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './curso-modal.component.html',
  styleUrls: ['./curso-modal.component.css']
})
export class CursoModalComponent implements OnInit {
  @Input() curso: Curso | null = null;
  @Output() save = new EventEmitter<Curso>();
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
      estudiantes: [[]],  // Nuevo campo para estudiantes, podría ser una lista vacía al principio.
      certificados: [[]],  // Nuevo campo para certificados, también vacío por defecto.
      imagenes: [[]] // Campo de imágenes vacío por defecto.
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
        imagenes: this.curso.imagenes
      });
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const curso: Curso = {
        ...formValue,
        _id: this.curso?._id || '',  // Si no existe _id, se asigna un valor vacío.
        contenido: formValue.contenido.split('\n').filter((item: string) => item.trim()),
        instructores: formValue.instructores.split('\n').filter((item: string) => item.trim()),
        imagenes: formValue.imagenes
      };
      this.save.emit(curso);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
