import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from '@core/services/connect.service';
import { ServicesTableJson } from '../companies.data';
import { map, Observable, switchMap, tap } from 'rxjs';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  table:any = [];
  dtOptions: DataTables.Settings = {};
  user$!: Observable<any>;
  country$!: Observable<any[]>;
  company$!: Observable<any>;
  services$!: Observable<any[]>;
  totalServices = 0;
  companyId!: string;

  switchEdit = false;
  customer: any;
  compania: any;

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
    if (uid) {
      this.company$ = this.connService.getData(`companies/user/${uid}`);
      this.services$ = this.company$.pipe(
        switchMap((res: any) =>
        this.connService.getData(`services/company/${res._id}`)
        .pipe(tap((res: any) => {
          this.totalServices = res.length;
        }))
        )
        );
      };
      this.loadData();
    }

    loadData() {
      this.company$.subscribe((res: any) => {
        this.customer = {
          phone: res.user.phone,
          email: res.user.email,
          country: res.user.country
        }
        this.compania = {
          name: res.name
        };
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
      console.log('onCancel');
      this.switchEdit = false;
    }
  onSave(uid: string, id: string) {
    this.switchEdit = false;
    this.connService.patchData(`companies/${id}`, this.compania).subscribe((res) => null);
    this.connService.patchData(`users/${uid}`, this.customer).subscribe((res: any) => {
      this.company$ = this.connService.getData(`companies/user/${uid}`);
      this.uService.setAlert({
        icon: 'info',
        title: '',
        text: 'El usuário se actualizo correctamente!',
      });
    })
  }
}
