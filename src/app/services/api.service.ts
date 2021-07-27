import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Home } from '../model/home';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getHomeData(): Observable<Home> {
    return this.http.get<Home>(`${env.API_URL}/home`, {
      responseType: 'json',
    });
  }
}
