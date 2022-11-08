import { FormlyFieldConfig } from "@ngx-formly/core";

export const BrandsFormlyJson: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Name',
      placeholder: 'Name Brand',
      required: true,
    }
  },
  {
    key: 'type',
    type: 'checkbox',
    templateOptions: {
      label: 'Type Vehicles',
      placeholder: 'Name Brand',
      required: true,
    }
  },
  {
    key: 'status',
    type: 'checkbox',
    defaultValue: true,
    templateOptions: {
      label: 'Status'
    }
  },
  {
    key: '_id',
    type: 'hide',
    hide: false,
    templateOptions: {
      label: 'ID'
    }
  }
];

export const BrandsTableJson = {
  title: ['Name', 'Vehicles'],
  data: ['name', 'type']
}
