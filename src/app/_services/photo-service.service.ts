//operazioni CRUD sulle foto

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyPhotos } from 'src/app/_interfaces/my-photos';

const baseUrl = 'http://localhost:8080/api/test';

@Injectable({
  providedIn: 'root',
})
export class PhotoServiceService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    const url = `${baseUrl}/photos`;
    return this.http.post(url, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/photos/${id}`);
  }

  patch(id: Number, description: String): Observable<any> {
    return this.http.patch(`${baseUrl}/photo/${id}/description`, description);
  }

  deleteAllUserPhotos(username: String): Observable<any> {
    const url = `${baseUrl}/delete/all-photos`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: username,
    };
    return this.http.delete<any>(url, httpOptions);
  }

  findByUsername(user: any): Observable<MyPhotos[]> {
    return this.http.get<MyPhotos[]>(`${baseUrl}/users/${user}/photos`);
  }

  findAllfollowsPhotos(nicknameList: string[]): Observable<MyPhotos[]> {
    return this.http.get<MyPhotos[]>(
      `${baseUrl}/byNickname?nicknameList=${nicknameList}`
    );
  }

  ////////////////////////////LIKE/////////////////////////////////

  addLike(id: number | any): Observable<MyPhotos> {
    const url = `${baseUrl}/${id}/like`;
    return this.http.post<MyPhotos>(url, localStorage.getItem('username'));
  }

  removeLike(id: number | any): Observable<MyPhotos> {
    const url = `${baseUrl}/delete/${id}/like`;
    return this.http.post<MyPhotos>(url, localStorage.getItem('username'));
  }
}
