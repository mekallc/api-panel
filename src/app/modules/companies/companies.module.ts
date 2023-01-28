import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies.component';
import { ViewComponent } from './view/view.component';
import { ActionsComponent } from './actions/actions.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatatableModule } from '@core/widgets/datatable/datatable.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const app: Routes = [
  { path: '', component: CompaniesComponent },
  { path: 'view/:uid', component: ViewComponent },
  { path: 'create', component: ActionsComponent },
  { path: 'update/:uid', component: ActionsComponent },
];

@NgModule({
  declarations: [
    ViewComponent,
    ActionsComponent,
    CompaniesComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    DatatableModule,
    FontAwesomeModule,
    RouterModule.forChild(app),
  ]
})
export class CompaniesModule { }
