import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '@core/services/connect.service';
import { Observable, map, take, tap } from 'rxjs';
import { BannersTableJson, Title } from './banners.data';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  title: string = Title;
  table: any;
  banners$!: Observable<any[]>
  dtOptions: DataTables.Settings = {};

  constructor(
    private router: Router,
    private connService: ConnectService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  setEdit(uid: string) {
    console.log(uid);
  }

  getData() {
    this.dtOptions = { pagingType: 'full_numbers' };
    this.table = BannersTableJson;
    this.banners$ = this.connService.getData('banners');
    this.banners$.subscribe(res => console.log('BANNER', res));
  }

  onCreate() {
    this.router.navigate(['pages', 'banners', 'create']);
  }

  onView(ev: any) {
    console.log(ev);
    this.router.navigate(['pages', 'banners', 'view', ev._id]);
  }
  onEdit(ev: any) {
    console.log(ev);
    this.router.navigate(['pages', 'banners', 'edit', ev._id]);
  }
}
