import { Component, OnInit, signal } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSpinner,
 } from '@ionic/angular';

import { ClimaService } from '../services/clima.service';
import { UbicacionService } from '../services/ubicacion.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonSpinner,
  ],
})
export class Tab1Page implements OnInit {
  cargando = signal(true);
  error = signal(false);
  temperatura = signal<number | null>(null);

  constructor (
    private climaService: ClimaService,
    public ubicacion: UbicacionService) {}

  ngOnInit() {
    const ciudad = this.ubicacion.ciudadActual();
    this.climaService.obtenerClima(ciudad.latitud, ciudad.longitud).subscribe({
      next: (datos) => {
        this.temperatura.set(datos.current.temperature_2m);
        this.cargando.set(false);
        },
      error: (e) => {
        console.error('Error al pedir el clima:', e);
        this.error.set(true);
        this.cargando.set(false);
      },
    });
  }
}
