import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula.model';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class ApiPeliculas {

  // Url del api
  private apiUrl = "https://www.crudpeliculas.somee.com/api"

  // Constructor
  constructor(private httpClient: HttpClient) {

  }

  // Metodos
  obtenerPeliculas() {
    return this.httpClient.get<Pelicula[]>(`${this.apiUrl}/Peliculas`);
  }

  agregarPelicula(pelicula: Pelicula) {
    return this.httpClient.post<any>(`${this.apiUrl}/Peliculas`, pelicula);
  }

  actualizarPelicula(pelicula: Pelicula) {
    return this.httpClient.put<any>(`${this.apiUrl}/Peliculas`, pelicula);
  }

  obtenerCategorias() {
    return this.httpClient.get<Categoria[]>(`${this.apiUrl}/Categorias`);
  }

}
