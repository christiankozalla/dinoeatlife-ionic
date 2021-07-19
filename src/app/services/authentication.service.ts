import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { Storage } from '@capacitor/storage';

import { environment as env } from 'src/environments/environment';

const TOKEN_KEY = 'del';

import { ResponseOnAuth } from '../model/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(null);

  // token should be BehaviorSubject as a single source of truth
  // In order to consume the token, subscribe to the Observable (i.e. JwtInterceptor consumes the token)
  token: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    // Producer for token observable
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { email: string; password: string }): Observable<string | void> {
    // Puroviva-Hapi Docs => GET /login mit credentials in Authorization Header `Basic btoa("<EMAIL>:<PASSWORD>")`
    return this.http
      .get(`${env.API_URL}/login`, {
        headers: {
          Authorization: `Basic ${btoa(credentials.email + ':' + credentials.password)}`,
        },
        withCredentials: true,
        responseType: 'json',
      })
      .pipe(
        map((data: ResponseOnAuth) => data.accessToken),
        switchMap((accessToken) => {
          this.isAuthenticated.next(true);
          this.token.next(accessToken);
          return from(Storage.set({ key: TOKEN_KEY, value: accessToken }));
        })
      );
  }

  // Send the refreshToken cookie to /refresh endpoint
  getNewAccessToken() {
    return this.http.get(env.API_URL + '/refresh', {
      withCredentials: true,
    });
  }

  logout(): void {
    // delete anti-csrf cookie
    // remove accessToken from Storage
    // delete refreshToken cookie
    this.token.next('');
    this.isAuthenticated.next(false);
  }
}
