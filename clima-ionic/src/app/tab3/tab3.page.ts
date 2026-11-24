import { Component, OnInit, computed, signal } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonSpinner,
  IonSearchbar,
} from '@ionic/angular';

import { Ciudad, CiudadService } from '../services/ciudades.service';
import { UbicacionService } from '../services/ubicacion.service';
import { Router } from '@angular/router'

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
    public ubicacion: UbicacionService,
    private router: Router,) {}

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
    this.ubicacion.elegir(ciudad);
    this.router.navigateByUrl('/tabs/tab1');
  }

  buscar(evento: CustomEvent) {
    this.busqueda.set((evento.detail.value ?? '').toString());
  }
}
