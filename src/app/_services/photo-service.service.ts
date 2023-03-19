//operazioni CRUD sulle foto

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyPhotos } from 'src/app/_interfaces/my-photos';

const baseUrl = 'http://localhost:8080/api/test';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

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
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByUsername(user: any): Observable<MyPhotos[]> {
    return this.http.get<MyPhotos[]>(`${baseUrl}/users/${user}/photos`);
  }

  findByAlt(alt: any): Observable<MyPhotos[]> {
    return this.http.get<MyPhotos[]>(`${baseUrl}?alt=${alt}`);
  }

  findAllfollowsPhotos(nicknameList: string[]): Observable<MyPhotos[]> {
    return this.http.get<MyPhotos[]>(
      `${baseUrl}/byNickname?nicknameList=${nicknameList}`
    );
  }
}
