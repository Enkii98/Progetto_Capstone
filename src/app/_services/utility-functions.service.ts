import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MyPhotos } from '../_interfaces/my-photos';

import { UserService } from './user.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityFunctionsService {
  linkData!: String;

  linkSearchData!: string;

  //
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
  //
  //abilita-disabilita
  //
  check(form: FormGroup | null): boolean {
    // Se il FormGroup è nullo, disabilita il bottone
    if (!form) {
      return true;
    }

    // Verifica se ogni campo del FormGroup è stato completato
    const formValues = Object.values(form.value);
    const isFormComplete = formValues.every((value) => !!value);

    // Abilita il bottone solo se il FormGroup è completo
    return isFormComplete;
  }

  checkLogin(form: FormGroup | null): boolean {
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

  //
  //
  //fa il check dei like del profilo e restituisce true =sei nei like o false = non sei nei like, ce bisogno di inserirla in un ciclo per fargli fare tutti i controlli
  //
  checkList(like: any[], list: any[], x: number): boolean {
    const objLike = JSON.stringify(like);
    const objList = JSON.stringify(list[x]);

    if (objLike.includes(objList)) {
      return true;
    }

    return false;
  }

  //seleziona stringa contenuta nel html
  captureClick(event: MouseEvent): void {
    const clickedLink = event.target as HTMLAnchorElement;
    const linkName = clickedLink.text;

    this.linkData = linkName;
    sessionStorage.setItem('friend', linkName);
    console.log('Profilo selezionato di: ', linkName);
  }

  //validatore input immagini
  isImageUrl(url: String): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
    const extension = url.split('.').pop()!.toLowerCase();
    return imageExtensions.includes(extension);
  }
  //controlla se username puo essere creato solo se non esiste in una lista passata come parametro
  matchNewUser(forbiddenValues: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = forbiddenValues.some((val) => val === control.value);
      return forbidden ? { forbiddenValue: { value: control.value } } : null;
    };
  }

  // in base alla dimensione dello schermo viene scelta una foto contenuta nella pexels API di dimensioni diverse e risoluzione differete
  photoDimension(httpString: any): any {
    const StringPhoto = httpString;
    if (
      window.innerWidth >= 1200 &&
      httpString.startsWith('https://images.pexels.com')
    ) {
      const smallScreenString = StringPhoto.replace(/h=350/, '');

      const widthScreenString = `${smallScreenString}&fit=crop&h=627&w=1200`;

      return widthScreenString;
    } else {
      return StringPhoto;
    }
  }
}
