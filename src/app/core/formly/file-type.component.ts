import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-file',
  template: `
    <div class="mb-3">
      <input class="form-control"  type="file" [formControl]="formControl" [formlyAttributes]="field">
    </div>
  `,
})
export class FormlyFieldFile extends FieldType<FieldTypeConfig> {}


/**  Copyright 2021 Formly. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://github.com/ngx-formly/ngx-formly/blob/main/LICENSE */
