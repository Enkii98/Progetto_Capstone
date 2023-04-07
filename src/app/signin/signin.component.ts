import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UtilityFunctionsService } from '../_services/utility-functions.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

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
  });

  //visibilità password
  hide = true;

  usernamesList: string[] | undefined;
  emailList: string[] | undefined;

  submitted = false;
  //jwt
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private utility: UtilityFunctionsService,
    private authService: AuthService,
    private usersService: UserService,
    private router: Router,
    private storageService: StorageService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }

    this.usernamesList = await this.usersService.getAllUsernames().toPromise();
    this.emailList = await this.usersService.getAllEmails().toPromise();

    this.form = this.formBuilder.group(
      {
        name: [
          '',
          Validators.required,
          onlyLetters,
          Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
        ],
        surname: [
          '',
          Validators.required,
          onlyLetters,
          Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            this.utility.matchNewUser(this.usernamesList!),
            Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            this.utility.matchNewUser(this.emailList!),
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
        validators: [this.utility.matchPassword('password', 'confirmPassword')],
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

    //sub dei dati del form nel db back-end

    this.authService
      .register(
        this.utility.capitalizeFirstLetter(this.form.get('name')?.value, true),
        this.utility.capitalizeFirstLetter(
          this.form.get('surname')?.value,
          true
        ),
        this.form.get('username')?.value,
        this.utility.capitalizeFirstLetter(
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
          this.router.navigate(['/login']);
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

  //abilita-disabilita bottone invio dati se tutti i cambi sono compilati

  signinCheck(
    form: FormGroup | null,
    username: string,
    email: string
  ): boolean {
    if (
      this.utility.check(form) &&
      !this.usernamesList?.includes(username) &&
      !this.emailList?.includes(email) &&
      this.form.get('username')!.value.length >= 3 &&
      !this.form.controls['username'].hasError('pattern') &&
      !this.form.controls['email'].hasError('pattern')
    ) {
      return true;
    }

    return false;
  }

  ////////////////////////ERRORI//////////////////////////////////

  getErrorMessage = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}
