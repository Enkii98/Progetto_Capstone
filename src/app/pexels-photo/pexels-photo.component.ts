import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DialogZoomImageComponent } from '../_dialogWindows/dialog-zoom-image/dialog-zoom-image.component';
import { Pexels } from '../_interfaces/pexels';
import { PexelPhotoSearchServiceService } from '../_services/pexel-photo-search-service.service';
import { PhotoServiceService } from '../_services/photo-service.service';
import { UtilityFunctionsService } from '../_services/utility-functions.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-pexels-photo',
  templateUrl: './pexels-photo.component.html',
  styleUrls: ['./pexels-photo.component.scss'],
})
export class PexelsPhotoComponent implements OnInit {
  buttonDisabled: boolean[] = [false];

  searchData!: string;
  photos: Pexels[] = [];

  currentPage: number = 1;
  totalItems: number = 0;

  submitted = false;

  constructor(
    private pexelPhotoSearchService: PexelPhotoSearchServiceService,
    private MyPhotoService: PhotoServiceService,
    public dialog: MatDialog,
    private utility: UtilityFunctionsService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.search();
  }
  //cerca le immagini con un attributo di ricerca
  search() {
    this.pexelPhotoSearchService
      .getdata(localStorage.getItem('pexe')!, this.currentPage)
      .subscribe(
        (response: any) => {
          this.photos = response.photos;
          this.totalItems = response.total_results;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //seleziona l immagine e dalla al user corrente
  getElement(index: number) {
    const selectedItem = this.photos[index];
    console.log('Elemento selezionato:', selectedItem);
    console.log('user', localStorage.getItem('username'));
    const data = {
      url: selectedItem.src.medium,
      alt: selectedItem.alt,
      description: selectedItem.alt,
      nickname: localStorage.getItem('username'),
    };

    this.MyPhotoService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
    this.buttonDisabled[index] = true;
  }

  //quando cambi pagina mostra i risultati successivi
  onPageChange(event: PageEvent) {
    this.buttonDisabled = [false];
    this.currentPage = event.pageIndex + 1;
    this.pexelPhotoSearchService
      .getdata(localStorage.getItem('pexe')!, this.currentPage)
      .subscribe((response: any) => {
        this.photos = response.photos;
        this.totalItems = response.total_results;
      });
  }

  //controlla se sei loggato
  logged(): boolean {
    return this.storageService.isLoggedIn();
  }

  /////////////////////////////DIALOG//////////////////////////////////

  //zoom dell immagine
  showImage(img: String) {
    const dialogRef = this.dialog.open(DialogZoomImageComponent, {
      data: { imageUrl: img },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
