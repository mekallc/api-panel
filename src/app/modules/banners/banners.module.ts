import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { ViewComponent } from './view/view.component';
import { BannersComponent } from './banners.component';
import { ActionComponent } from './action/action.component';
import { DatatableModule } from '@core/widgets/datatable/datatable.module';
import { CustomFormlyModule } from '@core/formly/custom-formly.module';

const app: Routes = [
  { path: '', component: BannersComponent },
];

@NgModule({
  declarations: [
    BannersComponent,
    ViewComponent,
    ActionComponent
  ],
  imports: [
    CommonModule,
    DatatableModule,
    GoogleMapsModule,
    CustomFormlyModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    RouterModule.forChild(app),
  ]
})
export class BannersModule { }
