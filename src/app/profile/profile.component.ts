import { Component, OnInit } from '@angular/core';
import { MyPhotos } from '../_interfaces/my-photos';
import { AuthService } from '../_services/auth.service';
import { PhotoServiceService } from '../_services/photo-service.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { UtilityFunctionsService } from '../_services/utility-functions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: String[] = [];
  currentUserId: Number[] = [];

  follows: String[] = [];

  myPhotos: MyPhotos[] = [];

  constructor(
    private storageService: StorageService,
    private photoService: PhotoServiceService,
    private userService: UserService,
    private utility: UtilityFunctionsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //console log specifiche utente
    this.currentUser = this.storageService.getUser().username;
    this.currentUserId = this.storageService.getUser().id;
    console.log('Profilo di: ', this.currentUser);

    //popolazione delle immagini nel profilo all arrivo sulla rotta
    this.retrievePhoto();

    //popolazione dei follows nel profilo all arrivo sulla rotta

    this.retrieveFollows();
  }

  //funzione che trova le foto del utente
  retrievePhoto(): void {
    this.photoService.findByUsername(this.currentUser).subscribe({
      next: (data) => {
        this.myPhotos = data;
        console.log('Le mie foto: ', this.myPhotos);
      },
      error: (e) => console.error(e),
    });
  }

  //funzione che trova le persone che segue l utente
  retrieveFollows(): void {
    this.userService
      .getMyFollow(parseInt(JSON.stringify(this.currentUserId)))
      .subscribe({
        next: (data) => {
          this.follows = data;
          console.log('Le persone che seguo: ', this.follows);
        },
        error: (e) => console.error(e),
      });
  }

  captureClick(event: MouseEvent): void {
    const clickedLink = event.target as HTMLAnchorElement;
    const linkName = clickedLink.text;

    this.utility.linkData = linkName;
    sessionStorage.setItem('friend', linkName);
    console.log('Profilo selezionato di: ', linkName);
  }

  onDeleteUser() {
    this.userService
      .deleteUser()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // Gestisci l'errore
        console.log(error);
      });
  }
}
