//componente di aggiunta

import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyPhotos } from 'src/app/_interfaces/my-photos';
import { PhotoServiceService } from 'src/app/_services/photo-service.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import { UtilityFunctionsService } from 'src/app/_services/utility-functions.service';

const currentUser = localStorage.getItem('username');

@Component({
  selector: 'app-dialog-add-photo',
  templateUrl: './dialog-add-photo.component.html',
  styleUrls: ['./dialog-add-photo.component.scss'],
})
export class DialogAddPhotoComponent implements OnInit {
  isImg: boolean = false;
  //scheletro salvataggio foto
  photo: MyPhotos = {
    url: '',
    alt: '',
    description: '',
    nickname: currentUser,
  };
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAddPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private MyPhotoService: PhotoServiceService,
    private storageService: StorageService,
    private userService: UserService,
    private utility: UtilityFunctionsService
  ) {}
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  //salvataggio
  savePhoto(): void {
    const data = {
      url: this.photo.url,
      alt: this.photo.alt,
      description: this.photo.description,
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

  //aggiunta foto
  newPhoto(): void {
    this.submitted = false;
    this.photo = {
      url: '',
      alt: '',
      description: '',
      nickname: currentUser,
    };
  }

  img(): boolean {
    return this.utility.isImageUrl(this.photo.url!);
  }
}
