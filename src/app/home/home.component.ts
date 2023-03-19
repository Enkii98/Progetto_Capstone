import { Component, OnInit } from '@angular/core';
import { MyPhotos } from '../_interfaces/my-photos';
import { PhotoServiceService } from '../_services/photo-service.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { UtilityFunctionsService } from '../_services/utility-functions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: String[] = [];
  currentUserId: Number[] = [];

  follows: String[] = [];

  homePhoto: MyPhotos[] = [];

  constructor(
    private storageService: StorageService,
    private photoService: PhotoServiceService,
    private userService: UserService,
    private utility: UtilityFunctionsService
  ) {}

  // ngOnInit(): void {
  //   this.currentUser = this.storageService.getUser().username;
  //   this.currentUserId = this.storageService.getUser().id;

  //   this.retrieveFollows();

  //   this.retrieveFriendPhoto(this.follows);

  //   this.shuffleArray(this.homePhoto);

  //   console.log('uffaaaa', this.follows);

  //   console.log('Foto contenute nella mia home: ', this.homePhoto);
  // }

  // //funzione che trova le persone che segue l utente
  // retrieveFollows(): void {
  //   this.userService
  //     .getMyFollow(parseInt(JSON.stringify(this.currentUserId)))
  //     .subscribe({
  //       next: (data) => {
  //         this.follows = data;
  //         console.log('Le persone che seguo: ', this.follows);
  //       },
  //       error: (e) => console.error(e),
  //     });
  // }

  async ngOnInit(): Promise<void> {
    this.currentUser = this.storageService.getUser().username;
    this.currentUserId = this.storageService.getUser().id;

    await this.retrieveFollows();

    this.retrieveFriendPhoto(this.follows.map((str) => str.valueOf()));

    this.shuffleArray(this.homePhoto);
  }

  //funzione che trova le persone che segue l utente
  async retrieveFollows(): Promise<void> {
    await this.userService
      .getMyFollow(parseInt(JSON.stringify(this.currentUserId)))
      .toPromise()
      .then((data) => {
        this.follows = data!;
        console.log('Le persone che seguo: ', this.follows);
      })
      .catch((e) => console.error(e));
  }

  //funzione che trova tutte le foto delle persone che segue l utente
  retrieveFriendPhoto(user: string[]): void {
    this.photoService.findAllfollowsPhotos(user).subscribe({
      next: (data) => {
        this.homePhoto = data;
        console.log('foto sulla home: ', this.homePhoto);
      },
      error: (e) => console.error(e),
    });
  }

  shuffleArray(array: any[]) {
    array.sort(() => Math.random() - 0.5);
  }

  captureClick(event: MouseEvent): void {
    const clickedLink = event.target as HTMLAnchorElement;
    const linkName = clickedLink.text;

    this.utility.linkData = linkName;
    sessionStorage.setItem('friend', linkName);
    console.log('Profilo selezionato di: ', linkName);
  }
}
