// Lo que devuelve el back (nunca trae la contraseña)
export interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  correo: string;
  nombreUsuario: string;
  fechaNacimiento: string;
  descripcion: string;
  imagenUrl: string;
  perfil: 'usuario' | 'administrador';
  habilitado: boolean;
  createdAt: string;
}
