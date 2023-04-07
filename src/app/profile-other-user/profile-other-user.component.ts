import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogZoomImageComponent } from '../_dialogWindows/dialog-zoom-image/dialog-zoom-image.component';
import { MyPhotos } from '../_interfaces/my-photos';
import { PhotoServiceService } from '../_services/photo-service.service';
import { UserService } from '../_services/user.service';
import { UtilityFunctionsService } from '../_services/utility-functions.service';
import { DialogHomeDescriptionComponent } from '../_dialogWindows/dialog-home-description/dialog-home-description.component';

const currentUser = localStorage.getItem('id');

@Component({
  selector: 'app-profile-other-user',
  templateUrl: './profile-other-user.component.html',
  styleUrls: ['./profile-other-user.component.scss'],
})
export class ProfileOtherUserComponent implements OnInit {
  friendPhotos: MyPhotos[] = [];
  user: String = sessionStorage.getItem('friend')!;

  followList: String[] | undefined = [];

  usernamesList: String[] = [];

  flw: Boolean | undefined;

  info!: string;
  infoDesc!: string;
  infoPhoto!: string;

  likedUserPhoto: MyPhotos[] | undefined;
  userLiked: MyPhotos[] = [];

  liked: Boolean[] = [];

  constructor(
    private utility: UtilityFunctionsService,
    private photoService: PhotoServiceService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.retrieveFriendPhoto();

    this.followList = await this.userService
      .getMyFollow(parseInt(currentUser!))
      .toPromise();

    this.flw = this.followList?.includes(sessionStorage.getItem('friend')!);

    this.retriveInfo();

    /////////////////////////////////////////////////////////////////////
    this.likedUserPhoto = await this.photoService
      .getPhotosByLikes()
      .toPromise();

    this.photoService.getPhotosByLikes().subscribe((photos: MyPhotos[]) => {
      this.likedUserPhoto = photos;
      this.likedUserPhoto!.filter((obj) => {
        if (obj.nickname === sessionStorage.getItem('friend')) {
          this.userLiked.push(obj);
        }
      });
      for (let i = 0; i < this.friendPhotos.length; i++) {
        this.liked.push(
          this.utility.checkList(this.userLiked, this.friendPhotos, i)
        );
      }
    });

    console.log(this.likedUserPhoto);
  }

  //funzione che trova le foto del utente
  retrieveFriendPhoto(): void {
    this.photoService
      .findByUsername(sessionStorage.getItem('friend'))
      .subscribe({
        next: (data: any) => {
          this.friendPhotos = data;
          console.log(
            'Galleria di ',
            sessionStorage.getItem('friend'),
            ' : ',
            this.friendPhotos
          );
        },
        error: (e: any) => console.error(e),
      });
  }

  removeUsername(usernamesList: String[], usernameToRemove: string): String[] {
    const index = usernamesList.indexOf(usernameToRemove);
    if (index !== -1) {
      usernamesList.splice(index, 1);
    }
    return usernamesList;
  }

  retriveInfo(): void {
    this.userService.getInfoByUsername(this.user).subscribe((info) => {
      this.info = JSON.stringify(info);
      const resultD = '{' + this.info.split(',')[3];
      const resultF = '{' + this.info.split(',')[2] + '}';
      const description = JSON.parse(resultD);
      this.infoDesc = description.description;

      const photo = JSON.parse(resultF);
      this.infoPhoto = photo.profilePhoto;
    });
  }
  ///////////////////////////////////////FOLLOW/////////////////////////////////////////
  follow(): void {
    const data = sessionStorage.getItem('friend')!;
    const IdUser = parseInt(currentUser!);

    console.log('follow aggiunto a : ', data);
    console.log('io sono user con id: ', IdUser);

    this.userService.follow(IdUser, data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });

    this.flw = true;
  }

  unfollow() {
    const data = sessionStorage.getItem('friend')!;
    console.log('follow rimosso a : ', data);
    this.userService.unfollow(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });

    this.flw = false;
  }

  //////////////////////////////////////LIKE///////////////////////////////////////////
  addLike(index: number | any): void {
    this.photoService
      .addLike(this.friendPhotos[index].id)
      .subscribe((photo) => {
        this.liked[index] = true;
      });
  }

  removeLike(index: number | any): void {
    this.photoService
      .removeLike(this.friendPhotos[index].id)
      .subscribe((photo) => {
        this.liked[index] = false;
      });
  }
  ///////////////////////////////////DIALOG///////////////////////////////////////////

  //immagine zoom
  showImage(img: String) {
    const dialogRef = this.dialog.open(DialogZoomImageComponent, {
      data: { imageUrl: img },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  //dettagli immagine selezionata del profilo di quel utente
  Details(user: any, alt: any, desc: any) {
    const dialogRef = this.dialog.open(DialogHomeDescriptionComponent, {
      data: {
        username: user,
        alt: alt,
        description: desc,
        img: this.infoPhoto,
      },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
