import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './language.component';
import { RouterModule, Routes } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { DatatableModule } from '@core/widgets/datatable/datatable.module';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';


const app: Routes = [
  { path: '', component: LanguageComponent },
  { path: 'action/:uid', component: ActionComponent },
];

@NgModule({
  declarations: [
    LanguageComponent,
    ActionComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DatatableModule,
    CodemirrorModule,
    RouterModule.forChild(app),
  ]
})
export class LanguageModule { }
