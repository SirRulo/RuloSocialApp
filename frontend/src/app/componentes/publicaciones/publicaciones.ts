import { Component, signal } from '@angular/core';
import { Publicacion } from '../../models/publicacion';
import { Auth } from '../../servicios/auth';
import { PUBLICACIONES_MOCK } from '../../servicios/publicaciones-mock';
import { TarjetaPublicacion } from '../tarjeta-publicacion/tarjeta-publicacion';

@Component({
  imports: [TarjetaPublicacion],
  selector: 'app-publicaciones',
  styleUrl: './publicaciones.css',
  templateUrl: './publicaciones.html',
})
export class Publicaciones {
  // Sprint 1: datos de ejemplo. En el sprint 2 llegan del GET /publicaciones (con orden y paginado)
  publicaciones = signal<Publicacion[]>(PUBLICACIONES_MOCK);
  orden = signal<'fecha' | 'meGusta'>('fecha');

  constructor(private auth: Auth) {}

  // Arreglo nuevo con sort (no se toca el original): por fecha, las más nuevas primero
  publicacionesOrdenadas() {
    return [...this.publicaciones()].sort((a, b) =>
      this.orden() === 'fecha'
        ? b.createdAt.localeCompare(a.createdAt)
        : b.meGusta.length - a.meGusta.length,
    );
  }

  cambiarOrden(evento: Event) {
    this.orden.set((evento.target as HTMLSelectElement).value as 'fecha' | 'meGusta');
  }

  yaDioMeGusta(publicacion: Publicacion) {
    return publicacion.meGusta.includes(this.auth.usuario()?._id ?? '');
  }

  // Llega por el output() de la tarjeta. Si ya lo había dado, lo quita (uno por usuario)
  alternarMeGusta(publicacion: Publicacion) {
    const id = this.auth.usuario()!._id;
    const meGusta = this.yaDioMeGusta(publicacion)
      ? publicacion.meGusta.filter((u) => u !== id)
      : [...publicacion.meGusta, id];

    this.publicaciones.set(
      this.publicaciones().map((p) => (p._id === publicacion._id ? { ...p, meGusta } : p)),
    );
  }
}
