import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-home-description',
  templateUrl: './dialog-home-description.component.html',
  styleUrls: ['./dialog-home-description.component.scss'],
})
export class DialogHomeDescriptionComponent implements OnInit {
  username = this.data.username;
  title = this.data.alt;
  description = this.data.description;
  profilePhoto = this.data.img;

  constructor(
    public dialogRef: MatDialogRef<DialogHomeDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
