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

  getdata(search: string, perPage: string): Observable<any> {
    const url =
      'https://api.pexels.com/v1/search?query=' +
      search +
      '&per_page=' +
      perPage;
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handelError));
  }
  handelError(error: { message: any }) {
    return throwError(error.message || 'Server Error');
  }
}
