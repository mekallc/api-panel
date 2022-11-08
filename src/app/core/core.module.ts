import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomFormlyModule } from '@core/formly/custom-formly.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    NgbModule,
    CommonModule,
    DataTablesModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CustomFormlyModule,
    HttpClientJsonpModule,
    ToastrModule.forRoot(),
  ]
})
export class CoreModule { }
