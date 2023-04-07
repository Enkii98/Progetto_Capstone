// fornisce metodi per accedere alle risorse pubbliche e protette.I cookie HttpOnly verranno inviati automaticamente insieme alle richieste HTTP (tramite Http Interceptor), quindi usiamo semplicemente il modulo Http senza preoccuparci di JWT.

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../_interfaces/User';
import { infoUser } from '../_interfaces/infoUser';

const API_URL = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  isAdmin(): Observable<any> {
    return this.http.get<boolean>(`${API_URL}/admin`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/user/list`);
  }

  getAllUsernames(): Observable<string[]> {
    return this.http.get<string[]>(`${API_URL}/usernames/list`);
  }

  getAllEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${API_URL}/emails/list`);
  }

  getMyFollow(user: Number): Observable<String[]> {
    return this.http.get<String[]>(`${API_URL}/${user}/follows`);
  }

  follow(userId: number, follows: string): Observable<User> {
    const url = `${API_URL}/${userId}/add-string`;
    return this.http.post<User>(url, follows);
  }

  unfollow(username: string): Observable<User> {
    const url = `${API_URL}/${localStorage.getItem('id')}/delete-follows`;

    return this.http.post<User>(url, username, {
      withCredentials: true,
    });
  }

  searchUsers(search: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${API_URL}/search/${search}?username=${localStorage.getItem('username')}`
    );
  }

  async deleteUser(): Promise<any> {
    try {
      const response = await this.http
        .delete(`${API_URL}/delete/${localStorage.getItem('id')}`, {
          withCredentials: true,
        })
        .toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteUserByUsername(username: any): Promise<any> {
    try {
      const response = await this.http
        .delete(`${API_URL}/deleteBy/${username}`, {
          withCredentials: true,
        })
        .toPromise();
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  deleteAllFollows(username: any): Observable<any> {
    return this.http.delete(
      `http://localhost:8080/api/public/deleteAllfollows?username=${username}`
    );
  }

  ///////////////////////////////////////INFO///////////////////////////////////////////

  getInfoByUsername(user: any): Observable<infoUser[]> {
    const url = `${API_URL}/info/username/${user}`;
    return this.http.get<infoUser[]>(url);
  }

  getAllFollowsInfo(usernames: any[]): Observable<any> {
    return this.http.post(`${API_URL}/all/follows/info`, usernames);
  }

  createInfo(username: any): Observable<infoUser> {
    const url = `${API_URL}/info`;
    return this.http.post<infoUser>(url, username);
  }

  updateProfilePhoto(profilePhoto: string): Observable<string> {
    const url = `${API_URL}/info/${localStorage.getItem(
      'username'
    )}/profile-photo`;
    return this.http.patch<string>(url, profilePhoto);
  }

  updateDescription(description: string): Observable<string> {
    const url = `${API_URL}/info/${localStorage.getItem(
      'username'
    )}/description`;
    return this.http.patch<string>(url, description);
  }

  deleteInfoByUsername(username: any): Observable<string> {
    const url = `${API_URL}/delete/info/${username}`;
    return this.http.delete<string>(url);
  }
}
