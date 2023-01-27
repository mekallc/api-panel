import { FormlyFieldConfig } from "@ngx-formly/core";

export const ModelsFormlyJson: FormlyFieldConfig[] = [
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
    key: 'brand',
    type: 'select',
    templateOptions: {
      label: "Brand",
      options: [],
      valueProp: "_id",
      labelProp: "name",
      placeholder: 'Selecciona...',
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
    type: 'text',
    hide: false,
    templateOptions: {
      label: 'ID'
    }
  }
];

export const ModelsTableJson = {
  title: ['Brand', 'Model'],
  data: ['brandId.name', 'name']
}

export interface IModel {
  _id?: string;
  name: string;
  brand: string[];
}
