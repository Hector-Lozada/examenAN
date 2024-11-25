import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { cocteles } from '../interfaces/coctel';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() public coctel: Partial<cocteles['drinks'][number]> = {};


  @ViewChild('modalElement') public modal!: ElementRef;
  private bootstrapModal: any;
  constructor(
    @Inject(PLATFORM_ID) private plataformID:object
  ){}

  ngAfterViewInit(){
    if(isPlatformBrowser(this.plataformID)){
      this.inicializarModal()
    }
  }

  inicializarModal(){
    import('bootstrap').then(bootstrap =>{
      this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement)
    })
  }

  open(coc: Partial<cocteles['drinks'][number]>){
    this.coctel = coc
    if(isPlatformBrowser(this.plataformID)){
      if(this.bootstrapModal){
        this.bootstrapModal.show()
      }else{
        this.inicializarModal()
        setTimeout(()=>{
          this.bootstrapModal.show();
        }, 0)
      }
    }
  }
}
