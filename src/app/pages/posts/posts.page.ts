import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.page.html',
  styleUrls: ['posts.page.scss'],
})
export class PostsPage implements OnInit {
  posts: Observable<any>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.posts = this.http.get(env.API_URL + '/posts');
  }
}
