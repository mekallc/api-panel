import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
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
  id!: string;
  table: any;
  model = {};
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = BrandsFormlyJson;
  options: FormlyFormOptions = {};
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
      pagingType: 'full_numbers',
      pageLength: 15,
    }
    this.table = BrandsTableJson;
    this.items$ = this.conn.getData('tables/brands/list');
  }

  onSubmit() {
    if (this.form.valid) {
      const value: any = this.form.value;
      if (this.id) {
        this.save(this.form.value);
      } else {
        this.add(this.form.value);
      }
    }
  }

  onView(ev: any) {}

  onEdit(ev: any) {
    this.id = ev._id;
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
      this.items$ = this.conn.getData(`tables/brands/list`);
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
      this.form.reset();
      this.uService.setToast('success', 'Se creo de forma exitosa!', 'Exito!');
      this.items$ = this.conn.getData('tables/brands/list');
    })

  }
  private save(item: any) {
    const data = {
      name: item.name,
      status: item.status,
      brandId: item.brand,
      vehicles: item.vehicles,
    }
    this.conn.patchData(`tables/brands/${this.id}`, data)
    .subscribe(() => {
      this.form.reset();
      this.uService.setToast('success', 'Se actualizo de forma exitosa!', 'Exito!');
      this.items$ = this.conn.getData('tables/brands/list');
    })
  }

}
