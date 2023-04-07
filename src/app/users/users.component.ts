import { Component, OnInit } from '@angular/core';
import { User } from '../_interfaces/User';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { UtilityFunctionsService } from '../_services/utility-functions.service';
import { infoUser } from '../_interfaces/infoUser';

const currentUser = localStorage.getItem('id');

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  currentUser: Number[] = [];
  username: String[] = [];

  //lista di username dei follows
  followList: String[] | undefined = [];

  //utenti esistenti trovati
  searchResults: string[] = [];

  //lista di follow/unfollow
  flw: Boolean[] = [];

  allInfo: infoUser[] = [];

  submitted = false;

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private utility: UtilityFunctionsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.retrieveFollows();
    //
    //prendi user corrente se sei loggato
    //
    if (this.storageService.isLoggedIn()) {
      this.currentUser = this.storageService.getUser().id;
      this.username = this.storageService.getUser().username;

      ///////////////////////////////////////////////////////////////////////////
      this.followList = await this.userService
        .getMyFollow(parseInt(JSON.stringify(this.currentUser)))
        .toPromise();

      this.userService.searchUsers(localStorage.getItem('us')!).subscribe(
        (results) => {
          this.searchResults = results;
          for (let i = 0; i < this.searchResults.length; i++) {
            this.flw.push(
              this.utility.checkList(this.followList!, this.searchResults, i)
            );
          }

          if (this.searchResults.length > 0) {
            this.userService.getAllFollowsInfo(this.searchResults).subscribe({
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

    this.user();
  }

  //
  //
  //user info
  //
  user(): void {
    const IdUser = parseInt(JSON.stringify(this.currentUser));
    console.log('io sono user con id: ', IdUser);
    console.log('lista follows: ', this.followList);
  }

  findPhotoProfile(searchName: string | String): String | undefined | null {
    const foundObject = this.allInfo.find((obj) => obj.username === searchName);
    return foundObject?.profilePhoto;
  }

  //
  //
  //ritrova i follows quando atterro sulla rotta
  //
  retrieveFollows(): void {
    this.userService.getMyFollow(parseInt(currentUser!)).subscribe({
      next: (data) => {
        this.followList = data;
        console.log('Le persone che seguo: ', this.followList);
      },
      error: (e) => console.error(e),
    });
  }

  click(event: MouseEvent) {
    return this.utility.captureClick(event);
  }

  //
  //
  //aggiunta follow
  //
  follow(index: number): void {
    const data = this.searchResults[index];
    const IdUser = parseInt(JSON.stringify(this.currentUser));

    console.log('follow aggiunto a : ', data);
    console.log('io sono user con id: ', IdUser);

    this.userService.follow(IdUser, data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });

    this.flw[index] = true;
  }

  //
  //
  //elimina follow
  //
  unfollow(index: number) {
    const data = this.searchResults[index];
    console.log('follow rimosso a : ', data);
    this.userService.unfollow(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });

    this.flw[index] = false;
  }
}
