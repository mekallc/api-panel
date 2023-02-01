import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConnectService } from '@core/services/connect.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CountriesFormlyJson, CountriesTableJson, Title } from './countries.data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  title = Title;
  table: any;
  model = {};
  uid!: string;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = CountriesFormlyJson;
  dtOptions: DataTables.Settings = {};
  countries$!: Observable<any[]>;

  constructor(
    private toastr: ToastrService,
    private connService: ConnectService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    this.table = CountriesTableJson;
    this.countries$ = this.connService.getData('tables/countries');
  }

  onSubmit() {
    if (this.form.valid) {
      if(this.uid) {
        this.update(this.uid, this.form.value);
      } else {
        this.create(this.form.value);
      }
    }
    this.countries$ = this.connService.getData('tables/countries');
  }

  create(data: any) {
    this.connService.postData('tables/countries', data).subscribe(
      (res: any) => {
        this.toastr.show(
          'Se agrego correctamente el registro',
          'Show!'
        );
      }
    )
  }

  update(uid: string, data: any) {
    this.connService.patchData(`tables/countries/${uid}`, data).subscribe(
      (res: any) => {
        this.toastr.show(
          `Se Actualizo el item com ID: ${uid}`,
          'Se actualizo!'
        );
      }
    )
  }

  onEdit(ev: any) {
    this.uid = ev._id;
    delete ev._id;
    this.form.setValue(ev);
  }

  onView(ev: any) {
    delete ev._id;
  }
  onTrash(ev: any) {
    const id = ev._id;
    this.connService.patchData(`tables/countries/${id}`, { status: false })
    .subscribe(
      () => {
        this.toastr.info(
          `Se desabilito el país ${ev.name}`,
          'Cuidado!'
        );
      }
    )
    this.countries$ = this.connService.getData('tables/countries');
  }
}
