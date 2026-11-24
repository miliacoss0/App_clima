import { Component, OnInit, signal } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSpinner, IonRefresher, IonRefresherContent, IonToast, 
  RefresherCustomEvent,
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
    IonSpinner, IonRefresher, IonRefresherContent, IonToast,
  ],
})
export class Tab1Page implements OnInit {
  cargando = signal(true);
  error = signal(false);
  temperatura = signal<number | null>(null);
  toastAbierto = signal(false);
  toastMensaje = signal('');

  constructor (
    private climaService: ClimaService,
    public ubicacion: UbicacionService,) {}

  private ultimaCiudad = '';

  ngOnInit() {
    this.cargarClima();
  }

  ionViewWillEnter() {
    if (this.ubicacion.ciudadActual().nombre !== this.ultimaCiudad) {
      this.cargarClima();
    }
  }

  refrescar(evento: RefresherCustomEvent) {
    this.cargarClima(() => evento.target.complete());
  }

  private cargarClima(alTerminar?: () => void) {
    const ciudad = this.ubicacion.ciudadActual();
    this.ultimaCiudad = ciudad.nombre;
    if (!alTerminar) {
      this.cargando.set(true);
    }
    this.error.set(false);
    this.climaService.obtenerClima(ciudad.latitud, ciudad.longitud).subscribe({
      next: (datos) => {
        this.temperatura.set(datos.current.temperature_2m);
        this.cargando.set(false);
        if (alTerminar) {
          alTerminar();
          this.mostrarAviso('Clima acutalizado');
        }
      },
      error: (e) => {
        console.error('Error al pedir el clima',e);
        this.error.set(true);
        this.cargando.set(false);
        if (alTerminar) {
          alTerminar();
          this.mostrarAviso('No se pudo actualizar');
        }
      },
    });
  }

  private mostrarAviso(mensaje: string) {
    this.toastMensaje.set(mensaje);
    this.toastAbierto.set(true);
  }
}