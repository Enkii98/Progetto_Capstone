import { Component, OnInit } from '@angular/core';
import { User } from '../_interfaces/User';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

const currentUser = localStorage.getItem('id');

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  currentUser: Number[] = [];
  username: String[] = [];
  usersList: User[] = [];
  submitted = false;

  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    //
    //lista di tutti gli utenti registrati
    //
    this.userService.getAllUsers().subscribe((users) => {
      this.usersList = this.removeElements(
        users,
        parseInt(JSON.stringify(this.currentUser))
      );

      localStorage.setItem('myList', JSON.stringify(this.usersList));
    });
    //
    //prendi user corrente se sei loggato
    //
    if (this.storageService.isLoggedIn()) {
      this.currentUser = this.storageService.getUser().id;
      this.username = this.storageService.getUser().username;
    }

    this.user();
  }

  arrayString = localStorage.getItem('list');
  selectedItem: User[] = JSON.parse(this.arrayString!);
  viewList: User[] = this.removeElements(
    this.selectedItem,
    parseInt(currentUser!)
  );

  user(): void {
    const data = this.selectedItem;
    const IdUser = parseInt(JSON.stringify(this.currentUser));

    console.log('users: ', data);
    console.log('io sono user con id: ', IdUser);
    console.log('lista senza di me: ', this.viewList);
  }

  //
  //aggiunta follow
  //
  follow(index: number): void {
    const data = this.viewList[index].username;
    const IdUser = parseInt(JSON.stringify(this.currentUser));

    console.log('follow aggiunto a : ', data);
    console.log('io sono user con id: ', IdUser);

    this.userService.follow(IdUser, data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  removeElements(obj: any, id: number) {
    var newObj = obj.filter((item: { id: number }) => item.id !== id);
    return newObj;
  }

  unfollow(index: number) {
    const data = this.viewList[index].username;
    console.log('follow rimosso a : ', data);
    this.userService.unfollow(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }
}
