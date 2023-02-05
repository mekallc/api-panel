import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotificationsComponent } from './notifications.component';

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
    RouterModule.forChild(app),
  ]
})
export class NotificationsModule { }
