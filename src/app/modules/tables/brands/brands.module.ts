import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';

import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { DatatableModule } from '@core/widgets/datatable/datatable.module';
const app: Routes = [ { path: '', component: BrandsComponent } ];

@NgModule({
  declarations: [
    BrandsComponent
  ],
  imports: [
    CommonModule,
    DatatableModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    RouterModule.forChild(app),
  ]
})
export class BrandsModule { }
