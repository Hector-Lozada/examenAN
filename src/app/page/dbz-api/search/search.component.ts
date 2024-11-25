import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() eventEmitirTermino = new EventEmitter<string>();


  getTermin(termino:string){
    console.log(termino)
    this.eventEmitirTermino.emit(termino)
  }
}
