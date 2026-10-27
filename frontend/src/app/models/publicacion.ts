// Forma de una publicación como la va a devolver el back en el sprint 2
export interface Publicacion {
  _id: string;
  titulo: string;
  mensaje: string;
  imagenUrl: string;
  usuario: {
    _id: string;
    nombreUsuario: string;
    imagenUrl: string;
  };
  // ids de los usuarios que dieron "me gusta": uno por persona, se cuenta con el largo
  meGusta: string[];
  createdAt: string;
}
