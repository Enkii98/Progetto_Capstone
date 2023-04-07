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
  selector: 'app-dialog-liked-photo',
  templateUrl: './dialog-liked-photo.component.html',
  styleUrls: ['./dialog-liked-photo.component.scss'],
})
export class DialogLikedPhotoComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private photoService: PhotoServiceService,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogLikedPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

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

  removeLike(): void {
    this.photoService
      .removeLike(this.data.photoInfo.id)
      .subscribe((photo) => {});
    this.onNoClick();
  }
}
