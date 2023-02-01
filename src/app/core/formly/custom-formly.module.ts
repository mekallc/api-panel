import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

import { FormlyFieldFile } from './file-type.component';
import { FileValueAccessor } from 'src/file-value-accessor';
import { DatepickerTypeComponent } from './datepicker.component';

@NgModule({
  exports: [
    FormlyFieldFile,
    FileValueAccessor,
    DatepickerTypeComponent,
  ],
  declarations: [
    FormlyFieldFile,
    FileValueAccessor,
    DatepickerTypeComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    NgbAlertModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'file',
          component: FormlyFieldFile,
          wrappers: ['form-field']
        },
        {
          name: 'datepicker',
          component: DatepickerTypeComponent,
          wrappers: ['form-field']
        },
      ],
      validationMessages: [
        { name: 'required', message: 'Campo Obligatorio' },
      ]
    }),
  ],
})
export class CustomFormlyModule { }
