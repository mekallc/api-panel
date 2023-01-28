import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '@core/services/connect.service';
import { Observable } from 'rxjs';
import { ServicesTableJson, Title } from './services.data';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  title = Title;
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
    this.table = ServicesTableJson,
    this.items$ = this.connService.getData('services')
  }

  onView(ev: any) {
    this.router.navigate(['pages', 'services', 'view', ev._id])
  }

  onEdit(ev: any) {}

  onTrash(ev: any) {}
}
