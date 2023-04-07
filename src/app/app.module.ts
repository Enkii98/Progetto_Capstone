import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//folder
import {
  httpInterceptorProviders,
  HttpRequestInterceptor,
} from './_helpers/http.interceptor';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { DialogAddPhotoComponent } from './_dialogWindows/dialog-add-photo/dialog-add-photo.component';
import { ListUsersForAdminComponent } from './list-users-for-admin/list-users-for-admin.component';
import { ProfileOtherUserComponent } from './profile-other-user/profile-other-user.component';
import { HomeComponent } from './home/home.component';
import { PexelsPhotoComponent } from './pexels-photo/pexels-photo.component';
import { DialogZoomImageComponent } from './_dialogWindows/dialog-zoom-image/dialog-zoom-image.component';
import { DialogSearchComponent } from './_dialogWindows/dialog-search/dialog-search.component';
import { DialogOptionsPhotoComponent } from './_dialogWindows/dialog-options-photo/dialog-options-photo.component';
import { DialogUserOptionsComponent } from './_dialogWindows/dialog-user-options/dialog-user-options.component';
import { DialogHomeDescriptionComponent } from './_dialogWindows/dialog-home-description/dialog-home-description.component';
import { DialogLikedPhotoComponent } from './_dialogWindows/dialog-liked-photo/dialog-liked-photo.component';
import { ShowcaseComponent } from './showcase/showcase.component';

//angular material//
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LoginComponent,
    UsersComponent,
    ProfileComponent,
    ListUsersForAdminComponent,
    ProfileOtherUserComponent,
    HomeComponent,
    PexelsPhotoComponent,
    DialogZoomImageComponent,
    DialogSearchComponent,
    DialogOptionsPhotoComponent,
    DialogAddPhotoComponent,
    DialogUserOptionsComponent,
    DialogHomeDescriptionComponent,
    DialogLikedPhotoComponent,
    ShowcaseComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    //angular material//
    //
    MatSnackBarModule,
    MatChipsModule,
    MatListModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatGridListModule,
    MatIconModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
