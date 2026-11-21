import { Component, OnInit, signal } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonSpinner,
} from '@ionic/angular';

import { Ciudad, CiudadService } from '../services/ciudades.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonLabel, IonSpinner,],
})
export class Tab3Page implements OnInit {
  cargando = signal(true);
  error = signal(false);
  ciudades = signal<Ciudad[]>([]);

  constructor( private ciudadService: CiudadService) {}

  ngOnInit() {
    this.ciudadService.obtenerCiudades().subscribe({
      next: (datos) => {
        console.log('Ciudades recibidas', datos);
        this.ciudades.set(datos);
        this.cargando.set(false);
     },
      error: (e) => {
        console.error('Error al pedir las ciudades:', e);
        this.error.set(true);
        this.cargando.set(false);
      },
    });
  }
}
