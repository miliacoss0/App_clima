import { Component, OnInit, signal } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonSpinner,
} from '@ionic/angular';

import { ClimaService } from '../services/clima.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonLabel, IonSpinner,
  ],
})
export class Tab2Page implements OnInit {
  cargando = signal(true);
  error = signal(false);
  dias = signal<{ fecha: string; max: number; min: number }[]>([]);

  constructor(private climaService: ClimaService) {}

  ngOnInit() {
    this.climaService.obtenerClima(-25.2637, -57.5759).subscribe({
      next: (datos) => {
       // console.log('Datos recibidos', datos);
        const lista = datos.daily.time.map((fecha: string, i: number) => ({
          fecha,
          max: datos.daily.temperature_2m_max[i],
          min: datos.daily.temperature_2m_min[i],
        }));
        this.dias.set(lista);
        this.cargando.set(false);
      },
      error: (e) => {
        console.error('Error al pedir el pronóstico:', e);
        this.error.set(true),
        this.error.set(false);
      },
    });
  }
}
