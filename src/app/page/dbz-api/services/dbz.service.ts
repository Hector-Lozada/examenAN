import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dragonball, personoaje } from '../interfaces/dragonball';


@Injectable({
  providedIn: 'root'
})
export class DbzService {
  private dbzUrlApi: string = 'https://dragonball-api.com/api/characters'
  private next:string|null = null
  private last:string|null = null
  constructor(
    private http:HttpClient
  ) { }

  getPersonajes(url:string = this.dbzUrlApi):Observable<dragonball>{
    return this.http.get<dragonball>(url)
  }

  getPersonaje(id:number):Observable<personoaje>{
    return this.http.get<personoaje>(`${this.dbzUrlApi}/${id}`)
  }

  set nextUrl(url:string|null){
    this.next = url
  }

  set lastUrl(url:string|null){
    this.last = url
  }

  get nextUrl():string|null{
    return this.next
  }

  get lastUrl():string|null{
    return this.last
  }
  
}
