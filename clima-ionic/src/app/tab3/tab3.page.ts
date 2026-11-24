import { Component, OnInit, computed, signal } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonSpinner,
  IonSearchbar,
} from '@ionic/angular';

import { Ciudad, CiudadService } from '../services/ciudades.service';
import { UbicacionService } from '../services/ubicacion.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonLabel, IonSpinner, IonSearchbar],
})
export class Tab3Page implements OnInit {
  cargando = signal(true);
  error = signal(false);
  ciudades = signal<Ciudad[]>([]);

  busqueda = signal('');
  ciudadesFiltradas = computed(() => 
    this.ciudades().filter((c) =>
      c.nombre.toLowerCase().includes(this.busqueda().toLowerCase())
    )
  );

  constructor( 
    private ciudadService: CiudadService,
    public ubicacion: UbicacionService) {}

  ngOnInit() {
    this.ciudadService.obtenerCiudades().subscribe({
      next: (datos) => {
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

  seleccionar(ciudad: Ciudad) {
    console.log('Ciudad elegida:', ciudad.nombre);
    this.ubicacion.elegir(ciudad);
  }

  buscar(evento: CustomEvent) {
    this.busqueda.set((evento.detail.value ?? '').toString());
  }
}
