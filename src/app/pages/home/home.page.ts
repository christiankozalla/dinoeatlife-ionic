import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/model/home';
import { ApiService } from 'src/app/services/api.service';
import { HomeStoreService } from 'src/app/services/home-store.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public homeStore: HomeStoreService) {}

  ngOnInit(): void {
    this.homeStore.getHomeData();
  }
}
