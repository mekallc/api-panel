import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  exports: [ DatatableComponent ],
  declarations: [ DatatableComponent ],
  imports: [
    CommonModule,
    DataTablesModule,
    FontAwesomeModule,
  ]
})
export class DatatableModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPenToSquare, faEye, faTrashCan, faCircle
    );
  }
}
