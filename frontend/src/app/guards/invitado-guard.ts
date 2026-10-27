import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../servicios/auth';

// Al revés que authGuard: login y registro son solo para quien NO inició sesión.
// Si ya hay sesión, manda a las publicaciones
export const invitadoGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.usuario()) {
    return true;
  }
  router.navigate(['/publicaciones']);
  return false;
};
