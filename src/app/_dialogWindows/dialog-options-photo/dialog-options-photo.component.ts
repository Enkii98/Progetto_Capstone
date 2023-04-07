import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { PhotoServiceService } from 'src/app/_services/photo-service.service';
import { UserService } from 'src/app/_services/user.service';
import { DialogHomeDescriptionComponent } from '../dialog-home-description/dialog-home-description.component';

@Component({
  selector: 'app-dialog-options-photo',
  templateUrl: './dialog-options-photo.component.html',
  styleUrls: ['./dialog-options-photo.component.scss'],
})
export class DialogOptionsPhotoComponent implements OnInit {
  @Input() currentDescription: string = '';

  openInput = false;

  constructor(
    public dialog: MatDialog,
    private photoService: PhotoServiceService,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogOptionsPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  deletePhoto() {
    console.log('id della foto: ', this.data.photoId);
    this.photoService.delete(this.data.photoId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
    this.onNoClick();
  }

  updateDescriptionPhoto(): void {
    this.photoService
      .patch(this.data.photoId, this.currentDescription)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e),
      });
    this.onNoClick();
    this.openInput = false;
  }

  updateProfilePhoto(): void {
    this.userService.updateProfilePhoto(this.data.photoUrl).subscribe({
      next: (res) => {
        console.log(res);
        window.location.reload();
      },
      error: (e) => '',
    });

    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openInfo() {
    const dialogRef = this.dialog.open(DialogHomeDescriptionComponent, {
      data: {
        username: this.data.photoInfo.nickname,
        alt: this.data.photoInfo.alt,
        description: this.data.photoInfo.description,
        img: this.data.profilePhoto,
      },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
