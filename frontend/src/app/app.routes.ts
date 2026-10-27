import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { invitadoGuard } from './guards/invitado-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'publicaciones',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./componentes/login/login').then(m => m.Login),
        canActivate: [invitadoGuard]
    },
    {
        path: 'registro',
        loadComponent: () => import('./componentes/registro/registro').then(m => m.Registro),
        canActivate: [invitadoGuard]
    },
    // El feed: listado de publicaciones. A la app solo se entra logueado
    {
        path: 'publicaciones',
        loadComponent: () => import('./componentes/publicaciones/publicaciones').then(m => m.Publicaciones),
        canActivate: [authGuard]
    },
    {
        path: 'perfil',
        loadComponent: () => import('./componentes/perfil/perfil').then(m => m.Perfil),
        canActivate: [authGuard]
    },
    // Siempre al final: cualquier URL que no coincida con las anteriores
    {
        path: '**',
        loadComponent: () => import('./componentes/error/error').then(m => m.Error)
    }
];
