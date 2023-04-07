import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: '4Kc3Fm1656mZlk4heECGZLseF4V2S7pGVWLs7VYH1QXpfcMzLxIYCfgx',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PexelPhotoSearchServiceService {
  constructor(private http: HttpClient) {}

  getdata(search: string, page: number): Observable<any> {
    const url =
      'https://api.pexels.com/v1/search?query=' +
      search +
      '&per_page=18&page=' +
      page;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handelError));
  }
  handelError(error: { message: any }) {
    return throwError(error.message || 'Server Error');
  }

  ///////////////////////////////////////////////////////////

  getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomImg(): Observable<any> {
    const randomNumber = this.getRandomIntInclusive(1, 100);
    const url = 'https://api.pexels.com/v1/curated?per_page=' + randomNumber;

    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handelError));
  }
}
