import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/_services/storage.service';

export interface DialogData {
  dataSearch: string;
}

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.scss'],
})
export class DialogSearchComponent implements OnInit {
  typeSelect: string = 'noSelect';
  constructor(
    private storageService: StorageService,
    public dialogRef: MatDialogRef<DialogSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    localStorage.setItem('typeSearch', 'noSelect');
    this.dialogRef.close();
  }

  selectClick(str: string): string {
    this.data.dataSearch = '';
    localStorage.setItem('typeSearch', str);
    this.typeSelect = str;
    return (this.typeSelect = str);
  }

  ngOnInit(): void {}

  logged(): boolean {
    return this.storageService.isLoggedIn();
  }
}
