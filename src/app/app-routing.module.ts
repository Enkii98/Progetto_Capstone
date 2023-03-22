import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ProfileComponent } from './profile/profile.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { AddComponent } from './add/add.component';
import { TutorialListComponent } from './tutorial-list/tutorial-list.component';
import { TestComponent } from './test/test.component';
import { ProfileOtherUserComponent } from './profile-other-user/profile-other-user.component';
import { HomeComponent } from './home/home.component';
import { PexelsPhotoComponent } from './pexels-photo/pexels-photo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'search', component: SearchbarComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'add', component: AddComponent },
  { path: 'list', component: TutorialListComponent },
  { path: 'test', component: TestComponent },
  { path: 'profile/friend', component: ProfileOtherUserComponent },
  { path: 'home/friend', component: ProfileOtherUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pexels', component: PexelsPhotoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
