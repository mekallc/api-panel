import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectService } from '@core/services/connect.service';
import { CustomersTableJson } from './customer.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

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
    this.table = CustomersTableJson,
    this.items$ = this.connService.getData('users/customers')
  }

  onView(ev: any) {
    this.router.navigate(['pages', 'customers', 'view', ev._id])
  }

  onEdit(ev: any) {}

  onTrash(ev: any) {}
}
