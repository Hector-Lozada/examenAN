import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../interfaces/curso.interface';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:3000/api/etg';

  constructor(private http: HttpClient) {}

  getCursos(): Observable<{ cursos: Curso[] }> {
    return this.http.get<{ cursos: Curso[] }>(this.apiUrl);
  }

  createCurso(curso: Omit<Curso, '_id'>): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiUrl}`, curso);
  }

  updateCurso(id: string, curso: Partial<Curso>): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
  }

  deleteCurso(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}