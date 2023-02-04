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
import { faPlus, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';

const app: Routes = [
  { path: '', component: BannersComponent },
  { path: 'create', component: ActionComponent },
  { path: 'edit/:uid', component: ActionComponent },
  { path: 'view/:uid', component: ViewComponent },
];

@NgModule({
  declarations: [
    ViewComponent,
    ActionComponent,
    BannersComponent,
  ],
  imports: [
    CommonModule,
    MomentModule,
    DatatableModule,
    GoogleMapsModule,
    FontAwesomeModule,
    NgbAccordionModule,
    CustomFormlyModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    RouterModule.forChild(app),
  ]
})
export class BannersModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPlus, faCircleChevronLeft
    );
  }
}
