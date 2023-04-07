import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { UtilityFunctionsService } from 'src/app/_services/utility-functions.service';

@Component({
  selector: 'app-dialog-user-options',
  templateUrl: './dialog-user-options.component.html',
  styleUrls: ['./dialog-user-options.component.scss'],
})
export class DialogUserOptionsComponent implements OnInit {
  @Input() profileDescription: string = '';
  @Input() profilePhoto: string = '';

  clickCount = 0;
  clickLeft = 6 - this.clickCount;
  private timeoutId: any;

  constructor(
    private utility: UtilityFunctionsService,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogUserOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updatePhotoProfileUser(): void {
    localStorage.setItem('userOptions', 'Photo');
    this.userService.updateProfilePhoto(this.profilePhoto).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => (this.profilePhoto = ''),
    });
    this.onNoClick();
  }

  updateDescriptionUser(): void {
    localStorage.setItem('userOptions', 'Users');
    this.userService.updateDescription(this.profileDescription).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => (this.profileDescription = ''),
    });
    this.onNoClick();
  }

  deleteUser(): void {
    localStorage.setItem('userOptions', 'Delete');
    this.onNoClick();
  }

  Checkimg(): boolean {
    return this.utility.isImageUrl(this.profilePhoto);
  }

  //funzione per incrementare i click, quando arriva a 6 sblocca il bottone, se non si preme 6 bolte prima di 5 secondi i click vengono resettati
  incrementClickCount() {
    this.clickCount++;
    if (this.clickCount === 6) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    } else if (this.clickCount === 1) {
      this.timeoutId = setTimeout(() => {
        this.resetClickCount();
      }, 5000);
    }
  }

  resetClickCount() {
    this.clickCount = 0;
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }

  isButtonDisabled() {
    return this.clickCount >= 6;
  }
}
