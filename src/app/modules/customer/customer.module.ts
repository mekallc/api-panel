import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { ViewComponent } from './view/view.component';
import { CustomerComponent } from './customer.component';
import { ActionsComponent } from './actions/actions.component';
import { DatatableModule } from '@core/widgets/datatable/datatable.module';
import { FormsModule } from '@angular/forms';

const app: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'view/:uid', component: ViewComponent },
  { path: 'create', component: ActionsComponent },
  { path: 'update/:uid', component: ActionsComponent },
];

@NgModule({
  declarations: [
    CustomerComponent,
    ViewComponent,
    ActionsComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    DatatableModule,
    FontAwesomeModule,
    RouterModule.forChild(app),
  ]
})
export class CustomerModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faStar);
  }
}
