import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '@core/services/connect.service';
import { CompaniesTableJson } from '@module/companies/companies.data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  table:any = [];
  dtOptions: DataTables.Settings = {};
  items$!: Observable<[]>;
  constructor(
    private router: Router,
    private connService: ConnectService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    this.table = CompaniesTableJson;
    this.items$ = this.connService.getData('users/companies')
    this.items$.subscribe(res => console.log(res));
  }

  onView(ev: any) {
    this.router.navigate(['pages', 'companies', 'view', ev._id])
  }

  onEdit(ev: any) {}

  onTrash(ev: any) {}

}
