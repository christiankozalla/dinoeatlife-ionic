import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { State } from '../model/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private initialState = {
    profile: {
      name: ""
    },
    posts: [],
    recipes: [],
  };

  private readonly _state = new BehaviorSubject<State>(this.initialState);
}
