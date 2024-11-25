import { Component, Output, EventEmitter } from '@angular/core';
import { dragonball } from '../../interfaces/dragonball';
import { DbzService } from '../../services/dbz.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-paginacion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Output() public eventNewPersonaje = new EventEmitter<dragonball>();
  constructor(
    private _srvDragonball:DbzService
  ){}

  get nextUrl():string|null{
    return this._srvDragonball.nextUrl
  }

  get lastUrl():string|null{
    return this._srvDragonball.lastUrl
  }
  
  loadSiguientesPersonajes(url:string){
    console.log(url)
    this._srvDragonball.getPersonajes(url).subscribe(personajesDbz =>{
      personajesDbz.items.forEach(per =>{
        this._srvDragonball.getPersonaje(Number(per.id)).subscribe(perosonaje=>{
          per.data = perosonaje
          this._srvDragonball.nextUrl = personajesDbz.links.next
          this._srvDragonball.lastUrl = personajesDbz.links.previous
          this.eventNewPersonaje.emit(personajesDbz)
        })
      })
    })
  }
}
