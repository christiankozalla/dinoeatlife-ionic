import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Home } from '../model/home';

import { Post } from '../model/post';

@Injectable({
  providedIn: 'root',
})
export class HomeStoreService {
  private readonly _home = new BehaviorSubject<Home | null>(null);

  // Observable if _recipes exposed to views
  readonly home$ = this._home.asObservable();

  private get home(): Home {
    return this._home.getValue();
  }

  // setter is invoked when assigning recipes to this.recipes
  private set home(home: Home) {
    this._home.next(home);
  }

  addPost(post: Post) {
    this.home = {
      ...this.home,
      posts: [...this.home.posts, post],
    };
  }
}
