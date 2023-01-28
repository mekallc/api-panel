import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { RouterModule, Routes } from '@angular/router';
import { DatatableModule } from '@core/widgets/datatable/datatable.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewComponent } from './view/view.component';

const app: Routes = [
  { path: '', component: ServicesComponent },
  { path: 'view/:uid', component: ViewComponent },
];

@NgModule({
  declarations: [
    ServicesComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    DatatableModule,
    FontAwesomeModule,
    RouterModule.forChild(app),
  ]
})
export class ServicesModule { }
