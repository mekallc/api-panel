import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConnectService } from '@core/services/connect.service';
import { CategoriesFormlyJson, CategoriesTableJson, Title } from './categories.data';
import { catchError, Observable } from 'rxjs';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

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
    private connService: ConnectService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    this.table = CategoriesTableJson;
    this.items$ = this.connService.getData('tables/categories');
    this.items$.subscribe(res => console.log(res));
  }

  onSubmit() {
    if (this.form.valid) {
      const value: any = this.form.value;
      console.log(value);
      this.connService.postData('tables/categories', value)
      .subscribe((res: any) => {
        console.log(res);
      })
    }
  }

  onView(ev: any) {
    console.log(ev);
  }

  onSave(data: any) {

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
