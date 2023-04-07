import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_services/_shared/event-bus.service';
import { StorageService } from './_services/storage.service';
import { UserService } from './_services/user.service';
import { User } from './_interfaces/User';
import { infoUser } from './_interfaces/infoUser';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from './_dialogWindows/dialog-search/dialog-search.component';
import { Router } from '@angular/router';
import { UtilityFunctionsService } from './_services/utility-functions.service';
import { DialogAddPhotoComponent } from './_dialogWindows/dialog-add-photo/dialog-add-photo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Progetto_Capstone';

  eventBusSub?: Subscription;

  dataSearch!: string;
  addPhoto!: string;

  //apertura menu laterale
  showFiller = false;

  //cancella campo search
  value = '';

  //apri chiudi drawer
  showDrawer = false;

  //admin controll
  admin: boolean = false;

  roles: string[] = [];
  names: string[] = [];
  usernames: string[] = [];
  usernamesList: string[] = [];
  friendList: string[] = [];
  usersList: User[] = [];
  userDetails: infoUser[] = [];

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private usersService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private utility: UtilityFunctionsService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.roles = this.storageService.getUser().roles;

      if (this.roles.includes('ROLE_ADMIN')) {
        this.admin = true;
      }
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
    }
    //controlla quando il token scade ed effettua il logout
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logged(): boolean {
    return this.storageService.isLoggedIn();
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

  //////////////////////////////////DIALOG///////////////////////////////////////
  openDialogSearch(): void {
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      data: { name: this.dataSearch },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const data = localStorage.getItem('typeSearch');

      if (result) {
        if (data === 'Photo') {
          localStorage.setItem('typeSearch', 'no');
          localStorage.setItem('pexe', result);
          this.router.navigate(['/pexels']);
          setTimeout(() => {
            window.location.reload();
          });
        } else if (data === 'Users') {
          localStorage.setItem('typeSearch', 'no');
          localStorage.setItem('us', result);
          this.router.navigate(['/search']);
          setTimeout(() => {
            window.location.reload();
          });
        }
      }
    });
  }

  openDialogAddPhoto(): void {
    const dialogRef = this.dialog.open(DialogAddPhotoComponent, {
      data: { add: this.addPhoto },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
