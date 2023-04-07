import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UtilityFunctionsService } from '../_services/utility-functions.service';
import { User } from '../_interfaces/User';
import { UserService } from '../_services/user.service';
import { infoUser } from '../_interfaces/infoUser';
import { PhotoServiceService } from '../_services/photo-service.service';
import { Router } from '@angular/router';

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

  //bottone visibilita password
  hide = true;

  buttonDisabled = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  names: string[] = [];
  usernames: string[] = [];
  usernamesList: string[] = [];
  friendList: string[] = [];
  usersList: User[] = [];
  userDetails: infoUser[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private utility: UtilityFunctionsService,
    private usersService: UserService,
    private photoService: PhotoServiceService,
    private router: Router
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
      this.usernames = this.storageService.getUser().username;
      //localStorage
      localStorage.setItem('username', this.storageService.getUser().username);
      localStorage.setItem('id', this.storageService.getUser().id);
      this.usersService.getAllUsers().subscribe((users) => {
        this.usersList = users;
        localStorage.setItem('list', JSON.stringify(this.usersList));
      });
      this.usersService.getAllUsernames().subscribe((users) => {
        this.usernamesList = users;
      });
      this.usersService
        .getInfoByUsername(localStorage.getItem('username')!)
        .subscribe((users) => {
          this.userDetails = users;
        });
      if (this.router.url === '/login') {
        this.router.navigate(['/profile']);
      }
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
          this.router.navigate(['/profile']);
          setTimeout(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        },
      });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //abilita-disabilita bottone invio dati se tutti i cambi sono compilati
  loginCheck(form: FormGroup | null): boolean {
    return this.utility.checkLogin(form);
  }

  ////////////////////////ERRORI//////////////////////////////////

  getErrorMessage = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}
