import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { DialogAddPhotoComponent } from './_dialogWindows/dialog-add-photo/dialog-add-photo.component';
import { ProfileOtherUserComponent } from './profile-other-user/profile-other-user.component';
import { HomeComponent } from './home/home.component';
import { PexelsPhotoComponent } from './pexels-photo/pexels-photo.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AppComponent } from './app.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { ListUsersForAdminComponent } from './list-users-for-admin/list-users-for-admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signin/login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'login/signin', component: SigninComponent },
  { path: 'search', component: UsersComponent },
  {
    path: 'admin',
    component: ListUsersForAdminComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'add', component: DialogAddPhotoComponent, canActivate: [AuthGuard] },
  {
    path: 'profile/people',
    component: ProfileOtherUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/people',
    component: ProfileOtherUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/people',
    component: ProfileOtherUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/people',
    component: ProfileOtherUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'window', component: ShowcaseComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'pexels', component: PexelsPhotoComponent },
  { path: '**', redirectTo: 'window' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
