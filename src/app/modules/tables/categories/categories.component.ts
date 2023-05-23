import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { FireService } from '@core/services/fire.service';
import { ConnectService } from '@core/services/connect.service';
import { CategoriesFormlyJson, CategoriesTableJson, Title } from './categories.data';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  title = Title;
  table: any;
  model = {};
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = CategoriesFormlyJson;
  dtOptions: DataTables.Settings = {};

  items$!: Observable<any[]>;

  constructor(
    private conn: ConnectService,
    private fireService: FireService,
    private uService: UtilsService,
  ) {}

  ngOnInit(): void {
    this.getData();
    console.log(this.form);
  }

  getData() {
    this.dtOptions = {
      pageLength: 20,
      pagingType: 'full_numbers'
    }
    this.table = CategoriesTableJson;
    this.items$ = this.conn.getData('tables/categories');
    this.items$.subscribe(res => console.log(res));
  }

  async onSubmit() {
    if (this.form.valid) {
      const value: any = this.form.value;
      if (value._id) {
        await this.onEdit(value);
      } else {
        await this.onSave(value);
      }
    }
  }

  async onSave(value: any) {
    const upload: any = await this.fireService.upload('admin', value.picture[0]);
    if(upload) {
      value.picture = upload ? upload: '';
      console.log(value);
      this.conn.postData('tables/categories', value)
      .subscribe(() => {
        this.uService.setToast('success', 'Se creo de forma exitosa!', 'Exito!');
        this.items$ = this.conn.getData('tables/categories');
      })
    }
  }

  async onEdit(value: any) {
    const id = value._id;
    delete value._id;
    console.log(typeof value.picture);
    if (typeof value.picture === 'object') {
      const upload: any = await this.fireService.upload('admin', value.picture[0]);
      if (upload) {
        value.picture = upload ? upload: '';
      }
    }
    console.log(value);
    this.conn.patchData(`tables/categories/${id}`, value)
    .subscribe(() => {
      this.uService.setToast('success', 'Se actualizo de forma exitosa!', 'Exito!');
      this.items$ = this.conn.getData(`tables/categories`);
    })
  }

  setEdit(ev: any) {
    ev.order = ev.order ? ev.order : 0;
    console.log(ev);
    this.form.reset();
    this.form.setValue(ev);
  }
  onTrash(ev: any) {
    this.conn.deleteData(`tables/categories/${ev._id}`)
    .subscribe(() => {
      this.uService.setToast('danger', 'Se elimino de forma exitosa!', 'Exito!');
      this.items$ = this.conn.getData(`tables/categories`);
    })
  }
}
