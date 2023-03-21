import { Component, OnInit } from '@angular/core';
import { Pexels } from '../_interfaces/pexels';
import { PexelPhotoSearchServiceService } from '../_services/pexel-photo-search-service.service';

@Component({
  selector: 'app-test-pexels-api',
  templateUrl: './test-pexels-api.component.html',
  styleUrls: ['./test-pexels-api.component.scss'],
})
export class TestPexelsAPIComponent implements OnInit {
  searchData!: string;
  perPage: any;
  photos: Pexels[] = [];
  constructor(
    private pexelPhotoSearchService: PexelPhotoSearchServiceService
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
}
