import { Injectable } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormGroup,
} from '@angular/forms';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityFunctionsService {
  linkData!: String;
  //
  //match delle passsword
  //
  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  //
  //conversione prima lettera (false = minuscola | true = maiuscola)
  //
  capitalizeFirstLetter(str: string, uppercase: boolean): string {
    if (uppercase) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return str.charAt(0).toLowerCase() + str.slice(1);
    }
  }

  //
  //abilita-disabilita
  //
  check(form: FormGroup | null): boolean {
    // Se il FormGroup è nullo, disabilita il bottone
    if (!form) {
      return false;
    }

    // Verifica se ogni campo del FormGroup è stato completato
    const formValues = Object.values(form.value);
    const isFormComplete = formValues.every((value) => !!value);

    // Abilita il bottone solo se il FormGroup è completo
    return isFormComplete;
  }
}
