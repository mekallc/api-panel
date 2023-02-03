import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { GoogleChartsModule } from 'angular-google-charts';

const app: Routes = [ { path: '', component: HomeComponent } ];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    GoogleChartsModule,
    RouterModule.forChild(app),
  ]
})
export class HomeModule { }
