import {
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { personoaje } from '../interfaces/dragonball';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-nodal',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './nodal.component.html',
  styleUrl: './nodal.component.css',
})
export class NodalComponent {
  @Input() personajeDbz: personoaje = {
    id: 0,
    name: '',
    ki: '',
    maxKi: '',
    race: '',
    gender: '',
    description: '',
    image: '',
    affiliation: '',
    deletedAt: null,
    originPlanet: {
      id: 0,
      name: '',
      isDestroyed: false,
      description: '',
      image: '',
      deletedAt: null,
    },
    transformations: [], // transformations se inicializa como un arreglo vacío
  };

  private bootstrapModal: any;
  @ViewChild('modalElement') public modal!: ElementRef;
  constructor(@Inject(PLATFORM_ID) private plataformId: object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {
    import('bootstrap').then((boostrap) => {
      this.bootstrapModal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open(personaje: personoaje) {
    this.personajeDbz = personaje;
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }
}
