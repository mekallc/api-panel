import { FormlyFieldConfig } from "@ngx-formly/core";

export const VehiclesFormlyJson: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Nombre',
      placeholder: 'Tipo Vehiculo',
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
  }
];

export const VehiclesTableJson = {
  title: ['Tipo Vehiculo'],
  data: ['name']
}

export interface IModel {
  _id?: string;
  name: string;
}

export const Title = 'Tipo Vehiculo';
