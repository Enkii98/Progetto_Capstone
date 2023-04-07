import { OverlayRef } from '@angular/cdk/overlay';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilityFunctionsService } from 'src/app/_services/utility-functions.service';

@Component({
  selector: 'app-dialog-zoom-image',
  templateUrl: './dialog-zoom-image.component.html',
  styleUrls: ['./dialog-zoom-image.component.scss'],
})
export class DialogZoomImageComponent implements OnInit {
  constructor(
    private utility: UtilityFunctionsService,
    public dialogRef: MatDialogRef<DialogZoomImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  imageDimension = this.utility.photoDimension(this.data.imageUrl);

  getImageDimensions(): { width: number; height: number } {
    const img = new Image();
    img.src = this.imageDimension;
    return { width: img.width, height: img.height };
  }

  getWindowDimensions(): { width: string; height: string } {
    return { width: `100%`, height: `80%` };
  }

  ngOnInit(): void {}
}
