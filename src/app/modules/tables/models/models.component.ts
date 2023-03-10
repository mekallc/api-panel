import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { UtilsService } from '@core/services/utils.service';
import { ConnectService } from '@core/services/connect.service';
import { ModelsFormlyJson, ModelsTableJson, Title } from '@module/tables/models/models.data';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  table: any;
  model = {};
  id!: string;
  title = Title;
  brand: any = [];
  form = new FormGroup({});
  models$!: Observable<any[]>;
  fields: any[] = ModelsFormlyJson;
  dtOptions: DataTables.Settings = {};

  constructor(
    private ms: ConnectService,
    private uService: UtilsService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dtOptions = {
      pageLength: 15,
      pagingType: 'full_numbers',
    }
    this.table = ModelsTableJson;
    this.models$ = this.ms.getData('tables/models/list');
    this.ms.getData('tables/brands').subscribe(res =>
      this.fields[1]['templateOptions'].options = res );
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
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
    this.id = ev._id;
    this.form.patchValue({ brand: ev.brandId._id, name: ev.name });
  }

  onTrash(ev: any) {
    this.ms.deleteData(`tables/models/${ev._id}`).subscribe(() => {
      this.uService.setToast('success',
        `${ev.brand_name} ${ev.name} se elimino correctamente!`,
        'Exito!'
      );
      this.models$ = this.ms.getData('tables/models/list');
    });
  }

  private add(item: any) {
    const data = {
      name: item.name,
      status: item.status,
      brandId: item.brand
    }
    this.ms.postData('tables/models', data)
    .subscribe(() => {
      this.form.reset();
      this.uService.setToast('success', 'Se creo de forma exitosa!', 'Exito!');
      this.models$ = this.ms.getData('tables/models/list');
    })

  }
  private save(item: any) {
    const data = {
      name: item.name,
      status: item.status,
      brandId: item.brand,
    }
    this.ms.patchData(`tables/models/${this.id}`, data)
    .subscribe(() => {
      this.form.reset();
      this.uService.setToast('success', 'Se actualizo de forma exitosa!', 'Exito!');
      this.models$ = this.ms.getData('tables/models/list');
    })
  }
}
