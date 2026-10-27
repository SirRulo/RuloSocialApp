import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../servicios/auth';

// Solo pide estar logueado (igual que authGuard de la cátedra, en guards).
// Si no hay sesión, manda al login
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.usuario()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
