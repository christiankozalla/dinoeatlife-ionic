import { Component, OnInit } from '@angular/core';
import { HomeStoreService } from 'src/app/services/home-store.service';

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.page.html',
  styleUrls: ['posts.page.scss'],
})
export class PostsPage implements OnInit {
  constructor(private homeStore: HomeStoreService) {}

  ngOnInit() {
    this.homeStore.getHomeData();
  }
}
