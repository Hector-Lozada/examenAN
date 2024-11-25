import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() eventTermino = new EventEmitter<string>();

  setTermino(termin:string){
    /* if(termin.trim().length === 0){
      return;
    } */
    this.eventTermino.emit(termin)
  }
}
