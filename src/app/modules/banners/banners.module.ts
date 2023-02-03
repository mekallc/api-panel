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
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const app: Routes = [
  { path: '', component: BannersComponent },
  { path: 'create', component: ActionComponent },
  { path: 'view/:uid', component: ViewComponent },
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
    FontAwesomeModule,
    CustomFormlyModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    RouterModule.forChild(app),
  ]
})
export class BannersModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPlus
    );
  }
}
