import { FormlyFieldConfig } from "@ngx-formly/core";

export const ModelsFormlyJson: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Nombre',
      placeholder: 'Name Brand',
      required: true,
    }
  },
  {
    key: 'brand',
    type: 'select',
    templateOptions: {
      label: "Marca",
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
  }
];

export const ModelsTableJson = {
  title: ['Marca', 'Modelo'],
  data: ['brandId.name', 'name']
}

export interface IModel {
  _id?: string;
  name: string;
  brand: string[];
}

export const Title = 'Modelos';
