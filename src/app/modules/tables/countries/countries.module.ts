import { ToastrModule } from 'ngx-toastr';
import { FormlyModule } from '@ngx-formly/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

import { CountriesComponent } from './countries.component';
import { DatatableModule } from '@core/widgets/datatable/datatable.module';
import { MessageModule } from '@core/widgets/message/message.module';

const app: Routes = [ { path: '', component: CountriesComponent } ];


@NgModule({
  declarations: [
    CountriesComponent
  ],
  imports: [
    CommonModule,
    ToastrModule,
    MessageModule,
    DatatableModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    RouterModule.forChild(app),
  ]
})
export class CountriesModule { }
