import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

import { ConnectService } from '@core/services/connect.service';
import { BrandsFormlyJson, BrandsTableJson } from './brands.data';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  table: any;
  model = {};
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = BrandsFormlyJson;
  dtOptions: DataTables.Settings = {};

  countries$!: Observable<any[]>;

  constructor(
    private connService: ConnectService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    this.table = BrandsTableJson;
    this.countries$ = this.connService.getData('tables/brands');
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  onView(ev: any) {
    console.log(ev);
  }
  onEdit(ev: any) {
    this.form.reset();
    console.log(ev);
    this.form.setValue(ev);
  }
  onTrash(ev: any) {
    console.log(ev);
  }

}
