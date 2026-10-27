import { Component, OnDestroy, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginData } from '../../models/login-data';
import { Auth } from '../../servicios/auth';
import { mensajeDeError } from '../../servicios/mensaje-error';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnDestroy {
  // Formulario con signals (como el login de ejemploSupabase): el modelo es un signal
  loginModel = signal<LoginData>({
    nombreUsuario: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.nombreUsuario, { message: 'Ingresá tu nombre de usuario.' });
    required(schemaPath.password, { message: 'Ingresá tu contraseña.' });
  });

  enviando = signal(false);
  mensaje = signal('');
  suscripcion?: Subscription;

  constructor(private auth: Auth, private router: Router) {}

  ingresar(event: Event) {
    // Evita que el navegador recargue la página al enviar el form
    event.preventDefault();
    this.enviando.set(true);
    this.mensaje.set('');

    this.suscripcion = this.auth.login(this.loginModel()).subscribe({
      next: () => {
        this.enviando.set(false);
        this.router.navigate(['/publicaciones']);
      },
      error: (error: HttpErrorResponse) => {
        this.enviando.set(false);
        // 401 → "Las credenciales no son correctas" · 403 → "Tu usuario está deshabilitado"
        this.mensaje.set(mensajeDeError(error, 'No pudimos iniciar sesión.'));
      },
    });
  }

  ngOnDestroy(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }
}
