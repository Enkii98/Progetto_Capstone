import { Component, OnInit } from '@angular/core';
import { User } from '../_interfaces/User';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { UtilityFunctionsService } from '../_services/utility-functions.service';
import { infoUser } from '../_interfaces/infoUser';
import { PhotoServiceService } from '../_services/photo-service.service';

const currentUser = localStorage.getItem('id');

@Component({
  selector: 'app-list-users-for-admin',
  templateUrl: './list-users-for-admin.component.html',
  styleUrls: ['./list-users-for-admin.component.scss'],
})
export class ListUsersForAdminComponent implements OnInit {
  currentUser: Number[] = [];
  username: String[] = [];

  //utenti esistenti trovati
  all: string[] = [];

  allInfo: infoUser[] = [];

  admin: boolean = false;

  submitted = false;

  user: User[] = [];

  constructor(
    private photoService: PhotoServiceService,
    private storageService: StorageService,
    private userService: UserService,
    private utility: UtilityFunctionsService
  ) {}

  async ngOnInit(): Promise<void> {
    //////////////////////////////////////////////

    ///////////////////////////////////////
    //
    //prendi user corrente se sei loggato e sei un admin
    //
    if (this.storageService.isLoggedIn()) {
      this.userService.isAdmin().subscribe({
        next: (data) => {
          this.admin = data;

          if (data) {
            this.admin = true;
            this.currentUser = this.storageService.getUser().id;
            this.username = this.storageService.getUser().username;

            ///////////////////////////////////////////////////////////////////////////

            this.retriveListUser();
          }
        },
        error: (err) => {
          console.log(err);
          if (err.error) {
            console.log(JSON.parse(err.error).message);
          } else {
            console.log('Error with status: ', err.status);
          }
        },
      });
    }
  }

  retriveListUser() {
    this.userService.getAllUsernames().subscribe(
      (results) => {
        this.all = results.filter(
          (string) => string !== localStorage.getItem('username')
        );

        if (this.all.length > 0) {
          this.userService.getAllFollowsInfo(this.all).subscribe({
            next: (res) => {
              this.allInfo = res;
              console.log(this.allInfo);
            },
            error: (e) => {},
          });
        } else {
          console.log('follows not found');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findPhotoProfile(searchName: string | String): String | undefined | null {
    const foundObject = this.allInfo.find((obj) => obj.username === searchName);
    return foundObject?.profilePhoto;
  }

  DeleteProfile(username: string) {
    this.userService.deleteAllFollows(this.user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {},
    });

    this.photoService.deleteAllUserPhotos(username).subscribe(() => {});

    this.userService.deleteInfoByUsername(username).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {},
    });

    this.userService
      .deleteUserByUsername(username)
      .then((response) => {
        console.log(response);

        this.retriveListUser();
      })
      .catch((error) => {
        // Gestisci l'errore
        console.log(error);
      });
  }

  click(event: MouseEvent) {
    return this.utility.captureClick(event);
  }
}
