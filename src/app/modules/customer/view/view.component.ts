import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectService } from '@core/services/connect.service';
import { ServicesTableJson } from '@module/customer/customer.data';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  table:any = [];
  dtOptions: DataTables.Settings = {};
  user$!: Observable<any>;
  services$!: Observable<any[]>;
  totalServices = 0;

  constructor(
    private connService: ConnectService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({uid}) => this.getData(uid));
    this.dtOptions = { pagingType: 'full_numbers' }
    this.table = ServicesTableJson;
  }

  getData(uid: string) {
    this.user$ = this.connService.getData(`users/${uid}`);
    this.services$ = this.connService.getData(`services/user/list/${uid}`)
    .pipe(tap((res: any) => {
      this.totalServices = res.length;
    }));
  }
}
