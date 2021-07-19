import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HomeStoreService } from 'src/app/services/home-store.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private api: ApiService,
    public homeStore: HomeStoreService
    ) {}

  ngOnInit(): void {

  }
}
