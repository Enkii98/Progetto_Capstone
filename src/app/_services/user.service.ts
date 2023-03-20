// fornisce metodi per accedere alle risorse pubbliche e protette.I cookie HttpOnly verranno inviati automaticamente insieme alle richieste HTTP (tramite Http Interceptor), quindi usiamo semplicemente il modulo Http senza preoccuparci di JWT.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_interfaces/User';

const API_URL = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'all', { responseType: 'text' });
  // }

  // getUserBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'user', { responseType: 'text' });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/user/list`);
  }

  getUserByUsername(user: any): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/user/${user}`);
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

  // unfollow(user: String): Observable<User> {
  //   const url = `${API_URL}/${localStorage.getItem(
  //     'id'
  //   )}/delete-follows?username=${user}`;
  //   console.log(url);

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   return this.http.post<User>(url, {}, httpOptions);
  // }

  deleteAllFollows(username: any): Observable<any> {
    console.log('io sono username:', username);
    return this.http.delete(
      `http://localhost:8080/api/public/deleteAllfollows?username=${username}`
    );
  }
}
