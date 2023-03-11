import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/_services/auth.service';
import { StorageService } from '../_services/_services/storage.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  buttonDisabled = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  names: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.names = this.storageService.getUser().name;
    }
  }

  onSubmit(): void {
    this.authService
      .login(this.form.get('username')?.value, this.form.get('password')?.value)
      .subscribe({
        next: (data) => {
          this.storageService.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          this.names = this.storageService.getUser().name;
          this.reloadPage();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        },
      });
  }

  reloadPage(): void {
    window.location.reload();
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
