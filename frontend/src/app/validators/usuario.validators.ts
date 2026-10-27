import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Igual que en clase-formularios: compara este control con otro que recibe por parámetro
export function clavesCoincidenValidator(controlACoincidir: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value !== controlACoincidir.value) {
      return { losControlesNoCoinciden: true };
    } else {
      return null;
    }
  };
}

// La fecha de nacimiento no puede ser hoy ni del futuro
export function fechaPasadaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && new Date(control.value) >= new Date()) {
      return { fechaFutura: true };
    } else {
      return null;
    }
  };
}
