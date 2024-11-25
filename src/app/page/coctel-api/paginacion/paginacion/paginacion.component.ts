import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { cocteles } from '../../interfaces/coctel';
import { CoctelService } from '../../services/coctel.service';

@Component({
  selector: 'app-paginacion',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Output() public eventNewCocteles = new EventEmitter<cocteles>();
  abecedario = ['a',  'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  constructor(
    private _srvCocteles:CoctelService
  ){}

  letraClickeada:string = ''

  cogerLetra(letra:string){
    this.letraClickeada = letra
    console.log(letra)
  }

  siguientePagina(letraSiguiente:string){
    this._srvCocteles.getPaginacionCoctel(letraSiguiente).subscribe(coctel =>{
      this.eventNewCocteles.emit(coctel)
    })
  }

}
