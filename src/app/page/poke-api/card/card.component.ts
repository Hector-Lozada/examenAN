import { Pokemon } from './../interfaces/pokemon';
import { Component, Input, input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Pokemons } from '../interfaces/pokemon';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, NgForOf, NgFor, ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges{
  @Input() public pokemonAll:Pokemons | undefined
  loadingImg:boolean = false
  @ViewChild(ModalComponent) public modal!:ModalComponent;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemonAll']){
      this.loadingImg = false
    }
  }

  openModal(pokeon:Pokemon){
    if(this.modal){
      this.modal.open(pokeon)
    }
  }
}
