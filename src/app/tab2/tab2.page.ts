import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  posts: Observable<any>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.posts = this.http.get('http://localhost:4000/posts');
    this.posts.subscribe((data) => {
      console.log('puroviva posts', data);
    });
  }
}
