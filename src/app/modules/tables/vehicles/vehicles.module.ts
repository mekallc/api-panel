import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatatableModule } from '@core/widgets/datatable/datatable.module';
import { FormlyModule } from '@ngx-formly/core';

const app: Routes = [ { path: '', component: VehiclesComponent } ];

@NgModule({
  declarations: [VehiclesComponent],
  imports: [
    CommonModule,
    DatatableModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    RouterModule.forChild(app),
  ]
})
export class VehiclesModule { }
