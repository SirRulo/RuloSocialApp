// Lo que se manda al POST /auth/registro (sin "repetir contraseña": eso se valida solo en el front)
export interface RegistroData {
  nombre: string;
  apellido: string;
  correo: string;
  nombreUsuario: string;
  password: string;
  fechaNacimiento: string;
  descripcion: string;
}
