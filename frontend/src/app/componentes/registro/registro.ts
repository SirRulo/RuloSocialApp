import { Component, OnDestroy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Auth } from '../../servicios/auth';
import { mensajeDeError } from '../../servicios/mensaje-error';
import { clavesCoincidenValidator, fechaPasadaValidator } from '../../validators/usuario.validators';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro implements OnDestroy {
  // Las mismas reglas que el DTO del back: 8 caracteres, una mayúscula y un número
  controlPassword = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/)],
  });

  formRegistro = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    apellido: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    correo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    nombreUsuario: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    password: this.controlPassword,
    repetirPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, clavesCoincidenValidator(this.controlPassword)],
    }),
    fechaNacimiento: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, fechaPasadaValidator()],
    }),
    descripcion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(200)],
    }),
  });

  // La imagen queda fuera del FormGroup: se sube recién cuando veamos subida de archivos
  imagen = signal<File | null>(null);
  vistaPrevia = signal<string | null>(null);

  enviando = signal(false);
  mensaje = signal('');
  registrado = signal(false);
  suscripcion?: Subscription;

  constructor(private auth: Auth) {}

  // Para mostrar el error de un campo solo después de que el usuario lo tocó
  mostrarError(campo: string) {
    const control = this.formRegistro.get(campo);
    return control !== null && control.touched && control.invalid;
  }

  // Reglas de la contraseña: se muestran desde el principio y se marcan a medida que se cumplen
  tieneLargo() {
    return this.controlPassword.value.length >= 8;
  }

  tieneMayuscula() {
    return /[A-Z]/.test(this.controlPassword.value);
  }

  tieneNumero() {
    return /[0-9]/.test(this.controlPassword.value);
  }

  // Si cambia la contraseña, "repetir" se vuelve a validar (si no, quedaba con el resultado viejo)
  revalidarRepetir() {
    this.formRegistro.controls.repetirPassword.updateValueAndValidity();
  }

  elegirImagen(evento: Event) {
    const archivo = (evento.target as HTMLInputElement).files?.[0] ?? null;
    this.imagen.set(archivo);
    // URL temporal del navegador para mostrar la foto antes de subirla
    this.vistaPrevia.set(archivo ? URL.createObjectURL(archivo) : null);
  }

  registrarse() {
    this.enviando.set(true);
    this.mensaje.set('');

    // getRawValue trae todos los campos; "repetirPassword" no se manda al back
    const { repetirPassword, ...datos } = this.formRegistro.getRawValue();

    this.suscripcion = this.auth.registro(datos).subscribe({
      next: () => {
        this.enviando.set(false);
        this.registrado.set(true);
      },
      error: (error: HttpErrorResponse) => {
        this.enviando.set(false);
        this.mensaje.set(mensajeDeError(error, 'Ocurrió un error al crear la cuenta.'));
      },
    });
  }

  ngOnDestroy(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }
}
