import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { DialogOptionsPhotoComponent } from '../_dialogWindows/dialog-options-photo/dialog-options-photo.component';
import { DialogUserOptionsComponent } from '../_dialogWindows/dialog-user-options/dialog-user-options.component';
import { DialogZoomImageComponent } from '../_dialogWindows/dialog-zoom-image/dialog-zoom-image.component';
import { infoUser } from '../_interfaces/infoUser';
import { MyPhotos } from '../_interfaces/my-photos';
import { User } from '../_interfaces/User';
import { AuthService } from '../_services/auth.service';
import { PhotoServiceService } from '../_services/photo-service.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { UtilityFunctionsService } from '../_services/utility-functions.service';
import { DialogLikedPhotoComponent } from '../_dialogWindows/dialog-liked-photo/dialog-liked-photo.component';

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
  @Input() profileDescription: string = '';
  @Input() profilePhoto: string = '';
  user: String = currentUsername!;

  follows: String[] = [];

  myPhotos: MyPhotos[] = [];

  usernames: string[] = [];
  usernamesList: string[] = [];
  friendList: string[] = [];
  usersList: User[] = [];
  userDetails: infoUser[] = [];

  //info user corrente
  info!: string;
  infoDesc!: string;
  infoPhoto!: string;

  //info degli amici
  allInfo: infoUser[] = [];

  //boolean controllo follow/unfollow
  flw: boolean[] | undefined;

  likedPhotos: MyPhotos[] | undefined = [];

  constructor(
    private storageService: StorageService,
    private photoService: PhotoServiceService,
    private userService: UserService,
    private utility: UtilityFunctionsService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.storageService.isLoggedIn()) {
      //localStorage
      localStorage.setItem('username', this.storageService.getUser().username);
      localStorage.setItem('id', this.storageService.getUser().id);
      this.userService.getAllUsers().subscribe((users) => {
        this.usersList = users;
        localStorage.setItem('list', JSON.stringify(this.usersList));
      });
      this.userService.getAllUsernames().subscribe((users) => {
        this.usernamesList = users;
      });
      this.userService
        .getInfoByUsername(localStorage.getItem('username')!)
        .subscribe((users) => {
          this.userDetails = users;
          console.log('Dettagli Profilo: ', users);
        });

      //console log specifiche utente

      this.currentUser = this.storageService.getUser().username;
      this.currentUserId = this.storageService.getUser().id;
      console.log('Profilo di: ', this.currentUser);

      //popolazione delle immagini nel profilo all arrivo sulla rotta
      this.retrievePhoto();

      //popolazione dei follows nel profilo all arrivo sulla rotta
      this.retrieveFollows();

      //popolazione delle info utente nel profilo all arrivo sulla rotta
      this.retriveInfo();

      //recupera le photo piaciute quando atterri sulla home

      this.likedPhotos = await this.photoService.getPhotosByLikes().toPromise();

      this.retrieveLikedPhoto();

      //tutte le info degli dei miei follows
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
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  // funzione che trova le foto del utente
  retrievePhoto(): void {
    this.photoService.findByUsername(this.currentUser).subscribe({
      next: (data) => {
        if (data != null) {
          this.myPhotos = data;
        } else {
          console.log('photos not found');
        }
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
          if (data != null) {
            this.follows = data;
            this.flw = new Array(data.length).fill(true);
          } else {
            console.log('follows not found');
          }
        },
        error: (e) => console.error(e),
      });
  }

  //ritrova le foto piaciute
  retrieveLikedPhoto(): void {
    this.photoService.getPhotosByLikes().subscribe((photos: MyPhotos[]) => {
      this.likedPhotos = photos;
    });
  }

  //ritrova info
  retriveInfo(): void {
    this.userService
      .getInfoByUsername(localStorage.getItem('username')!)
      .subscribe((info) => {
        this.info = JSON.stringify(info);
        const resultD = '{' + this.info.split(',')[3];
        const resultF = '{' + this.info.split(',')[2] + '}';
        const description = JSON.parse(resultD);
        this.infoDesc = description.description;

        const photo = JSON.parse(resultF);
        this.infoPhoto = photo.profilePhoto;
      });
  }

  //trova la foto del profilo attraverso le info del utente
  findPhotoProfile(searchName: string | String): String | undefined | null {
    const foundObject = this.allInfo.find((obj) => obj.username === searchName);
    return foundObject?.profilePhoto;
  }

  //aggiorna la descrizione profilo
  updateDescriptionUser(): void {
    this.userService.updateDescription(this.profileDescription).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => ((this.profileDescription = ''), window.location.reload()),
    });
  }

  //aggiorna foro profilo
  updatePhotoProfileUser(): void {
    this.userService.updateProfilePhoto(this.profilePhoto).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => ((this.profilePhoto = ''), window.location.reload()),
    });
  }

  //aggiorna descrzione della foto
  updateDescriptionPhoto(index: any): void {
    this.photoService.patch(index, this.currentDescription).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }
  //prendi la stringa del html
  click(event: MouseEvent) {
    return this.utility.captureClick(event);
  }

  // funzione eliminazione profilo
  onDeleteUser() {
    this.userService.deleteAllFollows(this.user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {},
    });

    this.photoService.deleteAllUserPhotos(this.user).subscribe(() => {});

    this.userService.deleteInfoByUsername(this.user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {},
    });

    this.userService
      .deleteUser()
      .then((response) => {
        console.log(response);
        this.storageService.clean();
        this.router.navigate(['/login']);
        setTimeout(() => {
          window.location.reload();
        });
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
      error: (e) => {},
    });
  }
  ///////////////////////////////////DIALOG/////////////////////////////////////

  //dialogo delle opzioni immagini
  OptionsImage(id: Number, url: String, photo: MyPhotos) {
    const dialogRef = this.dialog.open(DialogOptionsPhotoComponent, {
      data: {
        photoId: id,
        photoUrl: url,
        photoInfo: photo,
        profilePhoto: this.infoPhoto,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.retrievePhoto();
      this.retriveInfo();
    });
  }
  //dialogo delle foto piaciute
  OptionsLikedImage(photo: MyPhotos, img: any) {
    const dialogRef = this.dialog.open(DialogLikedPhotoComponent, {
      data: {
        photoInfo: photo,
        profilePhoto: img,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.retriveInfo();

      this.retrieveLikedPhoto();
    });
  }
  //dialogo  opzioni del utente
  openDialogUserOptions(): void {
    const dialogRef = this.dialog.open(DialogUserOptionsComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      const data = localStorage.getItem('userOptions');

      if (data === 'Photo') {
        localStorage.setItem('userOptions', 'no');
        this.retriveInfo();
      } else if (data === 'Users') {
        localStorage.setItem('userOptions', 'no');
        this.retriveInfo();
      } else if (data === 'Delete') {
        localStorage.setItem('userOptions', 'no');
        this.onDeleteUser();
      }
    });
  }
  //dialogo zoom dell immagine
  showImage(img: String) {
    const dialogRef = this.dialog.open(DialogZoomImageComponent, {
      data: { imageUrl: img },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  ////////////////////////////////FOLLOW///////////////////////////////////

  //lista di follow/unfollow

  //
  //
  //aggiunta follow
  //
  friend(follow: String, index: number): void {
    const IdUser = parseInt(JSON.stringify(this.currentUserId));

    this.userService
      .follow(IdUser, JSON.stringify(follow).slice(1, -1))
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e),
      });

    this.flw![index] = true;
  }

  //
  //
  //elimina follow
  //
  unfollow(follow: String, index: number) {
    this.userService.unfollow(JSON.stringify(follow).slice(1, -1)).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });

    this.flw![index] = false;
  }

  ////////////////////////////////////////////////////////////////
}
