import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyPhotos } from '../_interfaces/my-photos';
import { AuthService } from '../_services/auth.service';
import { PhotoServiceService } from '../_services/photo-service.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { UtilityFunctionsService } from '../_services/utility-functions.service';

const currentUsername = localStorage.getItem('username');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: String[] = [];
  currentUserId: Number[] = [];
  @Input() currentDescription: string = '';
  user: String = currentUsername!;

  follows: String[] = [];

  myPhotos: MyPhotos[] = [];

  constructor(
    private storageService: StorageService,
    private photoService: PhotoServiceService,
    private userService: UserService,
    private utility: UtilityFunctionsService,
    private authService: AuthService,
    private router: Router
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

  updateDescription(index: any): void {
    console.log(
      'io sono la tua bellissima photo',
      index,
      this.currentDescription
    );

    this.photoService.patch(index, this.currentDescription).subscribe({
      next: (res) => {
        console.log(res);
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
    this.userService.deleteAllFollows(this.user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });

    this.photoService.deleteAllUserPhotos(this.user).subscribe(() => {});

    this.userService
      .deleteUser()
      .then((response) => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        // Gestisci l'errore
        console.log(error);
      });
  }

  deletePhoto(index: any) {
    console.log('id della foto: ', index);
    this.photoService.delete(index).subscribe({
      next: (res) => {
        console.log(res);
        this.retrievePhoto();
      },
      error: (e) => console.error(e),
    });
  }
}
