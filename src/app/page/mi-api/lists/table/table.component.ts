import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoService } from '../services/curso.service';
import { Curso } from '../interfaces/curso.interface';
import { CursoModalComponent } from '../modal/curso-modal.component';

@Component({
  selector: 'app-curso-table',
  standalone: true,
  imports: [CommonModule, CursoModalComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class CursoTableComponent implements OnInit {
  cursos: Curso[] = [];
  showModal = false;
  selectedCurso: Curso | null = null;

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursoService.getCursos().subscribe(
      response => {
        this.cursos = response.cursos;
      }
    );
  }

  openModal(curso?: Curso): void {
    this.selectedCurso = curso || null;
    this.showModal = true;
    console.log(this.showModal);  // Para verificar si la variable se actualiza correctamente
  }
  
  

  closeModal(): void {
    this.showModal = false;
    this.selectedCurso = null;
  }

  onSave(curso: Curso): void {
    if (curso._id) {
      this.cursoService.updateCurso(curso._id, curso).subscribe(() => {
        this.loadCursos();
        this.closeModal();
      });
    } else {
      this.cursoService.createCurso(curso).subscribe(() => {
        this.loadCursos();
        this.closeModal();
      });
    }
  }

  deleteCurso(id: string): void {
    if (confirm('¿Está seguro de eliminar este curso?')) {
      this.cursoService.deleteCurso(id).subscribe(() => {
        this.loadCursos();
      });
    }
  }
}