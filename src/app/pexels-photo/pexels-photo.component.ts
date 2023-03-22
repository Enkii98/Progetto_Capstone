import { Component, OnInit } from '@angular/core';
import { Pexels } from '../_interfaces/pexels';
import { PexelPhotoSearchServiceService } from '../_services/pexel-photo-search-service.service';
import { PhotoServiceService } from '../_services/photo-service.service';

@Component({
  selector: 'app-pexels-photo',
  templateUrl: './pexels-photo.component.html',
  styleUrls: ['./pexels-photo.component.scss'],
})
export class PexelsPhotoComponent implements OnInit {
  searchData!: string;
  perPage: any;
  photos: Pexels[] = [];

  submitted = false;
  constructor(
    private pexelPhotoSearchService: PexelPhotoSearchServiceService,
    private MyPhotoService: PhotoServiceService
  ) {}

  ngOnInit(): void {}

  search() {
    this.pexelPhotoSearchService
      .getdata(this.searchData, this.perPage)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.photos = response.photos;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getElement(index: number) {
    const selectedItem = this.photos[index];
    console.log('Elemento selezionato:', selectedItem);
    console.log('user', localStorage.getItem('username'));
    const data = {
      url: selectedItem.src.small,
      alt: selectedItem.alt,
      nickname: localStorage.getItem('username'),
    };

    this.MyPhotoService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }
}
