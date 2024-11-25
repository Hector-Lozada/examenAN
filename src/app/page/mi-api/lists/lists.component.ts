// src/app/page/mi-api/lists/lists.component.ts
import { Component, OnInit } from '@angular/core';
import { Curso } from './interfaces/curso.interface';
import { CursoService } from './services/curso.service';
import { CursoTableComponent } from "./table/table.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CursoTableComponent],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  cursos: Curso[] = [];
  selectedCurso: Curso | null = null; // Para el modal

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursoService.getCursos().subscribe({
      next: (data) => {
        this.cursos = data.cursos;
      },
      error: (err) => console.error('Error al cargar cursos:', err)
    });
  }

  agregarCurso(curso: Curso): void {
    this.cursoService.createCurso(curso).subscribe({
      next: () => this.cargarCursos(),
      error: (err) => console.error('Error al agregar curso:', err)
    });
  }

  editarCurso(curso: Curso): void {
    this.selectedCurso = curso; // Mostrar en el modal
  }

  actualizarCurso(curso: Curso): void {
    if (curso._id) {
      this.cursoService.updateCurso(curso._id, curso).subscribe({
        next: () => {
          this.cargarCursos();
          this.selectedCurso = null; // Cerrar el modal
        },
        error: (err) => console.error('Error al actualizar curso:', err)
      });
    }
  }

  eliminarCurso(id: string): void {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.cursoService.deleteCurso(id).subscribe({
        next: () => this.cargarCursos(),
        error: (err) => console.error('Error al eliminar curso:', err)
      });
    }
  }
}