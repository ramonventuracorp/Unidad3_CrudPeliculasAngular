import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiPeliculas } from '../../services/api-peliculas';
import { Pelicula } from '../../models/pelicula.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';

declare var bootstrap: any;
@Component({
  selector: 'app-admin-peliculas',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './admin-peliculas.html',
  styleUrl: './admin-peliculas.css',
})

export class AdminPeliculas implements OnInit {

  public peliculas: Pelicula[] = [];
  public categorias: Categoria[] = [];


  public peliculaId: number = 0;
  public nombrePelicula: string = "";
  public sinopsisPelicula: string = "";
  public fechaEstrenoPelicula: Date = new Date();
  public puntuacionPelicula: number = 0;
  public categoriaId: number | null = null;
  public accionModal: string = "Guardar";

  constructor(private apiPeliculas: ApiPeliculas, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.obtenerPeliculas();
    this.obtenerCategorias();
  }


  public modal: any;

  ngAfterViewInit() {
    const modal = document.getElementById("modalPeliculas");
    this.modal = new bootstrap.Modal(modal);
  }

  obtenerPeliculas() {
    this.apiPeliculas.obtenerPeliculas().subscribe({
      next: (data) => {
        this.peliculas = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { },
    })
  }

  obtenerCategorias() {
    this.apiPeliculas.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { },
    })
  }

  abrirModalGuardarPelicula(): void {
    this.inicializarControles();
    this.abrirModal();
  }

  guardarPelicula(): void {

    if (this.accionModal.toUpperCase() == "GUARDAR") {
      this.agregarPelicula();
    } else {
      this.actualizarPelicula();
    }

  }

  agregarPelicula(): void {
    const pelicula: Pelicula =
      new Pelicula(0, this.nombrePelicula, this.sinopsisPelicula, this.categoriaId, this.fechaEstrenoPelicula, this.puntuacionPelicula, true);

    this.apiPeliculas.agregarPelicula(pelicula).subscribe({
      next: (data) => {
        this.obtenerPeliculas();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { },
    })
  }

  actualizarPelicula(): void {
    const pelicula: Pelicula =
      new Pelicula(this.peliculaId, this.nombrePelicula, this.sinopsisPelicula, this.categoriaId, this.fechaEstrenoPelicula, this.puntuacionPelicula, true);

    this.apiPeliculas.actualizarPelicula(pelicula).subscribe({
      next: (data) => {
        this.obtenerPeliculas();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { },
    })
  }

  asignandoValoresEnModalParaActualizar(pelicula: Pelicula): void {
    this.accionModal = "Actualizar";

    this.abrirModal();

    this.peliculaId = pelicula.id;
    this.nombrePelicula = pelicula.nombre;
    this.puntuacionPelicula = pelicula.puntuacion;
    this.sinopsisPelicula = pelicula.sinopsis;
    this.categoriaId = pelicula.categoriaId;
    this.fechaEstrenoPelicula = pelicula.fechaEstreno;

  }



  abrirModal(): void {
    this.modal.show();
  }

  cerrarModal(): void {
    this.modal.hide();
  }

  inicializarControles(): void {
    this.nombrePelicula = "";
    this.puntuacionPelicula = 0;
    this.sinopsisPelicula = "";
    this.categoriaId = null;
    this.fechaEstrenoPelicula = new Date();
  }
}
