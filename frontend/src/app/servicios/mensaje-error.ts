import { HttpErrorResponse } from '@angular/common/http';

// Convierte el error del back en un texto para mostrar en pantalla.
// El back manda "message" como texto (401, 403, 409) o como lista (400 del ValidationPipe)
export function mensajeDeError(error: HttpErrorResponse, porDefecto: string) {
  if (error.status === 0) {
    return 'No pudimos conectarnos con el servidor. Probá de nuevo en un rato.';
  }
  const mensaje = error.error?.message;
  if (Array.isArray(mensaje)) {
    return mensaje.join('. ');
  }
  return mensaje ?? porDefecto;
}
