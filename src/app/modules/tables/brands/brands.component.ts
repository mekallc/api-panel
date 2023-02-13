import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

import { ConnectService } from '@core/services/connect.service';
import { BrandsFormlyJson, BrandsTableJson } from './brands.data';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  uid!: string;
  table: any;
  model = {};
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = BrandsFormlyJson;
  dtOptions: DataTables.Settings = {};

  items$!: Observable<any[]>;

  constructor(
    private conn: ConnectService,
    private uService: UtilsService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    this.table = BrandsTableJson;
    this.items$ = this.conn.getData('tables/brands');
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.uid) {
        this.save(this.form.value);
      } else {
        this.add(this.form.value);
      }
    }
  }

  onView(ev: any) {
    console.log(ev);
  }

  onEdit(ev: any) {
    this.uid = ev._id;
    console.log(ev);
    this.form.reset();
    this.form.patchValue({
      _id: ev._id,
      name: ev.name,
      vehicles: ev.vehicles,
      status: ev.status,
    });
  }

  onTrash(ev: any) {
    this.conn.deleteData(`tables/brands/${ev._id}`)
    .subscribe(() => {
      this.uService.setToast('danger', 'Se elimino de forma exitosa!', 'Exito!');
      this.items$ = this.conn.getData(`tables/brands`);
    })
  }

  private add(item: any) {
    const data = {
      name: item.name,
      vehicles: item.vehicles,
      status: item.status,
      brandId: item.brand,
    }
    this.conn.postData('tables/brands', data)
    .subscribe(() => {
      this.uService.setToast('success', 'Se creo de forma exitosa!', 'Exito!');
      this.items$ = this.conn.getData('tables/brands');
    })

  }
  private save(item: any) {
    const data = {
      name: item.name,
      status: item.status,
      brandId: item.brand,
      vehicles: item.vehicles,
    }
    this.conn.patchData(`tables/brands/${this.uid}`, data)
    .subscribe(() => {
      this.uService.setToast('success', 'Se actualizo de forma exitosa!', 'Exito!');
      this.items$ = this.conn.getData('tables/brands');
    })
  }

}
