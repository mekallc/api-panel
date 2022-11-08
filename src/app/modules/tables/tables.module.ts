import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoute } from '@module/tables/tables.routes';
import { TablesComponent } from '@module/tables/tables.component';



@NgModule({
  declarations: [TablesComponent],
  exports: [TablesComponent],
  imports: [
    TablesRoute,
    CommonModule,
  ]
})
export class TablesModule { }
