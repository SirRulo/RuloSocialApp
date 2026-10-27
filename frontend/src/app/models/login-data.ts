// Lo que se manda al POST /auth/login: se ingresa con el nombre de usuario
export interface LoginData {
  nombreUsuario: string;
  password: string;
}
