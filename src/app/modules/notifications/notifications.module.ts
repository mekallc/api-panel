import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotificationsComponent } from './notifications.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatatableModule } from '@core/widgets/datatable/datatable.module';

const app: Routes = [
  { path: '', component: NotificationsComponent }
];

@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    DatatableModule,
    ReactiveFormsModule,
    RouterModule.forChild(app),
  ]
})
export class NotificationsModule { }
