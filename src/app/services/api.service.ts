import { environment as env } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Home } from '../model/home';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getHomeData(): Observable<Home> {
    return this.http.get<Home>(`${env.API_URL}/home`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side or network error
      // - Show user-facing error notification
      // - redirect to another static(?) page
      console.error('A client-side error occurred: ', error.error);
    } else {
      // Backend returned an unsuccessful response code
      // - Handle 400 and 401 (unauthorized) explicitly
      console.error(`Backend returned status code ${error.status}`, error.error);
    }

    // Return an observable with a user-facing error message
    return throwError('Something unexpected happened. Please try again later!');
  }
}
