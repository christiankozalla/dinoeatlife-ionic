import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getHomeData(userId: User['id']): Observable<object> {
    return this.http.get(`${env.API_URL}/home`);
  }
}
