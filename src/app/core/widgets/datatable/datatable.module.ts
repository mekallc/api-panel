import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { PipeModule } from '@core/pipe/pipe.module';
import { DatatableComponent } from './datatable.component';

@NgModule({
  exports: [ DatatableComponent ],
  declarations: [ DatatableComponent ],
  imports: [
    PipeModule,
    CommonModule,
    DataTablesModule,
    FontAwesomeModule,
  ]
})
export class DatatableModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPenToSquare, faEye, faTrashCan, faCircle, faCircleCheck
    );
  }
}
