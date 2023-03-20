import { Component, OnInit } from '@angular/core';
import { MyPhotos } from '../_interfaces/my-photos';
import { PhotoServiceService } from '../_services/photo-service.service';
import { UtilityFunctionsService } from '../_services/utility-functions.service';

@Component({
  selector: 'app-profile-other-user',
  templateUrl: './profile-other-user.component.html',
  styleUrls: ['./profile-other-user.component.scss'],
})
export class ProfileOtherUserComponent implements OnInit {
  friendPhotos: MyPhotos[] = [];
  user: String = sessionStorage.getItem('friend')!;

  constructor(
    private utility: UtilityFunctionsService,
    private photoService: PhotoServiceService
  ) {}

  ngOnInit(): void {
    console.log('sono amico di: ', sessionStorage.getItem('friend'));
    this.retrieveFriendPhoto();
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
}
