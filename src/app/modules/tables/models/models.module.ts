import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsComponent } from './models.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatatableModule } from '@core/widgets/datatable/datatable.module';
import { FormlyModule } from '@ngx-formly/core';

const app: Routes = [ { path: '', component: ModelsComponent } ];


@NgModule({
  declarations: [
    ModelsComponent
  ],
  imports: [
    CommonModule,
    DatatableModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    RouterModule.forChild(app),
  ]
})
export class ModelsModule { }
