import { environment as env } from '../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // Used for queued API calls while refreshing tokens
  token: Subscription = this.authService.token.subscribe((token) => token);
  isRefreshingToken = false;
  blockList: Array<string> = [env.API_URL + '/login'];

  constructor(private authService: AuthenticationService, private toastCtrl: ToastController) {}

  // Intercept every HTTP call
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if we need additional token logic or not
    if (this.isInBlockList(request.url)) {
      return next.handle(request);
    } else {
      return next.handle(this.addToken(request)).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 400:
                return this.handle400Error(err);
              case 401:
                return this.handle401Error(request, next);
              default:
                return throwError(err);
            }
          } else {
            return throwError(err);
          }
        })
      );
    }
  }

  private isInBlockList(requestUrl: string): boolean {
    return this.blockList.includes(requestUrl);
  }

  private addToken(request: HttpRequest<any>) {
    if (this.token) {
      // additionally check if token not expired yet
      return request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      });
    } else {
      return request;
    }
  }

  // 400 is thrown when refreshing token failed
  // or something else went wrong along the way
  private async handle400Error(err: HttpErrorResponse) {
    // Check the exact error message
    // Log the user out
    const toast = await this.toastCtrl.create({
      message: 'Logged out due to authentication mismatch',
      duration: 2000,
    });

    toast.present();

    this.authService.logout();
    return of(null);
  }

  // 401 indicates our access token is invalid
  // try refreshing
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Check if another call is already using the refresh logic
    if (!this.isRefreshingToken) {
      // Set to null so other requests will wait
      this.isRefreshingToken = true;
      this.authService.token.next('');

      // Get a new accessToken
      return this.authService.getNewAccessToken();
    }
  }
}
