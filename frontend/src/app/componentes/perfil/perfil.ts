import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Auth } from '../../servicios/auth';

@Component({
  imports: [DatePipe],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})
export class Perfil {
  // 'public' para leer auth.usuario() desde el HTML
  constructor(public auth: Auth) {}
}
