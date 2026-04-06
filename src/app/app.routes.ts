import { Routes } from '@angular/router';
import { AdminPeliculas } from './pages/admin-peliculas/admin-peliculas';
import { AdminCategorias } from './pages/admin-categorias/admin-categorias';

export const routes: Routes = [
    {path: "peliculas", component: AdminPeliculas},
    {path: "categorias", component: AdminCategorias}
];
