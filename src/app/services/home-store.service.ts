import { Injectable } from '@angular/core';
import { Store, initialState } from '../model/store';
import { Home } from '../model/home';
import { ApiService } from './api.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeStoreService extends Store<Home> {
  constructor(private api: ApiService) {
    super(initialState);
  }

  public readonly posts$ = this.state$.pipe(map((state) => state.posts));

  public readonly recipes$ = this.state$.pipe(map((state) => state.recipes));

  public readonly ingredients$ = this.state$.pipe(map((state) => state.ingredients));

  public getHomeData() {
    this.api.getHomeData().subscribe(
      (newState) =>
        this.setState({
          ...this.state,
          ...newState,
        }),
      catchError((e) => {
        console.error(e);
        throw new Error(e);
      })
    );
  }
}
