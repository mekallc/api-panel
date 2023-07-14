import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from '@core/services/connect.service';
import { UtilsService } from '@core/services/utils.service';
import { ServicesTableJson } from '@module/customer/customer.data';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  country$!: Observable<any[]>;
  table:any = [];
  dtOptions: DataTables.Settings = {};
  user$!: Observable<any>;
  services$!: Observable<any[]>;
  totalServices = 0;
  switchEdit = false;
  client: any;

  constructor(
    private router: Router,
    private uService: UtilsService,
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
    this.loadData();
  }

  loadData() {
    this.user$.subscribe((res: any) => {
      this.client = {
        phone: res.phone,
        email: res.email,
        country: res.country
      }
    })
  }

  onView(ev: any) {
    this.router.navigate(['pages', 'services', 'view', ev._id])
  }

  onEdit() {
    this.switchEdit = true;
    this.country$ = this.connService.getData(`tables/countries`);
  }
  onCancel() {
    this.switchEdit = false;
  }
onSave(uid: string) {
  this.switchEdit = false;
  this.connService.patchData(`users/${uid}`, this.client).subscribe((res: any) => {
    this.user$ = this.connService.getData(`users/${uid}`);
    this.uService.setAlert({
      icon: 'info',
      title: '',
      text: 'El usuário se actualizo correctamente!',
    });
  })
}
}
