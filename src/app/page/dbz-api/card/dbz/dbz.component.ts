import { ModalComponent } from './../../../poke-api/modal/modal.component';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DbzService } from '../../services/dbz.service';
import { dragonball, personoaje } from '../../interfaces/dragonball';
import { NgFor, NgIf } from '@angular/common';
import { NodalComponent } from '../../nodal/nodal.component';

@Component({
  selector: 'app-dbz',
  standalone: true,
  imports: [NgIf, NgFor, NodalComponent],
  templateUrl: './dbz.component.html',
  styleUrl: './dbz.component.css'
})
export class DbzComponent implements OnChanges {
  @Input() public dragonPer: dragonball| undefined
  loadingImg:boolean = false

  @ViewChild(NodalComponent) public modal!:NodalComponent

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['dragonPer']){
        this.loadingImg = false
      }
  }

  openModal(personaje:personoaje){
    if(this.modal){
      this.modal.open(personaje)
    }
  }
}
