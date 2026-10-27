import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegistroData } from '../models/registro-data';
import { Usuario } from '../models/usuario';

@Service()
export class Auth {
  http = inject(HttpClient);

  // Devuelve un Observable: la petición sale recién cuando alguien hace subscribe
  registro(datos: RegistroData) {
    return this.http.post<Usuario>(`${environment.apiUrl}/auth/registro`, datos);
  }
}
