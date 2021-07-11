import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';

const TOKEN_KEY = 'prv_acc_tk';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(null);

  token = '';
  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { email; password }): Observable<string> {
    // Puroviva-Hapi Docs => GET /login mit credentials in Authorization Header `Basic btoa("<EMAIL>:<PASSWORD>")`
    return this.http.get('http://localhost:4000/login', {
      headers: {
        Authorization: `Basic ${btoa(
          credentials.email + ':' + credentials.password
        )}`,
      },
      responseType: 'text',
    });
  }
}
