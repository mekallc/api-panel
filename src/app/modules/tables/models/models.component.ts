import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConnectService } from '@core/services/connect.service';
import { ModelsFormlyJson, ModelsTableJson } from '@module/tables/models/models.data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  table: any;
  model = {};
  form = new FormGroup({});
  fields: any[] = ModelsFormlyJson;
  dtOptions: DataTables.Settings = {};

  brand: any = [];
  models$!: Observable<any[]>;

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
    this.table = ModelsTableJson;
    this.models$ = this.connService.getData('tables/models');
    this.connService.getData('tables/brands').subscribe(res =>
      this.fields[1]['templateOptions'].options = res );
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
