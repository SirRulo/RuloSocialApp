import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegistroData } from '../models/registro-data';
import { LoginData } from '../models/login-data';
import { Usuario } from '../models/usuario';

@Service()
export class Auth {
  http = inject(HttpClient);

  // Estado de sesión: el usuario logueado o null. Por ahora vive en memoria (F5 lo borra);
  // en el sprint 3 se reemplaza por el token + POST /auth/autorizar
  usuario = signal<Usuario | null>(null);

  // Devuelve un Observable: la petición sale recién cuando alguien hace subscribe
  registro(datos: RegistroData) {
    return this.http.post<Usuario>(`${environment.apiUrl}/auth/registro`, datos);
  }

  login(datos: LoginData) {
    return this.http.post<Usuario>(`${environment.apiUrl}/auth/login`, datos);
  }

  iniciarSesion(usuario: Usuario) {
    this.usuario.set(usuario);
  }

  cerrarSesion() {
    this.usuario.set(null);
  }
}
