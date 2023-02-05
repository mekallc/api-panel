import { FormlyFieldConfig } from "@ngx-formly/core";

export const BrandsFormlyJson: FormlyFieldConfig[] = [
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
    key: 'vehicles',
    type: 'select',
    templateOptions: {
      label: 'Tipo de Vehículo',
      required: true,
      multiple: true,
      options: [
        {
          label: 'Carro',
          value: '63271a349ca46e0006010703'
        },
        {
          label: 'Motocicleta',
          value: '63271a349ca46e0006010704'
        }
      ]
    }
  },
  {
    key: 'status',
    type: 'checkbox',
    defaultValue: true,
    templateOptions: {
      label: 'Status',
    }
  },
  {
    key: '_id',
    type: 'hide',
    hide: true,
    templateOptions: {
      label: 'ID'
    }
  }
];

export const BrandsTableJson = {
  title: ['Nombre', 'Tipo Vehiculo'],
  data: ['name', 'vehicles']
}
