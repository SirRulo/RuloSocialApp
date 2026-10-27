import { Publicacion } from '../models/publicacion';

// Datos de ejemplo para maquetar el feed en el sprint 1.
// En el sprint 2 se borra este archivo y las publicaciones llegan del back con HttpClient
export const PUBLICACIONES_MOCK: Publicacion[] = [
  {
    _id: '1',
    titulo: 'Récord nuevo en Pac-Man',
    mensaje:
      'Después de tres semanas practicando la ruta de los fantasmas, pasé los 120.000 puntos en el gabinete del club. La clave es no comerse la fruta apurado.',
    imagenUrl: '',
    usuario: { _id: 'u1', nombreUsuario: 'pixel_ana', imagenUrl: '' },
    meGusta: ['u2', 'u3', 'u4'],
    createdAt: '2026-10-26T18:30:00.000Z',
  },
  {
    _id: '2',
    titulo: 'Encontré un Atari 2600 en una feria',
    mensaje:
      'Funciona perfecto, vino con el joystick original y cinco cartuchos: Pitfall!, River Raid, Combat, Space Invaders y Frogger. ¿Alguien sabe cómo limpiar los contactos sin dañarlos?',
    imagenUrl: '',
    usuario: { _id: 'u2', nombreUsuario: 'retro_tito', imagenUrl: '' },
    meGusta: ['u1'],
    createdAt: '2026-10-25T14:05:00.000Z',
  },
  {
    _id: '3',
    titulo: '¿Cuál fue su primera consola?',
    mensaje: 'La mía fue un family game con el cartucho 9999 en 1. Todavía me acuerdo del ruido al prenderlo.',
    imagenUrl: '',
    usuario: { _id: 'u3', nombreUsuario: 'cartucho99', imagenUrl: '' },
    meGusta: ['u1', 'u2', 'u4', 'u5', 'u6'],
    createdAt: '2026-10-24T22:40:00.000Z',
  },
];
