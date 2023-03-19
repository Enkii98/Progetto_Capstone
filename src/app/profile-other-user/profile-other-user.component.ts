import { Component, OnInit } from '@angular/core';
import { MyPhotos } from '../_interfaces/my-photos';
import { PhotoServiceService } from '../_services/photo-service.service';
import { UtilityFunctionsService } from '../_services/utility-functions.service';

const linkUser = sessionStorage.getItem('friend');

@Component({
  selector: 'app-profile-other-user',
  templateUrl: './profile-other-user.component.html',
  styleUrls: ['./profile-other-user.component.scss'],
})
export class ProfileOtherUserComponent implements OnInit {
  friendPhotos: MyPhotos[] = [];
  user: String = this.utility.linkData;
  constructor(
    private utility: UtilityFunctionsService,
    private photoService: PhotoServiceService
  ) {}

  ngOnInit(): void {
    console.log('sono amico di: ', this.utility.linkData);
    this.retrieveFriendPhoto();
  }

  //funzione che trova le foto del utente
  retrieveFriendPhoto(): void {
    this.photoService.findByUsername(this.user).subscribe({
      next: (data) => {
        this.friendPhotos = data;
        console.log('Galleria di ', this.user, ' : ', this.friendPhotos);
      },
      error: (e) => console.error(e),
    });
  }
}
