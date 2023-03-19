//componente di aggiunta

import { Component, OnInit } from '@angular/core';
import { MyPhotos } from '../_interfaces/my-photos';
import { PhotoServiceService } from '../_services/photo-service.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

const currentUser = localStorage.getItem('username');

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  //scheletro salvataggio foto
  photo: MyPhotos = {
    url: '',
    alt: '',
    liked: false,
    nickname: currentUser,
  };
  submitted = false;

  constructor(
    private MyPhotoService: PhotoServiceService,
    private storageService: StorageService,
    private userService: UserService
  ) {}
  ngOnInit(): void {}

  //salvataggio
  savePhoto(): void {
    const data = {
      url: this.photo.url,
      alt: this.photo.alt,
      nickname: this.photo.nickname,
    };

    this.MyPhotoService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  test() {
    console.log(currentUser);
  }

  //aggiunta foto
  newPhoto(): void {
    this.submitted = false;
    this.photo = {
      url: '',
      alt: '',
      liked: false,
      nickname: currentUser,
    };
  }
}
