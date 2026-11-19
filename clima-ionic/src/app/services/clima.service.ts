import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root'})
export class ClimaService {
    constructor(private http: HttpClient) {}

    obtenerClima(latitud: number, longitud: number): Observable<any> {
        const url = `${environment.apiUrl}?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;        return this.http.get(url);
    }
}