export class Pelicula {
    id: number;
    nombre: string;
    sinopsis: string;
    categoriaId: number | null;
    fechaEstreno: Date;
    puntuacion: number;
    activo: boolean;

    constructor(id: number, nombre: string, sinopsis: string, categoriaId: number | null, fechaEstreno: Date, puntuacion: number, activo: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.sinopsis = sinopsis;
        this.categoriaId = categoriaId;
        this.fechaEstreno = fechaEstreno;
        this.puntuacion = puntuacion;
        this.activo = activo;
    }
}