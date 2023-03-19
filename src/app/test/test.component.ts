import { Component, OnInit } from '@angular/core';
import { MyPhotos } from '../_interfaces/my-photos';
import { PhotoServiceService } from '../_services/photo-service.service';
import { StorageService } from '../_services/storage.service';
import { ApiService } from '../_services/api.service';
import { User } from '../_interfaces/User';

const currentUser = localStorage.getItem('username');
const currentUserId = parseInt(localStorage.getItem('id')!);

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  allPhotos!: any[];
  displayedPhotos!: any[];
  currentDisplayCount = 10;

  currentUser: User[] = [];

  photos: MyPhotos[] = [];
  submitted = false;

  constructor(
    private photosService: ApiService,
    private storageService: StorageService,
    private MyPhotoService: PhotoServiceService
  ) {}

  ngOnInit() {
    this.photosService.getPhotos().subscribe((photos) => {
      this.allPhotos = photos;
      this.displayedPhotos = this.allPhotos.slice(0, this.currentDisplayCount);
    });

    this.currentUser = this.storageService.getUser();

    console.log(
      'Stai registrando le immagini sul profilo di: ',
      sessionStorage.getItem('username')
    );
    console.log('id: ', this.currentUser);
  }

  //
  //mostra altri risultati
  //
  loadMore() {
    this.currentDisplayCount += 10;
    this.displayedPhotos = this.allPhotos?.slice(0, this.currentDisplayCount);
  }

  //
  //Prende l'elemento e tramite un indice nel html gli assegna quel elemento contenuto nel oggetto
  //
  getElement(index: number) {
    const selectedItem = this.displayedPhotos[index];
    console.log('Elemento selezionato:', selectedItem);
    console.log('user', this.currentUser);
    const data = {
      url: selectedItem.url,
      alt: selectedItem.alt,
      nickname: currentUser,
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
