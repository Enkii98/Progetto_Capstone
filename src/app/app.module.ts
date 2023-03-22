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

//angular material//
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProfileComponent } from './profile/profile.component';
import { AddComponent } from './add/add.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { TutorialListComponent } from './tutorial-list/tutorial-list.component';
import { TestComponent } from './test/test.component';
import { ListComponent } from './list/list.component';
import { ProfileOtherUserComponent } from './profile-other-user/profile-other-user.component';
import { HomeComponent } from './home/home.component';
import { PexelsPhotoComponent } from './pexels-photo/pexels-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LoginComponent,
    SearchbarComponent,
    ProfileComponent,
    AddComponent,
    TutorialComponent,
    TutorialListComponent,
    TestComponent,
    ListComponent,
    ProfileOtherUserComponent,
    HomeComponent,
    PexelsPhotoComponent,
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatGridListModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
