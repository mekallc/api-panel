import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from '@core/services/connect.service';
import { ServicesTableJson } from '../companies.data';
import { map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  table:any = [];
  dtOptions: DataTables.Settings = {};
  user$!: Observable<any>;
  company$!: Observable<any>;
  services$!: Observable<any[]>;
  totalServices = 0;
  companyId!: string;

  constructor(
    private router: Router,
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
    if (uid) {
      const company$ = this.connService.getData(`companies/user/${uid}`);
      this.company$ = company$;
      this.services$ = company$.pipe(
        switchMap((res: any) =>
          this.connService.getData(`services/company/${res._id}`)
          .pipe(tap((res: any) => {
            this.totalServices = res.length;
          }))
        )
      );
    }
  }

  onView(ev: any) {
    this.router.navigate(['pages', 'services', 'view', ev._id])
  }
}

/**
 *
 *
{

}
 */
