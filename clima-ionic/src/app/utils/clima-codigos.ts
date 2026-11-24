import { sunny, partlySunny, cloud, cloudy, rainy, thunderstorm, snow } from 'ionicons/icons';

export interface InfoClima {
    texto: string;
    icono: string;
}

export function describirClima(codigo: number): InfoClima {{
    if (codigo === 0) return { texto: 'Desejado', icono: sunny };
    if (codigo === 1 || codigo === 2) return { texto: 'Parcialmente nublado', icono: partlySunny };
    if (codigo == 3) return { texto: 'Nublado', icono: cloud };
    if (codigo == 45 || codigo === 48) return { texto: 'Niebla', icono: cloudy };
    if (codigo >= 51 && codigo <= 67) return { texto: 'Lluvia', icono: rainy };
    if (codigo >= 71 && codigo <= 77) return { texto: 'Nieve', icono: snow };
    if (codigo >= 80 && codigo <=82) return { texto: 'Chubasco', icono: rainy };
    if (codigo >= 95) return { texto: 'Tormenta', icono: thunderstorm };
    return { texto: 'Sin datos', icono: cloud};
    };
}