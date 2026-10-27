import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Publicacion } from '../../models/publicacion';

// Cada publicación es un componente: la recibe por input() y avisa las acciones por output()
// (como card-usuario de ejemploInputOutput)
@Component({
  imports: [DatePipe],
  selector: 'app-tarjeta-publicacion',
  styleUrl: './tarjeta-publicacion.css',
  templateUrl: './tarjeta-publicacion.html',
})
export class TarjetaPublicacion {
  publicacion = input<Publicacion>();
  // El padre le dice si el usuario logueado ya dio "me gusta" (para pintar el corazón)
  meGustaDado = input(false);

  alternarMeGusta = output<Publicacion>();

  darMeGusta() {
    this.alternarMeGusta.emit(this.publicacion()!);
  }
}
