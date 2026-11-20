import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface Ciudad{
    nombre: string;
    latitud: number;
    longitud: number;
}

@Injectable({ providedIn: 'root'})
export class CiudadService {
    constructor(private http: HttpClient) {}

    obtenerCiudades(): Observable<Ciudad[]> {
        return this.http.get<Ciudad[]>(environment.ciudadesUrl);
    }
}