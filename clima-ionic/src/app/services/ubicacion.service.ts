import { Injectable, signal } from '@angular/core';
import { Ciudad } from './ciudades.service';

@Injectable({ providedIn: 'root' })
export class UbicacionService {
    ciudadActual = signal<Ciudad>({
        nombre: 'Asunción',
        latitud: -25.2822,
        longitud: -57.5297,
    });

    elegir(ciudad: Ciudad) {
        this.ciudadActual.set(ciudad);
    }
}