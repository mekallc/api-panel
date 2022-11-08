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

const app: Routes = [
  { path: '', component: BannersComponent },
  { path: 'view/:uid', component: ViewComponent },
  { path: 'create', component: ActionComponent },
  { path: 'update/:uid', component: ActionComponent },
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
    ReactiveFormsModule,
    FormlyModule.forChild(),
    RouterModule.forChild(app),
  ]
})
export class BannersModule { }
