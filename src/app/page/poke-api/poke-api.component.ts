import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Pokemons } from './interfaces/pokemon';
import { PokemonService } from './services/pokemon.service';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';
import { url } from 'inspector';

@Component({
  selector: 'app-poke-api',
  standalone: true,
  imports: [CardComponent, PaginacionComponent, SearchComponent],
  templateUrl: './poke-api.component.html',
  styleUrl: './poke-api.component.css'
})
export class PokeApiComponent implements OnInit {
  pokemons:Pokemons | undefined;
  constructor(
    private _srvPokemons:PokemonService
  ){ }

  ngOnInit(): void {
      this._srvPokemons.getPokemons().subscribe(pokemonAll =>{
        pokemonAll.results.forEach(pokemon =>{
          this._srvPokemons.getPokemon(pokemon.name).subscribe(pokeData => {
            pokemon.data = pokeData
            this._srvPokemons.nextUrl = pokemonAll.next
            this._srvPokemons.previustUrl = pokemonAll.previous
          })
        })
        this.pokemons = pokemonAll
      })
  }

  setNewPokemon(pokemonNew:Pokemons):void{
    this.pokemons = pokemonNew
  }

  searchPokemon(termino:string){
    if(termino){
      this._srvPokemons.getPokemon(termino).subscribe(pokemon =>{
        this.pokemons = {
          count: 1,
          next: '',
          previous:'',
          results: [{
            name: pokemon.name,
            url: '',
            data: pokemon
          }
          ]
        }
      })
    }else{
      this.ngOnInit()
    }

    this._srvPokemons.nextUrl = null;
    this._srvPokemons.previustUrl= null
  }
}
