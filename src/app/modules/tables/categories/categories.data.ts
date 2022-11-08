import { FormlyFieldConfig } from "@ngx-formly/core";

export const CategoriesFormlyJson: FormlyFieldConfig[] = [
  {
    key: '_id',
    type: 'input',
    templateOptions: {
      placeholder: 'ID',
      readonly: true,
    }
  },
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
    key: 'pictures',
    type: 'file',
    templateOptions: {
      label: 'Icon',
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
];

export const CategoriesTableJson = {
  title: ['Name', 'Icon'],
  data: ['name', 'picture']
}
