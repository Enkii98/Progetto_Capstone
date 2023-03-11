import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UtilityFunctionsService } from '../_services/_services/utility-functions.service';
import { AuthService } from '../_services/_services/auth.service';
import { Observable } from 'rxjs';

export function onlyLetters(
  control: AbstractControl
): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  return new Promise((resolve) => {
    const lettersPattern = /^[a-zA-Z\s]*$/;
    if (!control.value.match(lettersPattern)) {
      resolve({ asyncValidationError: true });
    } else {
      resolve(null);
    }
  });
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    // acceptTerms: new FormControl(false),
  });

  submitted = false;
  //jwt
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private customValidation: UtilityFunctionsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required, onlyLetters],
        surname: ['', Validators.required, onlyLetters],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
            ),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        // acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [
          this.customValidation.matchPassword('password', 'confirmPassword'),
        ],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    //da pulire

    console.log(JSON.stringify(this.form.value, null, 2));
    console.log(this.form.get('name')?.value);

    //sub dei dati del form nel db back-end

    this.authService
      .register(
        this.customValidation.capitalizeFirstLetter(
          this.form.get('name')?.value,
          true
        ),
        this.customValidation.capitalizeFirstLetter(
          this.form.get('surname')?.value,
          true
        ),
        this.form.get('username')?.value,
        this.customValidation.capitalizeFirstLetter(
          this.form.get('email')?.value,
          false
        ),
        this.form.get('password')?.value
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
      });
  }

  //bottone reset tutti gli elementi

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

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

  ////////////////////////ERRORI//////////////////////////////////

  getErrorMessage = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}
