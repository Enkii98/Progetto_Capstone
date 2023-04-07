import { Component, OnInit } from '@angular/core';
import { infoUser } from '../_interfaces/infoUser';
import { MyPhotos } from '../_interfaces/my-photos';
import { PhotoServiceService } from '../_services/photo-service.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { UtilityFunctionsService } from '../_services/utility-functions.service';
import { DialogHomeDescriptionComponent } from '../_dialogWindows/dialog-home-description/dialog-home-description.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogZoomImageComponent } from '../_dialogWindows/dialog-zoom-image/dialog-zoom-image.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //pannello descrizione aperto/chiuso
  panelOpenState = false;

  currentUser: String[] = [];
  currentUserId: Number[] = [];

  //lista di persone che seguo
  follows: String[] = [];

  //lista di photo piaciute
  likedPhotos: MyPhotos[] | undefined;

  //lista di boolean like
  liked: Boolean[] = [];

  //tutte le foto delle persone che seguo (home)
  homePhoto: MyPhotos[] = [];

  //le info di tutti gli amici
  allInfo: infoUser[] = [];

  constructor(
    private storageService: StorageService,
    private photoService: PhotoServiceService,
    private userService: UserService,
    private utility: UtilityFunctionsService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentUser = this.storageService.getUser().username;
    this.currentUserId = this.storageService.getUser().id;

    await this.retrieveFollows();

    this.retrieveFriendPhoto(this.follows.map((str) => str.valueOf()));

    /////////////////////ridondante ma usato per sicurezza///////////////////////////

    //recupera le photo piaciute quando atterri sulla home
    this.likedPhotos = await this.photoService.getPhotosByLikes().toPromise();

    this.photoService.getPhotosByLikes().subscribe((photos: MyPhotos[]) => {
      this.likedPhotos = photos;
      for (let i = 0; i < this.homePhoto.length; i++) {
        this.liked.push(this.utility.checkList(photos, this.homePhoto, i));
      }
    });
    /////////////////////////////////////////////////////////////////////////////////
    if (this.follows.length > 0) {
      this.userService.getAllFollowsInfo(this.follows).subscribe({
        next: (res) => {
          this.allInfo = res;
        },
        error: (e) => {},
      });
    } else {
      console.log('follows not found');
    }

    this.shuffleArray(this.homePhoto);
  }

  //
  //
  //funzione che trova le persone che segue l utente
  //
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

  //
  //
  //funzione che trova tutte le foto delle persone che segue l utente
  //
  retrieveFriendPhoto(user: string[]): void {
    this.photoService.findAllfollowsPhotos(user).subscribe({
      next: (data) => {
        if (data != null) {
          this.homePhoto = data;
        } else {
          console.log('photos not found');
        }
      },
      error: (e) => console.log('photos not found'),
    });
  }

  //
  //
  //randomizza le visualizzazioni di tutte le foto sulla home
  //
  shuffleArray(array: any[]) {
    array.sort(() => Math.random() - 0.5);
  }

  //
  //
  //cattura il valore del html usato per reindirizzare alla pagina dell utente selezionato
  //
  captureClick(event: MouseEvent): void {
    const clickedLink = event.target as HTMLAnchorElement;
    const linkName = clickedLink.text;

    this.utility.linkData = linkName;
    sessionStorage.setItem('friend', linkName);
    console.log('Profilo selezionato di: ', linkName);
  }

  //trova la foto del profilo che corrisponde all utente
  findPhotoProfile(searchName: string): String | undefined | null {
    const foundObject = this.allInfo.find((obj) => obj.username === searchName);
    return foundObject?.profilePhoto;
  }

  ////////////////////////LIKE//////////////////////////////

  addLike(index: number | any): void {
    this.photoService.addLike(this.homePhoto[index].id).subscribe((photo) => {
      this.liked[index] = true;
    });
  }

  removeLike(index: number | any): void {
    this.photoService
      .removeLike(this.homePhoto[index].id)
      .subscribe((photo) => {
        this.liked[index] = false;
      });
  }
  //////////////////////////////DIALOG///////////////////////////////////////

  //info utente selezionato
  Details(user: any, alt: any, desc: any, profile: any) {
    const dialogRef = this.dialog.open(DialogHomeDescriptionComponent, {
      data: { username: user, alt: alt, description: desc, img: profile },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
  //zoom dell immagine selezionata
  showImage(img: String) {
    const dialogRef = this.dialog.open(DialogZoomImageComponent, {
      data: { imageUrl: img },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
