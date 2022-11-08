import { Component, ViewChild } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';


// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'formly-field-datepicker',
  template: `
  <div class="input-group mb-3">
    <input
      type="text"
      ngbDatepicker #d="ngbDatepicker"
      class="form-control"
      placeholder="yyyy-mm-dd"
      [formControl]="formControl"
      [formlyAttributes]="field">
    <button class="btn btn-outline-secondary calendar"
      (click)="d.toggle()" type="button"></button>
  </div>
  `,
  styleUrls: ['./custom-formly.component.scss']
})
export class DatepickerTypeComponent extends FieldType<FieldTypeConfig> {}
