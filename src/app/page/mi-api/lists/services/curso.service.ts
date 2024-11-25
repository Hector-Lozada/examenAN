import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursoTrading } from '../interfaces/curso.interface';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:3000/api/etg';

  constructor(private http: HttpClient) {}

  getCursos(): Observable<{ cursos: CursoTrading[] }> {
    return this.http.get<{ cursos: CursoTrading[] }>(this.apiUrl);
  }

  createCurso(curso: Omit<CursoTrading, '_id'>): Observable<CursoTrading> {
    return this.http.post<CursoTrading>(`${this.apiUrl}`, curso);
  }

  updateCurso(id: string, curso: Partial<CursoTrading>): Observable<CursoTrading> {
    return this.http.put<CursoTrading>(`${this.apiUrl}/${id}`, curso);
  }

  deleteCurso(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}