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
    key: 'order',
    type: 'input',
    templateOptions: {
      label: 'Orden',
      required: true,
      type: 'number',
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
  title: ['Tipo Vehiculo', 'Orden'],
  data: ['name', 'order']
}

export interface IModel {
  _id?: string;
  name: string;
  order: number;
}

export const Title = 'Tipo Vehiculo';
