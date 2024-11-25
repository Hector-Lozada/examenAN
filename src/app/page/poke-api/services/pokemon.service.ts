import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, Pokemons } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrlBase:string = 'https://pokeapi.co/api/v2/pokemon'
  private next:string | null = null
  private previust:string | null = null
  constructor(
    private http:HttpClient
  ) { }

  getPokemons(url:string = this.apiUrlBase):Observable<Pokemons>{
    return this.http.get<Pokemons>(url)
  }

  getPokemon(termin:string|number):Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.apiUrlBase}/${termin}`)
  }

  set nextUrl(url:string|null){
    this.next = url
  }

  set previustUrl(url:string|null){
    this.previust = url
  }

  get nextUrl():string|null{
    return this.next
  }

  get previustUrl():string | null{
    return this.previust
  }

}
