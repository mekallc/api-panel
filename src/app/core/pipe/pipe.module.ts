import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitConvertedPipe } from './unit-converted.pipe';



@NgModule({
  declarations: [UnitConvertedPipe],
  exports: [UnitConvertedPipe],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
