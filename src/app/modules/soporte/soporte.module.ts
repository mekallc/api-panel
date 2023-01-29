import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoporteComponent } from './soporte.component';
import { RouterModule, Routes } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { MomentModule } from 'ngx-moment';
import { FormsModule } from '@angular/forms';

const app: Routes = [
  { path: '', component: SoporteComponent },
];

@NgModule({
  declarations: [
    SoporteComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MomentModule,
    FontAwesomeModule,
    RouterModule.forChild(app),
  ]
})
export class SoporteModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCircle, faMagnifyingGlass);
  }
}
